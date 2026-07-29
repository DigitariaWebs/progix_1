"use server";

import { createClient } from "@/lib/supabase/server";
import { ClientEstimate } from "./types";

/**
 * Fetch a single client estimate by its URL slug.
 * Returns null if not found — no hardcoded fallback (data lives in Supabase).
 */
export async function getEstimateBySlug(slug: string): Promise<ClientEstimate | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("client_estimates")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as ClientEstimate;
}

/**
 * Fetch all client estimates for the admin dashboard, newest first.
 */
export async function getAllEstimates(): Promise<ClientEstimate[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("client_estimates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as ClientEstimate[];
}
