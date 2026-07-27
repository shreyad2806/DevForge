"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HoverCard } from "@/components/motion/HoverCard";
import { FadeInView } from "@/components/motion/FadeInView";
import { createClient } from "@/lib/supabase/client";
import { getSubscription } from "@/services/subscription";

function formatDate(date?: string) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function CurrentPlanCard() {
  const router = useRouter();
  const [plan, setPlan] = useState<string>("—");
  const [status, setStatus] = useState<string>("—");
  const [provider, setProvider] = useState<string>("—");
  const [renewalDate, setRenewalDate] = useState<string>("—");
  const [price, setPrice] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const supabase = createClient();
      const { data: auth } = await supabase.auth.getUser();
      if (auth.user) {
        const sub = await getSubscription(supabase, auth.user.id);
        if (!cancelled) {
          setPlan(sub.plan ?? "free");
          setStatus(sub.status ?? "inactive");
          setProvider(sub.provider ?? "—");
          setPrice(sub.price ?? "");
          setRenewalDate(sub.current_period_end ? formatDate(sub.current_period_end) : "No active subscription");
        }
      }
      if (!cancelled) setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <FadeInView direction="up" distance={16} duration={0.4}>
      <HoverCard scale={1.005} y={-2}>
        <div className="rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30">
          <h2 className="text-sm font-semibold text-foreground">Current Plan</h2>

          {loading && (
            <div className="mt-3 space-y-2">
              <div className="h-3 w-32 animate-pulse rounded bg-muted" />
              <div className="h-3 w-48 animate-pulse rounded bg-muted" />
            </div>
          )}

          <div className="mt-4 flex items-start gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Zap className="size-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {plan === "free" ? "Free" : plan === "pro" ? "Pro" : plan}
                </h3>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  {status === "active" ? "Active" : status === "inactive" ? "Inactive" : status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {provider !== "—" ? `Billed through ${provider === "polar" ? "Polar" : provider === "demo" ? "Demo" : provider}` : "Free plan"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {provider !== "—" && (
              <span className="rounded-full border border-border/60 bg-background px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                Billed through {provider === "polar" ? "Polar" : provider === "demo" ? "Demo" : provider}
              </span>
            )}
          </div>

          <div className="mt-5 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">
              {plan === "free" ? "$0" : (price || "—")}
            </span>
            <span className="text-sm text-muted-foreground">{plan === "free" ? "" : (price ? "/ month" : "")}</span>
          </div>
          <p className="text-xs text-muted-foreground">{plan === "free" ? "Free plan" : "Billed monthly"}</p>

          {loading ? (
            <div className="mt-5 grid gap-4 border-t border-border/40 pt-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 border-t border-border/40 pt-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Current Plan</p>
                <p className="mt-1 text-sm font-medium text-foreground">{plan === "free" ? "Free" : plan === "pro" ? "Pro" : plan}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="mt-1 text-sm font-medium text-foreground">{status === "active" ? "Active" : status === "inactive" ? "Inactive" : status.charAt(0).toUpperCase() + status.slice(1)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Billing Provider</p>
                <p className="mt-1 text-sm font-medium text-foreground">{provider === "polar" ? "Polar" : provider}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Renewal Date</p>
                <p className="mt-1 text-sm font-medium text-foreground">{renewalDate}</p>
              </div>
            </div>
          )}

          {!loading && plan === "free" && (
            <div className="mt-5 border-t border-border/40 pt-5">
              <h4 className="text-sm font-semibold text-foreground">Unlock with Pro</h4>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                <li>Access to premium kits: Stripe Billing, RBAC, Realtime Chat</li>
                <li>Unlimited workspaces and priority support</li>
                <li>Advanced documentation and AI assistance</li>
              </ul>
            </div>
          )}

          {!loading && plan === "pro" && (
            <div className="mt-5 border-t border-border/40 pt-5">
              <p className="text-sm text-muted-foreground">
                Your Pro subscription is active. You have full access to all premium kits and features.
              </p>
            </div>
          )}

          <div className="mt-5 flex justify-end">
            <Button
              variant="outline"
              className="rounded-lg"
              onClick={() => {
                if (plan === "free") router.push("/pricing");
              }}
            >
              {plan === "free" ? "Upgrade" : "Manage Subscription"}
            </Button>
          </div>
        </div>
      </HoverCard>
    </FadeInView>
  );
}
