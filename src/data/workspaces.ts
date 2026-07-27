export interface Workspace {
  id: string;
  name: string;
  description: string;
  icon: string;
  isCurrent?: boolean;
  kitIcons: string[];
  kitsCount: number;
  updatedAgo: string;
  isFavorite?: boolean;
  iconColor: string;
}

export interface WorkspaceStat {
  id: string;
  label: string;
  value: string;
  subLabel: string;
  icon: string;
  iconColor: string;
}

export interface RecentKit {
  id: string;
  name: string;
  workspace: string;
  addedAgo: string;
  icon: string;
  iconColor: string;
}

export const workspaceStats: WorkspaceStat[] = [
  {
    id: "total-workspaces",
    label: "Total Workspaces",
    value: "4",
    subLabel: "2 active",
    icon: "Users",
    iconColor: "text-purple-400",
  },
  {
    id: "kits-added",
    label: "Kits Added",
    value: "28",
    subLabel: "+12 this month",
    icon: "Package",
    iconColor: "text-emerald-400",
  },
  {
    id: "integrations",
    label: "Total Integrations",
    value: "156",
    subLabel: "+18 this month",
    icon: "Cloud",
    iconColor: "text-sky-400",
  },
  {
    id: "team-members",
    label: "Team Members",
    value: "3",
    subLabel: "2 online",
    icon: "UserPlus",
    iconColor: "text-green-400",
  },
];

export const workspaces: Workspace[] = [
  {
    id: "saas-starter",
    name: "SaaS Starter",
    description: "Complete backend setup for SaaS applications with auth, payments and more.",
    icon: "Rocket",
    isCurrent: true,
    kitIcons: ["Shield", "CreditCard", "Lock", "Mail"],
    kitsCount: 12,
    updatedAgo: "2 hours ago",
    isFavorite: true,
    iconColor: "bg-purple-500/10 text-purple-400",
  },
  {
    id: "ai-agent-backend",
    name: "AI Agent Backend",
    description: "Backend infrastructure for AI agents with memory, vector DB and APIs.",
    icon: "Bot",
    kitIcons: ["Cpu", "Database", "Cloud"],
    kitsCount: 8,
    updatedAgo: "1 day ago",
    isFavorite: false,
    iconColor: "bg-emerald-500/10 text-emerald-400",
  },
  {
    id: "ecommerce-api",
    name: "E-commerce API",
    description: "Production-ready e-commerce API with authentication, payments and inventory.",
    icon: "ShoppingCart",
    kitIcons: ["ShoppingCart", "CreditCard", "Shield", "Mail"],
    kitsCount: 6,
    updatedAgo: "3 days ago",
    isFavorite: true,
    iconColor: "bg-orange-500/10 text-orange-400",
  },
  {
    id: "dev-portfolio",
    name: "Dev Portfolio",
    description: "Personal portfolio with blog, projects and contact management system.",
    icon: "Code",
    kitIcons: ["Layout", "Mail", "User"],
    kitsCount: 5,
    updatedAgo: "5 days ago",
    isFavorite: false,
    iconColor: "bg-blue-500/10 text-blue-400",
  },
  {
    id: "game-leaderboard",
    name: "Game Leaderboard",
    description: "Real-time leaderboard with WebSockets, Redis and rank calculations.",
    icon: "Gamepad2",
    kitIcons: ["Trophy", "Zap", "Database"],
    kitsCount: 4,
    updatedAgo: "1 week ago",
    isFavorite: false,
    iconColor: "bg-pink-500/10 text-pink-400",
  },
  {
    id: "file-management",
    name: "File Management System",
    description: "Secure file upload, storage and management with AWS S3 and CloudFront.",
    icon: "Folder",
    kitIcons: ["Upload", "Cloud", "Shield"],
    kitsCount: 5,
    updatedAgo: "1 week ago",
    isFavorite: false,
    iconColor: "bg-amber-500/10 text-amber-400",
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    description: "Analytics dashboard with data visualization, reports and user insights.",
    icon: "BarChart3",
    kitIcons: ["BarChart", "User", "Database"],
    kitsCount: 7,
    updatedAgo: "2 weeks ago",
    isFavorite: true,
    iconColor: "bg-cyan-500/10 text-cyan-400",
  },
];

export const recentlyAddedKits: RecentKit[] = [
  {
    id: "jwt-auth",
    name: "JWT Authentication",
    workspace: "SaaS Starter",
    addedAgo: "2h ago",
    icon: "Shield",
    iconColor: "text-purple-400",
  },
  {
    id: "stripe-billing",
    name: "Stripe Billing",
    workspace: "AI Agent Backend",
    addedAgo: "1d ago",
    icon: "CreditCard",
    iconColor: "text-blue-400",
  },
  {
    id: "s3-upload",
    name: "S3 File Upload",
    workspace: "AI Agent Backend",
    addedAgo: "2d ago",
    icon: "Upload",
    iconColor: "text-emerald-400",
  },
  {
    id: "rbac-auth",
    name: "RBAC Authorization",
    workspace: "E-commerce API",
    addedAgo: "3d ago",
    icon: "Lock",
    iconColor: "text-amber-400",
  },
  {
    id: "email-verification",
    name: "Email Verification",
    workspace: "SaaS Starter",
    addedAgo: "5d ago",
    icon: "Mail",
    iconColor: "text-pink-400",
  },
];
