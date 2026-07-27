"use client";

import { cn } from "@/lib/utils";

const filters = ["All Kits", "Premium", "Popular", "Free"];

interface FiltersProps {
  active?: string;
  onSelect?: (filter: string) => void;
  className?: string;
}

export function Filters({ active = "All Kits", onSelect, className }: FiltersProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {filters.map((filter) => {
        const isActive = active === filter;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onSelect?.(filter)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              isActive
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
            )}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
