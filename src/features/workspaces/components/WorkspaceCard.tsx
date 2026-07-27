"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Rocket,
  Bot,
  ShoppingCart,
  Code,
  Gamepad2,
  Folder,
  BarChart3,
  Shield,
  CreditCard,
  Lock,
  Upload,
  Mail,
  Cpu,
  Database,
  Cloud,
  Layout,
  User,
  Trophy,
  Zap,
  BarChart,
  Star,
  MoreVertical,
} from "lucide-react";

import type { Workspace } from "@/data/workspaces";
import { HoverCard } from "@/components/motion/HoverCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mainIconMap = {
  Rocket,
  Bot,
  ShoppingCart,
  Code,
  Gamepad2,
  Folder,
  BarChart3,
};

const kitIconMap = {
  Shield,
  CreditCard,
  Lock,
  Upload,
  Mail,
  Cpu,
  Database,
  Cloud,
  Layout,
  User,
  Trophy,
  Zap,
  BarChart,
  ShoppingCart,
};

interface WorkspaceCardProps {
  workspace: Workspace;
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(workspace.isFavorite ?? false);
  const Icon = mainIconMap[workspace.icon as keyof typeof mainIconMap];

  return (
    <HoverCard scale={1.015} y={-3} className="h-full">
      <div
        className="relative flex h-full cursor-pointer flex-col rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30"
        role="link"
        tabIndex={0}
        onClick={() => router.push("/workspaces")}
      >
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex size-12 items-center justify-center rounded-xl",
              workspace.iconColor
            )}
          >
            <Icon className="size-6" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={isFavorite}
              onClick={(e) => {
              e.stopPropagation();
              setIsFavorite((f) => !f);
            }}
            >
              <Star
                className={cn(
                  "size-4 transition-colors",
                  isFavorite ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
                )}
                aria-hidden="true"
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground"
              aria-label="Workspace options"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <h3 className="text-base font-semibold text-foreground">
            {workspace.name}
          </h3>
          {workspace.isCurrent && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
              Current
            </span>
          )}
        </div>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {workspace.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
          <div className="flex items-center gap-1">
            {workspace.kitIcons.slice(0, 4).map((kitIcon, idx) => {
              const KitIcon =
                kitIconMap[kitIcon as keyof typeof kitIconMap];
              return (
                <div
                  key={`${kitIcon}-${idx}`}
                  className="flex size-6 items-center justify-center rounded-full border border-border/60 bg-background"
                >
                  <KitIcon className="size-3 text-muted-foreground" aria-hidden="true" />
                </div>
              );
            })}
            <span className="ml-1.5 text-xs text-muted-foreground">
              {workspace.kitsCount} kits
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground">
            Updated {workspace.updatedAgo}
          </span>
        </div>
      </div>
    </HoverCard>
  );
}
