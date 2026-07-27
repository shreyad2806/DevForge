"use client";

import { FileText, Download, ArrowRight } from "lucide-react";

import { invoices } from "@/data/invoices";
import { HoverCard } from "@/components/motion/HoverCard";
import { FadeInView } from "@/components/motion/FadeInView";

export function InvoiceHistory() {
  return (
    <FadeInView direction="up" distance={16} duration={0.4} delay={0.1}>
      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Invoice History</h2>
          <button
            type="button"
            className="flex items-center gap-1 text-xs font-medium text-primary transition-opacity hover:opacity-80"
          >
            View all invoices
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>

        <ul className="mt-4 space-y-3">
          {invoices.map((invoice) => (
            <HoverCard key={invoice.id} y={-1}>
              <li className="flex items-center justify-between rounded-xl p-2 transition-colors hover:bg-accent/50">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="size-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {invoice.date}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {invoice.invoiceNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">
                    {invoice.amount}
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                    {invoice.status}
                  </span>
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    aria-label={`Download invoice ${invoice.invoiceNumber}`}
                  >
                    <Download className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </li>
            </HoverCard>
          ))}
        </ul>
      </div>
    </FadeInView>
  );
}
