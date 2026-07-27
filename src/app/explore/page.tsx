import { exploreKits } from "@/data/forge-kits";
import { SearchBar } from "@/features/explore/components/SearchBar";
import { CategorySidebar } from "@/features/explore/components/CategorySidebar";
import { Filters } from "@/features/explore/components/Filters";
import { KitGrid } from "@/features/explore/components/KitGrid";
import { Pagination } from "@/features/explore/components/Pagination";

export default function ExplorePage() {
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
          <CategorySidebar className="h-fit" />
          <div className="flex flex-col gap-6 lg:col-span-3">
            <KitGrid kits={exploreKits} />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
