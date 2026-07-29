import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { ClientEstimate } from "./types";

/**
 * Fetch a single client estimate by its URL slug.
 * Returns null if not found — no hardcoded fallback (data lives in Supabase).
 *
 * Uses the service-role client, not the request-scoped anon client: RLS on
 * `client_estimates` denies anon/authenticated entirely (see
 * supabase/migrations/0007_lock_down_client_estimates.sql) because neither
 * admin dashboard visitors nor devis-portal visitors hold a Supabase Auth
 * session that RLS could key off. Authorization instead lives entirely in the
 * callers of this module: src/features/devis/actions.ts's `requireAdmin()`
 * for the admin dashboard, and the access-code-gated cookie check in
 * src/app/devis/[client]/** for the public portal. Every caller MUST enforce
 * its own check before calling these — this module trusts its callers.
 */
export async function getEstimateBySlug(slug: string): Promise<ClientEstimate | null> {
  const supabase = createAdminClient();
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
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("client_estimates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as ClientEstimate[];
}
