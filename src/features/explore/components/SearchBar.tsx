"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SearchBarProps {
  className?: string;
  onChange?: (value: string) => void;
}

export function SearchBar({ className, onChange }: SearchBarProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => onChange?.(value), 300);
    return () => clearTimeout(timeout);
  }, [value, onChange]);

  return (
    <div className={"relative flex w-full max-w-2xl items-center " + (className ?? "")}>
      <Search className="absolute left-3 size-4 text-muted-foreground" aria-hidden="true" />
      <Input
        type="search"
        placeholder="Search forge kits, docs..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-10 w-full rounded-xl border-border/60 bg-background pl-10 pr-16 text-sm"
      />
      <span className="absolute right-3 rounded-md border border-border/60 bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
        ⌘K
      </span>
    </div>
  );
}
