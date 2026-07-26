import { LayoutDashboard, Sparkles, type LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export const mainNavigation: NavItem[] = [
  { label: "Explore", href: "/explore" },
  { label: "Categories", href: "/categories" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "AI Assistant", href: "/ai-assistant", icon: Sparkles },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];
