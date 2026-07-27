"use client";

import { Box, Download, Briefcase, Star, TrendingUp, TrendingDown, Minus } from "lucide-react";

import type { DashboardStat } from "@/data/dashboard";
import { HoverCard } from "@/components/motion/HoverCard";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  stats: DashboardStat[];
}

const iconMap = {
  Box,
  Download,
  Briefcase,
  Star,
};

const trendIconMap = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

const trendColorMap = {
  up: "text-emerald-400",
  down: "text-red-400",
  neutral: "text-muted-foreground",
};

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon];
        const TrendIcon = trendIconMap[stat.trend];

        return (
          <HoverCard key={stat.id} className="h-full" scale={1.01} y={-2}>
            <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30">
              <div
                className={cn(
                  "mb-4 flex size-10 items-center justify-center rounded-xl",
                  stat.color
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="mt-3 flex items-center gap-1.5 text-xs">
                <TrendIcon
                  className={cn("size-3.5", trendColorMap[stat.trend])}
                  aria-hidden="true"
                />
                <span className={cn("font-medium", trendColorMap[stat.trend])}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">{stat.subLabel}</span>
              </div>
            </div>
          </HoverCard>
        );
      })}
    </div>
  );
}
