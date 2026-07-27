export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  yearlyPrice: string;
  period: string;
  icon: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    yearlyPrice: "$0",
    period: "/month",
    icon: "Box",
    features: [
      "Access to 10+ Forge Kits",
      "1 Workspace",
      "Community Support",
      "Basic Documentation",
      "Standard Kit Updates",
    ],
    cta: "Get Started",
    href: "/signup",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professional developers",
    price: "$19",
    yearlyPrice: "$182",
    period: "/month",
    icon: "Zap",
    features: [
      "Access to 100+ premium Forge Kits",
      "Unlimited Workspaces",
      "Priority Support",
      "Advanced Documentation",
      "Early Access to New Kits",
      "AI Assistant (20 queries/day)",
      "Custom Integration Guides",
    ],
    cta: "Start Pro Trial",
    href: "/billing",
    highlighted: true,
  },
  {
    id: "team",
    name: "Team",
    description: "For teams and enterprises",
    price: "$49",
    yearlyPrice: "$470",
    period: "/user /month",
    icon: "Users",
    features: [
      "Everything in Pro",
      "Team Workspaces",
      "Role-based Access Control",
      "SSO & SAML Authentication",
      "AI Assistant (Unlimited)",
      "Dedicated Support",
      "Custom Onboarding",
    ],
    cta: "Start Team Trial",
    href: "/billing",
  },
];
