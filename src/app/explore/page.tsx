import { AlertCircle, PackageOpen } from "lucide-react";

import type { ForgeKit } from "@/data/forge-kits";
import { fetchExploreKits } from "@/lib/data/forge-kits";
import { SearchBar } from "@/features/explore/components/SearchBar";
import { CategorySidebar } from "@/features/explore/components/CategorySidebar";
import { Filters } from "@/features/explore/components/Filters";
import { KitGrid } from "@/features/explore/components/KitGrid";
import { Pagination } from "@/features/explore/components/Pagination";

function EmptyState() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-2xl border border-border/60 bg-card p-6 text-center">
      <PackageOpen className="size-10 text-muted-foreground" aria-hidden="true" />
      <div>
        <p className="text-base font-semibold text-foreground">No kits found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          There are no forge kits to explore right now.
        </p>
      </div>
    </div>
  );
}

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
    errorMessage = e instanceof Error ? e.message : "Something went wrong while loading kits.";
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Explore Kits
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse production-ready kits for authentication, payments, storage, and more.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <SearchBar />
          <Filters />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-4">
          <CategorySidebar className="h-fit" kits={kits} />
          <div className="flex flex-col gap-6 lg:col-span-3">
            {errorMessage ? (
              <ErrorState message={errorMessage} />
            ) : kits.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <KitGrid kits={kits} />
                <Pagination />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
