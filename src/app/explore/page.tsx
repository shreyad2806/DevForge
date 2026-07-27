import { AlertCircle } from "lucide-react";

import type { ForgeKit } from "@/data/forge-kits";
import { createClient } from "@/lib/supabase/server";
import { fetchExploreKits } from "@/lib/data/forge-kits";
import { ExploreContent } from "@/features/explore/components/ExploreContent";

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
      <AlertCircle className="size-10 text-destructive" aria-hidden="true" />
      <div>
        <p className="text-base font-semibold text-foreground">Could not load kits</p>
        <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export default async function ExplorePage() {
  let kits: ForgeKit[] = [];
  let errorMessage: string | null = null;

  try {
    kits = await fetchExploreKits();
  } catch (e) {
    errorMessage =
      e instanceof Error ? e.message : "Something went wrong while loading kits.";
  }

  if (errorMessage) {
    return <ErrorState message={errorMessage} />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let favoriteIds: string[] = [];
  if (user) {
    const { data } = await supabase
      .from("favorites")
      .select("kit_id")
      .eq("user_id", user.id);
    favoriteIds = data?.map((row) => String(row.kit_id)) ?? [];
  }

  return (
    <ExploreContent
      kits={kits}
      initialFavoriteIds={favoriteIds}
      userId={user?.id}
    />
  );
}
