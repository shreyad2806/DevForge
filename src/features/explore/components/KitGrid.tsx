"use client";

import type { ForgeKit } from "@/data/forge-kits";
import { ForgeKitCard } from "@/components/forge-kit/ForgeKitCard";

interface KitGridProps {
  kits: ForgeKit[];
}

export function KitGrid({ kits }: KitGridProps) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      aria-label="Forge kits grid"
    >
      {kits.map((kit) => (
        <ForgeKitCard key={kit.id} kit={kit} />
      ))}
    </div>
  );
}
