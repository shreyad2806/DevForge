"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeInView } from "@/components/motion/FadeInView";

export default function KitDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
      <FadeInView direction="up" distance={16}>
        <h1 className="text-3xl font-semibold text-foreground">Kit Detail</h1>
        <p className="mt-2 text-muted-foreground">
          Placeholder detail page for <span className="text-primary">{slug}</span>.
        </p>
        <div className="mt-6">
          <Link href="/explore">
            <Button className="rounded-lg">Back to Explore</Button>
          </Link>
        </div>
      </FadeInView>
    </main>
  );
}
