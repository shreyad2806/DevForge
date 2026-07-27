export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for learning and small projects.",
    price: "$0",
    period: "/month",
    features: [
      "5 downloads / month",
      "Community support",
      "Public & starter kits",
      "Basic code previews",
    ],
    cta: "Get Started Free",
    href: "/get-started",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professional developers.",
    price: "$9",
    period: "/month",
    features: [
      "Unlimited downloads",
      "Access to premium kits",
      "AI integration assistant",
      "Priority support",
      "Private workspaces",
    ],
    cta: "Start Pro Trial",
    href: "/get-started?plan=pro",
    highlighted: true,
  },
  {
    id: "team",
    name: "Team",
    description: "For teams and organizations.",
    price: "$29",
    period: "/month",
    features: [
      "Everything in Pro",
      "Team workspaces",
      "Role management",
      "SSO / SAML",
      "SSO (Coming soon)",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];
