"use client";

import { Zap } from "lucide-react";

import { billingSummary } from "@/data/invoices";
import { Button } from "@/components/ui/button";
import { HoverCard } from "@/components/motion/HoverCard";
import { FadeInView } from "@/components/motion/FadeInView";

export function CurrentPlanCard() {
  return (
    <FadeInView direction="up" distance={16} duration={0.4}>
      <HoverCard scale={1.005} y={-2}>
        <div className="rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30">
          <h2 className="text-sm font-semibold text-foreground">Current Plan</h2>

          <div className="mt-4 flex items-start gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Zap className="size-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {billingSummary.plan}
                </h3>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  {billingSummary.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {billingSummary.description}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {billingSummary.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/60 bg-background px-2.5 py-1 text-[10px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">
              {billingSummary.price}
            </span>
            <span className="text-sm text-muted-foreground">/ month</span>
          </div>
          <p className="text-xs text-muted-foreground">Billed monthly</p>

          <div className="mt-5 grid gap-4 border-t border-border/40 pt-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground">Current Period</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {billingSummary.currentPeriodStart} - {billingSummary.currentPeriodEnd}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {billingSummary.daysLeft} days left
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Next Billing</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {billingSummary.nextBillingDate}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {billingSummary.totalDue}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Payment Method</p>
              <p className="mt-1 flex items-center gap-1 text-sm font-medium text-foreground">
                <span className="rounded bg-background px-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {billingSummary.paymentMethod}
                </span>
                **** {billingSummary.paymentLastFour}
              </p>
              <button
                type="button"
                className="mt-0.5 text-xs text-primary transition-opacity hover:opacity-80"
              >
                Update
              </button>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Billing Email</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {billingSummary.billingEmail}
              </p>
              <button
                type="button"
                className="mt-0.5 text-xs text-primary transition-opacity hover:opacity-80"
              >
                Update
              </button>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <Button variant="outline" className="rounded-lg">
              Manage Plan
            </Button>
          </div>
        </div>
      </HoverCard>
    </FadeInView>
  );
}
