"use client";

import { exploreKits } from "@/data/forge-kits";
import { cn } from "@/lib/utils";

const fixedCategories = ["All", "Backend", "Authentication", "Payments", "Storage", "Utility"];

function countByCategory(category: string) {
  if (category === "All") return exploreKits.length;
  return exploreKits.filter((k) => k.category === category).length;
}

interface CategorySidebarProps {
  active?: string;
  onSelect?: (category: string) => void;
  className?: string;
}

export function CategorySidebar({
  active = "All",
  onSelect,
  className,
}: CategorySidebarProps) {
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
        {fixedCategories.map((category) => {
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
                <span className="text-xs text-muted-foreground">{countByCategory(category)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
