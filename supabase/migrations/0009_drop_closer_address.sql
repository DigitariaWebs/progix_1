-- Closer address is no longer collected or displayed anywhere in the app.
alter table public.closers drop column if exists address;
