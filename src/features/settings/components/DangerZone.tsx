"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard } from "@/components/motion/HoverCard";
import { FadeInView } from "@/components/motion/FadeInView";

export function DangerZone() {
  return (
    <FadeInView direction="up" distance={16} duration={0.4} delay={0.15}>
      <HoverCard scale={1.005} y={-2}>
        <div className="rounded-2xl border border-red-500/20 bg-card p-5 transition-colors">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 size-5 text-red-400" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold text-red-400">Danger Zone</h2>
                <p className="text-xs text-muted-foreground">
                  These actions are irreversible. Please proceed with caution.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="rounded-lg border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-400"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </HoverCard>
    </FadeInView>
  );
}
