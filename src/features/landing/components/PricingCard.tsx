"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { HoverCard } from "@/components/motion/HoverCard";
import { Badge } from "@/components/ui/badge";
import { MotionButton } from "@/components/motion/MotionButton";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/data/pricing";

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
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

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
        </div>

        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight text-foreground">
            {plan.price}
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
          <MotionButton className="w-full">
            <Link
              href={plan.href}
              className={cn(
                buttonVariants({
                  variant: plan.highlighted ? "default" : "outline",
                }),
                "w-full justify-center"
              )}
            >
              {plan.cta}
            </Link>
          </MotionButton>
        </div>
      </div>
    </HoverCard>
  );
}
