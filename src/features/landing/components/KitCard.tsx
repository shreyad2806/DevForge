"use client";

import { useRouter } from "next/navigation";
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
} from "lucide-react";

import { HoverCard } from "@/components/motion/HoverCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ForgeKit } from "@/data/forge-kits";

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

const iconColors: Record<ForgeKit["icon"], string> = {
  Shield: "bg-purple-500/10 text-purple-400",
  CreditCard: "bg-blue-500/10 text-blue-400",
  Lock: "bg-amber-500/10 text-amber-400",
  Upload: "bg-emerald-500/10 text-emerald-400",
  Mail: "bg-pink-500/10 text-pink-400",
  Cloud: "bg-sky-500/10 text-sky-400",
  Database: "bg-indigo-500/10 text-indigo-400",
  MessageSquare: "bg-cyan-500/10 text-cyan-400",
  Zap: "bg-yellow-500/10 text-yellow-400",
  Key: "bg-orange-500/10 text-orange-400",
  User: "bg-lime-500/10 text-lime-400",
  Globe: "bg-teal-500/10 text-teal-400",
  Smartphone: "bg-fuchsia-500/10 text-fuchsia-400",
  Cpu: "bg-rose-500/10 text-rose-400",
  Layers: "bg-violet-500/10 text-violet-400",
  Box: "bg-slate-500/10 text-slate-400",
};

interface KitCardProps {
  kit: ForgeKit;
}

export function KitCard({ kit }: KitCardProps) {
  const router = useRouter();
  const Icon = iconMap[kit.icon];
  const slug = kit.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .replace(/-kit$/, "");

  return (
    <HoverCard className="h-full" scale={1.01} y={-4}>
      <Card
        className="flex h-full cursor-pointer flex-col border-border/60 bg-card p-5 transition-colors hover:border-primary/30"
        onClick={() => router.push(`/kits/${slug}`)}
        role="link"
      >
        <CardContent className="flex flex-1 flex-col p-0">
          <div
            className={cn(
              "mb-4 flex size-10 items-center justify-center rounded-lg",
              iconColors[kit.icon]
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
          </div>

          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {kit.title}
          </h3>

          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {kit.description}
          </p>

          <Badge
            variant="secondary"
            className="mt-4 w-fit rounded-md px-2 py-0.5 text-[10px] font-medium"
          >
            {kit.category}
          </Badge>
        </CardContent>

        <CardFooter className="mt-5 flex items-center justify-between border-t border-border/40 p-0 pt-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Download className="size-3.5" aria-hidden="true" />
            <span>{kit.downloads}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Star className="size-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
            <span className="text-xs font-medium text-foreground">{kit.rating}</span>
          </div>
        </CardFooter>
      </Card>
    </HoverCard>
  );
}
