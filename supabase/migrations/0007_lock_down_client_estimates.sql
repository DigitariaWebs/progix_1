-- 0007_lock_down_client_estimates — close the anon-key read hole.
--
-- 0005 granted `select` to anon/authenticated with a blanket `using (true)`
-- policy, on the assumption the app's password gate was the real boundary.
-- It wasn't: the gate only hid rendering, and the row (including
-- access_code, full contract terms) was readable directly via the public
-- anon key regardless of app state. All application code that legitimately
-- needs this table (src/features/devis/queries.ts, actions.ts, gate.ts) now
-- reads through the service-role client and enforces its own authorization
-- server-side (admin session check, or a verified access-code cookie) --
-- see docs/superpowers/specs/2026-07-29-admin-devis-port-design.md. RLS
-- becomes a hard backstop: nothing is reachable here via anon or
-- authenticated at all, service-role bypasses RLS by design.

drop policy if exists "client_estimates: public select" on public.client_estimates;
drop policy if exists "client_estimates: authenticated insert" on public.client_estimates;
drop policy if exists "client_estimates: authenticated update" on public.client_estimates;
drop policy if exists "client_estimates: authenticated delete" on public.client_estimates;

revoke all on public.client_estimates from anon, authenticated;
