"use client";

import { Download, Star, Box } from "lucide-react";

import { activityFeed } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const iconMap = {
  Download,
  Star,
  Box,
};

export function ActivityFeed() {
  return (
    <section
      className="rounded-2xl border border-border/60 bg-card p-5"
      aria-labelledby="activity-title"
    >
      <div className="flex items-center justify-between">
        <h2
          id="activity-title"
          className="text-base font-semibold text-foreground"
        >
          Activity Feed
        </h2>
        <a
          href="/activity"
          className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View all
        </a>
      </div>

      <ul className="mt-5 space-y-4" aria-label="Activity feed list">
        {activityFeed.map((item) => {
          const Icon = iconMap[item.icon];

          return (
            <li key={item.id} className="flex items-start gap-3">
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg",
                  item.color
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed text-foreground">
                  {item.text}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.timeAgo}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
