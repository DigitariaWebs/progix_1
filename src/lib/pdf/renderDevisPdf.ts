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
  // @sparticuz/chromium only ships (and only supports) the cut-down
  // chrome-headless-shell binary — its own `chromium.args` already bakes in
  // `--headless='shell'`. Passing `headless: true` here would make
  // puppeteer-core additionally inject the full-Chrome `--headless=new` flag
  // via its own defaultArgs(), handing the binary two conflicting --headless
  // flags. `puppeteer.defaultArgs({ args: chromium.args, headless: "shell" })`
  // is the invocation documented for this package/version pairing.
  const browser = await puppeteer.launch({
    args: await puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
    executablePath: await chromium.executablePath(),
    headless: "shell",
  });

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(20_000);
    page.setDefaultTimeout(20_000);

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
    // preferCSSPageSize honors the @page { margin: 12mm; } rule in
    // devis.module.css — without it, margin defaults to 0 on all sides and
    // the PDF would ignore the print stylesheet's intended layout entirely.
    const pdf = await page.pdf({ format: "a4", printBackground: true, preferCSSPageSize: true });
    return Buffer.from(pdf);
  } finally {
    try {
      await browser.close();
    } catch (closeErr) {
      // Don't let a close() failure mask whatever actually went wrong above.
      console.error("[pdf] failed to close browser", closeErr);
    }
  }
}
