"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Zap, ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FadeInView } from "@/components/motion/FadeInView";
import { HoverCard } from "@/components/motion/HoverCard";
import { completePurchase } from "@/services/checkout";

const features = [
  "Premium Forge Kits",
  "Unlimited Workspaces",
  "Priority Support",
  "Early Access",
];

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleComplete() {
    if (loading) return;
    setLoading(true);
    const { error } = await completePurchase();
    setLoading(false);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    router.push("/billing?success=true");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <FadeInView direction="up" distance={16} duration={0.4}>
        <HoverCard scale={1.005} y={-2}>
          <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Zap className="size-6" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">DevForge Pro</h1>
                <p className="text-sm text-muted-foreground">$19/month</p>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-2.5" aria-hidden="true" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs text-muted-foreground">
              Demo checkout for hackathon. No real payment will be processed.
            </p>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                className="flex-1 rounded-lg"
                onClick={() => router.push("/pricing")}
                disabled={loading}
              >
                <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
                Cancel
              </Button>
              <Button
                className="flex-1 rounded-lg"
                onClick={handleComplete}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
                    Processing...
                  </>
                ) : (
                  "Complete Purchase"
                )}
              </Button>
            </div>
          </div>
        </HoverCard>
      </FadeInView>
    </main>
  );
}
