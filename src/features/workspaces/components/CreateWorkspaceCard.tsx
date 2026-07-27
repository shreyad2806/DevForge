"use client";

import { Plus } from "lucide-react";

import { HoverCard } from "@/components/motion/HoverCard";
import { Button } from "@/components/ui/button";

interface CreateWorkspaceCardProps {
  className?: string;
}

export function CreateWorkspaceCard({ className }: CreateWorkspaceCardProps) {
  return (
    <HoverCard scale={1.015} y={-3} className="h-full">
      <div
        className={
          "flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border/60 bg-card/50 p-6 text-center transition-colors hover:border-primary/30 " +
          className
        }
      >
        <div className="flex size-14 items-center justify-center rounded-full border border-border/60 bg-background">
          <Plus className="size-6 text-muted-foreground" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Create New Workspace
          </h3>
          <p className="text-xs text-muted-foreground">
            Start a new project by adding your favorite Forge Kits.
          </p>
        </div>
        <Button size="sm" className="rounded-lg">
          Create Workspace
        </Button>
      </div>
    </HoverCard>
  );
}
