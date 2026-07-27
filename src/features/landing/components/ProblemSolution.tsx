"use client";

import { X, Check } from "lucide-react";

import { problemSolution } from "@/data/problem-solution";
import { FadeInView } from "@/components/motion/FadeInView";
import { HoverCard } from "@/components/motion/HoverCard";
import { cn } from "@/lib/utils";

function ProblemIllustration() {
  return (
    <div className="relative flex h-full min-h-[140px] w-full items-center justify-center rounded-lg border border-red-500/15 bg-muted/40 p-4">
      <div className="w-full max-w-[180px] space-y-2 rounded-md border border-red-500/20 bg-background p-3 shadow-sm">
        <div className="h-1.5 w-3/4 rounded bg-red-500/20" />
        <div className="h-1.5 w-1/2 rounded bg-red-500/20" />
        <div className="h-1.5 w-5/6 rounded bg-red-500/20" />
      </div>
      <div className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-red-500/10 text-red-500">
        <X className="size-4" aria-hidden="true" />
      </div>
    </div>
  );
}

function SolutionIllustration() {
  return (
    <div className="relative flex h-full min-h-[140px] w-full items-center justify-center rounded-lg border border-green-500/15 bg-muted/40 p-4">
      <div className="w-full max-w-[180px] space-y-2 rounded-md border border-green-500/20 bg-background p-3 shadow-sm">
        <div className="h-1.5 w-3/4 rounded bg-green-500/20" />
        <div className="h-1.5 w-1/2 rounded bg-green-500/20" />
        <div className="h-1.5 w-5/6 rounded bg-green-500/20" />
      </div>
      <div className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-green-500/10 text-green-500">
        <Check className="size-4" aria-hidden="true" />
      </div>
    </div>
  );
}

interface PointCardProps {
  title: string;
  description: string;
  points: { text: string }[];
  variant: "problem" | "solution";
}

function PointCard({ title, description, points, variant }: PointCardProps) {
  const isProblem = variant === "problem";
  const Icon = isProblem ? X : Check;
  const accentClass = isProblem ? "text-red-500" : "text-green-500";
  const borderClass = isProblem ? "border-red-500/20" : "border-green-500/20";
  const bgClass = isProblem ? "bg-red-500/10" : "bg-green-500/10";

  return (
    <HoverCard scale={1.01} y={-4} className="h-full">
      <div
        className={cn(
          "flex h-full flex-col gap-5 rounded-2xl border bg-card p-6 lg:p-8",
          borderClass
        )}
      >
        <div className="flex flex-1 flex-col justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          <ul className="space-y-3">
            {points.map((point, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                    bgClass,
                    accentClass
                  )}
                >
                  <Icon className="size-3" aria-hidden="true" />
                </span>
                <span className="text-muted-foreground">{point.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {isProblem ? <ProblemIllustration /> : <SolutionIllustration />}
      </div>
    </HoverCard>
  );
}

export function ProblemSolution({ className }: { className?: string }) {
  return (
    <section className={cn("w-full bg-background py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <FadeInView className="text-center" direction="up" distance={20}>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Why DevForge?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground">
            Stop rebuilding the basics. Focus on the features that make your product unique.
          </p>
        </FadeInView>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <FadeInView direction="up" distance={24} delay={0.05}>
            <PointCard
              title={problemSolution.problemTitle}
              description={problemSolution.problemDescription}
              points={problemSolution.problemPoints}
              variant="problem"
            />
          </FadeInView>
          <FadeInView direction="up" distance={24} delay={0.1}>
            <PointCard
              title={problemSolution.solutionTitle}
              description={problemSolution.solutionDescription}
              points={problemSolution.solutionPoints}
              variant="solution"
            />
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
