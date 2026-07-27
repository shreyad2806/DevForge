export interface ForgeKit {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  downloads: string;
  rating: number;
  reviews?: number;
  icon:
    | "Shield"
    | "CreditCard"
    | "Lock"
    | "Upload"
    | "Mail"
    | "Cloud"
    | "Database"
    | "MessageSquare"
    | "Zap"
    | "Key"
    | "User"
    | "Globe"
    | "Smartphone"
    | "Cpu"
    | "Layers"
    | "Box";
  frameworkTags?: string[];
  isPremium?: boolean;
  isPopular?: boolean;
  isFavorite?: boolean;
  createdAt?: string;
}

export const forgeKits: ForgeKit[] = [
  {
    id: "jwt-auth",
    slug: "jwt-authentication",
    title: "JWT Authentication Kit",
    description: "Secure JWT auth with access & refresh tokens, middleware, and React hooks.",
    category: "Backend",
    downloads: "4.8K",
    rating: 4.9,
    reviews: 128,
    icon: "Shield",
    frameworkTags: ["Next.js", "Node.js", "TypeScript"],
    isPopular: true,
  },
  {
    id: "stripe-billing",
    slug: "stripe-billing",
    title: "Stripe Billing Kit",
    description: "Subscriptions, one-time billing, webhooks, and customer portal integration.",
    category: "Payments",
    downloads: "3.2K",
    rating: 4.9,
    reviews: 96,
    icon: "CreditCard",
    frameworkTags: ["Next.js", "Node.js", "TypeScript"],
    isPremium: true,
  },
  {
    id: "rbac-auth",
    slug: "rbac",
    title: "RBAC Authorization Kit",
    description: "Role-based access control for users, teams, and resources with decorators.",
    category: "Backend",
    downloads: "2.8K",
    rating: 4.7,
    reviews: 64,
    icon: "Lock",
    frameworkTags: ["Node.js", "TypeScript"],
  },
  {
    id: "s3-upload",
    slug: "s3-upload",
    title: "S3 File Upload Kit",
    description: "Upload, signed URLs, object metadata, and streaming video support.",
    category: "Storage",
    downloads: "2.4K",
    rating: 4.8,
    reviews: 52,
    icon: "Upload",
    frameworkTags: ["Node.js", "AWS"],
  },
  {
    id: "email-verification",
    slug: "email-verification",
    title: "Email Verification Kit",
    description: "Verify emails with instant tokens, resend logic, and inbox-ready templates.",
    category: "Backend",
    downloads: "1.9K",
    rating: 4.6,
    reviews: 41,
    icon: "Mail",
    frameworkTags: ["Node.js", "Resend"],
  },
];

