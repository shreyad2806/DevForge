import { createClient } from "@/lib/supabase/server";
import type { ForgeKit } from "@/data/forge-kits";

function mapForgeKitRow(row: unknown): ForgeKit {
  const r = row as Record<string, unknown>;
  return {
    id: String(r.id),
    slug: String(r.slug ?? ""),
    title: String(r.title ?? ""),
    description: String(r.description ?? ""),
    category: String(r.category ?? ""),
    downloads: String(r.downloads ?? ""),
    rating: Number(r.rating ?? 0),
    reviews: r.reviews === null || r.reviews === undefined ? undefined : Number(r.reviews),
    icon: String(r.icon ?? "Box") as ForgeKit["icon"],
    frameworkTags: Array.isArray(r.framework_tags) ? (r.framework_tags as string[]) : [],
    isPremium: Boolean(r.is_premium ?? false),
    isPopular: Boolean(r.is_popular ?? false),
    isFavorite: Boolean(r.is_favorite ?? false),
    createdAt: r.created_at ? String(r.created_at) : undefined,
  };
}

export async function fetchExploreKits(): Promise<ForgeKit[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("forge_kits").select("*");

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return [];

  return data.map(mapForgeKitRow);
}

export async function fetchForgeKitBySlug(slug: string): Promise<ForgeKit | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("forge_kits")
    .select("*")
    .eq("slug", slug)
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) return null;

  return mapForgeKitRow(data[0]);
}
