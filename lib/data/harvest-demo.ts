// DEMO DATA — placeholder harvest-queue entries.
export interface HarvestQueueItem {
  farmId: string;
  farmerName: string;
  tons: number;
  scheduledDate: string;
  truckAssigned: string | null;
  status: "queued" | "scheduled" | "in-transit" | "delivered";
}

export const HARVEST_QUEUE: HarvestQueueItem[] = [
  { farmId: "SF-0247", farmerName: "Peter Kiprotich", tons: 58, scheduledDate: "2026-07-20", truckAssigned: "KDA 221B", status: "scheduled" },
  { farmId: "SF-0063", farmerName: "Lucas Omondi", tons: 161, scheduledDate: "2026-07-21", truckAssigned: null, status: "queued" },
  // Note: the reference design had two plots both labeled SF-063 with
  // different tonnage — renamed this one to SF-055 to keep farm codes unique.
  { farmId: "SF-0055", farmerName: "Esther Nekesa", tons: 40, scheduledDate: "2026-07-21", truckAssigned: "KDB 554C", status: "scheduled" },
  { farmId: "SF-0092", farmerName: "Samuel Wekesa", tons: 79, scheduledDate: "2026-07-19", truckAssigned: "KDC 772A", status: "in-transit" },
  { farmId: "SF-0176", farmerName: "John Barasa", tons: 64, scheduledDate: "2026-07-18", truckAssigned: "KDA 221B", status: "delivered" },
];
