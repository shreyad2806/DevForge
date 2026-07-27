"use client";

import { useMemo } from "react";

import type { ForgeKit } from "@/data/forge-kits";
import { cn } from "@/lib/utils";

function countByCategory(category: string, kits: ForgeKit[]) {
  if (category === "All") return kits.length;
  return kits.filter((k) => k.category === category).length;
}

interface CategorySidebarProps {
  kits: ForgeKit[];
  active?: string;
  onSelect?: (category: string) => void;
  className?: string;
}

export function CategorySidebar({
  kits,
  active = "All",
  onSelect,
  className,
}: CategorySidebarProps) {
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(kits.map((k) => k.category))).sort(),
    ],
    [kits]
  );
  return (
    <nav
      className={cn(
        "rounded-2xl border border-border/60 bg-card p-4",
        className
      )}
      aria-label="Categories"
    >
      <h2 className="px-2 text-sm font-semibold text-foreground">Categories</h2>
      <ul className="mt-3 space-y-1">
        {categories.map((category) => {
          const isActive = active === category;
          return (
            <li key={category}>
              <button
                type="button"
                onClick={() => onSelect?.(category)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
                aria-current={isActive ? "true" : undefined}
              >
                <span>{category}</span>
                <span className="text-xs text-muted-foreground">{countByCategory(category, kits)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
