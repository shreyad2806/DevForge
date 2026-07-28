"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Box, Zap, Users, Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HoverCard } from "@/components/motion/HoverCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { activateFreePlan } from "@/app/pricing/actions";
import type { PricingPlan } from "@/data/pricing";

const iconMap = {
  Box,
  Zap,
  Users,
};

interface PricingCardProps {
  plan: PricingPlan;
  isYearly?: boolean;
}

export function PricingCard({ plan, isYearly = false }: PricingCardProps) {
  const Icon = iconMap[plan.icon as keyof typeof iconMap];
  const price = isYearly ? plan.yearlyPrice : plan.price;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePlanCheckout = async (selectedPlan: PricingPlan) => {
    if (loading) return;

    if (selectedPlan.id === "team") {
      return;
    }

    setLoading(true);

    try {
      if (selectedPlan.id === "free") {
        const result = await activateFreePlan();

        if (result.error === "Unauthorized") {
          router.push("/signup");
          return;
        }

        if (result.error) {
          throw new Error(result.error);
        }

        router.push("/dashboard");
        return;
      }

      const response = await fetch("/api/polar/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await response.json();

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Checkout failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HoverCard className="h-full" scale={1.01} y={-4}>
      <div
        className={cn(
          "relative flex h-full flex-col rounded-2xl border p-6 lg:p-8",
          plan.highlighted
            ? "border-primary/40 bg-primary/10"
            : "border-border/60 bg-card"
        )}
      >
        {plan.highlighted && (
          <Badge
            variant="default"
            className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground"
          >
            Most Popular
          </Badge>
        )}

        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-xl",
              plan.highlighted
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground"
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
          </div>
        </div>

        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight text-foreground">
            {price}
          </span>
          <span className="text-sm text-muted-foreground">{plan.period}</span>
        </div>

        <ul className="mt-6 flex-1 space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <span
                className={cn(
                  "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                  plan.highlighted ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                )}
              >
                <Check className="size-2.5" aria-hidden="true" />
              </span>
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button
            variant={plan.highlighted ? "default" : "outline"}
            className="w-full justify-center rounded-lg"
            onClick={() => handlePlanCheckout(plan)}
            disabled={loading || plan.id === "team"}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
                Redirecting...
              </>
            ) : (
              plan.cta
            )}
          </Button>
        </div>
      </div>
    </HoverCard>
  );
}
