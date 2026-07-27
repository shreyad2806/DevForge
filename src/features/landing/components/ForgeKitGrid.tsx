"use client";

import { forgeKits } from "@/data/forge-kits";
import { SectionHeader } from "./SectionHeader";
import { KitCard } from "./KitCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";

export function ForgeKitGrid({ className }: { className?: string }) {
  return (
    <section className={cn("w-full bg-background py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <SectionHeader
          title="Popular Forge Kits"
          description="Skip the boilerplate. Drop these production-ready blocks into your project and ship today."
          action={{ label: "View All Kits", href: "/explore" }}
        />

        <StaggerContainer
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          staggerDelay={0.06}
        >
          {forgeKits.map((kit) => (
            <StaggerItem key={kit.id}>
              <KitCard kit={kit} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
