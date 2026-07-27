"use client";

import { cn } from "@/lib/utils";

interface BillingToggleProps {
  isYearly?: boolean;
  onToggle?: (isYearly: boolean) => void;
  className?: string;
}

export function BillingToggle({
  isYearly = false,
  onToggle,
  className,
}: BillingToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border/60 bg-card p-1",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onToggle?.(false)}
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
          !isYearly
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onToggle?.(true)}
        className={cn(
          "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
          isYearly
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Yearly
        <span className="absolute -right-1 -top-1.5 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[8px] font-semibold text-emerald-400">
          Save 20%
        </span>
      </button>
    </div>
  );
}
