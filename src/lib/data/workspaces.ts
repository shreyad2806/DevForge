import { createClient } from "@/lib/supabase/server";
import { fetchExploreKits } from "@/lib/data/forge-kits";
import type { Workspace, WorkspaceStat, RecentKit } from "@/data/workspaces";
import type { ForgeKit } from "@/data/forge-kits";

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

const colorClasses = [
  "bg-purple-500/10 text-purple-400",
  "bg-emerald-500/10 text-emerald-400",
  "bg-orange-500/10 text-orange-400",
  "bg-blue-500/10 text-blue-400",
  "bg-pink-500/10 text-pink-400",
  "bg-amber-500/10 text-amber-400",
  "bg-cyan-500/10 text-cyan-400",
];

function colorForName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colorClasses.length;
  return colorClasses[index];
}

export async function fetchWorkspacesForUser(): Promise<Workspace[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: rows, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !rows) return [];

  let allKits: ForgeKit[] = [];
  try {
    allKits = await fetchExploreKits();
  } catch {
    allKits = [];
  }

  const workspaceIds = rows.map((r) => String(r.id));
  const { data: links } = await supabase
    .from("workspace_kits")
    .select("workspace_id, kit_id")
    .in("workspace_id", workspaceIds);

  const iconsByWorkspace = new Map<string, string[]>();
  for (const link of links ?? []) {
    const wid = String(link.workspace_id);
    const kid = String(link.kit_id);
    const kit = allKits.find((k) => k.id === kid);
    if (kit) {
      const arr = iconsByWorkspace.get(wid) ?? [];
      arr.push(kit.icon);
      iconsByWorkspace.set(wid, arr);
    }
  }

  return rows.map((row: Record<string, unknown>) => {
    const id = String(row.id);
    const name = String(row.name ?? "");
    const icons = iconsByWorkspace.get(id) ?? [];
    const initial = String(row.initial ?? name[0] ?? "W");
    const color =
      String(row.color ?? "").trim() || colorForName(name);

    return {
      id,
      name,
      description: String(row.description ?? ""),
      icon: "Briefcase",
      iconColor: color,
      isCurrent: Boolean(row.current),
      isFavorite: false,
      kitIcons: icons.slice(0, 4),
      kitsCount: icons.length,
      updatedAgo: row.created_at ? relativeTime(String(row.created_at)) : "Unknown",
    } satisfies Workspace;
  });
}

export async function fetchWorkspaceStats(): Promise<WorkspaceStat[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [
      { id: "total-workspaces", label: "Total Workspaces", value: "0", subLabel: "0 active", icon: "Users", iconColor: "text-purple-400" },
      { id: "kits-added", label: "Kits Added", value: "0", subLabel: "+0 this month", icon: "Package", iconColor: "text-emerald-400" },
      { id: "integrations", label: "Total Integrations", value: "0", subLabel: "+0 this month", icon: "Cloud", iconColor: "text-sky-400" },
      { id: "team-members", label: "Team Members", value: "1", subLabel: "1 online", icon: "UserPlus", iconColor: "text-green-400" },
    ];
  }

  const [{ count: workspaceCount, error: wsError }, { data: kitLinks, error: kitError }] =
    await Promise.all([
      supabase
        .from("workspaces")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("workspace_kits")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
    ]);

  const totalWorkspaces = !wsError && typeof workspaceCount === "number" ? workspaceCount : 0;
  const kitsAdded = !kitError && typeof kitError === "undefined"
    ? 0
    : 0;

  const { count: kitsCount } = await supabase
    .from("workspace_kits")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  const totalKitsAdded = typeof kitsCount === "number" ? kitsCount : 0;

  return [
    {
      id: "total-workspaces",
      label: "Total Workspaces",
      value: formatNumber(totalWorkspaces),
      subLabel: `${formatNumber(totalWorkspaces)} active`,
      icon: "Users",
      iconColor: "text-purple-400",
    },
    {
      id: "kits-added",
      label: "Kits Added",
      value: formatNumber(totalKitsAdded),
      subLabel: "+0 this month",
      icon: "Package",
      iconColor: "text-emerald-400",
    },
    {
      id: "integrations",
      label: "Total Integrations",
      value: "0",
      subLabel: "+0 this month",
      icon: "Cloud",
      iconColor: "text-sky-400",
    },
    {
      id: "team-members",
      label: "Team Members",
      value: "1",
      subLabel: "1 online",
      icon: "UserPlus",
      iconColor: "text-green-400",
    },
  ];
}

export async function fetchRecentActivity(): Promise<RecentKit[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: rows, error } = await supabase
    .from("workspace_kits")
    .select("workspace_id, kit_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error || !rows) return [];

  let allKits: ForgeKit[] = [];
  try {
    allKits = await fetchExploreKits();
  } catch {
    allKits = [];
  }

  const { data: workspaceRows } = await supabase
    .from("workspaces")
    .select("id, name")
    .eq("user_id", user.id);

  const workspaceNames = new Map<string, string>();
  for (const row of workspaceRows ?? []) {
    workspaceNames.set(String(row.id), String(row.name));
  }

  return rows.map((row: Record<string, unknown>) => {
    const kit = allKits.find((k) => k.id === String(row.kit_id));
    return {
      id: String(row.kit_id),
      name: kit?.title ?? "Unknown kit",
      workspace: workspaceNames.get(String(row.workspace_id)) ?? "Unknown workspace",
      addedAgo: row.created_at ? relativeTime(String(row.created_at)) : "Recently",
      icon: kit?.icon ?? "Box",
      iconColor: "text-primary",
    } satisfies RecentKit;
  });
}

export interface WorkspaceDetail extends Workspace {
  createdAt: string;
}

export async function fetchWorkspaceDetail(id: string): Promise<{ workspace: WorkspaceDetail; kits: ForgeKit[] } | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: row, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !row) return null;

  let allKits: ForgeKit[] = [];
  try {
    allKits = await fetchExploreKits();
  } catch {
    allKits = [];
  }

  const { data: links } = await supabase
    .from("workspace_kits")
    .select("kit_id")
    .eq("workspace_id", id)
    .eq("user_id", user.id);

  const kitIds = new Set((links ?? []).map((l: Record<string, unknown>) => String(l.kit_id)));
  const kits = allKits.filter((k) => kitIds.has(k.id));

  const name = String(row.name ?? "");
  const initial = String(row.initial ?? name[0] ?? "W");
  const color = String(row.color ?? "").trim() || colorForName(name);

  const workspace: WorkspaceDetail = {
    id: String(row.id),
    name,
    description: String(row.description ?? ""),
    icon: "Briefcase",
    iconColor: color,
    isCurrent: Boolean(row.current),
    isFavorite: false,
    kitIcons: kits.map((k) => k.icon).slice(0, 4),
    kitsCount: kits.length,
    updatedAgo: row.created_at ? relativeTime(String(row.created_at)) : "Unknown",
    createdAt: row.created_at ? relativeTime(String(row.created_at)) : "Unknown",
  };

  return { workspace, kits };
}
