import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { QuickActions } from "@/features/dashboard/components/QuickActions";
import { StatsCards } from "@/features/dashboard/components/StatsCards";
import { RecentForgeKits } from "@/features/dashboard/components/RecentForgeKits";
import { PopularForgeKits } from "@/features/dashboard/components/PopularForgeKits";
import { WorkspaceCard } from "@/features/dashboard/components/WorkspaceCard";
import { ActivityFeed } from "@/features/dashboard/components/ActivityFeed";
import { FadeInView } from "@/components/motion/FadeInView";
import { fetchDashboardData } from "@/lib/data/dashboard";
import { createClient } from "@/lib/supabase/server";
import { isPro } from "@/services/subscription";

export default async function DashboardPage() {
  const { userName, stats, recentKits, popularCategories, workspaces, activityFeed } =
    await fetchDashboardData();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userIsPro = user ? await isPro(supabase, user.id) : false;

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
        <FadeInView direction="up" distance={16} duration={0.4}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <DashboardHeader
              name={userName}
              subtitle="Here's what's happening in your workspace today."
            />
            <QuickActions />
          </div>
        </FadeInView>

        <FadeInView direction="up" distance={16} duration={0.4} delay={0.05}>
          <StatsCards stats={stats} />
        </FadeInView>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <FadeInView
              direction="up"
              distance={16}
              duration={0.4}
              delay={0.1}
            >
              <RecentForgeKits kits={recentKits} />
            </FadeInView>
            <FadeInView
              direction="up"
              distance={16}
              duration={0.4}
              delay={0.15}
            >
              <PopularForgeKits categories={popularCategories} />
            </FadeInView>
          </div>

          <div className="flex flex-col gap-6">
            <FadeInView
              direction="up"
              distance={16}
              duration={0.4}
              delay={0.1}
            >
              <WorkspaceCard workspaces={workspaces} isPro={userIsPro} />
            </FadeInView>
            <FadeInView
              direction="up"
              distance={16}
              duration={0.4}
              delay={0.15}
            >
              <ActivityFeed items={activityFeed} />
            </FadeInView>
          </div>
        </div>
      </div>
    </div>
  );
}
