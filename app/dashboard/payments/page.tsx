import { Wallet } from "lucide-react";
import { PAYMENTS } from "@/lib/data/payments-demo";
import { formatKsh, cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-gray-100 text-gray-600",
  processing: "bg-amber-50 text-amber-700",
  paid: "bg-brand-green/10 text-brand-green",
};

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-brand-dark sm:text-2xl">Payments & Ledger</h1>
        <p className="text-sm text-gray-500">
          Payment records stored in a plain Postgres table — not a blockchain.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl2 border border-gray-200 bg-white shadow-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-gray-200 text-xs text-gray-400">
            <tr>
              <th className="px-4 py-3">Farm</th>
              <th className="px-4 py-3">Farmer</th>
              <th className="px-4 py-3">Tons</th>
              <th className="px-4 py-3">Rate/t</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {PAYMENTS.map((p) => (
              <tr key={p.farmId} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 font-medium text-brand-dark">{p.farmId}</td>
                <td className="px-4 py-3 text-gray-600">{p.farmerName}</td>
                <td className="px-4 py-3 text-gray-600">{p.tons} t</td>
                <td className="px-4 py-3 text-gray-600">{formatKsh(p.rateKshPerTon)}</td>
                <td className="px-4 py-3 font-medium text-brand-dark">{formatKsh(p.totalKsh)}</td>
                <td className="px-4 py-3">
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", STATUS_STYLES[p.status])}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="flex items-center gap-2 text-xs text-gray-400">
        <Wallet className="h-3.5 w-3.5" /> M-Pesa payouts run in sandbox mode unless real Daraja credentials are configured.
      </p>
    </div>
  );
}
