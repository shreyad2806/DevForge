import { Shield, Zap, Code } from "lucide-react";
import { HoverCard } from "@/components/motion/HoverCard";

const benefits = [
  {
    icon: Shield,
    title: "Secure by default",
    description: "Enterprise-grade security",
  },
  {
    icon: Zap,
    title: "Production ready",
    description: "Battle-tested in real projects",
  },
  {
    icon: Code,
    title: "Developer first",
    description: "Built by developers for developers",
  },
];

export function HeroPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {benefits.map((benefit) => (
        <HoverCard key={benefit.title} scale={1.01} y={-2}>
          <div className="flex flex-col items-center rounded-2xl border border-border/60 bg-card/50 p-4 text-center transition-colors hover:border-primary/30">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <benefit.icon className="size-5" aria-hidden="true" />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-foreground">
              {benefit.title}
            </h3>
            <p className="mt-1 text-[10px] text-muted-foreground">
              {benefit.description}
            </p>
          </div>
        </HoverCard>
      ))}
    </div>
  );
}
