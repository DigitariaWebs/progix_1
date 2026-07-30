import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { env } from "@/core/env";
import { getEstimateBySlug } from "./queries";

const COOKIE_PREFIX = "devis_unlock_";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function secret(): string {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set (server-only secret).");
  }
  return env.SUPABASE_SERVICE_ROLE_KEY;
}

function sign(slug: string): string {
  return createHmac("sha256", secret()).update(slug).digest("hex");
}

/**
 * Server-only: mints the same signed cookie value verifyDevisAccessAction
 * issues after a correct access code. Used by the PDF renderer, which always
 * runs after a caller (signAndLockEstimateAction / getSignedPdfAction) has
 * already independently verified access via isDevisUnlocked — there is no
 * real access code to hand Puppeteer here, so it authenticates the same way
 * a real unlocked browser would: by presenting this cookie.
 */
export function mintUnlockCookieValue(slug: string): string {
  return sign(slug);
}

function bytesEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

/**
 * Server-side check: has this browser already proven — in a previous request —
 * that it knows the access code for `slug`? Backed by a signed, httpOnly,
 * slug-scoped cookie (not the old client-side localStorage-only check, which
 * never actually gated the data fetch).
 */
export async function isDevisUnlocked(slug: string): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_PREFIX + slug)?.value;
  return token !== undefined && bytesEqual(token, sign(slug));
}

export type VerifyDevisAccessResult = { ok: true } | { ok: false };

/**
 * Checks the submitted code against Supabase server-side — the code and the
 * estimate it belongs to are never sent to the browser as part of this check.
 * On success, sets the unlock cookie so subsequent requests for this slug
 * render the real content.
 */
export async function verifyDevisAccessAction(
  slug: string,
  code: string,
): Promise<VerifyDevisAccessResult> {
  "use server";
  const estimate = await getEstimateBySlug(slug);
  if (!estimate || !bytesEqual(code, estimate.access_code)) {
    return { ok: false };
  }

  const store = await cookies();
  store.set(COOKIE_PREFIX + slug, sign(slug), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE_SECONDS,
    path: "/",
  });
  return { ok: true };
}
