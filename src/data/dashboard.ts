export interface DashboardUser {
  name: string;
  email: string;
  initials: string;
  avatarColor: string;
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
  title: string;
  category: string;
  timeAgo: string;
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

export const dashboardUser: DashboardUser = {
  name: "Shreya Dubey",
  email: "shreya@example.com",
  initials: "SD",
  avatarColor: "#8b5cf6",
};

export const currentWorkspace = {
  name: "SaaS Starter",
  type: "Workspace",
  initial: "S",
  color: "bg-primary text-primary-foreground",
};

export const dashboardStats: DashboardStat[] = [
  {
    id: "total-kits",
    label: "Total Kits",
    value: "24",
    subLabel: "from last month",
    change: "+12%",
    trend: "up",
    icon: "Box",
    color: "bg-purple-500/10 text-purple-400",
  },
  {
    id: "downloads",
    label: "Downloads",
    value: "156",
    subLabel: "from last month",
    change: "+18%",
    trend: "up",
    icon: "Download",
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    id: "workspaces",
    label: "Workspaces",
    value: "3",
    subLabel: "No change",
    change: "0",
    trend: "neutral",
    icon: "Briefcase",
    color: "bg-emerald-500/10 text-emerald-400",
  },
  {
    id: "favorites",
    label: "Favorites",
    value: "12",
    subLabel: "from last month",
    change: "+25%",
    trend: "up",
    icon: "Star",
    color: "bg-orange-500/10 text-orange-400",
  },
];

export const recentKits: RecentKit[] = [
  {
    id: "jwt-auth",
    title: "JWT Authentication",
    category: "Backend",
    timeAgo: "2h ago",
    icon: "Shield",
    color: "bg-purple-500/10 text-purple-400",
  },
  {
    id: "stripe-billing",
    title: "Stripe Billing",
    category: "Payments",
    timeAgo: "1d ago",
    icon: "CreditCard",
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    id: "s3-upload",
    title: "S3 File Upload",
    category: "Storage",
    timeAgo: "2d ago",
    icon: "Cloud",
    color: "bg-emerald-500/10 text-emerald-400",
  },
  {
    id: "rbac-auth",
    title: "RBAC Authorization",
    category: "Backend",
    timeAgo: "3d ago",
    icon: "Lock",
    color: "bg-amber-500/10 text-amber-400",
  },
  {
    id: "email-verification",
    title: "Email Verification",
    category: "Utility",
    timeAgo: "5d ago",
    icon: "Mail",
    color: "bg-pink-500/10 text-pink-400",
  },
];

export const popularCategories: PopularCategory[] = [
  {
    id: "backend",
    name: "Backend",
    kitCount: 32,
    icon: "Server",
    color: "text-purple-400",
  },
  {
    id: "authentication",
    name: "Authentication",
    kitCount: 18,
    icon: "Lock",
    color: "text-green-400",
  },
  {
    id: "payments",
    name: "Payments",
    kitCount: 14,
    icon: "CreditCard",
    color: "text-blue-400",
  },
  {
    id: "storage",
    name: "Storage",
    kitCount: 16,
    icon: "Cloud",
    color: "text-orange-400",
  },
  {
    id: "utility",
    name: "Utility",
    kitCount: 20,
    icon: "Wrench",
    color: "text-yellow-400",
  },
];

export const workspaces: Workspace[] = [
  {
    id: "saas-starter",
    name: "SaaS Starter",
    initial: "S",
    color: "bg-purple-500 text-white",
    kitCount: 12,
    current: true,
  },
  {
    id: "ai-agent",
    name: "AI Agent Backend",
    initial: "A",
    color: "bg-green-500 text-white",
    kitCount: 8,
  },
  {
    id: "ecommerce",
    name: "E-commerce API",
    initial: "E",
    color: "bg-orange-500 text-white",
    kitCount: 6,
  },
];

export const activityFeed: ActivityItem[] = [
  {
    id: "download-jwt",
    text: "You downloaded JWT Authentication",
    timeAgo: "2 hours ago",
    icon: "Download",
    color: "bg-green-500/10 text-green-400",
  },
  {
    id: "favorite-stripe",
    text: "You added Stripe Billing to favorites",
    timeAgo: "1 day ago",
    icon: "Star",
    color: "bg-purple-500/10 text-purple-400",
  },
  {
    id: "create-workspace",
    text: "You created workspace SaaS Starter",
    timeAgo: "3 days ago",
    icon: "Box",
    color: "bg-blue-500/10 text-blue-400",
  },
];

export const dashboardNavigation: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Explore Kits", href: "/explore", icon: "Compass" },
  { label: "Workspaces", href: "/workspaces", icon: "Briefcase" },
  { label: "Billing", href: "/billing", icon: "CreditCard" },
  { label: "Settings", href: "/settings", icon: "Settings" },
];
