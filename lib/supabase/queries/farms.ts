import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { Farm } from "@/lib/data/farms-demo";

// This farm has real supporting imagery/detail wired up as a demo of what a
// fully-real record looks like; every other farm uses demo data until more
// imagery/sensors are connected.
export const FARM_WITH_REAL_IMAGERY = "SF-0247";

function mapRow(row: Record<string, unknown>): Farm {
  return {
    id: row.farm_code as string,
    farmerName: row.farmer_name as string,
    county: row.county as string,
    sizeHectares: Number(row.size_hectares),
    status: row.status as Farm["status"],
    lastHarvestDate: row.last_harvest_date as string,
    expectedYieldTons: Number(row.expected_yield_tons),
    weatherTempC: row.weather_temp_c != null ? Number(row.weather_temp_c) : undefined,
    weatherCondition: (row.weather_condition as string) || undefined,
    suggestedActions: (row.suggested_actions as string[]) || undefined,
  };
}

export async function fetchFarms(): Promise<Farm[] | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase.from("farms").select("*");
  if (error || !data) return null;

  return data.map(mapRow);
}

export async function fetchFarmByCode(farmCode: string): Promise<Farm | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from("farms")
    .select("*")
    .eq("farm_code", farmCode)
    .maybeSingle();

  if (error || !data) return null;

  return mapRow(data);
}
