"use client";

import { useEffect, useState } from "react";

import { billingSummary } from "@/data/invoices";
import { Button } from "@/components/ui/button";
import { FadeInView } from "@/components/motion/FadeInView";
import { createClient } from "@/lib/supabase/client";

function formatDate(date?: string) {
  if (!date) return billingSummary.nextBillingDate;
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PlanSummary() {
  const [plan, setPlan] = useState(billingSummary.plan);
  const [status, setStatus] = useState(billingSummary.status);
  const [price, setPrice] = useState(`${billingSummary.price} / month`);
  const [cycle, setCycle] = useState(billingSummary.billingCycle);
  const [nextDate, setNextDate] = useState(billingSummary.nextBillingDate);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const supabase = createClient();
      const { data: auth } = await supabase.auth.getUser();
      if (auth.user) {
        const { data } = await supabase
          .from("subscriptions")
          .select("plan, status, price, billing_cycle, current_period_end")
          .eq("user_id", auth.user.id)
          .maybeSingle();

        if (data && !cancelled) {
          if (data.plan) setPlan(String(data.plan));
          if (data.status) setStatus(String(data.status) as "Active" | "Inactive");
          if (data.price) setPrice(String(data.price));
          if (data.billing_cycle) setCycle(String(data.billing_cycle));
          if (data.current_period_end) setNextDate(formatDate(String(data.current_period_end)));
        }
      }
      if (!cancelled) setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const rows = [
    { label: "Plan", value: plan },
    { label: "Status", value: status, status: true },
    { label: "Price", value: price },
    { label: "Billing Cycle", value: cycle },
    { label: "Next Billing Date", value: nextDate },
  ];

  return (
    <FadeInView direction="up" distance={16} duration={0.4} delay={0.05}>
      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Plan Summary</h2>

        {loading && (
          <p className="mt-3 text-xs text-muted-foreground">Loading subscription...</p>
        )}

        <dl className="mt-4 space-y-3">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <dt className="text-xs text-muted-foreground">{row.label}</dt>
              <dd className="text-sm font-medium text-foreground">
                {row.status ? (
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                    {row.value}
                  </span>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <Button className="mt-5 w-full rounded-lg">Change Plan</Button>
      </div>
    </FadeInView>
  );
}
