// DEMO DATA — placeholder mill throughput and inventory figures.
export const MILL_DAILY_STATS = [
  { day: "Mon", processedTons: 420, targetTons: 480 },
  { day: "Tue", processedTons: 455, targetTons: 480 },
  { day: "Wed", processedTons: 468, targetTons: 480 },
  { day: "Thu", processedTons: 390, targetTons: 480 },
  { day: "Fri", processedTons: 502, targetTons: 480 },
  { day: "Sat", processedTons: 310, targetTons: 480 },
  { day: "Sun", processedTons: 0, targetTons: 0 },
];

export interface InventoryItem {
  name: string;
  quantity: number;
  unit: string;
  status: "ok" | "low" | "critical";
}

export const INVENTORY_ITEMS: InventoryItem[] = [
  { name: "Raw cane (holding yard)", quantity: 1840, unit: "tons", status: "ok" },
  { name: "Refined sugar (bagged)", quantity: 612, unit: "tons", status: "ok" },
  { name: "Molasses", quantity: 94, unit: "tons", status: "low" },
  { name: "Lime (processing input)", quantity: 8, unit: "tons", status: "critical" },
];
