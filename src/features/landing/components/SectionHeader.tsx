"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeInView } from "@/components/motion/FadeInView";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  action,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <FadeInView
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
      direction="up"
      distance={20}
    >
      {badge && (
        <Badge
          variant="secondary"
          className="mb-4 w-fit rounded-full px-3 py-1 text-xs font-medium"
        >
          {badge}
        </Badge>
      )}
      <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-xl text-balance text-base text-muted-foreground">
          {description}
        </p>
      )}
      {action && (
        <Link
          href={action.href}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          {action.label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </FadeInView>
  );
}
