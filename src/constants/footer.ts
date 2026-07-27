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
  { label: "Features", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Changelog", href: "/" },
];

export const resourceLinks: FooterLink[] = [
  { label: "Docs", href: "/" },
  { label: "API Reference", href: "/" },
  { label: "Blog", href: "/" },
];

export const companyLinks: FooterLink[] = [
  { label: "About", href: "/" },
  { label: "Careers", href: "/" },
  { label: "Contact", href: "/" },
  { label: "Brand", href: "/" },
];

export const legalLinks: FooterLink[] = [
  { label: "Privacy", href: "/" },
  { label: "Terms", href: "/" },
  { label: "Cookie Policy", href: "/" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/devforge", icon: GitHubIcon },
  { label: "Twitter", href: "https://twitter.com/devforge", icon: TwitterIcon },
  { label: "LinkedIn", href: "https://linkedin.com/company/devforge", icon: LinkedInIcon },
  { label: "Discord", href: "https://discord.gg/devforge", icon: DiscordIcon },
];
