alter table public.farms
  add column if not exists weather_temp_c numeric(4,1),
  add column if not exists weather_condition text,
  add column if not exists suggested_actions text[];
