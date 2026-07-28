import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyWebhook } from "@/lib/polar";

const SUPABASE_URL = process.env.SUPABASE_URL?.trim() ?? "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";

const WEBHOOK_EVENTS = [
  "subscription.created",
  "subscription.updated",
  "subscription.active",
  "subscription.canceled",
  "subscription.revoked",
  "order.paid",
] as const;

function getProductId(data: Record<string, unknown>): string | undefined {
  return (
    (data.productId as string | undefined) ??
    (data.product_id as string | undefined) ??
    ((data.product as { id?: string } | undefined)?.id)
  );
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    const signature =
      request.headers.get("x-polar-webhook-signature") ??
      request.headers.get("x-polar-signature") ??
      request.headers.get("webhook-signature");

    if (!verifyWebhook(rawBody, signature)) {
      console.warn("[polar webhook] Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("[polar webhook] Missing Supabase service role credentials");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const payload = JSON.parse(rawBody) as {
      type: string;
      data: Record<string, unknown>;
    };

    const { type, data } = payload;

    console.log("[polar webhook] Webhook received:", type);

    if (!WEBHOOK_EVENTS.includes(type as (typeof WEBHOOK_EVENTS)[number])) {
      console.log("[polar webhook] Ignoring event type:", type);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const metadata = data.metadata as { userId?: string } | undefined;
    const userId = metadata?.userId;

    if (!userId) {
      console.warn("[polar webhook] metadata.userId missing, skipping. Event:", type);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    console.log("[polar webhook] User ID:", userId, "Event:", type);

    const providerSubscriptionId =
      type === "order.paid"
        ? ((data.subscriptionId as string | undefined) ?? String(data.id))
        : String(data.id);

    const currentPeriodEnd = data.currentPeriodEnd
      ? new Date(data.currentPeriodEnd as string).toISOString()
      : null;

    let plan: string | undefined;
    let status: string | undefined;

    switch (type) {
      case "subscription.created":
      case "subscription.active":
        status = "active";
        break;
      case "subscription.updated":
        status = String(data.status ?? "active");
        break;
      case "subscription.canceled":
        status = "canceled";
        break;
      case "subscription.revoked":
        status = "revoked";
        break;
      case "order.paid":
        status = String(data.status ?? "active");
        break;
    }

    if (type === "subscription.revoked") {
      plan = "free";
    } else if (type === "order.paid") {
      plan = "pro";
    } else {
      const productId = getProductId(data);
      const polarProductId = process.env.POLAR_PRODUCT_ID?.trim();
      plan =
        productId && polarProductId
          ? productId === polarProductId
            ? "pro"
            : "free"
          : "pro";
    }

    const subscription = {
      user_id: userId,
      provider: "polar",
      provider_subscription_id: providerSubscriptionId,
      plan,
      status: status ?? String(data.status ?? "active"),
      current_period_end: currentPeriodEnd,
      updated_at: new Date().toISOString(),
    };

    const onConflict = providerSubscriptionId ? "provider_subscription_id" : "user_id";

    const { error } = await supabase
      .from("subscriptions")
      .upsert(subscription, { onConflict });

    if (error) {
      console.error("[polar webhook] Upsert failed:", error.message);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    console.log("[polar webhook] Subscription updated for user:", userId);

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[polar webhook] Error processing webhook:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
