import crypto from "node:crypto";
import { Polar } from "@polar-sh/sdk";

let cachedPolar: Polar | null = null;

function ensureEnv(): { accessToken: string; productId: string; appUrl: string } {
  const missing: string[] = [];

  const accessToken = process.env.POLAR_ACCESS_TOKEN?.trim() ?? "";
  if (!accessToken) missing.push("POLAR_ACCESS_TOKEN");

  const productId = process.env.POLAR_PRODUCT_ID?.trim() ?? "";
  if (!productId) missing.push("POLAR_PRODUCT_ID");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() ?? "";
  if (!appUrl) missing.push("NEXT_PUBLIC_APP_URL");

  if (missing.length > 0) {
    throw new Error(
      `Missing required Polar environment variables: ${missing.join(", ")}. ` +
        `Please add them to your .env.local file.`
    );
  }

  return { accessToken, productId, appUrl };
}

export function getPolarClient(): Polar {
  if (cachedPolar) return cachedPolar;
  const { accessToken } = ensureEnv();
  cachedPolar = new Polar({
    accessToken,
    server: "production",
  });
  return cachedPolar;
}

export function getPolarProductId(): string {
  const { productId } = ensureEnv();
  return productId;
}

export function getPolarAppUrl(): string {
  const { appUrl } = ensureEnv();
  return appUrl;
}

export async function createCheckout({
  successUrl,
  cancelUrl,
  customerEmail,
}: {
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string | null;
}): Promise<{ url: string }> {
  const polar = getPolarClient();
  const productId = getPolarProductId();

  const checkout = await polar.checkouts.create({
    products: [productId],
    successUrl,
    returnUrl: cancelUrl,
    customerEmail: customerEmail ?? undefined,
  });

  return { url: checkout.url ?? "" };
}

export function verifyWebhook(rawBody: string, signatureHeader: string | null): boolean {
  const secret = process.env.POLAR_WEBHOOK_SECRET;
  if (!secret || !signatureHeader) return false;

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest();

  const candidates = signatureHeader
    .split(",")
    .map((part) => part.trim())
    .flatMap((part) => {
      const prefixMatch = part.match(/^(?:v1|sha256)=?(.+)$/i);
      const sig = prefixMatch ? prefixMatch[1].trim() : part;
      if (!sig) return [];
      return [sig.toLowerCase()];
    });

  for (const sig of candidates) {
    let candidate: Buffer;
    try {
      if (/^[0-9a-f]+$/i.test(sig)) {
        candidate = Buffer.from(sig, "hex");
      } else {
        candidate = Buffer.from(sig, "base64");
      }
      if (candidate.length === expected.length) {
        if (crypto.timingSafeEqual(candidate, expected)) return true;
      }
    } catch {
      // ignore malformed signatures
    }
  }

  return false;
}

export { getSubscription } from "@/services/subscription";

