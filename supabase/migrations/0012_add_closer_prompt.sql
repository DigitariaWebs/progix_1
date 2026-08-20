-- Persists the raw closer-pasted prompt text used to generate a devis via
-- "Depuis un prompt", so the admin editor can show it back as a read-only
-- reference (boss directive 2026-08-20). Null for devis created "Vierge" or
-- predating this feature.
alter table public.client_estimates
  add column if not exists closer_prompt text;
