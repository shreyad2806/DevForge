import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { FadeInView } from "@/components/motion/FadeInView";
import { fetchForgeKitBySlug } from "@/lib/data/forge-kits";

interface KitDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function KitDetailPage({ params }: KitDetailPageProps) {
  const { slug } = await params;
  const kit = await fetchForgeKitBySlug(slug);

  if (!kit) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
      <FadeInView direction="up" distance={16}>
        <h1 className="text-3xl font-semibold text-foreground">{kit.title}</h1>
        <p className="mt-2 text-muted-foreground">{kit.description}</p>
        <div className="mt-6">
          <Link href="/explore">
            <Button className="rounded-lg">Back to Explore</Button>
          </Link>
        </div>
      </FadeInView>
    </main>
  );
}
