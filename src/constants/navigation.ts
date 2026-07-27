import { type LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  badge?: string;
}

export const mainNavigation: NavItem[] = [
  { label: "Explore", href: "/explore" },
  { label: "Categories", href: "/categories" },
  { label: "Solutions", href: "/solutions" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "AI Assistant", href: "/ai-assistant", badge: "New" },
];
