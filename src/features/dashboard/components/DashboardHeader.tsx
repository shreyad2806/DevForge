"use client";

interface DashboardHeaderProps {
  name: string;
  subtitle: string;
}

export function DashboardHeader({ name, subtitle }: DashboardHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Welcome back, {name}! <span aria-hidden="true">👋</span>
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}
