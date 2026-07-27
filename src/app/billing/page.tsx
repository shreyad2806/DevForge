"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInView } from "@/components/motion/FadeInView";
import { CurrentPlanCard } from "@/features/billing/components/CurrentPlanCard";
import { UsageCard } from "@/features/billing/components/UsageCard";
import { BillingActions } from "@/features/billing/components/BillingActions";
import { PlanSummary } from "@/features/billing/components/PlanSummary";
import { InvoiceHistory } from "@/features/billing/components/InvoiceHistory";

const tabs = ["Overview", "Payment Methods", "Invoices", "Usage", "Plans"];

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <FadeInView direction="up" distance={16} duration={0.4}>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Billing & Subscription
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your subscription, payment methods and invoices.
            </p>
          </div>
        </FadeInView>

        <div className="mt-6 flex flex-wrap gap-1 border-b border-border/60">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
                {isActive && (
                  <span className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <CurrentPlanCard />
            <UsageCard />

            <FadeInView direction="up" distance={16} duration={0.4} delay={0.1}>
              <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-purple-500/10 p-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Percent className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Need more?
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Upgrade to Team plan for advanced collaboration and higher limits.
                    </p>
                  </div>
                </div>
                <Button className="rounded-lg">View Team Plan</Button>
              </div>
            </FadeInView>

            <BillingActions />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-1">
            <PlanSummary />
            <InvoiceHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
