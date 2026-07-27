export interface DashboardUser {
  name: string;
  email: string;
  plan: string;
  initials: string;
  avatarColor: string;
  avatarUrl?: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  subLabel: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: "Box" | "Download" | "Briefcase" | "Star";
  color: string;
}

export interface RecentKit {
  id: string;
  slug: string;
  title: string;
  category: string;
  timeAgo: string;
  downloads: string;
  rating: number;
  icon: "Shield" | "CreditCard" | "Cloud" | "Lock" | "Mail";
  color: string;
}

export interface PopularCategory {
  id: string;
  name: string;
  kitCount: number;
  icon: "Server" | "Lock" | "CreditCard" | "Cloud" | "Wrench";
  color: string;
}

export interface Workspace {
  id: string;
  name: string;
  initial: string;
  color: string;
  kitCount: number;
  createdAt: string;
  current?: boolean;
}

export interface ActivityItem {
  id: string;
  text: string;
  timeAgo: string;
  icon: "Download" | "Star" | "Box";
  color: string;
}

export interface DashboardNavItem {
  label: string;
  href: string;
  icon:
    | "LayoutDashboard"
    | "Compass"
    | "Briefcase"
    | "Heart"
    | "Plug"
    | "Sparkles"
    | "CreditCard"
    | "Settings"
    | "BookOpen"
    | "Users";
}

export const dashboardNavigation: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Explore Kits", href: "/explore", icon: "Compass" },
  { label: "Workspaces", href: "/workspaces", icon: "Briefcase" },
  { label: "Billing", href: "/billing", icon: "CreditCard" },
  { label: "Settings", href: "/settings", icon: "Settings" },
];
