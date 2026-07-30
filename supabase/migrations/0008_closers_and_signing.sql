-- 0008_closers_and_signing — closer directory + devis sign-and-lock workflow.

create table if not exists public.closers (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  address text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.closers enable row level security;
-- Locked down like client_estimates (see 0007_lock_down_client_estimates.sql):
-- all access goes through the service-role client from
-- src/features/closers/queries.ts + actions.ts, each gated by requireAdmin().
-- No anon/authenticated policies at all — RLS enabled with zero policies
-- already denies everything; the revoke below is belt-and-suspenders,
-- matching 0007's style.
revoke all on public.closers from anon, authenticated;

alter table public.client_estimates
  add column if not exists closer_id uuid references public.closers(id) on delete set null,
  add column if not exists signature jsonb,
  add column if not exists locked boolean not null default false,
  add column if not exists pdf_email_sent_at timestamptz;
