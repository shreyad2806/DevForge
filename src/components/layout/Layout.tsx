import { cn } from "@/lib/utils";
import { type ElementType, type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  container?: boolean;
  as?: ElementType;
}

export function Layout({
  children,
  className,
  container = true,
  as: Component = "main",
}: LayoutProps) {
  return (
    <Component
      className={cn(
        "w-full flex-1",
        container &&
          "mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12",
        className
      )}
    >
      {children}
    </Component>
  );
}
