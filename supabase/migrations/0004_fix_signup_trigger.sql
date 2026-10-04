-- Account creation is real (your actual name/email/password, never
-- placeholder account data). This trigger creates the matching `profiles`
-- row the moment a real auth.users row is created.
--
-- Fixed from an earlier version that failed with "Database error saving
-- new user": the function must schema-qualify every table reference and
-- pin search_path, because Supabase's internal auth trigger context
-- doesn't reliably include `public` on its own.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  demo_org_id uuid;
begin
  select id into demo_org_id from public.organizations order by created_at asc limit 1;

  insert into public.profiles (id, organization_id, full_name)
  values (
    new.id,
    demo_org_id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
