"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FadeInView } from "@/components/motion/FadeInView";
import { CurrentPlanCard } from "@/features/billing/components/CurrentPlanCard";

export default function BillingPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success("Subscription activated successfully.");
    }
  }, [searchParams]);

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <FadeInView direction="up" distance={16} duration={0.4}>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Billing & Subscription
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your subscription and billing details.
            </p>
          </div>
        </FadeInView>

        <div className="mt-6">
          <CurrentPlanCard />
        </div>
      </div>
    </div>
  );
}
