import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env.local");

if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, "utf8");
  for (const line of env.split(/\r?\n/)) {
    if (line.startsWith("#") || !line.includes("=")) continue;
    const idx = line.indexOf("=");
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) process.env[key] = value;
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Supabase URL or key not found in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

const kits = [
  {
    slug: "jwt-authentication",
    title: "JWT Authentication Kit",
    description:
      "Secure JWT auth with access & refresh tokens, middleware, and React hooks for Next.js.",
    category: "Backend",
    premium: false,
    downloads: 4800,
    rating: 4.9,
    reviews: 128,
    icon: "Shield",
    framework_tags: ["Next.js", "Node.js", "TypeScript"],
    is_popular: true,
    overview: `The JWT Authentication Kit provides a complete stateless authentication layer for Next.js applications. It combines short-lived access tokens with long-lived, httpOnly refresh tokens to keep users authenticated without maintaining server-side sessions. The refresh token is rotated on every use and its family is invalidated if reuse is detected, protecting against token theft.`,
    installation: `## Install
\`\`\`
npm install @devforge/jwt-authentication
\`\`\`

Create a \`.env.local\` file with:
\`\`\`
JWT_SECRET=your-secret-at-least-32-characters
JWT_REFRESH_SECRET=your-refresh-secret
\`\`\`

Add the provided middleware matcher to \`middleware.ts\` and copy the \`lib/auth.ts\` module into your project.`,
    usage: `After installation, protect any route by checking the access token cookie. The \`useAuth\` React hook gives you the current user and helpers for login, logout, and token refresh. Refresh happens automatically when a 401 is received, and the user is redirected to login when the refresh token expires or is revoked.`,
    api_reference: `POST /api/auth/login — exchange credentials for access and refresh tokens.\nPOST /api/auth/refresh — obtain a new access token using a valid refresh token.\nPOST /api/auth/logout — revoke the current refresh token and clear cookies.\nGET /api/me — return the current authenticated user.`,
    example_code: `// lib/auth.ts
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createAccessToken(user: { id: string; email: string }) {
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(secret);
}

export async function verifyAccessToken(token?: string) {
  if (!token) return null;
  const { payload } = await jwtVerify(token, secret);
  return payload as { id: string; email: string };
}`,
    files: [
      { name: "src", type: "folder", children: [
        { name: "app", type: "folder" },
        { name: "middleware.ts", type: "file" },
        { name: "api", type: "folder", children: [
          { name: "auth", type: "folder", children: [
            { name: "login", type: "folder" },
            { name: "refresh", type: "folder" },
            { name: "logout", type: "folder" }
          ] }
        ] },
        { name: "lib", type: "folder", children: [
          { name: "auth.ts", type: "file" },
          { name: "tokens.ts", type: "file" }
        ] }
      ] }
    ],
  },
  {
    slug: "stripe-billing",
    title: "Stripe Billing Kit",
    description:
      "Subscriptions, one-time billing, webhooks, and customer portal integration for Stripe.",
    category: "Payments",
    premium: true,
    downloads: 3200,
    rating: 4.9,
    reviews: 96,
    icon: "CreditCard",
    framework_tags: ["Next.js", "Node.js", "TypeScript"],
    is_popular: false,
    overview: `The Stripe Billing Kit turns your Next.js app into a subscription-ready SaaS platform. It wraps Stripe Checkout, Customer Portal, and webhook lifecycle events in strongly-typed server actions and route handlers. You can create checkout sessions, manage upgrades and cancellations, and keep your database in sync with Stripe automatically.`,
    installation: `## Install
\`\`\`
npm install @devforge/stripe-billing stripe
\`\`\`

Set the following environment variables:
\`\`\`
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
\`\`\`

Expose the webhook route at \`/api/webhooks/stripe\` and import the \`lib/stripe.ts\` client.`,
    usage: `Create a checkout session from a server action by passing a price ID. Redirect the user to the returned URL. Stripe will send lifecycle webhooks to your endpoint; the kit routes each event to the correct handler so you can provision seats on checkout completion and revoke access on subscription deletion.`,
    api_reference: `POST /api/checkout — create a Stripe Checkout session.\nPOST /api/billing/portal — create a customer portal session.\nPOST /api/webhooks/stripe — receive and validate Stripe webhook events.\nGET /api/subscriptions — list the authenticated user's active subscriptions.`,
    example_code: `// app/actions/checkout.ts
"use server";
import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(priceId: string) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: process.env.NEXT_PUBLIC_URL + "/dashboard?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: process.env.NEXT_PUBLIC_URL + "/pricing",
  });
  return session.url;
}`,
    files: [
      { name: "src", type: "folder", children: [
        { name: "app", type: "folder" },
        { name: "api", type: "folder", children: [
          { name: "checkout", type: "folder" },
          { name: "webhooks", type: "folder" }
        ] },
        { name: "lib", type: "folder", children: [
          { name: "stripe.ts", type: "file" },
          { name: "subscriptions.ts", type: "file" }
        ] }
      ] }
    ],
  },
  {
    slug: "rbac",
    title: "RBAC Authorization Kit",
    description:
      "Role-based access control for users, teams, and resources with decorators and middleware.",
    category: "Backend",
    premium: true,
    downloads: 2800,
    rating: 4.7,
    reviews: 64,
    icon: "Lock",
    framework_tags: ["Node.js", "TypeScript"],
    is_popular: false,
    overview: `The RBAC Authorization Kit lets you define permissions, compose them into roles, and enforce them at the API edge. It ships with a type-safe permission registry, role definitions, and decorators for server actions and route handlers. Authorization failures return standard 403 responses while successful checks continue to your business logic.`,
    installation: `## Install
\`\`\`
npm install @devforge/rbac
\`\`\`

Copy the example \`lib/permissions.ts\` and \`lib/roles.ts\` into your project. Import the \`requirePermission\` decorator and wrap any route handler or server action that needs protection.`,
    usage: `Define permissions as strings such as \`users:read\` or \`billing:manage\`. Compose them into role arrays like Admin, Editor, and Viewer. Apply \`@requirePermission\` to a route, and the current user is checked against the required permission before the handler runs. Roles can be combined and inherited without hard-coding access rules across your codebase.`,
    api_reference: `GET /api/permissions — list workspace permissions.\nPOST /api/roles — create or update a role.\nGET /api/roles/{id} — fetch a role and its members.\nPOST /api/check — verify whether a user has a given permission.`,
    example_code: `// lib/roles.ts
import { definePermission } from "@/lib/rbac";

export const Permissions = {
  users: {
    read: definePermission("users:read"),
    create: definePermission("users:create"),
    delete: definePermission("users:delete"),
  },
} as const;

export const Roles = {
  Admin: [Permissions.users.delete],
  Editor: [Permissions.users.create],
  Viewer: [Permissions.users.read],
};`,
    files: [
      { name: "src", type: "folder", children: [
        { name: "lib", type: "folder", children: [
          { name: "permissions.ts", type: "file" },
          { name: "roles.ts", type: "file" },
          { name: "rbac.ts", type: "file" }
        ] },
        { name: "middleware", type: "folder", children: [
          { name: "rbac.ts", type: "file" }
        ] }
      ] }
    ],
  },
  {
    slug: "s3-upload",
    title: "S3 File Upload Kit",
    description:
      "Presigned uploads, signed read URLs, object metadata, and streaming video support.",
    category: "Storage",
    premium: false,
    downloads: 2400,
    rating: 4.8,
    reviews: 52,
    icon: "Upload",
    framework_tags: ["Node.js", "AWS"],
    is_popular: false,
    overview: `The S3 Upload Kit keeps your server out of the hot path for file uploads. It generates short-lived presigned PUT URLs so the browser uploads directly to S3, then returns a secure key you can store in your database. Signed read URLs make private buckets behave like public CDNs without ever exposing the underlying objects.`,
    installation: `## Install
\`\`\`
npm install @devforge/s3-upload @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
\`\`\`

Configure your bucket and credentials:
\`\`\`
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET=your-private-bucket
\`\`\`

Set the bucket CORS rules to allow \`PUT\` from your domain and import the \`lib/s3.ts\` helpers.`,
    usage: `Call the upload API with the filename and content type. The server returns a presigned URL and a unique key. Upload the file from the client with a PUT request to that URL. When you need to display the file, request a signed read URL that expires in minutes or hours depending on your security model.`,
    api_reference: `POST /api/upload — request a presigned upload URL.\nGET /api/files/{key} — generate a temporary read URL for a file.\nDELETE /api/files/{key} — delete an object from the bucket.\nGET /api/files — list uploaded objects for the current user.`,
    example_code: `// components/Uploader.tsx
async function uploadFile(file: File) {
  const { uploadUrl, key } = await fetch("/api/upload", {
    method: "POST",
    body: JSON.stringify({ filename: file.name, contentType: file.type }),
  }).then((r) => r.json());

  await fetch(uploadUrl, { method: "PUT", body: file });
  return key;
}`,
    files: [
      { name: "src", type: "folder", children: [
        { name: "app", type: "folder" },
        { name: "api", type: "folder", children: [
          { name: "upload", type: "folder" },
          { name: "files", type: "folder" }
        ] },
        { name: "lib", type: "folder", children: [
          { name: "s3.ts", type: "file" }
        ] }
      ] }
    ],
  },
  {
    slug: "email-verification",
    title: "Email Verification Kit",
    description:
      "Verify emails with instant tokens, resend logic, and inbox-ready React Email templates.",
    category: "Utility",
    premium: false,
    downloads: 1900,
    rating: 4.6,
    reviews: 41,
    icon: "Mail",
    framework_tags: ["Node.js", "Resend"],
    is_popular: false,
    overview: `The Email Verification Kit handles the entire post-signup verification flow. It creates time-limited tokens, sends responsive HTML and plain-text emails, and exposes verification and resend endpoints with abuse throttling. An OTP fallback is included for high-security workspaces that want a second step without magic links.`,
    installation: `## Install
\`\`\`
npm install @devforge/email-verification resend react-email
\`\`\`

Set the email provider key and sender:
\`\`\`
RESEND_API_KEY=re_...
EMAIL_FROM=verify@yourdomain.com
\`\`\`

Place the provided React Email templates in \`emails/verify.tsx\` and wire the send route at \`/api/send\`.`,
    usage: `After a user signs up, call the send action with their email. The kit stores a hashed token and sends a link. When the user clicks the link, the verify endpoint checks the token, marks the email as verified, and invalidates the token. Resend endpoints respect a cooldown period to prevent abuse.`,
    api_reference: `POST /api/send — send a verification email.\nPOST /api/verify — validate a verification token.\nPOST /api/verify/otp — validate a one-time passcode.\nPOST /api/resend — resend the verification email with rate limiting.`,
    example_code: `// app/actions/signup.ts
"use server";
import { createVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";

export async function signup(email: string, password: string) {
  const user = await createUser(email, password);
  const token = await createVerificationToken(user.id);
  await sendVerificationEmail({
    to: email,
    subject: "Verify your account",
    url: \`/verify?token=\${token}\`,
  });
  return { userId: user.id };
}`,
    files: [
      { name: "src", type: "folder", children: [
        { name: "lib", type: "folder", children: [
          { name: "email.ts", type: "file" },
          { name: "tokens.ts", type: "file" }
        ] },
        { name: "emails", type: "folder", children: [
          { name: "verify.tsx", type: "file" }
        ] },
        { name: "api", type: "folder", children: [
          { name: "send", type: "folder" },
          { name: "verify", type: "folder" },
          { name: "resend", type: "folder" }
        ] }
      ] }
    ],
  },
  {
    slug: "realtime-chat",
    title: "Realtime Chat Kit",
    description:
      "Socket-based chat rooms, presence, typing indicators, and message history.",
    category: "Backend",
    premium: true,
    downloads: 2100,
    rating: 4.8,
    reviews: 47,
    icon: "MessageSquare",
    framework_tags: ["Node.js", "Socket.io"],
    is_popular: false,
    overview: `The Realtime Chat Kit adds room-based messaging to any application. It uses typed socket events for connection, presence, message send, and typing indicators. Messages are persisted to Postgres and served through a paginated history API so new joiners can catch up without scrolling through a long-lived connection.`,
    installation: `## Install
\`\`\`
npm install @devforge/realtime-chat socket.io
\`\`\`

Start the socket server alongside your Next.js app or as a separate worker. Import the client helper from \`lib/socket.ts\` and connect it to the server URL.`,
    usage: `Join a room, send messages, and listen for typing and presence events. Each event has a Zod schema and handler that validates the payload before broadcasting. The history API supports cursor pagination so you can load older messages on demand.`,
    api_reference: `GET /api/chat/{roomId} — fetch paginated message history.\nPOST /api/chat/{roomId} — persist and broadcast a message.\nGET /api/chat/{roomId}/presence — list currently connected members.\nWS /socket — socket connection for realtime events.`,
    example_code: `// hooks/useChat.ts
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

export function useChat(roomId: string) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("join-room", roomId);
    socket.on("message", (msg) => setMessages((m) => [...m, msg]));
    return () => { socket.off("message"); };
  }, [roomId]);

  function send(text: string) {
    socket.emit("message", { roomId, text, userId: "user_123" });
  }

  return { messages, send };
}`,
    files: [
      { name: "src", type: "folder", children: [
        { name: "app", type: "folder" },
        { name: "api", type: "folder", children: [
          { name: "chat", type: "folder" }
        ] },
        { name: "lib", type: "folder", children: [
          { name: "socket.ts", type: "file" },
          { name: "chat.ts", type: "file" }
        ] }
      ] }
    ],
  },
];

const { data, error } = await supabase
  .from("forge_kits")
  .upsert(kits, { onConflict: "slug" })
  .select("slug");

if (error) {
  console.error("Seed failed:", error);
  process.exit(1);
}

console.log("Seeded kits:", data?.map((row) => row.slug) ?? []);
