"use client";

import { useState } from "react";
import { Link, Check, MoreVertical } from "lucide-react";

import { connectedAccounts } from "@/data/settings";
import { Button } from "@/components/ui/button";
import { HoverCard } from "@/components/motion/HoverCard";
import { FadeInView } from "@/components/motion/FadeInView";
import { cn } from "@/lib/utils";

export function ConnectedAccounts() {
  const [accounts, setAccounts] = useState(connectedAccounts);

  const toggleConnection = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id ? { ...acc, connected: !acc.connected } : acc
      )
    );
  };

  return (
    <FadeInView direction="up" distance={16} duration={0.4} delay={0.1}>
      <HoverCard scale={1.005} y={-2}>
        <div className="rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30">
          <h2 className="text-sm font-semibold text-foreground">Connected Accounts</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Connect your accounts to unlock more features.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-background p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-lg bg-card",
                      account.iconColor
                    )}
                  >
                    <Link className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {account.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {account.email || account.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {account.connected ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-lg text-[10px]"
                      onClick={() => toggleConnection(account.id)}
                    >
                      <Check className="mr-1 size-3" aria-hidden="true" />
                      Connected
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="h-7 rounded-lg text-[10px]"
                      onClick={() => toggleConnection(account.id)}
                    >
                      Connect
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground"
                    aria-label={`${account.name} options`}
                  >
                    <MoreVertical className="size-3.5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HoverCard>
    </FadeInView>
  );
}
