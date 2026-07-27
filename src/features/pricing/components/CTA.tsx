import { ArrowRight } from "lucide-react";

import { FadeInView } from "@/components/motion/FadeInView";
import { Button } from "@/components/ui/button";

interface CTAProps {
  className?: string;
}

export function CTA({ className }: CTAProps) {
  return (
    <FadeInView
      direction="up"
      distance={16}
      duration={0.4}
      delay={0.2}
      className={className}
    >
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-purple-500/10 p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Start building with DevForge today
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Join thousands of developers shipping faster with production-ready kits.
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button className="rounded-lg">
            Get Started Free
            <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Button>
          <Button variant="outline" className="rounded-lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </FadeInView>
  );
}
