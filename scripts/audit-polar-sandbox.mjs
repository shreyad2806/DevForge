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

const accessToken = process.env.POLAR_ACCESS_TOKEN ?? "";
const productId = process.env.POLAR_PRODUCT_ID ?? "";

if (!accessToken || !productId) {
  console.error("Missing POLAR_ACCESS_TOKEN or POLAR_PRODUCT_ID");
  process.exit(1);
}

const polar = new Polar({ accessToken, server: "sandbox" });

const payload = {
  products: [productId],
  successUrl: "http://localhost:3000/billing?success=true",
  returnUrl: "http://localhost:3000/pricing",
  customerEmail: "audit@example.com",
  metadata: { userId: "audit-user-id" },
};

console.log("[Sandbox SDK] calling polar.checkouts.create...");
try {
  const checkout = await polar.checkouts.create(payload);
  console.log("[Sandbox SDK] success:", checkout.url ? checkout.url.slice(0, 80) + "..." : "no url");
} catch (err) {
  console.error("[Sandbox SDK] error:", err.message);
  console.error("  status:", err.statusCode ?? err.status ?? "unknown");
  console.error("  body:", err.body ? JSON.stringify(err.body).slice(0, 300) : "n/a");
}

console.log("[Sandbox direct fetch] POST https://sandbox-api.polar.sh/v1/checkouts/");
try {
  const res = await fetch("https://sandbox-api.polar.sh/v1/checkouts/", {
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
  console.log("  response:", body.slice(0, 300));
} catch (err) {
  console.error("[Sandbox direct fetch] error:", err.message);
}
