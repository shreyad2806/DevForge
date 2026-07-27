"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FadeInView } from "@/components/motion/FadeInView";
import { createClient } from "@/lib/supabase/client";
import { getSubscription } from "@/services/subscription";

function formatDate(date?: string) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PlanSummary() {
  const router = useRouter();
  const [plan, setPlan] = useState<string>("");
  const [status, setStatus] = useState<string>("");
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
          setRenewalDate(formatDate(sub.current_period_end ?? undefined));
        }
      }
      if (!cancelled) setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const rows = [
    { label: "Current Plan", value: plan },
    { label: "Status", value: status, status: true },
    { label: "Billing Provider", value: provider },
    { label: "Renewal Date", value: renewalDate },
  ];

  return (
    <FadeInView direction="up" distance={16} duration={0.4} delay={0.05}>
      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Plan Summary</h2>

        {loading && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 animate-pulse rounded bg-muted" />
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-3 w-20 animate-pulse rounded bg-muted" />
              <div className="h-3 w-20 animate-pulse rounded bg-muted" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-3 w-28 animate-pulse rounded bg-muted" />
              <div className="h-3 w-14 animate-pulse rounded bg-muted" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 animate-pulse rounded bg-muted" />
              <div className="h-3 w-20 animate-pulse rounded bg-muted" />
            </div>
          </div>
        )}

        {!loading && (
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
        )}

        <Button
          className="mt-5 w-full rounded-lg"
          onClick={() => {
            if (plan === "free") router.push("/pricing");
          }}
        >
          {plan === "free" ? "Upgrade" : "Manage Subscription"}
        </Button>
      </div>
    </FadeInView>
  );
}
