"use client";

import { Users, Package, Cloud, UserPlus } from "lucide-react";

import { workspaceStats } from "@/data/workspaces";
import { HoverCard } from "@/components/motion/HoverCard";
import { FadeInView } from "@/components/motion/FadeInView";
import { cn } from "@/lib/utils";

const iconMap = {
  Users,
  Package,
  Cloud,
  UserPlus,
};

export function WorkspaceStats() {
  return (
    <FadeInView direction="up" distance={16} duration={0.4}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {workspaceStats.map((stat) => {
          const Icon = iconMap[stat.icon as keyof typeof iconMap];
          return (
            <HoverCard scale={1.02} key={stat.id}>
              <div className="rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30">
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-xl",
                      stat.iconColor.replace("text-", "bg-").replace("-400", "-500/10"),
                      stat.iconColor
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {stat.subLabel}
                  </p>
                </div>
              </div>
            </HoverCard>
          );
        })}
      </div>
    </FadeInView>
  );
}
