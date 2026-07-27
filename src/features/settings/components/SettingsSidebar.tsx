"use client";

import { User, Shield, Palette, Bell, Plug, Key, Users, AlertTriangle } from "lucide-react";

import { settingsMenu } from "@/data/settings";
import { cn } from "@/lib/utils";

const iconMap = {
  User,
  Shield,
  Palette,
  Bell,
  Plug,
  Key,
  Users,
};

interface SettingsSidebarProps {
  active?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export function SettingsSidebar({
  active = "profile",
  onSelect,
  className,
}: SettingsSidebarProps) {
  return (
    <nav
      className={cn(
        "rounded-2xl border border-border/60 bg-card p-3",
        className
      )}
      aria-label="Settings navigation"
    >
      <ul className="space-y-1">
        {settingsMenu.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect?.(item.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
                aria-current={isActive ? "true" : undefined}
              >
                <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <div>
                  <p className={cn("text-sm font-medium", isActive && "text-primary")}>
                    {item.label}
                  </p>
                  <p className="text-[10px] leading-tight text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 border-t border-border/40 pt-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-red-400 transition-colors hover:bg-red-500/10"
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium">Danger Zone</p>
            <p className="text-[10px] leading-tight text-muted-foreground">
              Irreversible account actions
            </p>
          </div>
        </button>
      </div>
    </nav>
  );
}
