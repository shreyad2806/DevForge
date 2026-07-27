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
  let userId: string | undefined;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id;

    const emailPrefix = user?.email?.split("@")[0] ?? "User";
    const fallbackName =
      emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);

    if (userId) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", userId)
        .maybeSingle();
      userName = String(profile?.name ?? "").trim() || fallbackName;
    } else {
      userName = fallbackName;
    }
  } catch {
    // ignore
  }

  let allKits: Awaited<ReturnType<typeof fetchExploreKits>> = [];
  try {
    allKits = await fetchExploreKits();
  } catch {
    allKits = [];
  }

  let totalKits = 0;
  let totalDownloads = 0;
  try {
    const [
      { count: kitsCount, error: kitsCountError },
      { data: kitsDownloads, error: downloadsError },
    ] = await Promise.all([
      supabase.from("forge_kits").select("*", { count: "exact", head: true }),
      supabase.from("forge_kits").select("downloads"),
    ]);

    if (!kitsCountError && typeof kitsCount === "number") {
      totalKits = kitsCount;
    }

    if (!downloadsError && kitsDownloads) {
      totalDownloads = kitsDownloads.reduce((sum, row) => {
        const parsed = Number(row.downloads);
        return sum + (Number.isNaN(parsed) ? 0 : parsed);
      }, 0);
    }
  } catch {
    // leave defaults at 0
  }

  let favoritesCount = 0;
  try {
    if (userId) {
      const { count, error } = await supabase
        .from("favorites")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId);
      if (!error && typeof count === "number") {
        favoritesCount = count;
      }
    }
  } catch {
    // leave at 0
  }

  let workspacesCount = 0;
  let workspaces: Workspace[] = [];
  try {
    const { data: workspaceRows, error } = await supabase
      .from("workspaces")
      .select("id, name, initial, color, kit_count, current, created_at")
      .eq("user_id", userId ?? "")
      .order("created_at", { ascending: false });

    if (!error && workspaceRows) {
      workspaces = workspaceRows.map((row: Record<string, unknown>) => {
        const name = String(row.name ?? "Workspace");
        return {
          id: String(row.id),
          name,
          initial: String(row.initial ?? name[0] ?? "W"),
          color: String(row.color ?? "bg-primary text-primary-foreground"),
          kitCount: Number(row.kit_count ?? 0),
          createdAt: row.created_at
            ? relativeTime(String(row.created_at))
            : "Unknown",
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
      slug: kit.slug,
      title: kit.title,
      category: kit.category,
      timeAgo: kit.createdAt ? relativeTime(kit.createdAt) : "Recently",
      downloads: kit.downloads,
      rating: kit.rating,
      icon: categoryRecentIcon[kit.category] ?? "Shield",
      color: categoryRecentColor[kit.category] ?? "bg-purple-500/10 text-purple-400",
    }));

  const categoryCounts = allKits.reduce<Record<string, number>>((acc, kit) => {
    acc[kit.category] = (acc[kit.category] ?? 0) + 1;
    return acc;
  }, {});

  const categories = [
    "Backend",
    "Authentication",
    "Payments",
    "Storage",
    "Utility",
  ];

  const popularCategories: PopularCategory[] = categories
    .map((category) => ({
      name: category,
      kitCount: categoryCounts[category] ?? 0,
    }))
    .sort((a, b) => b.kitCount - a.kitCount)
    .map((category, index) => ({
      id: `category-${category.name}-${index}`,
      name: category.name,
      kitCount: category.kitCount,
      icon: categoryPopularIcon[category.name] ?? "Wrench",
      color: categoryPopularColor[category.name] ?? "text-yellow-400",
    }));

  let activityFeed: ActivityItem[] = [];
  try {
    if (userId) {
      const { data: favoriteRows, error: favoritesError } = await supabase
        .from("favorites")
        .select("kit_id, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(3);

      if (!favoritesError && favoriteRows) {
        activityFeed = favoriteRows.map((raw) => {
          const row = raw as Record<string, unknown>;
          const kitId = String(row.kit_id ?? "");
          const kit = allKits.find((k) => k.id === kitId);
          const createdAt = row.created_at
            ? String(row.created_at)
            : undefined;
          return {
            id: `activity-${kitId}`,
            text: `You favorited ${kit?.title ?? "a kit"}`,
            timeAgo: createdAt ? relativeTime(createdAt) : "Recently",
            icon: "Star" as ActivityItem["icon"],
            color: "bg-purple-500/10 text-purple-400",
          };
        });
      }
    }
  } catch {
    // leave empty
  }

  return {
    userName,
    stats,
    recentKits,
    popularCategories,
    workspaces,
    activityFeed,
  };
}
