-- SugarFlow AI — core schema. Scoped to what the prototype actually uses.

create extension if not exists "pgcrypto";

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  organization_id uuid references public.organizations (id),
  full_name text not null,
  role text not null default 'Operations Manager',
  created_at timestamptz not null default now()
);

create table if not exists public.farms (
  id uuid primary key default gen_random_uuid(),
  farm_code text unique not null,
  farmer_name text not null,
  county text not null,
  size_hectares numeric(6,2) not null,
  status text not null default 'healthy' check (status in ('healthy','attention','critical')),
  last_harvest_date date,
  expected_yield_tons numeric(8,2),
  created_at timestamptz not null default now()
);

create table if not exists public.farm_timeline_events (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid references public.farms (id) on delete cascade,
  event_type text not null,
  description text,
  occurred_at timestamptz not null default now()
);

create table if not exists public.mills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  county text not null
);

create table if not exists public.trucks (
  id uuid primary key default gen_random_uuid(),
  plate text unique not null,
  driver_name text not null,
  capacity_tons numeric(6,2) not null default 60
);

create table if not exists public.deliveries (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid references public.farms (id),
  truck_id uuid references public.trucks (id),
  tons numeric(8,2) not null,
  status text not null default 'queued' check (status in ('queued','scheduled','in-transit','delivered')),
  scheduled_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.mill_daily_stats (
  id uuid primary key default gen_random_uuid(),
  mill_id uuid references public.mills (id),
  stat_date date not null,
  processed_tons numeric(8,2) not null,
  target_tons numeric(8,2) not null
);

create table if not exists public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  mill_id uuid references public.mills (id),
  name text not null,
  quantity numeric(10,2) not null,
  unit text not null,
  status text not null default 'ok' check (status in ('ok','low','critical'))
);

create table if not exists public.harvest_queue (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid references public.farms (id),
  tons numeric(8,2) not null,
  scheduled_date date,
  truck_id uuid references public.trucks (id),
  status text not null default 'queued'
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid references public.farms (id),
  tons numeric(8,2) not null,
  rate_ksh_per_ton numeric(10,2) not null,
  total_ksh numeric(12,2) not null,
  status text not null default 'pending' check (status in ('pending','processing','paid')),
  paid_at timestamptz
);

-- Plain relational table of ledger entries. Explicitly NOT a blockchain —
-- no distributed-ledger, hash-chaining, or immutability claims are made.
create table if not exists public.ledger_entries (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid references public.payments (id),
  entry_type text not null,
  amount_ksh numeric(12,2) not null,
  created_at timestamptz not null default now()
);

create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid references public.farms (id),
  title text not null,
  description text,
  severity text not null default 'info' check (severity in ('info','warning','critical')),
  created_at timestamptz not null default now()
);

-- RLS: enable on everything, allow any authenticated user to read (this is
-- a single-tenant hackathon prototype, not a multi-tenant product).
do $$
declare
  t text;
begin
  for t in select unnest(array[
    'organizations','profiles','farms','farm_timeline_events','mills',
    'trucks','deliveries','mill_daily_stats','inventory_items',
    'harvest_queue','payments','ledger_entries','alerts'
  ])
  loop
    execute format('alter table public.%I enable row level security;', t);
    execute format(
      'create policy "Allow authenticated read" on public.%I for select to authenticated using (true);',
      t
    );
  end loop;
end $$;

create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using (id = auth.uid());
