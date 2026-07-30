import "server-only";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { mintUnlockCookieValue } from "@/features/devis/gate";

function siteBaseUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/**
 * Renders /devis/[slug]/contrat to a PDF via headless Chromium. Authenticates
 * as "already unlocked" using the same signed cookie the password gate issues
 * (gate.ts's mintUnlockCookieValue) — this always runs after the caller has
 * already independently verified access server-side (signAndLockEstimateAction
 * / getSignedPdfAction both check isDevisUnlocked first), so there's no real
 * access code to hand over here. Reuses the page's existing @media print
 * rules (devis.module.css) — same visual output as the old browser-print
 * path, just captured server-side into an actual file.
 */
export async function renderDevisPdf(slug: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });

  try {
    const page = await browser.newPage();
    const baseUrl = siteBaseUrl();
    const { hostname } = new URL(baseUrl);

    await page.setCookie({
      name: `devis_unlock_${slug}`,
      value: mintUnlockCookieValue(slug),
      domain: hostname,
      path: "/",
      httpOnly: true,
    });

    await page.goto(`${baseUrl}/devis/${slug}/contrat`, { waitUntil: "networkidle0" });
    await page.emulateMediaType("print");
    const pdf = await page.pdf({ format: "a4", printBackground: true });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
