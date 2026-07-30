"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { Closer } from "./types";
import { getAllClosers, getCloserById } from "./queries";
import { revalidatePath } from "next/cache";

async function getWriteClient() {
  try {
    return createAdminClient();
  } catch {
    return await createClient();
  }
}

export async function fetchClosersAction(): Promise<Closer[]> {
  await requireAdmin();
  return await getAllClosers();
}

export async function fetchCloserByIdAction(id: string): Promise<Closer | null> {
  await requireAdmin();
  return await getCloserById(id);
}

const closerInputSchema = z.object({
  id: z.string().optional(),
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Courriel invalide"),
  address: z.string().min(1, "L'adresse est requise"),
});

export type SaveCloserResult = { ok: true; id: string } | { ok: false; error: string };

export async function saveCloserAction(input: unknown): Promise<SaveCloserResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Non autorisé." };
  }

  const parsed = closerInputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues.map((i) => i.message).join(", ") };
  }

  try {
    const supabase = await getWriteClient();
    const payload = {
      first_name: parsed.data.first_name,
      last_name: parsed.data.last_name,
      email: parsed.data.email,
      address: parsed.data.address,
      updated_at: new Date().toISOString(),
    };

    if (parsed.data.id) {
      const { error } = await supabase.from("closers").update(payload).eq("id", parsed.data.id);
      if (error) return { ok: false, error: `Erreur Supabase: ${error.message}` };
      revalidatePath("/admin/closers");
      return { ok: true, id: parsed.data.id };
    }

    const { data, error } = await supabase.from("closers").insert(payload).select("id").single();
    if (error || !data) return { ok: false, error: error?.message ?? "Erreur inattendue" };
    revalidatePath("/admin/closers");
    return { ok: true, id: data.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Erreur inattendue" };
  }
}

export async function deleteCloserAction(id: string): Promise<{ ok: boolean; error?: string }> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Non autorisé." };
  }

  try {
    const supabase = await getWriteClient();
    const { error } = await supabase.from("closers").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/closers");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Erreur inattendue" };
  }
}
