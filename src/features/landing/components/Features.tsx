"use client";

import { features } from "@/data/features";
import { FadeInView } from "@/components/motion/FadeInView";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { FeatureCard } from "./FeatureCard";
import { cn } from "@/lib/utils";

export function Features({ className }: { className?: string }) {
  return (
    <section className={cn("w-full bg-muted/20 py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <FadeInView className="text-center" direction="up" distance={20}>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything you need to build better
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground">
            A complete toolkit designed to get your next project from zero to production in record time.
          </p>
        </FadeInView>

        <StaggerContainer
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.05}
        >
          {features.map((feature) => (
            <StaggerItem key={feature.id}>
              <FeatureCard feature={feature} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
