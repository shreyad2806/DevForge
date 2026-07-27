"use client";

import { ChevronRight, Plus } from "lucide-react";

import type { Workspace } from "@/data/dashboard";
import { HoverCard } from "@/components/motion/HoverCard";
import { cn } from "@/lib/utils";

interface WorkspaceCardProps {
  workspaces: Workspace[];
}

export function WorkspaceCard({ workspaces }: WorkspaceCardProps) {
  return (
    <section
      className="rounded-2xl border border-border/60 bg-card p-5"
      aria-labelledby="workspaces-title"
    >
      <div className="flex items-center justify-between">
        <h2
          id="workspaces-title"
          className="text-base font-semibold text-foreground"
        >
          Workspace Overview
        </h2>
        <a
          href="/workspaces"
          className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View all
        </a>
      </div>

      <ul className="mt-5 space-y-2" aria-label="Workspaces list">
        {workspaces.length === 0 && (
          <li className="text-sm text-muted-foreground">
            No workspaces yet. Create one to get started.
          </li>
        )}
        {workspaces.map((workspace) => (
          <li key={workspace.id}>
            <HoverCard scale={1.01} y={-1}>
              <a
                href="/workspaces"
                className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-muted/40"
              >
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl text-sm font-semibold",
                    workspace.color
                  )}
                >
                  {workspace.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                    {workspace.name}
                    {workspace.current && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        Current
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {workspace.kitCount} kits · {workspace.createdAt}
                  </p>
                </div>
                <ChevronRight
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </a>
            </HoverCard>
          </li>
        ))}
      </ul>

      <a
        href="/workspaces"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border/80 bg-transparent py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
      >
        <Plus className="size-4" aria-hidden="true" />
        Create New Workspace
      </a>
    </section>
  );
}
