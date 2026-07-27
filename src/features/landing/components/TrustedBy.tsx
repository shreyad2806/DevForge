"use client";

import { trustedByLogos } from "@/data/trusted-by";
import { FadeInView } from "@/components/motion/FadeInView";
import { cn } from "@/lib/utils";

function Logo({ name }: { name: string }) {
  switch (name) {
    case "Vercel":
      return (
        <svg viewBox="0 0 76 18" fill="currentColor" className="h-5" aria-label="Vercel">
          <path d="M8 0 16 16H0L8 0z" transform="translate(0,1)" />
          <text x="22" y="12" fontSize="12" fontWeight="600" fill="currentColor">
            Vercel
          </text>
        </svg>
      );
    case "Linear":
      return (
        <svg viewBox="0 0 70 18" fill="currentColor" className="h-5" aria-label="Linear">
          <rect x="0" y="4" width="12" height="12" rx="3" transform="rotate(-15 6 10)" />
          <text x="18" y="13" fontSize="12" fontWeight="600" fill="currentColor">
            Linear
          </text>
        </svg>
      );
    case "Supabase":
      return (
        <svg viewBox="0 0 90 18" fill="currentColor" className="h-5" aria-label="Supabase">
          <path d="M14 18a6 6 0 0 1-6-6V0l8.5 8.5A6 6 0 0 1 14 18z" />
          <path d="M2 0a6 6 0 0 1 6 6v12L-.5 9.5A6 6 0 0 1 2 0z" fillOpacity="0.6" />
          <text x="22" y="13" fontSize="12" fontWeight="600" fill="currentColor">
            Supabase
          </text>
        </svg>
      );
    case "Docker":
      return (
        <svg viewBox="0 0 80 18" fill="currentColor" className="h-5" aria-label="Docker">
          <path d="M0 7h2v3H0V7zm3-2h2v3H3V5zm3 0h2v3H6V5zm3 0h2v3H9V5zm-6 3h2v3H3V8zm3 0h2v3H6V8zm3 0h2v3H9V8zm3-3h2v3h-2V5z" />
          <path d="M14 9h-1v4h1V9z" />
          <text x="22" y="13" fontSize="12" fontWeight="600" fill="currentColor">
            Docker
          </text>
        </svg>
      );
    case "Tailwind":
      return (
        <svg viewBox="0 0 90 18" fill="currentColor" className="h-5" aria-label="Tailwind">
          <path d="M10 5c-2 0-3.5 1.5-4 3-1-.5-2-.5-2.5 0-.5 1.5 0 3 2 3.5 2 .5 4-.5 5-2 .5 1 1.5 2 3.5 2 2.5 0 4-1.5 4-4 0-2-1.5-3.5-4-3-1.5 0-3 1-3.5 2-.5-1-2-1.5-3-1.5z" />
          <text x="24" y="13" fontSize="12" fontWeight="600" fill="currentColor">
            Tailwind
          </text>
        </svg>
      );
    case "PlanetScale":
      return (
        <svg viewBox="0 0 100 18" fill="currentColor" className="h-5" aria-label="PlanetScale">
          <circle cx="8" cy="9" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M4 9h8" />
          <text x="18" y="13" fontSize="12" fontWeight="600" fill="currentColor">
            PlanetScale
          </text>
        </svg>
      );
    default:
      return <span className="text-sm font-semibold">{name}</span>;
  }
}

export function TrustedBy({ className }: { className?: string }) {
  return (
    <section className={cn("w-full border-b border-border/40 bg-muted/20 py-12", className)}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <FadeInView className="text-center" direction="up" distance={16}>
          <p className="text-sm font-medium text-muted-foreground">
            Trusted by developers at
          </p>
        </FadeInView>

        <FadeInView className="mt-8" direction="up" distance={20} delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
            {trustedByLogos.map((logo) => (
              <a
                key={logo.name}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={logo.name}
              >
                <Logo name={logo.name} />
              </a>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
