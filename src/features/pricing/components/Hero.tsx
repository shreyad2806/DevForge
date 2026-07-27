import { FadeInView } from "@/components/motion/FadeInView";

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <FadeInView direction="up" distance={16} duration={0.4} className={className}>
      <div className="flex flex-col items-center text-center">
        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Simple, Transparent Pricing
        </span>
        <h1 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Choose the plan that fits your build journey
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
          Start free and upgrade as you scale. All plans include access to our growing library of production-ready Forge Kits.
        </p>
      </div>
    </FadeInView>
  );
}
