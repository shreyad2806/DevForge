"use client";

import { Search, Plus, Puzzle, Rocket, ArrowRight, ChevronDown } from "lucide-react";

import { howItWorksSteps } from "@/data/how-it-works";
import { FadeInView } from "@/components/motion/FadeInView";
import { HoverCard } from "@/components/motion/HoverCard";
import { cn } from "@/lib/utils";

const iconMap = {
  Search,
  Plus,
  Puzzle,
  Rocket,
};

const iconColors = [
  "bg-purple-500/10 text-purple-400",
  "bg-blue-500/10 text-blue-400",
  "bg-emerald-500/10 text-emerald-400",
  "bg-amber-500/10 text-amber-400",
];

interface StepProps {
  step: (typeof howItWorksSteps)[number];
  index: number;
}

function Step({ step, index }: StepProps) {
  const Icon = iconMap[step.id as keyof typeof iconMap] ?? Search;
  const colorClass = iconColors[index % iconColors.length];

  return (
    <HoverCard className="relative flex-1" scale={1.01} y={-4}>
      <div className="flex h-full flex-col items-center rounded-2xl border border-border/60 bg-card p-6 text-center">
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-2xl",
            colorClass
          )}
        >
          <Icon className="size-6" aria-hidden="true" />
        </div>
        <h3 className="mt-5 text-base font-semibold text-foreground">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>

      {/* Arrow connector */}
      {index < howItWorksSteps.length - 1 && (
        <>
          <ArrowRight
            className="absolute top-1/2 -right-6 hidden size-4 -translate-y-1/2 text-border lg:block"
            aria-hidden="true"
          />
          <ChevronDown
            className="absolute -bottom-6 left-1/2 size-4 -translate-x-1/2 text-border lg:hidden"
            aria-hidden="true"
          />
        </>
      )}
    </HoverCard>
  );
}

export function HowItWorks({ className }: { className?: string }) {
  return (
    <section className={cn("w-full bg-background py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <FadeInView className="text-center" direction="up" distance={20}>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            How DevForge Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted-foreground">
            From discovery to deployment in four simple steps.
          </p>
        </FadeInView>

        <div className="relative mt-14 grid gap-8 lg:grid-cols-4 lg:gap-4">
          {howItWorksSteps.map((step, index) => (
            <FadeInView key={step.id} direction="up" distance={24} delay={index * 0.08}>
              <Step step={step} index={index} />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
