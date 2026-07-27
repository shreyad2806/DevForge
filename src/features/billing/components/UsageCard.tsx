"use client";

import { Bot, Box, Folder, Cloud } from "lucide-react";

import { usageItems } from "@/data/invoices";
import { HoverCard } from "@/components/motion/HoverCard";
import { FadeInView } from "@/components/motion/FadeInView";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const iconMap = {
  Bot,
  Box,
  Folder,
  Cloud,
};

export function UsageCard() {
  return (
    <FadeInView direction="up" distance={16} duration={0.4} delay={0.05}>
      <HoverCard scale={1.005} y={-2}>
        <div className="rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Usage This Month</h2>
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-medium text-primary transition-opacity hover:opacity-80"
            >
              View all usage
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {usageItems.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              return (
                <div key={item.id}>
                  <div className="flex items-center gap-2">
                    <Icon className={cn("size-4", item.iconColor)} aria-hidden="true" />
                    <span className="text-xs text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-lg font-semibold text-foreground">
                      {item.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      / {item.limit}
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full bg-primary transition-all",
                        `w-[${item.percent}%]`
                      )}
                    />
                  </div>
                  {item.percent > 0 && (
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {item.percent}%
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </HoverCard>
    </FadeInView>
  );
}
