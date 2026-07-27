"use client";

import { Server, Lock, CreditCard, Cloud, Wrench } from "lucide-react";

import type { PopularCategory } from "@/data/dashboard";
import { HoverCard } from "@/components/motion/HoverCard";
import { cn } from "@/lib/utils";

interface PopularForgeKitsProps {
  categories: PopularCategory[];
}

const iconMap = {
  Server,
  Lock,
  CreditCard,
  Cloud,
  Wrench,
};

export function PopularForgeKits({ categories }: PopularForgeKitsProps) {
  return (
    <section
      className="rounded-2xl border border-border/60 bg-card p-5"
      aria-labelledby="popular-categories-title"
    >
      <div className="flex items-center justify-between">
        <h2
          id="popular-categories-title"
          className="text-base font-semibold text-foreground"
        >
          Popular Categories
        </h2>
        <a
          href="/explore"
          className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View all
        </a>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => {
          const Icon = iconMap[category.icon];

          return (
            <HoverCard key={category.id} scale={1.02} y={-2}>
              <a
                href="/explore"
                className="flex flex-col items-start rounded-xl border border-border/60 bg-background p-4 transition-colors hover:border-primary/30"
              >
                <Icon
                  className={cn("size-6", category.color)}
                  aria-hidden="true"
                />
                <p className="mt-3 text-sm font-medium text-foreground">
                  {category.name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {category.kitCount} kits
                </p>
              </a>
            </HoverCard>
          );
        })}
      </div>
    </section>
  );
}
