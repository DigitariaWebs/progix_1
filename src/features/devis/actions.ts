"use server";

// PDF generation (headless Chromium) + email dispatch can take several
// seconds; the default Vercel function duration is too short for that.
// A "use server" file may only export async functions, so `maxDuration`
// can't live here — it's set instead on the page(s) that invoke these
// actions (Next.js resolves a Server Action's timeout from the invoking
// page's route-segment config): see maxDuration exports in
// src/app/devis/[client]/contrat/page.tsx (signAndLockEstimateAction /
// getSignedPdfAction) and src/app/admin/layout.tsx (resendClosingEmailAction,
// inherited down through the admin route tree).

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { DEFAULT_ESTIMATE, ClientEstimate } from "./types";
import { getAllEstimates, getEstimateBySlug } from "./queries";
import { revalidatePath } from "next/cache";
import { isDevisUnlocked } from "./gate";
import { renderDevisPdf } from "@/lib/pdf/renderDevisPdf";
import { sendLeadEmail } from "@/lib/email/sendLeadEmail";
import { parseCloserPrompt, AiDevisDraft, AiParseError } from "./prompt-parse";
import { MissingOpenAiKeyError } from "@/lib/ai/openai";

export async function fetchEstimatesAction(): Promise<ClientEstimate[]> {
  await requireAdmin();
  return await getAllEstimates();
}

export async function fetchEstimateBySlugAction(slug: string): Promise<ClientEstimate | null> {
  await requireAdmin();
  return await getEstimateBySlug(slug);
}

async function getWriteClient() {
  try {
    return createAdminClient();
  } catch {
    return await createClient();
  }
}

const featureItemSchema = z.object({
  id: z.string(),
  category: z.enum(["dev", "api", "marketing"]),
  labelStrong: z.string().optional(),
  label: z.string(),
  included: z.boolean(),
  isCustom: z.boolean().optional(),
});

const investmentItemSchema = z.object({
  id: z.string(),
  labelStrong: z.string().optional(),
  label: z.string(),
  amount: z.string(),
});

const installmentItemSchema = z.object({
  label: z.string(),
  percentage: z.number(),
  amount: z.string(),
});

const estimateInputSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1, "Le slug est requis").max(80),
  access_code: z.string().min(1, "Le code d'accès est requis").max(80),
  client_name: z.string().min(1, "Le nom du client est requis"),
  closer_id: z.string().min(1, "Le closer est requis"),
  project_name: z.string().min(1, "Le nom du projet est requis"),
  project_title: z.string().min(1, "Le titre du projet est requis"),
  project_description: z.string().min(1, "La description est requise"),
  currency: z.enum(["€", "$CAD"]),
  total_amount: z.string().min(1, "Le montant est requis"),
  delivery_days: z.string().min(1, "Le délai est requis"),
  dev_duration_days: z.string().min(1, "La durée de développement est requise"),
  marketing_included: z.boolean(),
  features: z.array(featureItemSchema),
  investments: z.array(investmentItemSchema),
  payment_schedule_type: z.enum(["monthly", "installments"]),
  payment_months: z.number().int().min(1),
  payment_installments: z.array(installmentItemSchema),
});

const signInputSchema = z.object({
  client_name: z.string().min(1, "Le nom est requis"),
  company: z.string().optional().default(""),
  title: z.string().min(1, "Le titre est requis"),
  date: z.string().min(1, "La date est requise"),
  email: z.string().email("Courriel invalide"),
  signature_data_url: z.string().min(1, "La signature est requise"),
});

/**
 * Emails the signed PDF to the devis's assigned closer. Swallows its own
 * errors (logged, not thrown) — a failed notification email must never make
 * it look like the client's signature didn't take; the signature + lock are
 * already committed to the database by the time this runs.
 */
async function emailPdfToCloser(estimate: ClientEstimate, pdf: Buffer): Promise<boolean> {
  if (!estimate.closer_id) return false;

  try {
    const supabase = createAdminClient();
    const { data: closer } = await supabase
      .from("closers")
      .select("*")
      .eq("id", estimate.closer_id)
      .single();
    if (!closer) return false;

    await sendLeadEmail({
      to: closer.email,
      subject: `Devis signé — ${estimate.project_name} (${estimate.client_name})`,
      html: `<p>${estimate.client_name} vient de signer le devis « ${estimate.project_name} ». Le PDF signé est en pièce jointe.</p>`,
      attachments: [{ filename: `devis-${estimate.slug}.pdf`, content: pdf }],
    });

    const writeClient = await getWriteClient();
    await writeClient
      .from("client_estimates")
      .update({ pdf_email_sent_at: new Date().toISOString() })
      .eq("slug", estimate.slug);
    return true;
  } catch (err) {
    console.error("[devis] failed to email closer", estimate.slug, err);
    return false;
  }
}

export type SaveEstimateResult = { ok: true; slug: string } | { ok: false; error: string };

export async function saveEstimateAction(input: unknown): Promise<SaveEstimateResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Non autorisé." };
  }

  const parsed = estimateInputSchema.safeParse(input);
  if (!parsed.success) {
    const errorMsg = parsed.error.issues.map((i) => i.message).join(", ");
    return { ok: false, error: errorMsg };
  }

  const existing = await getEstimateBySlug(parsed.data.slug);
  if (existing?.locked) {
    return { ok: false, error: "Ce devis est verrouillé (signé) et ne peut plus être modifié." };
  }

  try {
    const supabase = await getWriteClient();
    const payload = {
      slug: parsed.data.slug,
      access_code: parsed.data.access_code,
      client_name: parsed.data.client_name,
      closer_id: parsed.data.closer_id,
      project_name: parsed.data.project_name,
      project_title: parsed.data.project_title,
      project_description: parsed.data.project_description,
      currency: parsed.data.currency,
      total_amount: parsed.data.total_amount,
      delivery_days: parsed.data.delivery_days,
      dev_duration_days: parsed.data.dev_duration_days,
      marketing_included: parsed.data.marketing_included,
      features: parsed.data.features,
      investments: parsed.data.investments,
      payment_schedule_type: parsed.data.payment_schedule_type,
      payment_months: parsed.data.payment_months,
      payment_installments: parsed.data.payment_installments,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("client_estimates")
      .upsert(payload, { onConflict: "slug" });

    if (error) {
      return { ok: false, error: `Erreur Supabase: ${error.message}` };
    }

    revalidatePath("/admin/devis");
    revalidatePath(`/devis/${parsed.data.slug}`);
    return { ok: true, slug: parsed.data.slug };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inattendue lors de la sauvegarde.";
    return { ok: false, error: message };
  }
}

export type SignEstimateResult = { ok: true; pdfBase64: string } | { ok: false; error: string };

/**
 * Public-facing (not requireAdmin-gated) — a client on the devis portal calls
 * this, authenticated the same way the rest of that portal is: the signed
 * "already unlocked" cookie from gate.ts, not an admin session.
 */
export async function signAndLockEstimateAction(
  slug: string,
  input: unknown,
): Promise<SignEstimateResult> {
  if (!(await isDevisUnlocked(slug))) {
    return { ok: false, error: "Accès non autorisé." };
  }

  const parsed = signInputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues.map((i) => i.message).join(", ") };
  }

  const estimate = await getEstimateBySlug(slug);
  if (!estimate) {
    return { ok: false, error: "Devis introuvable." };
  }
  if (estimate.locked) {
    return { ok: false, error: "Ce devis est déjà signé." };
  }

  const signature = {
    client_name: parsed.data.client_name,
    company: parsed.data.company,
    title: parsed.data.title,
    date: parsed.data.date,
    email: parsed.data.email,
    signature_data_url: parsed.data.signature_data_url,
    signed_at: new Date().toISOString(),
  };

  const supabase = await getWriteClient();
  // The `.eq("locked", false)` guard makes this update a no-op if a
  // concurrent request already locked the row — the first signer wins.
  // `.select().single()` is what actually lets us detect that no-op: without
  // it, a zero-row match still comes back as `error: null`, indistinguishable
  // from a real success (e.g. a double-click on "Sign" during the multi-second
  // PDF-render window would otherwise pass silently and send a second email).
  const { data, error } = await supabase
    .from("client_estimates")
    .update({ signature, locked: true, updated_at: new Date().toISOString() })
    .eq("slug", slug)
    .eq("locked", false)
    .select("slug")
    .single();

  if (error || !data) {
    return {
      ok: false,
      error: "Ce devis vient d'être signé (par un autre onglet ou une double soumission).",
    };
  }

  let pdf: Buffer;
  try {
    pdf = await renderDevisPdf(slug);
  } catch (err) {
    console.error("[devis] PDF render failed after signing", slug, err);
    revalidatePath(`/devis/${slug}/contrat`);
    return {
      ok: false,
      error: "Signature enregistrée, mais la génération du PDF a échoué. Contactez le support.",
    };
  }

  await emailPdfToCloser({ ...estimate, signature, locked: true }, pdf);

  revalidatePath(`/devis/${slug}/contrat`);
  revalidatePath(`/admin/devis/${slug}`);
  return { ok: true, pdfBase64: pdf.toString("base64") };
}

export type GetSignedPdfResult = { ok: true; pdfBase64: string } | { ok: false; error: string };

/**
 * Re-download path for an already-signed devis. Deliberately separate from
 * signAndLockEstimateAction so re-downloading never re-triggers the closer
 * email — it only regenerates the PDF from the already-locked state.
 */
export async function getSignedPdfAction(slug: string): Promise<GetSignedPdfResult> {
  if (!(await isDevisUnlocked(slug))) {
    return { ok: false, error: "Accès non autorisé." };
  }

  const estimate = await getEstimateBySlug(slug);
  if (!estimate || !estimate.locked) {
    return { ok: false, error: "Ce devis n'est pas encore signé." };
  }

  try {
    const pdf = await renderDevisPdf(slug);
    return { ok: true, pdfBase64: pdf.toString("base64") };
  } catch (err) {
    // Swallowing this silently meant a browser-launch failure looked identical
    // to a render failure from the client side, with nothing server-side to go
    // on. The client message stays generic; the cause goes to the logs.
    console.error("[devis] PDF re-download failed", slug, err);
    return { ok: false, error: "Échec de la génération du PDF." };
  }
}

export async function resendClosingEmailAction(slug: string): Promise<{ ok: boolean; error?: string }> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Non autorisé." };
  }

  const estimate = await getEstimateBySlug(slug);
  if (!estimate || !estimate.locked) {
    return { ok: false, error: "Ce devis n'est pas signé." };
  }

  try {
    const pdf = await renderDevisPdf(slug);
    const sent = await emailPdfToCloser(estimate, pdf);
    revalidatePath(`/admin/devis/${slug}`);
    return sent
      ? { ok: true }
      : { ok: false, error: "Le PDF a été régénéré mais l'envoi de l'email a échoué." };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Erreur inattendue." };
  }
}

export async function deleteEstimateAction(slug: string): Promise<{ ok: boolean; error?: string }> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Non autorisé." };
  }

  const existing = await getEstimateBySlug(slug);
  if (existing?.locked) {
    return { ok: false, error: "Ce devis est verrouillé (signé) et ne peut plus être supprimé." };
  }

  try {
    const supabase = await getWriteClient();
    const { error } = await supabase.from("client_estimates").delete().eq("slug", slug);
    if (error) {
      return { ok: false, error: error.message };
    }
    revalidatePath("/admin/devis");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Erreur inattendue" };
  }
}

export type ParseCloserPromptResult =
  | { ok: true; draft: AiDevisDraft }
  | { ok: false; error: string };

export async function parseCloserPromptAction(rawText: string): Promise<ParseCloserPromptResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Non autorisé." };
  }

  if (!rawText.trim()) {
    return { ok: false, error: "Colle d'abord le texte à analyser." };
  }

  try {
    const draft = await parseCloserPrompt(rawText);
    return { ok: true, draft };
  } catch (err) {
    if (err instanceof MissingOpenAiKeyError) {
      return { ok: false, error: `Analyse IA indisponible : ${err.message}` };
    }
    if (err instanceof AiParseError) {
      return { ok: false, error: err.message };
    }
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Erreur inattendue lors de l'analyse IA.",
    };
  }
}

export async function seedDefaultEstimateAction(): Promise<{ ok: boolean; error?: string }> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Non autorisé." };
  }

  try {
    const supabase = await getWriteClient();
    const { error } = await supabase
      .from("client_estimates")
      .upsert(DEFAULT_ESTIMATE, { onConflict: "slug" });
    if (error) {
      return { ok: false, error: error.message };
    }
    revalidatePath("/admin/devis");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Erreur inattendue" };
  }
}
