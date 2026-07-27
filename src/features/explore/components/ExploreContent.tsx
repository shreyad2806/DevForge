"use client";

import { useEffect, useMemo, useState } from "react";
import { PackageOpen } from "lucide-react";

import type { ForgeKit } from "@/data/forge-kits";
import { createClient } from "@/lib/supabase/client";
import { SearchBar } from "./SearchBar";
import { CategorySidebar } from "./CategorySidebar";
import { Filters } from "./Filters";
import { KitGrid } from "./KitGrid";
import { Pagination } from "./Pagination";

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

function parseDownloads(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)(K?)$/i);
  if (match) {
    let n = parseFloat(match[1]);
    if (match[2].toLowerCase() === "k") n *= 1000;
    return n;
  }
  const n = parseInt(value, 10);
  return isNaN(n) ? 0 : n;
}

interface ExploreContentProps {
  kits: ForgeKit[];
  initialFavoriteIds: string[];
  userId?: string;
}

export function ExploreContent({
  kits,
  initialFavoriteIds,
  userId,
}: ExploreContentProps) {
  const [allKits] = useState(kits);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(
    new Set(initialFavoriteIds)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Kits");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, activeFilter, activeCategory]);

  const handleFavoriteToggle = async (kitId: string) => {
    if (!userId) return;

    const supabase = createClient();
    const isFavorited = favoriteIds.has(kitId);
    let ok = false;

    if (isFavorited) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("kit_id", kitId);
      ok = !error;
    } else {
      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: userId, kit_id: kitId });
      ok = !error;
    }

    if (ok) {
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        if (isFavorited) next.delete(kitId);
        else next.add(kitId);
        return next;
      });
    }
  };

  const filteredKits = useMemo(() => {
    const query = debouncedQuery.toLowerCase();
    return allKits
      .filter((kit) => {
        if (activeCategory !== "All" && kit.category !== activeCategory) {
          return false;
        }
        if (activeFilter === "Premium" && !kit.isPremium) return false;
        if (activeFilter === "Free" && kit.isPremium) return false;
        if (query) {
          return (
            kit.title.toLowerCase().includes(query) ||
            kit.description.toLowerCase().includes(query) ||
            kit.category.toLowerCase().includes(query)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (activeFilter === "Popular") {
          return parseDownloads(b.downloads) - parseDownloads(a.downloads);
        }
        return 0;
      })
      .map((kit) => ({
        ...kit,
        isFavorite: favoriteIds.has(kit.id),
      }));
  }, [allKits, activeCategory, activeFilter, debouncedQuery, favoriteIds]);

  const totalPages = Math.max(1, Math.ceil(filteredKits.length / 6));
  const paginatedKits = filteredKits.slice(
    (currentPage - 1) * 6,
    currentPage * 6
  );

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
          <SearchBar onChange={setSearchQuery} />
          <Filters active={activeFilter} onSelect={setActiveFilter} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-4">
          <CategorySidebar
            className="h-fit"
            kits={allKits}
            active={activeCategory}
            onSelect={setActiveCategory}
          />
          <div className="flex flex-col gap-6 lg:col-span-3">
            {paginatedKits.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <KitGrid
                  kits={paginatedKits}
                  onToggleFavorite={handleFavoriteToggle}
                />
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
