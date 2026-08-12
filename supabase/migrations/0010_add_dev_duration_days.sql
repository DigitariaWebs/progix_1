-- Development-phase duration (Phase 1), distinct from delivery_days (total
-- project delay including production/publication).
alter table public.client_estimates
  add column if not exists dev_duration_days text not null default '60';
