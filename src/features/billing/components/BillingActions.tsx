"use client";

import { Shield, XCircle, HelpCircle, MessageCircle } from "lucide-react";

import { HoverCard } from "@/components/motion/HoverCard";
import { FadeInView } from "@/components/motion/FadeInView";

const actions = [
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Your payment information is encrypted and secure.",
  },
  {
    icon: XCircle,
    title: "Cancel Anytime",
    description: "No lock-ins. Cancel your subscription whenever you want.",
  },
  {
    icon: HelpCircle,
    title: "Need Help?",
    description: "Our support team is here to help you 24/7.",
  },
  {
    icon: MessageCircle,
    title: "Contact Support",
    description: "Get in touch with us for any billing questions.",
    button: "Contact Support",
  },
];

export function BillingActions() {
  return (
    <FadeInView direction="up" distance={16} duration={0.4} delay={0.15}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <HoverCard key={action.title} scale={1.01} y={-2}>
            <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <action.icon className="size-5" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">
                  {action.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {action.description}
                </p>
              </div>
              {action.button && (
                <button
                  type="button"
                  className="mt-2 w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                >
                  {action.button}
                </button>
              )}
            </div>
          </HoverCard>
        ))}
      </div>
    </FadeInView>
  );
}
