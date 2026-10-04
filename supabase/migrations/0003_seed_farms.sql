insert into public.farms
  (farm_code, farmer_name, county, size_hectares, status, last_harvest_date, expected_yield_tons, weather_temp_c, weather_condition, suggested_actions)
values
  ('SF-0247', 'Peter Kiprotich', 'Kakamega', 4.2, 'healthy', '2026-07-14', 58, 24, 'Partly cloudy', array['Schedule next irrigation in 3 days', 'Monitor for leaf rust']),
  ('SF-0118', 'Grace Atieno', 'Bungoma', 2.8, 'attention', '2026-06-02', 31, null, null, null),
  ('SF-0092', 'Samuel Wekesa', 'Busia', 6.1, 'healthy', '2026-07-01', 79, null, null, null),
  ('SF-0333', 'Mary Nafula', 'Kakamega', 1.9, 'critical', '2026-05-18', 18, null, null, null),
  ('SF-0176', 'John Barasa', 'Trans-Nzoia', 5.0, 'healthy', '2026-06-29', 64, null, null, null),
  ('SF-0055', 'Esther Nekesa', 'Bungoma', 3.3, 'attention', '2026-06-11', 40, null, null, null),
  ('SF-0201', 'Daniel Mabonga', 'Busia', 4.7, 'healthy', '2026-07-05', 61, null, null, null),
  ('SF-0289', 'Rachel Chebet', 'Kakamega', 2.2, 'healthy', '2026-06-20', 29, null, null, null)
on conflict (farm_code) do update set
  farmer_name = excluded.farmer_name,
  county = excluded.county,
  size_hectares = excluded.size_hectares,
  status = excluded.status,
  last_harvest_date = excluded.last_harvest_date,
  expected_yield_tons = excluded.expected_yield_tons,
  weather_temp_c = excluded.weather_temp_c,
  weather_condition = excluded.weather_condition,
  suggested_actions = excluded.suggested_actions;
