import { WorkspacesContent } from "@/features/workspaces/components/WorkspacesContent";
import {
  fetchWorkspacesForUser,
  fetchWorkspaceStats,
  fetchRecentActivity,
} from "@/lib/data/workspaces";

export default async function WorkspacesPage() {
  const [workspaces, stats, recentActivity] = await Promise.all([
    fetchWorkspacesForUser(),
    fetchWorkspaceStats(),
    fetchRecentActivity(),
  ]);

  return (
    <WorkspacesContent
      workspaces={workspaces}
      stats={stats}
      recentActivity={recentActivity}
    />
  );
}
