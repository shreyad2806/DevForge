"use client";

import { billingSummary } from "@/data/invoices";
import { Button } from "@/components/ui/button";
import { FadeInView } from "@/components/motion/FadeInView";

export function PlanSummary() {
  const rows = [
    { label: "Plan", value: billingSummary.plan },
    { label: "Status", value: billingSummary.status, status: true },
    { label: "Price", value: `${billingSummary.price} / month` },
    { label: "Billing Cycle", value: billingSummary.billingCycle },
    { label: "Next Billing Date", value: billingSummary.nextBillingDate },
  ];

  return (
    <FadeInView direction="up" distance={16} duration={0.4} delay={0.05}>
      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Plan Summary</h2>

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
