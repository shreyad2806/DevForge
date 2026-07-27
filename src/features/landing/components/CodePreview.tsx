"use client";

import { Folder, FileCode, Star, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileNode {
  name: string;
  type: "folder" | "file";
  active?: boolean;
  children?: FileNode[];
}

const defaultFileTree: FileNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      { name: "app", type: "folder" },
      { name: "middleware.ts", type: "file", active: true },
      { name: "api", type: "folder" },
      { name: "route.ts", type: "file" },
      { name: "lib", type: "folder" },
      { name: "auth.ts", type: "file" },
    ],
  },
];

interface CodePreviewProps {
  className?: string;
  title?: string;
  badge?: string;
  rating?: string;
  reviews?: number;
  frameworkTags?: string[];
  fileTree?: FileNode[];
  code?: string;
  tabs?: string[];
  activeTab?: string;
  isLocked?: boolean;
}

function FileTreeItem({
  node,
  depth = 0,
}: {
  node: FileNode;
  depth?: number;
}) {
  return (
    <div className={cn("select-none", depth > 0 && "ml-4 pl-2 border-l border-border/40")}>
      <div
        className={cn(
          "flex items-center gap-2 py-1 text-xs font-medium",
          node.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {node.type === "folder" ? (
          <>
            <ChevronRight className="size-3 text-muted-foreground" aria-hidden="true" />
            <Folder className="size-3.5 text-primary/80" aria-hidden="true" />
          </>
        ) : (
          <FileCode className="ml-4 size-3.5 text-muted-foreground" aria-hidden="true" />
        )}
        <span>{node.name}</span>
      </div>
      {node.children &&
        node.children.map((child, index) => <FileTreeItem key={`${child.name}-${index}`} node={child} depth={depth + 1} />)}
    </div>
  );
}

export function CodePreview({
  className,
  title = "JWT Authentication Kit",
  badge = "Most Popular",
  rating = "4.9",
  reviews = 288,
  frameworkTags = ["TypeScript", "Next.js", "Bcrypt", "Tests Included"],
  fileTree = defaultFileTree,
  code,
  tabs = ["Description", "Files", "Example", "API Reference", "Reviews"],
  activeTab = "Example",
  isLocked = false,
}: CodePreviewProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border/60 bg-card p-1 shadow-2xl",
        className
      )}
    >
      {/* Purple glow */}
      <div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="rounded-xl bg-card p-4">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <div className="mt-1 flex items-center gap-2">
                {badge && (
                  <Badge
                    variant="default"
                    className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] text-primary hover:bg-primary/20"
                  >
                    {badge}
                  </Badge>
                )}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="size-3 fill-amber-500 text-amber-500" aria-hidden="true" />
                  <span className="font-medium text-foreground">{rating}</span>
                  {reviews !== undefined && <span>({reviews})</span>}
                </div>
              </div>
            </div>
          </div>
          <Button size="sm" className="w-full sm:w-auto" disabled={isLocked}>
            Add to Workspace
          </Button>
        </div>

        {/* Tabs */}
        <div className="mt-5 flex items-center gap-4 border-b border-border/40 text-xs font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={cn(
                "pb-2.5 transition-colors",
                tab === activeTab
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="mt-4 grid min-h-[320px] gap-4 rounded-lg border border-border/40 bg-background/50 p-3 font-mono text-xs md:grid-cols-[180px_1fr]">
          {/* Sidebar */}
          <div className="hidden rounded-md border-r border-border/40 pr-3 md:block">
            {fileTree.map((node, index) => (
              <FileTreeItem key={`${node.name}-${index}`} node={node} />
            ))}
          </div>

          {/* Code */}
          <div className="overflow-x-auto">
            <div className="flex flex-wrap items-center gap-2 border-b border-border/40 pb-2 text-[10px] text-muted-foreground">
              {frameworkTags.map((tag) => (
                <span key={tag} className="rounded bg-muted px-1.5 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
            {code ? (
              <pre className="mt-3 leading-5 text-foreground">
                <code>{code}</code>
              </pre>
            ) : (
              <pre className="mt-3 leading-5 text-foreground">
                <code>
                  <span className="text-purple-400">import</span>{" "}
                  <span className="text-foreground">{"{"}</span> NextRequest, NextResponse{" "}
                  <span className="text-foreground">{"}"}</span>{" "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-green-400">&quot;next/server&quot;</span>
                  {"\n"}
                  <span className="text-purple-400">import</span>{" "}
                  <span className="text-foreground">{"{"}</span> verifyAccessToken{" "}
                  <span className="text-foreground">{"}"}</span>{" "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-green-400">&quot;@/lib/auth&quot;</span>
                  {"\n\n"}
                  <span className="text-purple-400">export async function</span>{" "}
                  <span className="text-blue-400">GET</span>
                  <span className="text-foreground">(request: NextRequest) {"{"}</span>
                  {"\n"}
                  {"  "}
                  <span className="text-purple-400">try</span>
                  <span className="text-foreground">{" {"}</span>
                  {"\n"}
                  {"    "}
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-foreground">token</span>{" "}
                  <span className="text-purple-400">=</span>{" "}
                  <span className="text-foreground">request</span>
                  <span className="text-muted-foreground">.cookies.</span>
                  <span className="text-blue-400">get</span>
                  <span className="text-foreground">(</span>
                  <span className="text-green-400">&quot;access_token&quot;</span>
                  <span className="text-foreground">)</span>
                  {"\n"}
                  {"    "}
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-foreground">user</span>{" "}
                  <span className="text-purple-400">=</span>{" "}
                  <span className="text-purple-400">await</span>{" "}
                  <span className="text-blue-400">verifyAccessToken</span>
                  <span className="text-foreground">(token?.value)</span>
                  {"\n"}
                  {"\n"}
                  {"    "}
                  <span className="text-purple-400">if</span>{" "}
                  <span className="text-foreground">(!user)</span>
                  <span className="text-purple-400"> return</span>{" "}
                  <span className="text-blue-400">NextResponse</span>
                  <span className="text-foreground">.</span>
                  <span className="text-blue-400">json</span>
                  <span className="text-foreground">({"{"} error: </span>
                  <span className="text-green-400">&quot;Unauthorized&quot;</span>
                  <span className="text-foreground"> {"}"})</span>
                  {"\n"}
                  {"\n"}
                  {"    "}
                  <span className="text-purple-400">return</span>{" "}
                  <span className="text-blue-400">NextResponse</span>
                  <span className="text-foreground">.</span>
                  <span className="text-blue-400">json</span>
                  <span className="text-foreground">({"{"} user {"}"})</span>
                  {"\n"}
                  {"  "}
                  <span className="text-foreground">{"}"}</span>{" "}
                  <span className="text-purple-400">catch</span>
                  <span className="text-foreground">(error) {"{"}</span>
                  {"\n"}
                  {"    "}
                  <span className="text-purple-400">return</span>{" "}
                  <span className="text-blue-400">NextResponse</span>
                  <span className="text-foreground">.</span>
                  <span className="text-blue-400">json</span>
                  <span className="text-foreground">({"{"} error: </span>
                  <span className="text-green-400">&quot;Invalid token&quot;</span>
                  <span className="text-foreground"> {"}"}, {"{"} status: 401 {"}"})</span>
                  {"\n"}
                  {"  "}
                  <span className="text-foreground">{"}"}</span>
                  {"\n"}
                  <span className="text-foreground">{"}"}</span>
                </code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
