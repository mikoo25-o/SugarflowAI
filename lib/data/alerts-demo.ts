// DEMO DATA — placeholder operational alerts.
export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
  farmId?: string;
  createdAt: string;
}

export const ALERTS: Alert[] = [
  { id: "A-1", title: "Low rainfall forecast", description: "Kakamega county rainfall expected 30% below average over next 7 days.", severity: "warning", farmId: "SF-0247", createdAt: "2026-07-18T08:00:00Z" },
  { id: "A-2", title: "Lime stock critical", description: "Processing lime at the mill is below 2 days of supply.", severity: "critical", createdAt: "2026-07-19T06:30:00Z" },
  { id: "A-3", title: "Leaf rust risk", description: "Conditions favor leaf rust on farms near Mary Nafula's plot.", severity: "warning", farmId: "SF-0333", createdAt: "2026-07-17T14:00:00Z" },
  { id: "A-4", title: "Truck KDD 905E idle", description: "No assignment in the last 24 hours — available for dispatch.", severity: "info", createdAt: "2026-07-19T09:00:00Z" },
];
