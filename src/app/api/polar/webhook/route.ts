import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import { updateSubscription } from "@/services/subscription";
import { getPolarProductId } from "@/lib/polar";

const WEBHOOK_SECRET = process.env.POLAR_WEBHOOK_SECRET;

function verifySignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!WEBHOOK_SECRET || !signatureHeader) return false;

  const expected = crypto.createHmac("sha256", WEBHOOK_SECRET).update(rawBody).digest();

  const candidates = signatureHeader
    .split(",")
    .map((part) => part.trim())
    .flatMap((part) => {
      const prefixMatch = part.match(/^(?:v1|sha256)=?(.+)$/i);
      const sig = prefixMatch ? prefixMatch[1].trim() : part;
      if (!sig) return [];
      return [sig.toLowerCase()];
    });

  for (const sig of candidates) {
    let candidate: Buffer;
    try {
      if (/^[0-9a-f]+$/i.test(sig)) {
        candidate = Buffer.from(sig, "hex");
      } else {
        candidate = Buffer.from(sig, "base64");
      }
      if (candidate.length === expected.length) {
        if (crypto.timingSafeEqual(candidate, expected)) return true;
      }
    } catch {
      // ignore malformed signatures
    }
  }

  return false;
}

async function resolveUser(supabase: Awaited<ReturnType<typeof createClient>>, email?: string | null) {
  if (!email) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (error) {
    console.error("[polar webhook] Failed to resolve user:", error.message);
    return null;
  }
  return data;
}

export async function POST(request: NextRequest) {
  try {
    if (!WEBHOOK_SECRET) {
      throw new Error("Missing POLAR_WEBHOOK_SECRET environment variable");
    }

    const rawBody = await request.text();
    const signature =
      request.headers.get("x-polar-webhook-signature") ??
      request.headers.get("x-polar-signature") ??
      request.headers.get("webhook-signature");

    if (!verifySignature(rawBody, signature)) {
      console.warn("[polar webhook] Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(rawBody) as {
      type: string;
      data: Record<string, unknown> & { customer?: { email?: string | null } | null };
    };
    const { type, data } = payload;

    const supabase = await createClient();
    const polarProductId = getPolarProductId();

    const customerEmail =
      data.customer?.email ??
      (data.customerEmail as string | undefined) ??
      (data.customer_email as string | undefined);

    const user = await resolveUser(supabase, customerEmail);
    if (!user) {
      console.warn("[polar webhook] No Supabase user found for email:", customerEmail ?? "unknown");
      return NextResponse.json({ received: true }, { status: 200 });
    }

    if (
      type === "subscription.created" ||
      type === "subscription.updated" ||
      type === "subscription.active" ||
      type === "subscription.uncanceled" ||
      type === "subscription.resumed"
    ) {
      const productId =
        (data.productId as string | undefined) ??
        (data.product_id as string | undefined) ??
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((data.product as any)?.id as string | undefined);

      const plan = productId === polarProductId ? "pro" : "free";
      const status = String(data.status ?? "active");
      const currentPeriodEnd = data.currentPeriodEnd
        ? new Date(data.currentPeriodEnd as string).toISOString()
        : null;

      const { error } = await updateSubscription(supabase,
        {
          user_id: user.id,
          provider: "polar",
          provider_subscription_id: String(data.id),
          plan,
          status,
          current_period_end: currentPeriodEnd,
          updated_at: new Date().toISOString(),
        }
      );

      if (error) {
        console.error("[polar webhook] Upsert failed:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }

      console.log("[polar webhook] Subscription upserted:", data.id, "for user", user.id);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    if (type === "subscription.canceled" || type === "subscription.revoked") {
      const { error } = await updateSubscription(supabase,
        {
          user_id: user.id,
          provider: "polar",
          provider_subscription_id: String(data.id),
          plan: "free",
          status: "canceled",
          current_period_end: data.currentPeriodEnd
            ? new Date(data.currentPeriodEnd as string).toISOString()
            : null,
          updated_at: new Date().toISOString(),
        }
      );

      if (error) {
        console.error("[polar webhook] Cancel upsert failed:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }

      console.log("[polar webhook] Subscription canceled:", data.id, "for user", user.id);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    if (type === "order.paid") {
      const productId =
        (data.productId as string | undefined) ??
        (data.product_id as string | undefined) ??
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((data.product as any)?.id as string | undefined);
      const plan = productId === polarProductId ? "pro" : "free";
      const subscriptionId = (data.subscriptionId as string | undefined) ?? String(data.id);

      const { error } = await updateSubscription(supabase,
        {
          user_id: user.id,
          provider: "polar",
          provider_subscription_id: subscriptionId,
          plan,
          status: "active",
          current_period_end: null,
          updated_at: new Date().toISOString(),
        }
      );

      if (error) {
        console.error("[polar webhook] Order upsert failed:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }

      console.log("[polar webhook] Order paid:", data.id, "for user", user.id);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    console.log("[polar webhook] Unhandled event type:", type);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[polar webhook] Error processing webhook:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
