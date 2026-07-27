import { Code } from "lucide-react";

interface BrandSectionProps {
  tagline?: string;
}

export function BrandSection({
  tagline = "Production-ready Forge Kits for Developers",
}: BrandSectionProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground shadow-lg shadow-primary/20">
        <Code className="size-6" aria-hidden="true" />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-foreground">DevForge</h1>
      <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>
    </div>
  );
}
