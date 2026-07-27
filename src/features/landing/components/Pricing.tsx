"use client";

import { pricingPlans } from "@/data/pricing";
import { FadeInView } from "@/components/motion/FadeInView";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { PricingCard } from "./PricingCard";
import { cn } from "@/lib/utils";

export function Pricing({ className }: { className?: string }) {
  return (
    <section className={cn("w-full bg-background py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <FadeInView className="text-center" direction="up" distance={20}>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </FadeInView>

        <StaggerContainer
          className="mt-14 grid gap-6 md:grid-cols-3"
          staggerDelay={0.08}
        >
          {pricingPlans.map((plan) => (
            <StaggerItem key={plan.id}>
              <PricingCard plan={plan} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
