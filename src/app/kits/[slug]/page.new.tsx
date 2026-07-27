import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
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
  Star,
  Download,
  Terminal,
  Wrench,
  Lightbulb,
} from "lucide-react";

import { CodePreview } from "@/features/landing/components/CodePreview";
import { ForgeKitCard } from "@/components/forge-kit/ForgeKitCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchExploreKits, fetchForgeKitBySlug } from "@/lib/data/forge-kits";
import type { ForgeKit } from "@/data/forge-kits";
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

type PreviewNode = {
  name: string;
  type: "folder" | "file";
  active?: boolean;
  children?: PreviewNode[];
};

function getCodePreview(kit: ForgeKit): { fileTree: PreviewNode[]; code: string } {
  const title = kit.title.toLowerCase();
  const category = kit.category.toLowerCase();
  const name = kit.title.replace(/\s+Kit$/i, "");

  if (title.includes("jwt") || title.includes("auth") || category.includes("authentication")) {
    return {
      fileTree: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "app", type: "folder" },
            { name: "middleware.ts", type: "file", active: true },
            { name: "api", type: "folder" },
            { name: "auth", type: "folder" },
            { name: "route.ts", type: "file" },
            { name: "lib", type: "folder" },
            { name: "auth.ts", type: "file" },
          ],
        },
      ],
      code: `import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("access_token")?.value;
    const user = await verifyAccessToken(token);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}`,
    };
  }

  if (title.includes("stripe") || category.includes("payment")) {
    return {
      fileTree: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "app", type: "folder" },
            { name: "api", type: "folder" },
            { name: "checkout", type: "folder" },
            { name: "route.ts", type: "file", active: true },
            { name: "lib", type: "folder" },
            { name: "stripe.ts", type: "file" },
          ],
        },
      ],
      code: `import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const session = await stripe.checkout.sessions.create({
    line_items: body.items,
    mode: "subscription",
    success_url: \`/success?session_id={CHECKOUT_SESSION_ID}\`,
    cancel_url: "/checkout/cancel",
  });

  return NextResponse.json({ url: session.url });
}`,
    };
  }

  if (title.includes("rbac") || title.includes("role") || title.includes("permission")) {
    return {
      fileTree: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "lib", type: "folder" },
            { name: "permissions.ts", type: "file" },
            { name: "roles.ts", type: "file", active: true },
            { name: "middleware", type: "folder" },
            { name: "rbac.ts", type: "file" },
          ],
        },
      ],
      code: `import { definePermission } from "@/lib/rbac";

export const Permissions = {
  users: {
    read: definePermission("users:read"),
    create: definePermission("users:create"),
    delete: definePermission("users:delete"),
  },
  billing: {
    read: definePermission("billing:read"),
    manage: definePermission("billing:manage"),
  },
} as const;

export const Roles = {
  Admin: [Permissions.users.delete, Permissions.billing.manage],
  Editor: [Permissions.users.create, Permissions.billing.read],
  Viewer: [Permissions.users.read],
};`,
    };
  }

  if (title.includes("s3") || title.includes("upload") || category.includes("storage")) {
    return {
      fileTree: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "app", type: "folder" },
            { name: "api", type: "folder" },
            { name: "upload", type: "folder" },
            { name: "route.ts", type: "file", active: true },
            { name: "lib", type: "folder" },
            { name: "s3.ts", type: "file" },
          ],
        },
      ],
      code: `import { NextRequest, NextResponse } from "next/server";
import { getSignedUrl } from "@/lib/s3";

export async function POST(request: NextRequest) {
  const { filename, contentType } = await request.json();

  const { url, key } = await getSignedUrl({
    key: \`uploads/\${crypto.randomUUID()}/\${filename}\`,
    contentType,
    expiresIn: 300,
  });

  return NextResponse.json({ uploadUrl: url, key });
}`,
    };
  }

  if (title.includes("email") || category.includes("communication")) {
    return {
      fileTree: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "lib", type: "folder" },
            { name: "email.ts", type: "file" },
            { name: "templates", type: "folder" },
            { name: "verify.tsx", type: "file" },
            { name: "api", type: "folder" },
            { name: "send", type: "folder" },
            { name: "route.ts", type: "file", active: true },
          ],
        },
      ],
      code: `import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const token = await createVerificationToken(email);
  await sendVerificationEmail({
    to: email,
    subject: "Verify your email",
    url: \`/verify?token=\${token}\`,
  });

  return NextResponse.json({ success: true });
}`,
    };
  }

  if (title.includes("chat") || title.includes("realtime") || category.includes("ai")) {
    return {
      fileTree: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "app", type: "folder" },
            { name: "api", type: "folder" },
            { name: "chat", type: "folder" },
            { name: "route.ts", type: "file", active: true },
            { name: "lib", type: "folder" },
            { name: "socket.ts", type: "file" },
          ],
        },
      ],
      code: `import { NextRequest, NextResponse } from "next/server";
import { sendMessage, getRoomHistory } from "@/lib/chat";

export async function GET(request: NextRequest, { params }: { params: { roomId: string } }) {
  const messages = await getRoomHistory(params.roomId);
  return NextResponse.json({ messages });
}

export async function POST(request: NextRequest, { params }: { params: { roomId: string } }) {
  const { text, userId } = await request.json();
  const message = await sendMessage(params.roomId, { text, userId });
  return NextResponse.json({ message });
}`,
    };
  }

  return {
    fileTree: [
      {
        name: "src",
        type: "folder",
        children: [
          { name: "app", type: "folder" },
          { name: "api", type: "folder" },
          { name: name.toLowerCase().replace(/\s+/g, "-"), type: "folder" },
          { name: "route.ts", type: "file", active: true },
          { name: "lib", type: "folder" },
          { name: `${name.toLowerCase().replace(/\s+/g, "-")}.ts`, type: "file" },
        ],
      },
    ],
    code: `import { NextRequest, NextResponse } from "next/server";
import { create${name.replace(/\s+/g, "")}Handler } from "@/lib/${name.toLowerCase().replace(/\s+/g, "-")}";

const handler = create${name.replace(/\s+/g, "")}Handler({
  debug: process.env.NODE_ENV === "development",
});

export async function GET(request: NextRequest) {
  const result = await handler.run(request);
  return NextResponse.json({ success: true, data: result });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await handler.create(body);
  return NextResponse.json({ success: true, data: result });
}`,
  };
}

export default async function KitDetailPage({ params }: KitDetailPageProps) {
  const { slug } = await params;
  const kit = await fetchForgeKitBySlug(slug);

  if (!kit) {
    notFound();
  }

  let relatedKits: ForgeKit[] = [];
  try {
    const all = await fetchExploreKits();
    relatedKits = all
      .filter((k) => k.id !== kit.id && (k.category === kit.category || k.isPopular || k.isPremium))
      .slice(0, 3);
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

        <div className="mt-6">
          <CodePreview
            title={kit.title}
            badge={badge}
            rating={String(kit.rating)}
            reviews={kit.reviews}
            frameworkTags={kit.frameworkTags ?? []}
            fileTree={fileTree}
            code={code}
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Terminal className="size-4 text-primary" aria-hidden="true" />
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
                    <Wrench className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-foreground">Framework</p>
                      <p className="text-xs text-muted-foreground">
                        {kit.category === "AI" || kit.category === "Communication" ? "Node.js / Edge" : "Next.js 15+"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Box className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
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
                  <Lightbulb className="size-4 text-amber-400" aria-hidden="true" />
                  AI Assistant
                </CardTitle>
                <CardDescription>Suggestions for this kit</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  {kit.title} works best when paired with the{" "}
                  {kit.frameworkTags && kit.frameworkTags.length > 0
                    ? kit.frameworkTags[0]
                    : "latest"}{" "}
                  stack. Enable <span className="font-medium text-foreground">DevForge AI</span> in
                  your workspace to auto-generate tests and deployment configs for this kit.
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
