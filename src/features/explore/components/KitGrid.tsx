"use client";

import type { ForgeKit } from "@/data/forge-kits";
import { ForgeKitCard } from "@/components/forge-kit/ForgeKitCard";

interface KitGridProps {
  kits: ForgeKit[];
  onToggleFavorite?: (id: string) => void;
}

export function KitGrid({ kits, onToggleFavorite }: KitGridProps) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      aria-label="Forge kits grid"
    >
      {kits.map((kit) => (
        <ForgeKitCard
          key={kit.id}
          kit={kit}
          onToggle={() => onToggleFavorite?.(kit.id)}
        />
      ))}
    </div>
  );
}
