import { type ComponentType } from "react";

import {
  DiscordIcon,
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/icons/social";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export const productLinks: FooterLink[] = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Integrations", href: "/integrations" },
  { label: "Changelog", href: "/changelog" },
];

export const resourceLinks: FooterLink[] = [
  { label: "Docs", href: "/docs" },
  { label: "API Reference", href: "/api-reference" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
];

export const companyLinks: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Brand", href: "/brand" },
];

export const legalLinks: FooterLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/devforge", icon: GitHubIcon },
  { label: "Twitter", href: "https://twitter.com/devforge", icon: TwitterIcon },
  { label: "LinkedIn", href: "https://linkedin.com/company/devforge", icon: LinkedInIcon },
  { label: "Discord", href: "https://discord.gg/devforge", icon: DiscordIcon },
];
