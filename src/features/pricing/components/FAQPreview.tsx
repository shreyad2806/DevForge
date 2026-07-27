import { ArrowRight } from "lucide-react";

import { FadeInView } from "@/components/motion/FadeInView";
import { HoverCard } from "@/components/motion/HoverCard";

const questions = [
  "Can I switch plans at any time?",
  "Do you offer refunds?",
  "What happens after the trial ends?",
  "Is there a plan for open-source projects?",
];

interface FAQPreviewProps {
  className?: string;
}

export function FAQPreview({ className }: FAQPreviewProps) {
  return (
    <FadeInView
      direction="up"
      distance={16}
      duration={0.4}
      delay={0.15}
      className={className}
    >
      <div className="flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Everything you need to know about DevForge pricing.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {questions.map((question) => (
          <HoverCard key={question} y={-1}>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-2xl border border-border/60 bg-card p-4 text-left text-sm font-medium text-foreground transition-colors hover:border-primary/30"
            >
              {question}
              <ArrowRight className="size-4 text-muted-foreground" aria-hidden="true" />
            </button>
          </HoverCard>
        ))}
      </div>

      <div className="mt-4 text-center">
        <a
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-opacity hover:opacity-80"
        >
          View all FAQs
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </FadeInView>
  );
}
