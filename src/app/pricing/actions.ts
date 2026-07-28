"use server";

import { createClient } from "@/lib/supabase/server";
import { getSubscription } from "@/services/subscription";

export async function activateFreePlan(): Promise<{ error: string | null }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const now = new Date().toISOString();
    const current = await getSubscription(supabase, user.id);

    const subscription = {
      user_id: user.id,
      plan: "free",
      status: "active",
      provider: "internal",
      provider_subscription_id: null,
      updated_at: now,
    };

    if (current.id) {
      const { error } = await supabase
        .from("subscriptions")
        .update(subscription)
        .eq("id", current.id);

      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase
        .from("subscriptions")
        .insert({ ...subscription, created_at: now });

      if (error) throw new Error(error.message);
    }

    return { error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to activate free plan";
    return { error: message };
  }
}
