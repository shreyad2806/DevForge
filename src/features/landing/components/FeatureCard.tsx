"use client";

import {
  CheckCircle,
  Lock,
  Sparkles,
  RefreshCw,
  FolderTree,
  Code,
  ClipboardCheck,
  Zap,
} from "lucide-react";

import { HoverCard } from "@/components/motion/HoverCard";
import type { Feature } from "@/data/features";
import { cn } from "@/lib/utils";

const iconMap = {
  CheckCircle,
  Lock,
  Sparkles,
  RefreshCw,
  FolderTree,
  Code,
  ClipboardCheck,
  Zap,
};

const iconColor: Record<Feature["icon"], string> = {
  CheckCircle: "bg-emerald-500/10 text-emerald-400",
  Lock: "bg-amber-500/10 text-amber-400",
  Sparkles: "bg-purple-500/10 text-purple-400",
  RefreshCw: "bg-blue-500/10 text-blue-400",
  FolderTree: "bg-pink-500/10 text-pink-400",
  Code: "bg-cyan-500/10 text-cyan-400",
  ClipboardCheck: "bg-lime-500/10 text-lime-400",
  Zap: "bg-orange-500/10 text-orange-400",
};

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = iconMap[feature.icon];

  return (
    <HoverCard className="h-full" scale={1.01} y={-4}>
      <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/30">
        <div
          className={cn(
            "mb-4 flex size-10 items-center justify-center rounded-xl",
            iconColor[feature.icon]
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </HoverCard>
  );
}
