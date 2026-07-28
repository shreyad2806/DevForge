import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getPolarClient,
  getPolarProductId,
  getPolarAppUrl,
} from "@/lib/polar";

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const appUrl = getPolarAppUrl();
    const successUrl = `${appUrl}/billing?success=true`;
    const cancelUrl = `${appUrl}/pricing`;
    const productId = getPolarProductId();
    const polar = getPolarClient();

    const checkout = await polar.checkouts.create({
      products: [productId],
      successUrl,
      returnUrl: cancelUrl,
      customerEmail: user.email ?? undefined,
      externalCustomerId: user.id,
      metadata: { userId: user.id },
    });

    return NextResponse.json({ checkoutUrl: checkout.url ?? "" });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
