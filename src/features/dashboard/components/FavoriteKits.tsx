"use client";

import {
  Shield,
  CreditCard,
  Cloud,
  Lock,
  Mail,
  MoreHorizontal,
} from "lucide-react";

import { HoverCard } from "@/components/motion/HoverCard";
import { cn } from "@/lib/utils";

const iconMap = {
  Shield,
  CreditCard,
  Cloud,
  Lock,
  Mail,
};

export interface FavoriteKitItem {
  id: string;
  title: string;
  category: string;
  icon: keyof typeof iconMap;
  color: string;
}

interface FavoriteKitsProps {
  title?: string;
  kits: FavoriteKitItem[];
  viewAllHref?: string;
}

export function FavoriteKits({
  title = "Favorite Kits",
  kits,
  viewAllHref = "/explore",
}: FavoriteKitsProps) {
  return (
    <section
      className="rounded-2xl border border-border/60 bg-card p-5"
      aria-labelledby="favorite-kits-title"
    >
      <div className="flex items-center justify-between">
        <h2
          id="favorite-kits-title"
          className="text-base font-semibold text-foreground"
        >
          {title}
        </h2>
        <a
          href={viewAllHref}
          className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View all
        </a>
      </div>

      <ul className="mt-5 space-y-1" aria-label="Favorite kits list">
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
                    <p className="truncate text-sm font-medium text-foreground">
                      {kit.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {kit.category}
                    </p>
                  </div>
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
    </section>
  );
}
