import type { SupabaseClient } from "@supabase/supabase-js";

export interface Subscription {
  id?: string;
  user_id: string;
  provider: string | null;
  provider_subscription_id: string | null;
  plan: string;
  status: string;
  price?: string | null;
  billing_cycle?: string | null;
  current_period_end?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

const DEFAULT_PLAN = "free";
const DEFAULT_STATUS = "inactive";

export function defaultSubscription(userId: string): Subscription {
  return {
    user_id: userId,
    provider: null,
    provider_subscription_id: null,
    plan: DEFAULT_PLAN,
    status: DEFAULT_STATUS,
    price: null,
    billing_cycle: null,
    current_period_end: null,
    created_at: null,
    updated_at: null,
  };
}

export async function getSubscription(
  client: SupabaseClient,
  userId: string
): Promise<Subscription> {
  if (!userId) {
    return defaultSubscription(userId ?? "anonymous");
  }

  const { data, error } = await client
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[subscription service] Failed to fetch subscription:", error.message);
    return defaultSubscription(userId);
  }

  if (!data) {
    return defaultSubscription(userId);
  }

  return data as unknown as Subscription;
}

export async function createSubscription(
  client: SupabaseClient,
  userId: string
): Promise<{ data: Subscription | null; error: Error | null }> {
  const subscription: Omit<Subscription, "id"> = {
    user_id: userId,
    provider: null,
    provider_subscription_id: null,
    plan: DEFAULT_PLAN,
    status: DEFAULT_STATUS,
    price: null,
    billing_cycle: null,
    current_period_end: null,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await client
    .from("subscriptions")
    .insert(subscription)
    .select()
    .single();

  if (error) {
    console.error("[subscription service] Failed to create subscription:", error.message);
    return { data: null, error: new Error(error.message) };
  }

  return { data: data as unknown as Subscription, error: null };
}

export async function updateSubscription(
  client: SupabaseClient,
  subscription: Partial<Subscription> & { user_id: string; provider_subscription_id: string | null }
): Promise<{ error: Error | null }> {
  const payload = {
    ...subscription,
    updated_at: subscription.updated_at ?? new Date().toISOString(),
  };

  const { error } = await client
    .from("subscriptions")
    .upsert(payload, { onConflict: "provider_subscription_id" });

  if (error) {
    console.error("[subscription service] Failed to update subscription:", error.message);
    return { error: new Error(error.message) };
  }

  return { error: null };
}

export async function isPro(client: SupabaseClient, userId: string): Promise<boolean> {
  const subscription = await getSubscription(client, userId);
  return subscription.plan === "pro" && !["canceled", "inactive"].includes(subscription.status);
}
