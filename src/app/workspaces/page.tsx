import { Button } from "@/components/ui/button";
import { FadeInView } from "@/components/motion/FadeInView";
import { WorkspaceStats } from "@/features/workspaces/components/WorkspaceStats";
import { WorkspaceTabs } from "@/features/workspaces/components/WorkspaceTabs";
import { WorkspaceGrid } from "@/features/workspaces/components/WorkspaceGrid";
import { RecentActivity } from "@/features/workspaces/components/RecentActivity";
import { workspaces } from "@/data/workspaces";

export default function WorkspacesPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <FadeInView direction="up" distance={16} duration={0.4}>
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
              <Button className="rounded-lg">+ Create Workspace</Button>
            </div>
          </div>
        </FadeInView>

        <div className="mt-6">
          <WorkspaceStats />
        </div>

        <div className="mt-6">
          <WorkspaceTabs />
        </div>

        <div className="mt-6">
          <WorkspaceGrid workspaces={workspaces} />
        </div>

        <div className="mt-6">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
