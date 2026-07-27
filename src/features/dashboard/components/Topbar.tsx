"use client";

import Link from "next/link";
import { Search, Gift, Bell, ChevronDown, LogOut } from "lucide-react";

import type { DashboardUser } from "@/data/dashboard";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/app/logout/actions";
import { cn } from "@/lib/utils";

interface TopbarProps {
  className?: string;
  user: DashboardUser;
}

export function Topbar({ className, user }: TopbarProps) {
  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      if (error instanceof Error && error.message?.includes("NEXT_REDIRECT")) {
        return;
      }
      throw error;
    }
  }

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
        <Link
          href="/pricing"
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
          aria-label="Gift rewards"
        >
          <Gift className="size-5 text-muted-foreground" aria-hidden="true" />
        </Link>

        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-5 text-muted-foreground" aria-hidden="true" />
          <span className="absolute right-2 top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-2 hover:bg-accent"
                aria-label="Profile menu"
              >
                <div
                  className="flex size-8 items-center justify-center rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: user.avatarColor }}
                  aria-hidden="true"
                >
                  {user.initials}
                </div>
                <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                handleLogout();
              }}
            >
              <LogOut className="mr-2 size-4" aria-hidden="true" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
