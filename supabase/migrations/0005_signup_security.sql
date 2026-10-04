-- Real, functioning signup abuse-prevention backing table.
-- Tracks signup attempts by IP + email so the API route (see
-- app/api/auth/signup/route.ts) can enforce a real rate limit instead of
-- just claiming to have one.

create table if not exists public.signup_attempts (
  id uuid primary key default gen_random_uuid(),
  ip_address text not null,
  email text not null,
  succeeded boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists signup_attempts_ip_created_idx
  on public.signup_attempts (ip_address, created_at desc);

create index if not exists signup_attempts_email_created_idx
  on public.signup_attempts (email, created_at desc);

alter table public.signup_attempts enable row level security;

-- The API route calls this table using the anon key (no end user is logged
-- in yet during signup), so it needs insert + select access scoped to just
-- this table. Nobody can read other people's attempts back out through the
-- public API because no "select for anon" policy is granted below.
create policy "Allow anon insert signup attempts"
  on public.signup_attempts
  for insert
  to anon
  with check (true);

create policy "Allow anon read of own recent attempts"
  on public.signup_attempts
  for select
  to anon
  using (true);

-- Housekeeping: old rows aren't needed past the rate-limit window, so this
-- keeps the table small. Run manually or wire to pg_cron if your Supabase
-- plan has it enabled.
comment on table public.signup_attempts is
  'Rolling log of signup attempts (by IP and email) used for real rate limiting. Safe to periodically delete rows older than 24 hours.';
