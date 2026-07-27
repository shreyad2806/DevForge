import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import type { DashboardUser } from "@/data/dashboard";

function getInitials(name: string, email: string) {
  const parts = name.trim().split(" ").filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  if (first && last) return `${first}${last}`.toUpperCase();
  return (first || email.split("@")[0]?.[0] || "U").toUpperCase();
}

export async function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;
  const emailPrefix = user?.email?.split("@")[0] ?? "User";

  let name = emailPrefix;
  let email = user?.email ?? "";
  let plan = "Free";
  let avatarUrl: string | undefined;

  try {
    if (userId) {
      const { data: rawProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      const profile = rawProfile as Record<string, unknown> | null;
      name = String(profile?.name ?? "").trim() || emailPrefix;
      email = String(profile?.email ?? user?.email ?? "");
      plan = String(profile?.plan ?? "Free");
      avatarUrl = profile?.avatar_url
        ? String(profile.avatar_url)
        : undefined;
    }
  } catch {
    // leave fallbacks
  }

  const authUser: DashboardUser = {
    name,
    email,
    plan,
    initials: getInitials(name, email),
    avatarColor:
      (user?.user_metadata?.avatarColor as string | undefined) ?? "#8b5cf6",
    avatarUrl,
  };

  let currentWorkspace: {
    name: string;
    type: string;
    initial: string;
    color: string;
  } = {
    name: "No workspace",
    type: "Workspace",
    initial: "?",
    color: "bg-muted text-muted-foreground",
  };

  let subscriptionPlan = "Free";
  let workspaceCount = 0;

  try {
    if (userId) {
      const [
        { data: rows },
        { data: rawSubscription },
        { count: wsCount },
      ] = await Promise.all([
        supabase
          .from("workspaces")
          .select("name, initial, color, current")
          .eq("user_id", userId)
          .eq("current", true)
          .limit(1),
        supabase
          .from("subscriptions")
          .select("plan")
          .eq("user_id", userId)
          .maybeSingle(),
        supabase
          .from("workspaces")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId),
      ]);

      if (typeof wsCount === "number") {
        workspaceCount = wsCount;
      }

      if (rows && rows.length > 0) {
        const row = rows[0] as Record<string, unknown>;
        const workspaceName = String(row.name ?? "Workspace");
        currentWorkspace = {
          name: workspaceName,
          type: "Workspace",
          initial: String(row.initial ?? workspaceName[0] ?? "W"),
          color: String(row.color ?? "bg-primary text-primary-foreground"),
        };
      }

      const subscription = rawSubscription as Record<string, unknown> | null;
      subscriptionPlan = String(subscription?.plan ?? "Free");
    }
  } catch {
    // leave fallbacks
  }

  return (
    <div className="relative min-h-screen bg-background">
      <Sidebar
        user={authUser}
        currentWorkspace={currentWorkspace}
        subscriptionPlan={subscriptionPlan}
        workspaceCount={workspaceCount}
        className="fixed left-0 top-0 z-40"
      />
      <Topbar user={authUser} className="fixed left-64 right-0 top-0 z-40" />
      <main className="min-h-screen pl-64 pt-16">{children}</main>
    </div>
  );
}
