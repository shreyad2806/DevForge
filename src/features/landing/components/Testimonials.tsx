"use client";

import { Quote } from "lucide-react";

import { testimonials } from "@/data/testimonials";
import { FadeInView } from "@/components/motion/FadeInView";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";
import { cn } from "@/lib/utils";

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="flex size-10 items-center justify-center rounded-full text-sm font-semibold text-white shadow-sm"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function CompanyLogo({ name }: { name: string }) {
  return (
    <span className="text-sm font-semibold tracking-tight text-foreground">
      {name}
    </span>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <HoverCard className="h-full" scale={1.01} y={-4}>
      <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/30">
        <Quote className="size-6 text-primary/60" aria-hidden="true" />

        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Avatar initials={initials} color={testimonial.avatarColor} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              {testimonial.name}
            </span>
            <span className="text-xs text-muted-foreground">{testimonial.role}</span>
          </div>
          <div className="ml-auto">
            <CompanyLogo name={testimonial.companyLogo} />
          </div>
        </div>
      </div>
    </HoverCard>
  );
}

export function Testimonials({ className }: { className?: string }) {
  return (
    <section className={cn("w-full bg-muted/20 py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <FadeInView className="text-center" direction="up" distance={20}>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Loved by developers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground">
            Teams ship faster when boilerplate is already solved.
          </p>
        </FadeInView>

        <StaggerContainer
          className="mt-14 grid gap-6 md:grid-cols-3"
          staggerDelay={0.08}
        >
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
