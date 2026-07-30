import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { Closer } from "./types";

/**
 * Fetch all closers for the admin dashboard, alphabetical by last name.
 *
 * Uses the service-role client, not the request-scoped anon client: RLS on
 * `closers` is enabled with zero policies defined, so anon/authenticated get
 * nothing back regardless of who's asking. Authorization instead lives in the
 * callers of this module -- see src/lib/auth/requireAdmin.ts's
 * `requireAdmin()`, called by every action in ./actions.ts before these
 * queries ever run. This module trusts its callers.
 */
export async function getAllClosers(): Promise<Closer[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("closers")
    .select("*")
    .order("last_name", { ascending: true });

  if (error || !data) return [];
  return data as Closer[];
}

/**
 * Fetch a single closer by id. Returns null if not found.
 */
export async function getCloserById(id: string): Promise<Closer | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("closers").select("*").eq("id", id).single();

  if (error || !data) return null;
  return data as Closer;
}
