"use client";

import { Search, Gift, Bell, ChevronDown } from "lucide-react";

import { dashboardUser } from "@/data/dashboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Topbar({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "flex h-16 items-center justify-between gap-4 border-b border-border/40 bg-card/80 px-6 backdrop-blur-xl",
        className
      )}
      aria-label="Dashboard topbar"
    >
      {/* Search */}
      <div className="relative flex flex-1 max-w-2xl items-center">
        <Search className="absolute left-3 size-4 text-muted-foreground" aria-hidden="true" />
        <Input
          type="search"
          placeholder="Search forge kits, categories, docs..."
          className="h-10 w-full rounded-xl border-border/60 bg-background pl-10 pr-16 text-sm"
        />
        <span className="absolute right-3 rounded-md border border-border/60 bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          ⌘K
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Gift rewards">
          <Gift className="size-5 text-muted-foreground" aria-hidden="true" />
        </Button>

        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-5 text-muted-foreground" aria-hidden="true" />
          <span className="absolute right-2 top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
            3
          </span>
        </Button>

        <Button
          variant="ghost"
          className="flex items-center gap-2 px-2 hover:bg-accent"
          aria-label="Profile menu"
        >
          <div
            className="flex size-8 items-center justify-center rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: dashboardUser.avatarColor }}
            aria-hidden="true"
          >
            {dashboardUser.initials}
          </div>
          <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
}
