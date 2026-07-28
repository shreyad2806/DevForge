"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Briefcase,
  Heart,
  Plug,
  Sparkles,
  CreditCard,
  Settings,
  BookOpen,
  Users,
  Hexagon,
  ChevronDown,
  MoreHorizontal,
  Zap,
} from "lucide-react";

import { dashboardNavigation } from "@/data/dashboard";
import type { DashboardUser } from "@/data/dashboard";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const iconMap = {
  LayoutDashboard,
  Compass,
  Briefcase,
  Heart,
  Plug,
  Sparkles,
  CreditCard,
  Settings,
  BookOpen,
  Users,
};

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
      aria-label="DevForge home"
    >
      <Hexagon
        className="size-7 fill-primary/20 text-primary transition-colors group-hover:fill-primary/30"
        aria-hidden="true"
      />
      <span className="text-lg font-semibold tracking-tight">DevForge</span>
    </Link>
  );
}

interface SidebarProps {
  className?: string;
  user: DashboardUser;
  currentWorkspace: { name: string; type: string; initial: string; color: string };
  subscriptionPlan: string;
  workspaceCount: number;
}

export function Sidebar({ className, user, currentWorkspace, subscriptionPlan, workspaceCount }: SidebarProps) {
  const pathname = usePathname();
  const isPro = subscriptionPlan.toLowerCase() === "pro";
  const planLabel = isPro ? "Pro" : subscriptionPlan;

  return (
    <aside
      className={cn(
        "flex h-screen w-64 flex-col border-r border-border/40 bg-card p-4",
        className
      )}
      aria-label="Dashboard sidebar"
    >
      <div className="px-2 py-3">
        <Logo />
      </div>

      {/* Workspace selector */}
      <div className="mt-4 px-2">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl border border-border/60 bg-background p-2 text-left transition-colors hover:border-primary/30"
        >
          <span className={cn("flex size-9 items-center justify-center rounded-lg text-sm font-semibold", currentWorkspace.color)}>
            {currentWorkspace.initial}
          </span>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-foreground">
              {currentWorkspace.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {currentWorkspace.type}
            </p>
          </div>
          <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1 overflow-y-auto px-2" aria-label="Dashboard navigation">
        <ul className="space-y-1">
          {dashboardNavigation.map((item) => {
            const Icon = iconMap[item.icon];
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Upgrade card */}
      <div className="mt-4 rounded-2xl border border-border/60 bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Zap className="size-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {isPro ? "You're on Pro" : "Upgrade to Pro"}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {isPro
                ? "You have access to premium kits, private workspaces and more."
                : "Unlock premium kits, private workspaces and more."}
            </p>
          </div>
        </div>
        {!isPro && (
          <Link
            href="/pricing"
            className={cn(buttonVariants({ size: "sm" }), "mt-3 w-full text-center")}
          >
            Upgrade Now
          </Link>
        )}
      </div>

      {/* User */}
      <div className="mt-4 flex items-center gap-3 border-t border-border/40 px-2 pt-4">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt=""
            className="size-9 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex size-9 items-center justify-center rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: user.avatarColor }}
            aria-hidden="true"
          >
            {user.initials}
          </div>
        )}
        <div className="flex-1 overflow-hidden">
          <p className="truncate text-sm font-medium text-foreground">
            {user.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {user.email}
          </p>
          <div className="mt-0.5 flex items-center gap-2">
            {isPro ? (
              <Badge className="rounded-full px-1.5 py-0 text-[10px]">Pro</Badge>
            ) : (
              <span className="text-xs text-muted-foreground">{planLabel}</span>
            )}
            <span className="text-xs text-muted-foreground">
              · {workspaceCount} workspaces
            </span>
          </div>
        </div>
        <button
          type="button"
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="User menu"
        >
          <MoreHorizontal className="size-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
