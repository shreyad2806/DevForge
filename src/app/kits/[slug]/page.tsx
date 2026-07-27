import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Box,
  Cloud,
  Cpu,
  CreditCard,
  Database,
  Download,
  Globe,
  Layers,
  Lock,
  Mail,
  MessageSquare,
  Shield,
  Smartphone,
  Star,
  Upload,
  User,
  Zap,
  Key,
} from "lucide-react";

import { CodePreview } from "@/features/landing/components/CodePreview";
import { ForgeKitCard } from "@/components/forge-kit/ForgeKitCard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { fetchExploreKits, fetchForgeKitBySlug } from "@/lib/data/forge-kits";
import type { ForgeKit } from "@/data/forge-kits";
import {
  getCodePreview,
  getOverview,
  getExample,
  getApi,
  getReviews,
} from "@/lib/data/kit-detail";
import { cn } from "@/lib/utils";

interface KitDetailPageProps {
  params: Promise<{ slug: string }>;
}

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

export default async function KitDetailPage({ params }: KitDetailPageProps) {
  const { slug } = await params;
  const kit = await fetchForgeKitBySlug(slug);

  if (!kit) {
    notFound();
  }

  let relatedKits: ForgeKit[] = [];
  try {
    const all = await fetchExploreKits();
    const same = all.filter((k) => k.id !== kit.id && k.category === kit.category);
    const others = all.filter((k) => k.id !== kit.id && k.category !== kit.category);
    relatedKits = [...same, ...others].slice(0, 3);
  } catch {
    relatedKits = [];
  }

  const { fileTree, code } = getCodePreview(kit);
  const MainIcon = iconMap[kit.icon as keyof typeof iconMap] ?? Box;
  const badge = kit.isPremium ? "Premium" : kit.isPopular ? "Popular" : undefined;

  return (
    <main className="min-h-screen bg-background p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Explore
        </Link>

        <section className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <MainIcon className="size-7" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">{kit.title}</h1>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {kit.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="outline">{kit.category}</Badge>
                {badge && <Badge>{badge}</Badge>}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="size-3.5 text-amber-400" aria-hidden="true" />
                  <span className="font-medium text-foreground">{kit.rating}</span>
                  {kit.reviews !== undefined && <span>({kit.reviews})</span>}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Download className="size-3.5" aria-hidden="true" />
                  <span>{kit.downloads} downloads</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList variant="line" className="w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="example">Example</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            {getOverview(kit)}
          </TabsContent>
          <TabsContent value="files" className="mt-6">
            <CodePreview
              title={kit.title}
              badge={badge}
              rating={String(kit.rating)}
              reviews={kit.reviews}
              frameworkTags={kit.frameworkTags ?? []}
              fileTree={fileTree}
              code={code}
              tabs={[]}
            />
          </TabsContent>
          <TabsContent value="example" className="mt-6">
            {getExample(kit)}
          </TabsContent>
          <TabsContent value="api" className="mt-6">
            {getApi(kit)}
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            {getReviews(kit)}
          </TabsContent>
        </Tabs>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Zap className="size-4 text-primary" aria-hidden="true" />
                  Installation
                </CardTitle>
                <CardDescription>Get {kit.title} running in your workspace.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted p-3 font-mono text-xs">
                  npm install @devforge/{kit.slug}
                </div>
                <div className="grid gap-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Box className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-foreground">Framework</p>
                      <p className="text-xs text-muted-foreground">Next.js 15+</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Layers className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-foreground">Dependencies</p>
                      <p className="text-xs text-muted-foreground">
                        {(kit.frameworkTags ?? []).join(", ") || "None"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-foreground">Compatibility</p>
                      <p className="text-xs text-muted-foreground">React 19+, TypeScript 5.7+</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {relatedKits.length > 0 && (
              <section aria-labelledby="related-kits-title">
                <div className="flex items-center justify-between">
                  <h2 id="related-kits-title" className="text-base font-semibold text-foreground">
                    Related Kits
                  </h2>
                  <Link
                    href="/explore"
                    className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    View all
                  </Link>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {relatedKits.map((related) => (
                    <ForgeKitCard key={related.id} kit={related} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Cloud className="size-4 text-primary" aria-hidden="true" />
                  DevForge AI
                </CardTitle>
                <CardDescription>Suggestions for this kit</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  {kit.title} works best when paired with the{" "}
                  {kit.frameworkTags && kit.frameworkTags.length > 0
                    ? kit.frameworkTags[0]
                    : "latest"}{" "}
                  stack. Enable <span className="font-medium text-foreground">DevForge AI</span> in your
                  workspace to auto-generate tests and deployment configs for this kit.
                </p>
                <ul className="mt-4 space-y-2 text-xs">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Auto scaffold routes and handlers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Generate environment variable checklist
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Recommend compatible kits
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
