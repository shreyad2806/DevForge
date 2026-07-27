"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  CreditCard,
  Lock,
  Upload,
  Mail,
  Cloud,
  Database,
  MessageSquare,
  Zap,
  Key,
  User,
  Globe,
  Smartphone,
  Cpu,
  Layers,
  Box,
  Calendar,
  Trash2,
  Plus,
} from "lucide-react";

import type { ForgeKit } from "@/data/forge-kits";
import type { WorkspaceDetail as WorkspaceDetailType } from "@/lib/data/workspaces";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const iconMap = {
  Shield,
  CreditCard,
  Lock,
  Upload,
  Mail,
  Cloud,
  Database,
  MessageSquare,
  Zap,
  Key,
  User,
  Globe,
  Smartphone,
  Cpu,
  Layers,
  Box,
};

interface WorkspaceDetailProps {
  workspace: WorkspaceDetailType;
  kits: ForgeKit[];
  allKits: ForgeKit[];
  userId: string;
}

export function WorkspaceDetail({
  workspace,
  kits,
  allKits,
  userId,
}: WorkspaceDetailProps) {
  const router = useRouter();
  const [selectedKitId, setSelectedKitId] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  const availableKits = useMemo(
    () => allKits.filter((k) => !kits.some((wk) => wk.id === k.id)),
    [allKits, kits]
  );

  const handleAdd = async () => {
    if (!selectedKitId) return;
    setIsAdding(true);
    const supabase = createClient();
    const { error } = await supabase.from("workspace_kits").insert({
      workspace_id: workspace.id,
      kit_id: selectedKitId,
      user_id: userId,
    });
    if (!error) {
      setSelectedKitId("");
      router.refresh();
    }
    setIsAdding(false);
  };

  const handleRemove = async (kitId: string) => {
    setIsRemoving(kitId);
    const supabase = createClient();
    await supabase
      .from("workspace_kits")
      .delete()
      .eq("workspace_id", workspace.id)
      .eq("kit_id", kitId)
      .eq("user_id", userId);
    setIsRemoving(null);
    router.refresh();
  };

  return (
    <div className="mt-6 space-y-6">
      <section className="rounded-2xl border border-border/60 bg-card p-5">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex size-14 items-center justify-center rounded-2xl text-lg font-semibold",
              workspace.iconColor
            )}
          >
            {workspace.name[0]?.toUpperCase() ?? "W"}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-foreground">
              {workspace.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {workspace.description || "No description provided."}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="size-3.5" aria-hidden="true" />
              <span>Created {workspace.createdAt}</span>
              <span className="mx-1">·</span>
              <span>{workspace.kitsCount} kits</span>
            </div>
          </div>
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Kits in this workspace</CardTitle>
        </CardHeader>
        <CardContent>
          {kits.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No kits yet. Add a Forge Kit below.
            </p>
          ) : (
            <ul className="space-y-3">
              {kits.map((kit) => {
                const Icon = iconMap[kit.icon as keyof typeof iconMap] ?? Box;
                return (
                  <li
                    key={kit.id}
                    className="flex items-center justify-between rounded-xl border border-border/40 bg-background/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {kit.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {kit.category}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive/80"
                      disabled={isRemoving === kit.id}
                      onClick={() => handleRemove(kit.id)}
                    >
                      <Trash2 className="mr-1 size-3.5" aria-hidden="true" />
                      Remove
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add a Kit</CardTitle>
        </CardHeader>
        <CardContent>
          {availableKits.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              All available kits are already in this workspace.
            </p>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label
                  htmlFor="kit-select"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Select Forge Kit
                </label>
                <select
                  id="kit-select"
                  value={selectedKitId}
                  onChange={(e) => setSelectedKitId(e.target.value)}
                  className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                >
                  <option value="">Select a kit</option>
                  {availableKits.map((kit) => (
                    <option key={kit.id} value={kit.id}>
                      {kit.title}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                onClick={handleAdd}
                disabled={!selectedKitId || isAdding}
                className="shrink-0"
              >
                <Plus className="mr-1 size-4" aria-hidden="true" />
                {isAdding ? "Adding..." : "Add Kit"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
