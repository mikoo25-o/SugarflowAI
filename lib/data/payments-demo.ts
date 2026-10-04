// DEMO DATA — placeholder payment/ledger entries. "Ledger" here means a
// plain Postgres table of entries, not a blockchain — no distributed-ledger
// claims are made anywhere in this app.
export interface PaymentRecord {
  farmId: string;
  farmerName: string;
  tons: number;
  rateKshPerTon: number;
  totalKsh: number;
  status: "pending" | "processing" | "paid";
  date: string;
}

export const PAYMENTS: PaymentRecord[] = [
  { farmId: "SF-0247", farmerName: "Peter Kiprotich", tons: 58, rateKshPerTon: 5200, totalKsh: 301600, status: "paid", date: "2026-07-15" },
  { farmId: "SF-0092", farmerName: "Samuel Wekesa", tons: 79, rateKshPerTon: 5200, totalKsh: 410800, status: "processing", date: "2026-07-19" },
  { farmId: "SF-0176", farmerName: "John Barasa", tons: 64, rateKshPerTon: 5100, totalKsh: 326400, status: "paid", date: "2026-07-18" },
  { farmId: "SF-0055", farmerName: "Esther Nekesa", tons: 40, rateKshPerTon: 5200, totalKsh: 208000, status: "pending", date: "2026-07-21" },
];
