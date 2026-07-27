"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import type { Workspace, WorkspaceStat, RecentKit } from "@/data/workspaces";
import { WorkspaceStats } from "./WorkspaceStats";
import { WorkspaceTabs } from "./WorkspaceTabs";
import { WorkspaceGrid } from "./WorkspaceGrid";
import { RecentActivity } from "./RecentActivity";
import { CreateWorkspaceDialog } from "./CreateWorkspaceDialog";

interface WorkspacesContentProps {
  workspaces: Workspace[];
  stats: WorkspaceStat[];
  recentActivity: RecentKit[];
}

export function WorkspacesContent({
  workspaces,
  stats,
  recentActivity,
}: WorkspacesContentProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All Workspaces");
  const [createOpen, setCreateOpen] = useState(false);

  const filteredWorkspaces = useMemo(() => {
    if (activeTab === "All Workspaces" || activeTab === "Owned by me") {
      return workspaces;
    }
    return [];
  }, [workspaces, activeTab]);

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              My Workspaces
            </h1>
            <p className="text-sm text-muted-foreground">
              Organize your projects with production-ready Forge Kits.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-lg">
              Import Workspace
            </Button>
            <Button
              className="rounded-lg"
              onClick={() => setCreateOpen(true)}
            >
              + Create Workspace
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <WorkspaceStats stats={stats} />
        </div>

        <div className="mt-6">
          <WorkspaceTabs active={activeTab} onSelect={setActiveTab} />
        </div>

        <div className="mt-6">
          <WorkspaceGrid
            workspaces={filteredWorkspaces}
            onCreateClick={() => setCreateOpen(true)}
          />
        </div>

        <div className="mt-6">
          <RecentActivity recentlyAddedKits={recentActivity} />
        </div>
      </div>

      <CreateWorkspaceDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={() => router.refresh()}
      />
    </div>
  );
}
