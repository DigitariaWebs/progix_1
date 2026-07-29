-- 0005_client_estimates — dynamic client estimate (devis) configurations.

create table if not exists public.client_estimates (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (char_length(slug) <= 80),
  access_code text not null check (char_length(access_code) <= 80),
  client_name text not null,
  project_name text not null,
  project_title text not null,
  project_description text not null,
  currency text not null check (currency in ('€', '$CAD')),
  total_amount text not null,
  delivery_days text not null,
  marketing_included boolean not null default true,
  features jsonb not null default '[]'::jsonb,
  investments jsonb not null default '[]'::jsonb,
  payment_schedule_type text not null check (payment_schedule_type in ('monthly', 'installments')) default 'monthly',
  payment_months integer not null default 6,
  payment_installments jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.client_estimates enable row level security;

-- Public read access (the route itself is gated by access_code comparison in app)
create policy "client_estimates: public select" on public.client_estimates
  for select to public
  using (true);

-- Authenticated insert/update/delete
create policy "client_estimates: authenticated insert" on public.client_estimates
  for insert to authenticated
  with check (true);

create policy "client_estimates: authenticated update" on public.client_estimates
  for update to authenticated
  using (true)
  with check (true);

create policy "client_estimates: authenticated delete" on public.client_estimates
  for delete to authenticated
  using (true);

grant select on public.client_estimates to anon, authenticated;
grant all on public.client_estimates to authenticated;
