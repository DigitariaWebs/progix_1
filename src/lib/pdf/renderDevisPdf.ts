import "server-only";
import { existsSync } from "node:fs";
import chromium from "@sparticuz/chromium";
import puppeteer, { type Browser } from "puppeteer-core";
import { mintUnlockCookieValue } from "@/features/devis/gate";

function siteBaseUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/**
 * @sparticuz/chromium ships a single Linux x64 binary (that's its whole point:
 * a Chromium small enough to fit in a Lambda bundle). Outside that runtime —
 * i.e. a developer's machine — extracting it produces an ELF file the OS can't
 * exec, and puppeteer.launch dies with a bare "spawn ... ENOENT". So only use
 * it where it actually applies, and fall back to a locally installed browser.
 */
function isServerlessRuntime(): boolean {
  return Boolean(process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.VERCEL);
}

/** Chrome/Edge install locations to probe, per platform. Edge counts: it's Chromium. */
function localBrowserCandidates(): string[] {
  const { ProgramFiles, "ProgramFiles(x86)": programFilesX86, LOCALAPPDATA } = process.env;

  if (process.platform === "win32") {
    const roots = [ProgramFiles, programFilesX86, LOCALAPPDATA].filter(Boolean) as string[];
    return roots.flatMap((root) => [
      `${root}\\Google\\Chrome\\Application\\chrome.exe`,
      `${root}\\Microsoft\\Edge\\Application\\msedge.exe`,
    ]);
  }

  if (process.platform === "darwin") {
    return [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    ];
  }

  return [
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/microsoft-edge",
  ];
}

function localBrowserPath(): string {
  const override = process.env.PUPPETEER_EXECUTABLE_PATH;
  if (override) {
    if (!existsSync(override)) {
      throw new Error(`PUPPETEER_EXECUTABLE_PATH points at a missing file: ${override}`);
    }
    return override;
  }

  const found = localBrowserCandidates().find((p) => existsSync(p));
  if (!found) {
    throw new Error(
      "No local Chrome/Chromium/Edge found for PDF rendering. Install one, or set " +
        "PUPPETEER_EXECUTABLE_PATH to its executable.",
    );
  }
  return found;
}

async function launchBrowser(): Promise<Browser> {
  if (!isServerlessRuntime()) {
    return puppeteer.launch({ executablePath: localBrowserPath(), headless: true });
  }

  // @sparticuz/chromium only ships (and only supports) the cut-down
  // chrome-headless-shell binary — its own `chromium.args` already bakes in
  // `--headless='shell'`. Passing `headless: true` here would make
  // puppeteer-core additionally inject the full-Chrome `--headless=new` flag
  // via its own defaultArgs(), handing the binary two conflicting --headless
  // flags. `puppeteer.defaultArgs({ args: chromium.args, headless: "shell" })`
  // is the invocation documented for this package/version pairing.
  return puppeteer.launch({
    args: await puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
    executablePath: await chromium.executablePath(),
    headless: "shell",
  });
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
  const browser = await launchBrowser();

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

    // Vercel Deployment Protection sits in front of the deployment URL and
    // answers Puppeteer with its own login page. The devis unlock cookie above
    // is useless against it — it gates our app, not Vercel's edge. This is the
    // documented automation escape hatch (Project Settings → Deployment
    // Protection → Protection Bypass for Automation).
    const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    if (bypassSecret) {
      await page.setExtraHTTPHeaders({
        "x-vercel-protection-bypass": bypassSecret,
        "x-vercel-set-bypass-cookie": "true",
      });
    }

    const url = `${baseUrl}/devis/${slug}/contrat`;
    const response = await page.goto(url, { waitUntil: "networkidle0" });

    // Without these two checks a protection wall, a 404 or an error page all
    // render into a perfectly valid-looking PDF — which signAndLockEstimateAction
    // then emails to the closer as if it were the signed contract. Fail loudly
    // instead: a thrown error surfaces in the logs and to the caller.
    if (!response || !response.ok()) {
      throw new Error(
        `Devis page did not load: HTTP ${response?.status() ?? "no response"} for ${url}`,
      );
    }
    if (!(await page.$("[data-devis-root]"))) {
      throw new Error(
        `Devis page loaded but rendered something else (auth wall / redirect?): ended at ${page.url()}`,
      );
    }

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
