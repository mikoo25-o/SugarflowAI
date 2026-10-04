// DEMO DATA — placeholder farm records for the hackathon prototype.
// Not real KSB/county statistics. Real Supabase rows (see
// lib/supabase/queries/farms.ts) override this instantly when available.

export interface Farm {
  id: string;
  farmerName: string;
  county: string;
  sizeHectares: number;
  status: "healthy" | "attention" | "critical";
  lastHarvestDate: string;
  expectedYieldTons: number;
  weatherTempC?: number;
  weatherCondition?: string;
  suggestedActions?: string[];
}

export const FARMS: Farm[] = [
  { id: "SF-0247", farmerName: "Peter Kiprotich", county: "Kakamega", sizeHectares: 4.2, status: "healthy", lastHarvestDate: "2026-07-14", expectedYieldTons: 58, weatherTempC: 24, weatherCondition: "Partly cloudy", suggestedActions: ["Schedule next irrigation in 3 days", "Monitor for leaf rust"] },
  { id: "SF-0118", farmerName: "Grace Atieno", county: "Bungoma", sizeHectares: 2.8, status: "attention", lastHarvestDate: "2026-06-02", expectedYieldTons: 31 },
  { id: "SF-0092", farmerName: "Samuel Wekesa", county: "Busia", sizeHectares: 6.1, status: "healthy", lastHarvestDate: "2026-07-01", expectedYieldTons: 79 },
  { id: "SF-0333", farmerName: "Mary Nafula", county: "Kakamega", sizeHectares: 1.9, status: "critical", lastHarvestDate: "2026-05-18", expectedYieldTons: 18 },
  { id: "SF-0176", farmerName: "John Barasa", county: "Trans-Nzoia", sizeHectares: 5.0, status: "healthy", lastHarvestDate: "2026-06-29", expectedYieldTons: 64 },
  { id: "SF-0055", farmerName: "Esther Nekesa", county: "Bungoma", sizeHectares: 3.3, status: "attention", lastHarvestDate: "2026-06-11", expectedYieldTons: 40 },
  { id: "SF-0201", farmerName: "Daniel Mabonga", county: "Busia", sizeHectares: 4.7, status: "healthy", lastHarvestDate: "2026-07-05", expectedYieldTons: 61 },
  { id: "SF-0289", farmerName: "Rachel Chebet", county: "Kakamega", sizeHectares: 2.2, status: "healthy", lastHarvestDate: "2026-06-20", expectedYieldTons: 29 },
];

export function getFarmByCode(code: string): Farm | undefined {
  return FARMS.find((f) => f.id === code);
}
