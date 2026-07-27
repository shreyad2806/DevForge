import { type LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  badge?: string;
}

export const mainNavigation: NavItem[] = [
  { label: "Explore Kits", href: "/explore" },
  { label: "Pricing", href: "/pricing" },
  { label: "Dashboard", href: "/dashboard" },
];
