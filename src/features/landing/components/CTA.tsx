"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { FadeInView } from "@/components/motion/FadeInView";
import { MotionButton } from "@/components/motion/MotionButton";
import { cn } from "@/lib/utils";

function CodeCube({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("text-primary/20", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cubeGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Cube outline */}
      <path
        d="M100 20 180 60V140L100 180 20 140V60L100 20z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        fill="url(#cubeGradient)"
      />
      <path
        d="M20 60 100 100 180 60M100 100V180"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />

      {/* Code brackets */}
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fontSize="48"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fill="currentColor"
        fontWeight="600"
      >
        {"</>"}
      </text>

      {/* Glow dots */}
      <circle cx="160" cy="40" r="3" fill="currentColor" fillOpacity="0.6" />
      <circle cx="40" cy="160" r="3" fill="currentColor" fillOpacity="0.4" />
      <circle cx="170" cy="130" r="2" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

export function CTA({ className }: { className?: string }) {
  return (
    <section className={cn("w-full bg-background py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <FadeInView direction="up" distance={24}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/30 px-6 py-16 lg:px-16 lg:py-20">
            <div className="relative z-10 flex flex-col items-start gap-6 lg:max-w-xl">
              <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to ship faster?
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-primary-foreground/80">
                Join thousands of developers building better, faster with DevForge.
              </p>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <MotionButton className="inline-block" scale={1.03} y={-1}>
                  <Link
                    href="/signup"
                    className={cn(
                      buttonVariants({ size: "lg", variant: "secondary" }),
                      "inline-flex items-center gap-2"
                    )}
                  >
                    Start Building — it&apos;s free
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </MotionButton>

                <MotionButton className="inline-block" scale={1.03} y={-1}>
                  <Link
                    href="/explore"
                    className={cn(
                      buttonVariants({ size: "lg", variant: "outline" }),
                      "inline-flex border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                    )}
                  >
                    Explore Kits
                  </Link>
                </MotionButton>
              </div>
            </div>

            <CodeCube className="absolute right-0 top-1/2 hidden h-full w-auto -translate-y-1/2 translate-x-1/4 opacity-40 lg:block" />

            {/* Background glow */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-foreground/10 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary-foreground/5 blur-3xl"
              aria-hidden="true"
            />
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
