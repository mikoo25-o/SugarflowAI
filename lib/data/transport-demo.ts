// DEMO DATA — placeholder truck/transport records. No live GPS is used;
// positions below are static demo coordinates, not real-time tracking.
export interface Truck {
  plate: string;
  driver: string;
  status: "loading" | "en-route" | "at-mill" | "idle";
  currentLoadTons: number;
  capacityTons: number;
  lat: number;
  lng: number;
  etaMinutes: number | null;
}

export const TRUCKS: Truck[] = [
  { plate: "KDA 221B", driver: "Moses Omondi", status: "en-route", currentLoadTons: 58, capacityTons: 60, lat: 0.3406, lng: 34.8621, etaMinutes: 42 },
  { plate: "KDB 554C", driver: "Felix Wanjala", status: "loading", currentLoadTons: 22, capacityTons: 60, lat: 0.4569, lng: 34.6919, etaMinutes: null },
  { plate: "KDC 772A", driver: "Brian Odanga", status: "at-mill", currentLoadTons: 0, capacityTons: 60, lat: 0.5143, lng: 34.4731, etaMinutes: 0 },
  { plate: "KDD 905E", driver: "Collins Simiyu", status: "idle", currentLoadTons: 0, capacityTons: 60, lat: 0.5692, lng: 34.5519, etaMinutes: null },
];
