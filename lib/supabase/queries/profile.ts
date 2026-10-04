import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export interface CurrentProfile {
  fullName: string;
  role: string;
}

export async function fetchCurrentProfile(): Promise<CurrentProfile | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) return null;

  const { data: profileRow, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", userData.user.id)
    .maybeSingle();

  if (profileError || !profileRow) return null;

  return {
    fullName: profileRow.full_name || userData.user.email || "Account",
    role: profileRow.role || "Operations Manager",
  };
}
