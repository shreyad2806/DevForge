import Link from "next/link";
import { Hexagon } from "lucide-react";

import { cn } from "@/lib/utils";
import { FadeInView } from "@/components/motion/FadeInView";
import { HoverCard } from "@/components/motion/HoverCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { NewsletterForm } from "@/components/footer/NewsletterForm";
import {
  companyLinks,
  legalLinks,
  productLinks,
  resourceLinks,
  socialLinks,
  type FooterColumn as FooterColumnData,
} from "@/constants/footer";

interface FooterProps {
  className?: string;
}

function FooterColumn({ title, links }: FooterColumnData) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ className }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "w-full border-t border-border/40 bg-muted/20",
        className
      )}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Brand + newsletter */}
        <div className="grid gap-12 py-16 lg:grid-cols-2">
          <FadeInView className="flex flex-col gap-6" direction="up" distance={24}>
            <Link
              href="/"
              className="group flex w-fit items-center gap-2 text-foreground transition-colors hover:text-primary"
              aria-label="DevForge home"
            >
              <Hexagon
                className="size-7 fill-primary/20 text-primary transition-colors group-hover:fill-primary/30"
                aria-hidden="true"
              />
              <span className="text-lg font-semibold tracking-tight">
                DevForge
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Production-ready reusable backend and frontend code blocks for
              developers.
            </p>
            <ul className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <li key={social.href}>
                    <HoverCard scale={1.15} y={0}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        aria-label={social.label}
                      >
                        <Icon className="size-5" />
                      </a>
                    </HoverCard>
                  </li>
                );
              })}
            </ul>
          </FadeInView>

          <FadeInView
            className="lg:ml-auto lg:max-w-sm"
            direction="up"
            distance={24}
            delay={0.1}
          >
            <h3 className="text-sm font-semibold text-foreground">
              Subscribe to our newsletter
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get the latest blocks, guides, and updates.
            </p>
            <NewsletterForm className="mt-4" />
          </FadeInView>
        </div>

        {/* Link columns */}
        <StaggerContainer
          className="grid grid-cols-2 gap-8 border-t border-border/40 py-12 md:grid-cols-4"
          staggerDelay={0.08}
        >
          <StaggerItem>
            <FooterColumn title="Product" links={productLinks} />
          </StaggerItem>
          <StaggerItem>
            <FooterColumn title="Resources" links={resourceLinks} />
          </StaggerItem>
          <StaggerItem>
            <FooterColumn title="Company" links={companyLinks} />
          </StaggerItem>
          <StaggerItem>
            <FooterColumn title="Legal" links={legalLinks} />
          </StaggerItem>
        </StaggerContainer>

        {/* Bottom bar */}
        <FadeInView
          className="flex flex-col items-center justify-between gap-4 border-t border-border/40 py-8 text-sm text-muted-foreground md:flex-row"
          direction="up"
          distance={12}
        >
          <p>Built with ♥ for developers.</p>
          <p>&copy; {year} DevForge. All rights reserved.</p>
        </FadeInView>
      </div>
    </footer>
  );
}
