import { createClient } from "@/lib/supabase/server";
import { fetchExploreKits } from "@/lib/data/forge-kits";
import type {
  DashboardStat,
  RecentKit,
  PopularCategory,
  Workspace,
  ActivityItem,
} from "@/data/dashboard";

function relativeTime(date: string | Date) {
  const now = new Date().getTime();
  const d = new Date(date).getTime();
  const seconds = Math.max(0, Math.floor((now - d) / 1000));
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "Just now";
}

function formatNumber(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
}

const categoryRecentIcon: Record<string, RecentKit["icon"]> = {
  Backend: "Shield",
  Authentication: "Lock",
  Payments: "CreditCard",
  Storage: "Cloud",
  Utility: "Mail",
  Security: "Shield",
};

const categoryRecentColor: Record<string, string> = {
  Backend: "bg-purple-500/10 text-purple-400",
  Authentication: "bg-amber-500/10 text-amber-400",
  Payments: "bg-blue-500/10 text-blue-400",
  Storage: "bg-emerald-500/10 text-emerald-400",
  Utility: "bg-pink-500/10 text-pink-400",
  Security: "bg-red-500/10 text-red-400",
};

const categoryPopularIcon: Record<string, PopularCategory["icon"]> = {
  Backend: "Server",
  Authentication: "Lock",
  Payments: "CreditCard",
  Storage: "Cloud",
  Utility: "Wrench",
  Security: "Lock",
};

const categoryPopularColor: Record<string, string> = {
  Backend: "text-purple-400",
  Authentication: "text-green-400",
  Payments: "text-blue-400",
  Storage: "text-orange-400",
  Utility: "text-yellow-400",
  Security: "text-red-400",
};

export interface DashboardData {
  userName: string;
  stats: DashboardStat[];
  recentKits: RecentKit[];
  popularCategories: PopularCategory[];
  workspaces: Workspace[];
  activityFeed: ActivityItem[];
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const supabase = await createClient();

  let userName = "User";
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userName =
      (user?.user_metadata?.name as string | undefined) ??
      user?.email?.split("@")[0] ??
      "User";
  } catch {
    // ignore
  }

  let allKits: Awaited<ReturnType<typeof fetchExploreKits>> = [];
  try {
    allKits = await fetchExploreKits();
  } catch {
    allKits = [];
  }

  const totalKits = allKits.length;
  const totalDownloads = allKits.reduce((sum, kit) => {
    const parsed = Number(kit.downloads);
    return sum + (Number.isNaN(parsed) ? 0 : parsed);
  }, 0);
  const favoritesCount = allKits.filter((kit) => kit.isFavorite).length;

  let workspacesCount = 0;
  let workspaces: Workspace[] = [];
  try {
    const { data: workspaceRows, error } = await supabase
      .from("workspaces")
      .select("id, name, initial, color, kit_count, current");

    if (!error && workspaceRows) {
      workspaces = workspaceRows.map((row: Record<string, unknown>) => {
        const name = String(row.name ?? "Workspace");
        return {
          id: String(row.id),
          name,
          initial: String(row.initial ?? name[0] ?? "W"),
          color: String(row.color ?? "bg-primary text-primary-foreground"),
          kitCount: Number(row.kit_count ?? 0),
          current: Boolean(row.current),
        };
      });
      workspacesCount = workspaces.length;
    }
  } catch {
    // leave empty
  }

  const stats: DashboardStat[] = [
    {
      id: "total-kits",
      label: "Total Kits",
      value: formatNumber(totalKits),
      subLabel: "from last month",
      change: "+0%",
      trend: "neutral",
      icon: "Box",
      color: "bg-purple-500/10 text-purple-400",
    },
    {
      id: "downloads",
      label: "Downloads",
      value: formatNumber(totalDownloads),
      subLabel: "from last month",
      change: "+0%",
      trend: "neutral",
      icon: "Download",
      color: "bg-blue-500/10 text-blue-400",
    },
    {
      id: "workspaces",
      label: "Workspaces",
      value: formatNumber(workspacesCount),
      subLabel: "No change",
      change: "0",
      trend: "neutral",
      icon: "Briefcase",
      color: "bg-emerald-500/10 text-emerald-400",
    },
    {
      id: "favorites",
      label: "Favorites",
      value: formatNumber(favoritesCount),
      subLabel: "from last month",
      change: "+0%",
      trend: "neutral",
      icon: "Star",
      color: "bg-orange-500/10 text-orange-400",
    },
  ];

  const recentKits: RecentKit[] = allKits
    .slice()
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 5)
    .map((kit) => ({
      id: kit.id,
      title: kit.title,
      category: kit.category,
      timeAgo: kit.createdAt ? relativeTime(kit.createdAt) : "Recently",
      icon: categoryRecentIcon[kit.category] ?? "Shield",
      color: categoryRecentColor[kit.category] ?? "bg-purple-500/10 text-purple-400",
    }));

  const categoryCounts = allKits.reduce<Record<string, number>>((acc, kit) => {
    acc[kit.category] = (acc[kit.category] ?? 0) + 1;
    return acc;
  }, {});

  const popularCategories: PopularCategory[] = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([category, count], index) => ({
      id: `category-${category}-${index}`,
      name: category,
      kitCount: count,
      icon: categoryPopularIcon[category] ?? "Wrench",
      color: categoryPopularColor[category] ?? "text-yellow-400",
    }));

  const activityFeed: ActivityItem[] = allKits
    .slice()
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 3)
    .map((kit, index) => {
      const isFavorite = kit.isFavorite;
      const icon: ActivityItem["icon"] = isFavorite ? "Star" : index === 0 ? "Download" : "Box";
      const color =
        icon === "Star"
          ? "bg-purple-500/10 text-purple-400"
          : icon === "Download"
            ? "bg-green-500/10 text-green-400"
            : "bg-blue-500/10 text-blue-400";
      return {
        id: `activity-${kit.id}`,
        text: isFavorite
          ? `You added ${kit.title} to favorites`
          : `You downloaded ${kit.title}`,
        timeAgo: kit.createdAt ? relativeTime(kit.createdAt) : "Recently",
        icon,
        color,
      };
    });

  return {
    userName,
    stats,
    recentKits,
    popularCategories,
    workspaces,
    activityFeed,
  };
}
