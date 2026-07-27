"use client";

import {
  Shield,
  CreditCard,
  Upload,
  Lock,
  Mail,
  Box,
  ArrowRight,
} from "lucide-react";

import type { RecentKit } from "@/data/workspaces";
import { HoverCard } from "@/components/motion/HoverCard";
import { FadeInView } from "@/components/motion/FadeInView";
import { cn } from "@/lib/utils";

const iconMap = {
  Shield,
  CreditCard,
  Upload,
  Lock,
  Mail,
  Box,
};

interface RecentActivityProps {
  className?: string;
  recentlyAddedKits: RecentKit[];
}

export function RecentActivity({ className, recentlyAddedKits }: RecentActivityProps) {
  return (
    <FadeInView
      direction="up"
      distance={16}
      duration={0.4}
      delay={0.1}
      className={className}
    >
      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Recently Added Kits
            </h3>
            <p className="text-xs text-muted-foreground">
              Kits you&apos;ve added to workspaces recently
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-xs font-medium text-primary transition-opacity hover:opacity-80"
          >
            View all activity
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>

        <ul className="mt-4 space-y-3">
          {recentlyAddedKits.map((kit) => {
            const Icon = iconMap[kit.icon as keyof typeof iconMap] ?? Box;
            return (
              <HoverCard key={kit.id} y={-1}>
                <li className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent/50">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-lg bg-background",
                      kit.iconColor
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {kit.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Added to {kit.workspace}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {kit.addedAgo}
                  </span>
                </li>
              </HoverCard>
            );
          })}
        </ul>
      </div>
    </FadeInView>
  );
}
