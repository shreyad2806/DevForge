export interface ForgeKit {
  id: string;
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
}

export const forgeKits: ForgeKit[] = [
  {
    id: "jwt-auth",
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

export const exploreKits: ForgeKit[] = [
  {
    id: "jwt-auth",
    title: "JWT Authentication Kit",
    description: "Secure JWT authentication with access & refresh tokens, role-based access control, and protected routes.",
    category: "Backend",
    downloads: "12.4K",
    rating: 4.9,
    reviews: 128,
    icon: "Shield",
    frameworkTags: ["Backend", "Auth", "Next.js", "Node.js", "TypeScript"],
    isPopular: true,
  },
  {
    id: "stripe-billing",
    title: "Stripe Billing Kit",
    description: "Complete Stripe subscription and one-time billing setup with webhooks and customer portal.",
    category: "Payments",
    downloads: "8.7K",
    rating: 4.9,
    reviews: 96,
    icon: "CreditCard",
    frameworkTags: ["Payments", "Stripe", "Next.js", "Node.js"],
    isPremium: true,
  },
  {
    id: "rbac-auth",
    title: "RBAC Authorization Kit",
    description: "Role-based access control for users, teams, and resources with decorators and guards.",
    category: "Backend",
    downloads: "6.2K",
    rating: 4.7,
    reviews: 64,
    icon: "Lock",
    frameworkTags: ["Backend", "Auth", "Node.js", "TypeScript"],
  },
  {
    id: "s3-upload",
    title: "S3 File Upload Kit",
    description: "Upload and stream files with signed URLs, metadata, and streaming video support.",
    category: "Storage",
    downloads: "5.9K",
    rating: 4.8,
    reviews: 52,
    icon: "Cloud",
    frameworkTags: ["Storage", "AWS", "Node.js"],
  },
  {
    id: "email-verification",
    title: "Email Verification Kit",
    description: "Verify emails with OTP, instant tokens, resend logic, and inbox-ready templates.",
    category: "Utility",
    downloads: "4.1K",
    rating: 4.6,
    reviews: 41,
    icon: "Mail",
    frameworkTags: ["Utility", "Email", "Node.js"],
  },
  {
    id: "realtime-chat",
    title: "Realtime Chat Kit",
    description: "WebSocket-powered chat rooms with presence, typing indicators, and message history.",
    category: "Backend",
    downloads: "3.5K",
    rating: 4.7,
    reviews: 38,
    icon: "MessageSquare",
    frameworkTags: ["Backend", "WebSockets", "Node.js"],
    isPremium: true,
  },
  {
    id: "postgres-crud",
    title: "PostgreSQL CRUD Kit",
    description: "Type-safe Prisma CRUD API with pagination, filtering, sorting, and relations.",
    category: "Backend",
    downloads: "7.1K",
    rating: 4.8,
    reviews: 73,
    icon: "Database",
    frameworkTags: ["Backend", "Database", "TypeScript"],
  },
  {
    id: "oauth-social",
    title: "OAuth Social Login Kit",
    description: "Google, GitHub, and Twitter OAuth with account linking and refresh tokens.",
    category: "Authentication",
    downloads: "5.3K",
    rating: 4.7,
    reviews: 55,
    icon: "Globe",
    frameworkTags: ["Auth", "OAuth", "Next.js"],
    isPremium: true,
  },
  {
    id: "push-notifications",
    title: "Push Notifications Kit",
    description: "Cross-platform push notifications for web and mobile with service workers.",
    category: "Utility",
    downloads: "2.9K",
    rating: 4.5,
    reviews: 29,
    icon: "Smartphone",
    frameworkTags: ["Utility", "PWA", "TypeScript"],
  },
  {
    id: "ai-agent-api",
    title: "AI Agent API Kit",
    description: "Build LLM-powered agents with tool calling, streaming responses, and memory.",
    category: "Backend",
    downloads: "6.8K",
    rating: 4.8,
    reviews: 81,
    icon: "Cpu",
    frameworkTags: ["Backend", "AI", "Node.js", "OpenAI"],
    isPopular: true,
  },
  {
    id: "api-rate-limit",
    title: "API Rate Limiter Kit",
    description: "Redis-backed sliding window rate limiting with headers and bypass rules.",
    category: "Backend",
    downloads: "3.3K",
    rating: 4.6,
    reviews: 34,
    icon: "Zap",
    frameworkTags: ["Backend", "Redis", "Node.js"],
  },
  {
    id: "user-profiles",
    title: "User Profiles Kit",
    description: "Profile management with avatars, bio, social links, and public/private settings.",
    category: "Utility",
    downloads: "4.5K",
    rating: 4.7,
    reviews: 47,
    icon: "User",
    frameworkTags: ["Utility", "Next.js", "TypeScript"],
  },
  {
    id: "api-key-auth",
    title: "API Key Authentication Kit",
    description: "Issue, revoke, and rotate scoped API keys with usage analytics.",
    category: "Authentication",
    downloads: "3.8K",
    rating: 4.6,
    reviews: 40,
    icon: "Key",
    frameworkTags: ["Auth", "API", "Node.js"],
    isPremium: true,
  },
  {
    id: "microservices",
    title: "Microservices Starter Kit",
    description: "Service discovery, inter-service messaging, and health checks with Docker Compose.",
    category: "Backend",
    downloads: "2.2K",
    rating: 4.5,
    reviews: 24,
    icon: "Layers",
    frameworkTags: ["Backend", "Docker", "Node.js"],
    isPremium: true,
  },
  {
    id: "serverless-functions",
    title: "Serverless Functions Kit",
    description: "Deploy TypeScript edge functions with cold-start optimization and observability.",
    category: "Backend",
    downloads: "4.0K",
    rating: 4.7,
    reviews: 43,
    icon: "Box",
    frameworkTags: ["Backend", "Edge", "TypeScript"],
  },
];
