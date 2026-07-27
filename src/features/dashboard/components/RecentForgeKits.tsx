"use client";

import { Shield, CreditCard, Cloud, Lock, Mail, MoreHorizontal } from "lucide-react";

import type { RecentKit } from "@/data/dashboard";
import { HoverCard } from "@/components/motion/HoverCard";
import { cn } from "@/lib/utils";

interface RecentForgeKitsProps {
  kits: RecentKit[];
}

const iconMap = {
  Shield,
  CreditCard,
  Cloud,
  Lock,
  Mail,
};

export function RecentForgeKits({ kits }: RecentForgeKitsProps) {
  return (
    <section
      className="rounded-2xl border border-border/60 bg-card p-5"
      aria-labelledby="recent-kits-title"
    >
      <div className="flex items-center justify-between">
        <h2
          id="recent-kits-title"
          className="text-base font-semibold text-foreground"
        >
          Recent Kits
        </h2>
        <a
          href="/workspaces"
          className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View all
        </a>
      </div>

      <ul className="mt-5 space-y-1" aria-label="Recent kits list">
        {kits.map((kit) => {
          const Icon = iconMap[kit.icon];

          return (
            <li key={kit.id}>
              <HoverCard scale={1.01} y={-1}>
                <div className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted/40">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-xl",
                      kit.color
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {kit.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {kit.category}
                    </p>
                  </div>
                  <span className="hidden text-xs text-muted-foreground sm:inline">
                    {kit.timeAgo}
                  </span>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    aria-label={`${kit.title} actions`}
                  >
                    <MoreHorizontal className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </HoverCard>
            </li>
          );
        })}
      </ul>

      <a
        href="/workspaces"
        className="mt-4 inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        View all kits
        <span aria-hidden="true" className="ml-1">
          →
        </span>
      </a>
    </section>
  );
}
