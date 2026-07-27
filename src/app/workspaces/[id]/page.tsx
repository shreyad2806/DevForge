import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { fetchExploreKits } from "@/lib/data/forge-kits";
import { fetchWorkspaceDetail } from "@/lib/data/workspaces";
import { WorkspaceDetail } from "@/features/workspaces/components/WorkspaceDetail";

interface WorkspaceDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkspaceDetailPage({
  params,
}: WorkspaceDetailPageProps) {
  const { id } = await params;
  const result = await fetchWorkspaceDetail(id);

  if (!result) {
    notFound();
  }

  const { workspace, kits } = result;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const allKits = await fetchExploreKits();

  return (
    <main className="min-h-screen bg-background p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <Link
          href="/workspaces"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Workspaces
        </Link>

        <WorkspaceDetail
          workspace={workspace}
          kits={kits}
          allKits={allKits}
          userId={user.id}
        />
      </div>
    </main>
  );
}
