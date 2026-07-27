"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { getSubscription } from "@/services/subscription";
import { HoverCard } from "@/components/motion/HoverCard";
import { FadeInView } from "@/components/motion/FadeInView";

function formatDate(date?: string) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BillingCard() {
  const [plan, setPlan] = useState<string>("—");
  const [status, setStatus] = useState<string>("—");
  const [provider, setProvider] = useState<string>("—");
  const [renewalDate, setRenewalDate] = useState<string>("—");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const supabase = createClient();
      const { data: auth } = await supabase.auth.getUser();
      if (auth.user) {
        const sub = await getSubscription(supabase, auth.user.id);
        if (!cancelled) {
          setPlan(sub.plan ?? "free");
          setStatus(sub.status ?? "inactive");
          setProvider(sub.provider ?? "—");
          setRenewalDate(sub.current_period_end ? formatDate(sub.current_period_end) : "No active subscription");
        }
      }
      if (!cancelled) setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const displayPlan = plan === "free" ? "Free" : plan === "pro" ? "Pro" : plan;
  const displayStatus = status === "active" ? "Active" : status === "inactive" ? "Inactive" : status.charAt(0).toUpperCase() + status.slice(1);
  const displayProvider = provider === "polar" ? "Polar" : provider === "demo" ? "Demo" : provider;

  return (
    <FadeInView direction="up" distance={16} duration={0.4} delay={0.05}>
      <HoverCard scale={1.005} y={-2}>
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-primary" aria-hidden="true" />
            <h2 className="text-sm font-semibold text-foreground">Billing & Subscription</h2>
          </div>

          {loading ? (
            <div className="mt-4 space-y-3">
              <div className="h-3 w-32 animate-pulse rounded bg-muted" />
              <div className="h-3 w-48 animate-pulse rounded bg-muted" />
              <div className="h-3 w-40 animate-pulse rounded bg-muted" />
              <div className="h-3 w-28 animate-pulse rounded bg-muted" />
            </div>
          ) : (
            <dl className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <dt className="text-xs text-muted-foreground">Current Plan</dt>
                <dd className="text-sm font-medium text-foreground">{displayPlan}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-xs text-muted-foreground">Status</dt>
                <dd className="text-sm font-medium text-foreground">{displayStatus}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-xs text-muted-foreground">Billing Provider</dt>
                <dd className="text-sm font-medium text-foreground">{displayProvider}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-xs text-muted-foreground">Renewal Date</dt>
                <dd className="text-sm font-medium text-foreground">{renewalDate}</dd>
              </div>
            </dl>
          )}
        </div>
      </HoverCard>
    </FadeInView>
  );
}
