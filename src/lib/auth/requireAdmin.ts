import "server-only";
import { createClient } from "@/lib/supabase/server";

/**
 * Server Actions are public POST endpoints regardless of which page renders the
 * calling form -- client-side admin auth gates never touch this layer. Every
 * admin-only action must call this first and bail out if there's no real
 * signed-in Supabase user.
 *
 * Checked by email, not just "is logged in": this Supabase project is
 * intentionally shared with another app, so any other authenticated user of
 * that project must not automatically get admin rights here. Matches the
 * `admin *` RLS lockdown policies (supabase/migrations/0007, 0008), which
 * enforce the same rule at the database layer as a second, independent gate.
 */
const ADMIN_EMAIL = "admin@progix.pro";

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.email !== ADMIN_EMAIL) {
    throw new Error("Non autorisé.");
  }
  return user;
}
