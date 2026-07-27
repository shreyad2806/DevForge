import { Shield, Lock, RefreshCw, MessageCircle } from "lucide-react";

import { FadeInView } from "@/components/motion/FadeInView";
import { HoverCard } from "@/components/motion/HoverCard";

const features = [
  {
    icon: Shield,
    title: "14-Day Free Trial",
    description: "Try Pro features risk-free. No credit card required.",
  },
  {
    icon: Lock,
    title: "Cancel Anytime",
    description: "No lock-ins. Cancel or downgrade anytime.",
  },
  {
    icon: RefreshCw,
    title: "Always Up-to-date",
    description: "All plans include updates and new kits.",
  },
  {
    icon: MessageCircle,
    title: "Need a Custom Plan?",
    description: "Contact us for enterprise solutions and pricing.",
  },
];

interface FeatureComparisonProps {
  className?: string;
}

export function FeatureComparison({ className }: FeatureComparisonProps) {
  return (
    <FadeInView
      direction="up"
      distance={16}
      duration={0.4}
      delay={0.1}
      className={className}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <HoverCard key={feature.title} scale={1.015} y={-2}>
            <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <feature.icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          </HoverCard>
        ))}
      </div>
    </FadeInView>
  );
}
