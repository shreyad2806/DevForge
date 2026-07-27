"use client";

import type { Workspace } from "@/data/workspaces";
import { WorkspaceCard } from "./WorkspaceCard";
import { CreateWorkspaceCard } from "./CreateWorkspaceCard";

interface WorkspaceGridProps {
  workspaces: Workspace[];
  onCreateClick?: () => void;
}

export function WorkspaceGrid({ workspaces, onCreateClick }: WorkspaceGridProps) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      aria-label="Workspaces grid"
    >
      {workspaces.map((workspace) => (
        <WorkspaceCard key={workspace.id} workspace={workspace} />
      ))}
      <CreateWorkspaceCard onClick={onCreateClick} />
    </div>
  );
}
