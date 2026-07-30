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
 * RLS lockdown in supabase/migrations/0007 and 0008 -- both tables have RLS
 * enabled with zero policies defined, so anon/authenticated get nothing back
 * regardless of email; only the service-role client (which bypasses RLS) can
 * read/write. That's the same rule enforced a second, independent way at the
 * database layer.
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
