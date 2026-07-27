"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Shield,
  CreditCard,
  Lock,
  Upload,
  Mail,
  Cloud,
  Database,
  MessageSquare,
  Zap,
  Key,
  User,
  Globe,
  Smartphone,
  Cpu,
  Layers,
  Box,
  Star,
  Download,
  Heart,
} from "lucide-react";

import type { ForgeKit } from "@/data/forge-kits";
import { HoverCard } from "@/components/motion/HoverCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconMap = {
  Shield,
  CreditCard,
  Lock,
  Upload,
  Mail,
  Cloud,
  Database,
  MessageSquare,
  Zap,
  Key,
  User,
  Globe,
  Smartphone,
  Cpu,
  Layers,
  Box,
};

interface ForgeKitCardProps {
  kit: ForgeKit;
}

export function ForgeKitCard({ kit }: ForgeKitCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(kit.isFavorite ?? false);
  const Icon = iconMap[kit.icon];
  const slug = kit.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .replace(/-kit$/, "");

  return (
    <HoverCard scale={1.015} y={-2} className="h-full">
      <div
        className="relative flex h-full cursor-pointer flex-col rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30"
        role="link"
        tabIndex={0}
        onClick={() => router.push(`/kits/${slug}`)}
      >
        {(kit.isPremium || kit.isPopular) && (
          <div className="absolute left-5 top-5 flex gap-1.5">
            {kit.isPremium && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                Premium
              </span>
            )}
            {kit.isPopular && (
              <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                Popular
              </span>
            )}
          </div>
        )}

        <div className="flex items-start justify-between">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-6" aria-hidden="true" />
          </div>
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
            <Heart
              className={cn(
                "size-4 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
              )}
              aria-hidden="true"
            />
          </Button>
        </div>

        <div className="mt-4 flex-1">
          <h3 className="text-base font-semibold text-foreground">{kit.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {kit.category}
          </p>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {kit.description}
          </p>
        </div>

        {kit.frameworkTags && kit.frameworkTags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {kit.frameworkTags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border/60 bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Download className="size-3.5" aria-hidden="true" />
            <span>{kit.downloads}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="size-3.5 text-amber-400" aria-hidden="true" />
            <span className="font-medium text-foreground">{kit.rating}</span>
            {kit.reviews !== undefined && (
              <span>({kit.reviews})</span>
            )}
          </div>
        </div>
      </div>
    </HoverCard>
  );
}
