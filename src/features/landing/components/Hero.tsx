"use client";

import Link from "next/link";
import { ArrowRight, Users, Layers, GitBranch } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/FadeIn";
import { FadeInView } from "@/components/motion/FadeInView";
import { MotionButton } from "@/components/motion/MotionButton";
import { CodePreview } from "./CodePreview";
import { cn } from "@/lib/utils";

const stats = [
  { label: "12,000+\nDevelopers", icon: Users },
  { label: "150+\nForge Kits", icon: Layers },
  { label: "20+\nContributors", icon: GitBranch },
];

export function Hero({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/40 bg-background pt-20 pb-24 lg:pt-28 lg:pb-32",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 gradient-subtle" aria-hidden="true" />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div className="flex flex-col items-start">
            <FadeIn direction="up" distance={20}>
              <span className="mb-6 inline-flex items-center rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                Production-ready Forge Kits for Developers
              </span>
            </FadeIn>

            <FadeIn direction="up" distance={24} delay={0.05}>
              <h1 className="max-w-xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Ship faster with{" "}
                <span className="text-primary">production-ready</span> Forge Kits
              </h1>
            </FadeIn>

            <FadeIn direction="up" distance={24} delay={0.1}>
              <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-muted-foreground">
                DevForge provides battle-tested, secure and scalable building blocks for your
                next project. Ship, stop reinventing. Start building.
              </p>
            </FadeIn>

            <FadeIn direction="up" distance={24} delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <MotionButton>
                  <Link
                    href="/signup"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "inline-flex items-center gap-2"
                    )}
                  >
                    Start Building — it&apos;s free
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </MotionButton>
                <MotionButton>
                  <Link
                    href="/explore"
                    className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}
                  >
                    Explore Kits
                  </Link>
                </MotionButton>
              </div>
            </FadeIn>

            <FadeIn direction="up" distance={24} delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-6 sm:gap-10">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  const [top, bottom] = stat.label.split("\n");

                  return (
                    <div key={stat.label} className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-muted text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-base font-semibold leading-tight text-foreground">
                          {top}
                        </div>
                        <div className="text-sm text-muted-foreground">{bottom}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>

          {/* Right */}
          <FadeInView direction="up" distance={32} delay={0.15}>
            <CodePreview />
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
