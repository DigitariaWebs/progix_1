"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_ESTIMATE, ClientEstimate } from "./types";
import { getAllEstimates, getEstimateBySlug } from "./queries";
import { revalidatePath } from "next/cache";

/**
 * Server Actions are public POST endpoints regardless of which page renders the
 * calling form -- the client-side admin auth gate never touches this layer.
 * Every action below that reads or writes the admin dashboard's data must call
 * this first and bail out if there's no real signed-in Supabase user.
 *
 * Checked by email, not just "is logged in": this Supabase project is
 * intentionally shared with another app, so any other authenticated user of
 * that project must not automatically get admin rights here. Matches the
 * `client_estimates: admin *` RLS policies (supabase/migrations/0007), which
 * enforce the same rule at the database layer as a second, independent gate.
 */
const ADMIN_EMAIL = "admin@progix.pro";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.email !== ADMIN_EMAIL) {
    throw new Error("Non autorisé.");
  }
  return user;
}

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
  project_name: z.string().min(1, "Le nom du projet est requis"),
  project_title: z.string().min(1, "Le titre du projet est requis"),
  project_description: z.string().min(1, "La description est requise"),
  currency: z.enum(["€", "$CAD"]),
  total_amount: z.string().min(1, "Le montant est requis"),
  delivery_days: z.string().min(1, "Le délai est requis"),
  marketing_included: z.boolean(),
  features: z.array(featureItemSchema),
  investments: z.array(investmentItemSchema),
  payment_schedule_type: z.enum(["monthly", "installments"]),
  payment_months: z.number().int().min(1),
  payment_installments: z.array(installmentItemSchema),
});

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

  try {
    const supabase = await getWriteClient();
    const payload = {
      slug: parsed.data.slug,
      access_code: parsed.data.access_code,
      client_name: parsed.data.client_name,
      project_name: parsed.data.project_name,
      project_title: parsed.data.project_title,
      project_description: parsed.data.project_description,
      currency: parsed.data.currency,
      total_amount: parsed.data.total_amount,
      delivery_days: parsed.data.delivery_days,
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

export async function deleteEstimateAction(slug: string): Promise<{ ok: boolean; error?: string }> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Non autorisé." };
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
