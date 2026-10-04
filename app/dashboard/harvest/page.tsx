import { Truck } from "lucide-react";
import { HARVEST_QUEUE } from "@/lib/data/harvest-demo";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  queued: "bg-gray-100 text-gray-600",
  scheduled: "bg-blue-50 text-blue-700",
  "in-transit": "bg-amber-50 text-amber-700",
  delivered: "bg-brand-green/10 text-brand-green",
};

export default function HarvestPlannerPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-brand-dark sm:text-2xl">Harvest Planner</h1>
        <p className="text-sm text-gray-500">Upcoming and in-progress harvest deliveries.</p>
      </div>

      <div className="overflow-x-auto rounded-xl2 border border-gray-200 bg-white shadow-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-gray-200 text-xs text-gray-400">
            <tr>
              <th className="px-4 py-3">Farm</th>
              <th className="px-4 py-3">Farmer</th>
              <th className="px-4 py-3">Tons</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Truck</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {HARVEST_QUEUE.map((item) => (
              <tr key={item.farmId} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 font-medium text-brand-dark">{item.farmId}</td>
                <td className="px-4 py-3 text-gray-600">{item.farmerName}</td>
                <td className="px-4 py-3 text-gray-600">{item.tons} t</td>
                <td className="px-4 py-3 text-gray-600">{item.scheduledDate}</td>
                <td className="px-4 py-3 text-gray-600">
                  {item.truckAssigned || <span className="text-gray-400">Unassigned</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", STATUS_STYLES[item.status])}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="flex items-center gap-2 text-xs text-gray-400">
        <Truck className="h-3.5 w-3.5" /> Demo scheduling data — not connected to a live dispatch system.
      </p>
    </div>
  );
}
