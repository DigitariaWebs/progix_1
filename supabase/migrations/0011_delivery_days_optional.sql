-- Commercials must no longer be forced to commit a delivery delay when
-- creating a devis, and the client-facing document no longer displays one
-- (see daily report / boss directive 2026-08-18). Existing rows keep their
-- historical value; new/edited rows are saved with delivery_days = null.
alter table public.client_estimates
  alter column delivery_days drop not null;
