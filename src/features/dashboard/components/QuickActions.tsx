"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function QuickActions() {
  return (
    <Link
      href="/workspaces"
      className={cn(buttonVariants({ size: "sm" }), "inline-flex items-center gap-1.5")}
    >
      <Plus className="size-4" aria-hidden="true" />
      Create Workspace
    </Link>
  );
}
