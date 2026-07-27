"use client";

import { cn } from "@/lib/utils";

const tabs = ["All Workspaces", "Owned by me", "Shared with me", "Archived"];

interface WorkspaceTabsProps {
  active?: string;
  onSelect?: (tab: string) => void;
  className?: string;
}

export function WorkspaceTabs({
  active = "All Workspaces",
  onSelect,
  className,
}: WorkspaceTabsProps) {
  return (
    <div className={cn("flex flex-wrap gap-1 border-b border-border/60", className)}>
      {tabs.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onSelect?.(tab)}
            className={cn(
              "relative px-4 py-2.5 text-sm font-medium transition-colors",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
            {isActive && (
              <span className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-primary" />
            )}
          </button>
        );
      })}
    </div>
  );
}
