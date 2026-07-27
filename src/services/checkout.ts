"use client";

import { createClient } from "@/lib/supabase/client";
import { getSubscription } from "@/services/subscription";

// TODO: Replace mock checkout with Polar checkout after deployment.
export async function completePurchase(): Promise<{ error: Error | null }> {
  const supabase = createClient();
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;

  if (!userId) {
    return { error: new Error("Unauthorized") };
  }

  const now = new Date().toISOString();
  const renewal = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const current = await getSubscription(supabase, userId);

  const subscription = {
    user_id: userId,
    plan: "pro",
    status: "active",
    provider: "demo",
    provider_subscription_id: null,
    current_period_end: renewal,
    updated_at: now,
  };

  if (current.id) {
    const { error } = await supabase
      .from("subscriptions")
      .update(subscription)
      .eq("id", current.id);

    if (error) {
      console.error("[checkout] Failed to update subscription:", error.message);
      return { error: new Error(error.message) };
    }
  } else {
    const { error } = await supabase
      .from("subscriptions")
      .insert({ ...subscription, created_at: now });

    if (error) {
      console.error("[checkout] Failed to create subscription:", error.message);
      return { error: new Error(error.message) };
    }
  }

  return { error: null };
}

// TODO: Replace with Polar upgrade flow.
export async function upgradeToPro(): Promise<{ error: Error | null }> {
  return completePurchase();
}

// TODO: Replace with Polar cancellation flow.
export async function cancelSubscription(): Promise<{ error: Error | null }> {
  const supabase = createClient();
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;

  if (!userId) {
    return { error: new Error("Unauthorized") };
  }

  const { error } = await supabase
    .from("subscriptions")
    .update({ status: "canceled", updated_at: new Date().toISOString() })
    .eq("user_id", userId);

  if (error) {
    console.error("[checkout] Failed to cancel subscription:", error.message);
    return { error: new Error(error.message) };
  }

  return { error: null };
}
