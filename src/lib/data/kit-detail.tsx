import type { ReactNode } from "react";

import type { ForgeKit } from "@/data/forge-kits";

type PreviewNode = {
  name: string;
  type: "folder" | "file";
  active?: boolean;
  children?: PreviewNode[];
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="rounded-lg bg-muted p-3 font-mono text-xs overflow-x-auto">
      <code>{code}</code>
    </pre>
  );
}

function Endpoint({
  method,
  path,
  desc,
}: {
  method: string;
  path: string;
  desc: string;
}) {
  return (
    <div className="rounded-lg border border-border/60 p-3">
      <div className="flex items-center gap-2 font-mono text-xs">
        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">{method}</span>
        <span className="text-foreground">{path}</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function Review({
  name,
  rating,
  text,
}: {
  name: string;
  rating: string;
  text: string;
}) {
  return (
    <div className="rounded-lg border border-border/60 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-amber-400">{rating}</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function kitType(kit: ForgeKit) {
  const title = kit.title.toLowerCase();
  const category = kit.category.toLowerCase();
  const slug = kit.slug.toLowerCase();
  if (slug.includes("jwt") || title.includes("jwt") || category.includes("authentication")) {
    return "jwt";
  }
  if (slug.includes("stripe") || title.includes("stripe") || category.includes("payment")) {
    return "stripe";
  }
  if (slug.includes("rbac") || title.includes("rbac") || title.includes("role")) {
    return "rbac";
  }
  if (slug.includes("s3") || title.includes("upload") || category.includes("storage")) {
    return "s3";
  }
  if (slug.includes("email") || title.includes("email") || category.includes("communication")) {
    return "email";
  }
  if (slug.includes("chat") || title.includes("chat") || title.includes("realtime")) {
    return "chat";
  }
  return "generic";
}

export function getCodePreview(kit: ForgeKit): { fileTree: PreviewNode[]; code: string } {
  const title = kit.title.toLowerCase();
  const category = kit.category.toLowerCase();
  const name = kit.title.replace(/\s+Kit$/i, "");
  const type = kitType(kit);

  if (type === "jwt") {
    return {
      fileTree: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "app", type: "folder" },
            { name: "middleware.ts", type: "file", active: true },
            { name: "api", type: "folder" },
            { name: "auth", type: "folder" },
            { name: "route.ts", type: "file" },
            { name: "lib", type: "folder" },
            { name: "auth.ts", type: "file" },
          ],
        },
      ],
      code: `// middleware.ts — protects routes using access tokens
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const user = await verifyAccessToken(token);

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"],
};`,
    };
  }

  if (type === "stripe") {
    return {
      fileTree: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "app", type: "folder" },
            { name: "api", type: "folder" },
            { name: "webhooks", type: "folder" },
            { name: "stripe", type: "folder" },
            { name: "route.ts", type: "file", active: true },
            { name: "lib", type: "folder" },
            { name: "stripe.ts", type: "file" },
          ],
        },
      ],
      code: `// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const sig = request.headers.get("stripe-signature") ?? "";

  const event = stripe.webhooks.constructEvent(
    payload,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case "invoice.payment_succeeded":
      // extend subscription until period end
      break;
    case "customer.subscription.deleted":
      // revoke workspace seats
      break;
  }

  return NextResponse.json({ received: true });
}`,
    };
  }

  if (type === "rbac") {
    return {
      fileTree: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "lib", type: "folder" },
            { name: "permissions.ts", type: "file" },
            { name: "roles.ts", type: "file", active: true },
            { name: "middleware", type: "folder" },
            { name: "rbac.ts", type: "file" },
          ],
        },
      ],
      code: `// lib/roles.ts
import { definePermission } from "@/lib/rbac";

export const Permissions = {
  users: {
    read: definePermission("users:read"),
    create: definePermission("users:create"),
    delete: definePermission("users:delete"),
  },
  billing: {
    read: definePermission("billing:read"),
    manage: definePermission("billing:manage"),
  },
} as const;

export const Roles = {
  Admin: [Permissions.users.delete, Permissions.billing.manage],
  Editor: [Permissions.users.create, Permissions.billing.read],
  Viewer: [Permissions.users.read],
};`,
    };
  }

  if (type === "s3") {
    return {
      fileTree: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "app", type: "folder" },
            { name: "api", type: "folder" },
            { name: "upload", type: "folder" },
            { name: "route.ts", type: "file", active: true },
            { name: "lib", type: "folder" },
            { name: "s3.ts", type: "file" },
          ],
        },
      ],
      code: `// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSignedUrl } from "@/lib/s3";

export async function POST(request: NextRequest) {
  const { filename, contentType } = await request.json();

  const { url, key } = await getSignedUrl({
    key: \`uploads/\${crypto.randomUUID()}/\${filename}\`,
    contentType,
    expiresIn: 300,
  });

  return NextResponse.json({ uploadUrl: url, key });
}`,
    };
  }

  if (type === "email") {
    return {
      fileTree: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "lib", type: "folder" },
            { name: "email.ts", type: "file" },
            { name: "templates", type: "folder" },
            { name: "verify.tsx", type: "file" },
            { name: "api", type: "folder" },
            { name: "send", type: "folder" },
            { name: "route.ts", type: "file", active: true },
          ],
        },
      ],
      code: `// app/api/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/email";
import { createVerificationToken } from "@/lib/tokens";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  const token = await createVerificationToken(email);

  await sendVerificationEmail({
    to: email,
    subject: "Verify your email",
    url: \`/verify?token=\${token}\`,
  });

  return NextResponse.json({ success: true });
}`,
    };
  }

  if (type === "chat") {
    return {
      fileTree: [
        {
          name: "src",
          type: "folder",
          children: [
            { name: "app", type: "folder" },
            { name: "api", type: "folder" },
            { name: "chat", type: "folder" },
            { name: "route.ts", type: "file", active: true },
            { name: "lib", type: "folder" },
            { name: "socket.ts", type: "file" },
          ],
        },
      ],
      code: `// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendMessage, getRoomHistory } from "@/lib/chat";

export async function GET(request: NextRequest, { params }: { params: { roomId: string } }) {
  const messages = await getRoomHistory(params.roomId);
  return NextResponse.json({ messages });
}

export async function POST(request: NextRequest, { params }: { params: { roomId: string } }) {
  const { text, userId } = await request.json();
  const message = await sendMessage(params.roomId, { text, userId });
  return NextResponse.json({ message });
}`,
    };
  }

  return {
    fileTree: [
      {
        name: "src",
        type: "folder",
        children: [
          { name: "app", type: "folder" },
          { name: "api", type: "folder" },
          { name: name.toLowerCase().replace(/\s+/g, "-"), type: "folder" },
          { name: "route.ts", type: "file", active: true },
          { name: "lib", type: "folder" },
          { name: `${name.toLowerCase().replace(/\s+/g, "-")}.ts`, type: "file" },
        ],
      },
    ],
    code: `import { NextRequest, NextResponse } from "next/server";
import { create${name.replace(/\s+/g, "")}Handler } from "@/lib/${name.toLowerCase().replace(/\s+/g, "-")}";

const handler = create${name.replace(/\s+/g, "")}Handler({
  debug: process.env.NODE_ENV === "development",
});

export async function GET(request: NextRequest) {
  const result = await handler.run(request);
  return NextResponse.json({ success: true, data: result });
}`,
  };
}

export function getOverview(kit: ForgeKit): ReactNode {
  const type = kitType(kit);

  if (type === "jwt") {
    return (
      <div className="space-y-6">
        <Section title="JWT Authentication Architecture">
          <p className="text-sm text-muted-foreground">
            The kit issues short-lived access tokens and long-lived refresh tokens. Access tokens are
            stateless JWTs signed with an HMAC secret, while refresh tokens are stored as httpOnly cookies
            and rotated on every use to prevent replay attacks.
          </p>
          <List
            items={[
              "Stateless access tokens for fast API authorization",
              "Refresh token rotation with automatic reuse detection",
              "Next.js middleware for route and API protection",
              "React hooks for login, logout, and session refresh",
            ]}
          />
        </Section>
        <Section title="Installation">
          <CodeBlock code={`npm install @devforge/${kit.slug}`} />
          <p className="text-sm text-muted-foreground">
            Copy the generated secret into your environment file and add the middleware matcher to your
            project. The kit works with Next.js 15 App Router and Edge runtime.
          </p>
        </Section>
        <Section title="Middleware Explanation">
          <p className="text-sm text-muted-foreground">
            The middleware runs on protected routes, reads the access token from cookies, and verifies the
            signature and expiration. If the token is missing or invalid, the user is redirected to the
            login page. Valid requests continue to the route handler with the decoded user attached.
          </p>
        </Section>
      </div>
    );
  }

  if (type === "stripe") {
    return (
      <div className="space-y-6">
        <Section title="Stripe Checkout Integration">
          <p className="text-sm text-muted-foreground">
            Generate Stripe Checkout sessions from your API. The kit supports one-time payments, monthly and
            yearly subscriptions, and tax collection with automatic customer creation.
          </p>
          <List
            items={[
              "Server-side checkout session creation",
              "Customer portal sessions for subscription management",
              "Webhook handler for invoice and subscription events",
              "Pricing table examples for common SaaS tiers",
            ]}
          />
        </Section>
        <Section title="Webhook & Subscription Lifecycle">
          <p className="text-sm text-muted-foreground">
            Webhooks keep your database in sync with Stripe. Listen for checkout completion, successful
            payments, failed renewals, and subscription cancellations to provision or revoke seats in real
            time.
          </p>
        </Section>
        <Section title="Pricing Examples">
          <List
            items={[
              "Starter — $0/month — up to 3 team members",
              "Pro — $29/month — unlimited members + priority support",
              "Enterprise — $99/month — SSO, audit logs, dedicated support",
            ]}
          />
        </Section>
      </div>
    );
  }

  if (type === "rbac") {
    return (
      <div className="space-y-6">
        <Section title="Role-Based Access Control">
          <p className="text-sm text-muted-foreground">
            Define granular permissions, compose them into roles, and enforce rules at the API edge. The kit
            ships with decorators for API routes and a middleware helper for Next.js.
          </p>
          <List
            items={[
              "Permission-first design with type-safe definitions",
              "Role composition that supports inheritance",
              "Decorators for server actions and route handlers",
              "Authorization middleware with automatic 403 responses",
            ]}
          />
        </Section>
        <Section title="Permissions, Roles & Decorators">
          <p className="text-sm text-muted-foreground">
            Permissions are strings such as users:read or billing:manage. Roles are arrays of permissions.
            The <code>@requirePermission</code> decorator wraps handlers and checks the current user against
            the required permission before execution.
          </p>
        </Section>
      </div>
    );
  }

  if (type === "s3") {
    return (
      <div className="space-y-6">
        <Section title="Upload API">
          <p className="text-sm text-muted-foreground">
            The upload API accepts file metadata and returns a presigned URL. Your frontend uploads directly
            to S3, keeping your server free of large payload handling and reducing bandwidth costs.
          </p>
          <List
            items={[
              "Presigned PUT/POST URLs with configurable expiry",
              "Content-type validation before URL generation",
              "Unique key generation with UUID prefixes",
              "Optional virus scanning hooks",
            ]}
          />
        </Section>
        <Section title="Signed URLs & Bucket Configuration">
          <p className="text-sm text-muted-foreground">
            Configure a private bucket with CORS rules for your domain and an IAM role that only allows
            PutObject and GetObject. Signed read URLs are generated on demand so files are never public by
            default.
          </p>
        </Section>
      </div>
    );
  }

  if (type === "email") {
    return (
      <div className="space-y-6">
        <Section title="Email Verification Flow">
          <p className="text-sm text-muted-foreground">
            Users receive a time-limited verification link after signup. Clicking the link marks the email
            as verified and invalidates the token. The same flow supports resend and token refresh.
          </p>
          <List
            items={[
              "Time-limited JWT or hashed verification tokens",
              "Resend throttling to prevent abuse",
              "HTML and plain-text email templates",
              "OTP fallback for high-security workspaces",
            ]}
          />
        </Section>
        <Section title="OTP & Email Templates">
          <p className="text-sm text-muted-foreground">
            The OTP module generates a short numeric code with a 10-minute window. Templates are built with
            React Email so they render consistently in all major clients and support design tokens from your
            brand.
          </p>
        </Section>
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="space-y-6">
        <Section title="Realtime Chat Architecture">
          <p className="text-sm text-muted-foreground">
            Built on a socket server that joins clients to rooms and broadcasts messages to connected peers.
            Messages are persisted to Postgres and delivered via Socket.IO or WebTransport adapters.
          </p>
          <List
            items={[
              "Room-based message routing",
              "Presence and typing indicators",
              "Message history with cursor pagination",
              "Event-driven architecture with typed events",
            ]}
          />
        </Section>
        <Section title="Events & Example Implementation">
          <p className="text-sm text-muted-foreground">
            Core events include connect, join-room, message, typing, and disconnect. Each event has a Zod
            schema and an associated handler that validates the payload before broadcasting.
          </p>
        </Section>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{kit.description}</p>
      <List
        items={[
          "Production-ready code with TypeScript",
          "Works with Next.js 15 App Router",
          "Includes tests and documentation",
        ]}
      />
    </div>
  );
}

export function getExample(kit: ForgeKit): ReactNode {
  const type = kitType(kit);

  if (type === "jwt") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Example auth.ts module and middleware usage.</p>
        <CodeBlock
          code={`// lib/auth.ts
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
}`}
        />
      </div>
    );
  }

  if (type === "stripe") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Create a checkout session from a server action.</p>
        <CodeBlock
          code={`// app/actions/checkout.ts
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
}`}
        />
      </div>
    );
  }

  if (type === "rbac") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Use decorators to protect API routes.</p>
        <CodeBlock
          code={`// app/api/users/route.ts
import { requirePermission } from "@/lib/rbac";
import { Permissions } from "@/lib/roles";

export const GET = requirePermission(Permissions.users.read, async () => {
  const users = await db.query.users.findMany();
  return Response.json({ users });
});

export const DELETE = requirePermission(Permissions.users.delete, async (request) => {
  const { id } = await request.json();
  await db.delete(users).where(eq(users.id, id));
  return Response.json({ success: true });
});`}
        />
      </div>
    );
  }

  if (type === "s3") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Frontend upload flow using the presigned URL.</p>
        <CodeBlock
          code={`// components/Uploader.tsx
async function uploadFile(file: File) {
  const { uploadUrl, key } = await fetch("/api/upload", {
    method: "POST",
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
    }),
  }).then((r) => r.json());

  await fetch(uploadUrl, { method: "PUT", body: file });
  return key;
}`}
        />
      </div>
    );
  }

  if (type === "email") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Trigger a verification email after signup.</p>
        <CodeBlock
          code={`// app/actions/signup.ts
"use server";

import { createVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";

export async function signup(email: string, password: string) {
  const user = await createUser(email, password);
  const token = await createVerificationToken(user.id);

  await sendVerificationEmail({
    to: email,
    subject: "Verify your DevForge account",
    url: \`/verify?token=\${token}\`,
  });

  return { userId: user.id };
}`}
        />
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Client-side socket connection and message sending.</p>
        <CodeBlock
          code={`// hooks/useChat.ts
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

export function useChat(roomId: string) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit("join-room", roomId);
    socket.on("message", (msg) => setMessages((m) => [...m, msg]));
    return () => { socket.off("message"); };
  }, [roomId]);

  function send(text: string) {
    socket.emit("message", { roomId, text, userId: "user_123" });
  }

  return { messages, send };
}`}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Example usage for {kit.title}.</p>
      <CodeBlock code={`// Example\nconst kit = new ${kit.title.replace(/\s+/g, "")}();`} />
    </div>
  );
}

export function getApi(kit: ForgeKit): ReactNode {
  const type = kitType(kit);

  if (type === "jwt") {
    return (
      <div className="space-y-3">
        <Endpoint method="POST" path="/api/auth/login" desc="Exchange credentials for access and refresh tokens." />
        <Endpoint method="POST" path="/api/auth/refresh" desc="Issue a new access token using a valid refresh token." />
        <Endpoint method="POST" path="/api/auth/logout" desc="Invalidate the current refresh token and clear cookies." />
        <Endpoint method="GET" path="/api/me" desc="Return the current user from the access token." />
      </div>
    );
  }

  if (type === "stripe") {
    return (
      <div className="space-y-3">
        <Endpoint method="POST" path="/api/checkout" desc="Create a Stripe Checkout session." />
        <Endpoint method="POST" path="/api/billing/portal" desc="Create a customer portal session." />
        <Endpoint method="POST" path="/api/webhooks/stripe" desc="Receive and validate Stripe webhook events." />
        <Endpoint method="GET" path="/api/subscriptions" desc="List the authenticated user's active subscriptions." />
      </div>
    );
  }

  if (type === "rbac") {
    return (
      <div className="space-y-3">
        <Endpoint method="GET" path="/api/permissions" desc="List all permissions for the current workspace." />
        <Endpoint method="POST" path="/api/roles" desc="Create or update a role with permission assignments." />
        <Endpoint method="GET" path="/api/roles/{id}" desc="Fetch a role and its members." />
        <Endpoint method="POST" path="/api/check" desc="Verify whether a user has a given permission." />
      </div>
    );
  }

  if (type === "s3") {
    return (
      <div className="space-y-3">
        <Endpoint method="POST" path="/api/upload" desc="Request a presigned upload URL." />
        <Endpoint method="GET" path="/api/files/{key}" desc="Generate a temporary read URL for a file." />
        <Endpoint method="DELETE" path="/api/files/{key}" desc="Delete an object from the bucket." />
      </div>
    );
  }

  if (type === "email") {
    return (
      <div className="space-y-3">
        <Endpoint method="POST" path="/api/send" desc="Send a verification email to the provided address." />
        <Endpoint method="POST" path="/api/verify" desc="Validate a verification token and mark the email verified." />
        <Endpoint method="POST" path="/api/verify/otp" desc="Validate a one-time passcode." />
        <Endpoint method="POST" path="/api/resend" desc="Resend the verification email with rate limiting." />
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="space-y-3">
        <Endpoint method="GET" path="/api/chat/{roomId}" desc="Fetch paginated message history for a room." />
        <Endpoint method="POST" path="/api/chat/{roomId}" desc="Persist a message and broadcast it to the room." />
        <Endpoint method="GET" path="/api/chat/{roomId}/presence" desc="List currently connected members." />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Endpoint method="GET" path="/api/{slug}" desc={`Fetch ${kit.title} data.`} />
      <Endpoint method="POST" path="/api/{slug}" desc={`Create a ${kit.title} resource.`} />
    </div>
  );
}

export function getReviews(kit: ForgeKit): ReactNode {
  const type = kitType(kit);

  const reviews: { name: string; rating: string; text: string }[] =
    type === "jwt"
      ? [
          {
            name: "Alex Rivera",
            rating: "★★★★★",
            text: "Saved us days of auth work. The refresh rotation logic is rock solid.",
          },
          {
            name: "Priya Shah",
            rating: "★★★★☆",
            text: "Great middleware examples. Needed a small tweak for Edge runtime.",
          },
        ]
      : type === "stripe"
      ? [
          {
            name: "Jordan Lee",
            rating: "★★★★★",
            text: "Webhook handler is production-ready. Subscriptions started working in an hour.",
          },
          {
            name: "Sam Taylor",
            rating: "★★★★★",
            text: "Clear pricing examples and customer portal integration.",
          },
        ]
      : type === "rbac"
      ? [
          {
            name: "Morgan Chen",
            rating: "★★★★★",
            text: "Permissions model is clean and the decorators are a joy to use.",
          },
          {
            name: "Casey Patel",
            rating: "★★★★☆",
            text: "Would love a UI to manage roles, but the backend is perfect.",
          },
        ]
      : type === "s3"
      ? [
          {
            name: "Taylor Brooks",
            rating: "★★★★★",
            text: "Direct S3 uploads are fast and the signed URLs are easy to secure.",
          },
          {
            name: "Jamie Doe",
            rating: "★★★★☆",
            text: "Bucket config guide was helpful. Needed to update CORS for my CDN.",
          },
        ]
      : type === "email"
      ? [
          {
            name: "Riley Green",
            rating: "★★★★★",
            text: "Templates rendered perfectly in Gmail and Outlook. OTP flow is solid.",
          },
          {
            name: "Quinn Nguyen",
            rating: "★★★★★",
            text: "Verification flow reduced our fake signups by 90%.",
          },
        ]
      : type === "chat"
      ? [
          {
            name: "Drew Kim",
            rating: "★★★★★",
            text: "Room-based events are typed and the history API is fast.",
          },
          {
            name: "Avery Singh",
            rating: "★★★★☆",
            text: "Socket architecture guide made scaling straightforward.",
          },
        ]
      : [
          {
            name: "Casey Wilson",
            rating: "★★★★★",
            text: "Clean implementation and great documentation.",
          },
        ];

  return (
    <div className="space-y-3">
      {reviews.map((r, i) => (
        <Review key={i} {...r} />
      ))}
    </div>
  );
}
