import fs from "node:fs";
import { Polar } from "@polar-sh/sdk";

function loadEnv(path) {
  if (!fs.existsSync(path)) return;
  const text = fs.readFileSync(path, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_]+)\s*=\s*(.*)$/);
    if (!match) continue;
    const [, key, value] = match;
    process.env[key] = value.trim().replace(/^["']|["']$/g, "");
  }
}

loadEnv(".env.local");

function mask(value) {
  if (!value) return "<missing>";
  const len = value.length;
  const start = value.slice(0, 10);
  const end = value.slice(-5);
  return `${start}${"*".repeat(Math.max(0, len - 15))}${end} (length ${len})`;
}

const accessToken = process.env.POLAR_ACCESS_TOKEN ?? "";
const productId = process.env.POLAR_PRODUCT_ID ?? "";
const webhookSecret = process.env.POLAR_WEBHOOK_SECRET ?? "";
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

console.log("ENV");
console.log("  POLAR_ACCESS_TOKEN exists?", !!accessToken, mask(accessToken));
console.log("  POLAR_PRODUCT_ID exists?", !!productId, productId);
console.log("  POLAR_WEBHOOK_SECRET exists?", !!webhookSecret, mask(webhookSecret));
console.log("  NEXT_PUBLIC_APP_URL exists?", !!appUrl, appUrl);

if (!accessToken || !productId) {
  console.error("Missing required env vars; aborting live test.");
  process.exit(1);
}

const polar = new Polar({ accessToken, server: "production" });

const successUrl = `${appUrl}/billing?success=true`;
const cancelUrl = `${appUrl}/pricing`;
const payload = {
  products: [productId],
  successUrl,
  returnUrl: cancelUrl,
  customerEmail: "audit@example.com",
  metadata: { userId: "audit-user-id" },
};

console.log("\nSDK checkout payload:", JSON.stringify({ ...payload, customerEmail: payload.customerEmail, metadata: payload.metadata }, null, 2));

try {
  console.log("\n[SDK] Calling polar.checkouts.create...");
  const checkout = await polar.checkouts.create(payload);
  console.log("[SDK] success:", checkout.url ? checkout.url.slice(0, 80) + "..." : "no url");
} catch (err) {
  console.error("[SDK] error:", err.message);
  console.error("  status:", err.statusCode ?? err.status ?? "unknown");
  console.error("  body:", err.body ? JSON.stringify(err.body) : "n/a");
  console.error("  headers:", err.headers ? JSON.stringify(err.headers) : "n/a");
  console.error("  endpoint:", err.url ?? err.endpoint ?? "n/a");
}

console.log("\n[Direct fetch] POST https://api.polar.sh/v1/checkouts/");
try {
  const res = await fetch("https://api.polar.sh/v1/checkouts/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  const body = await res.text();
  console.log("  status:", res.status);
  console.log("  response:", body.slice(0, 500));
} catch (err) {
  console.error("[Direct fetch] error:", err.message);
}

console.log("\n[Product lookup] polar.products.get");
try {
  const product = await polar.products.get({ id: productId });
  console.log("  product name:", product.name, "| id:", product.id);
} catch (err) {
  console.error("[Product lookup] error:", err.message);
  console.error("  status:", err.statusCode ?? err.status ?? "unknown");
  console.error("  body:", err.body ? JSON.stringify(err.body) : "n/a");
}
