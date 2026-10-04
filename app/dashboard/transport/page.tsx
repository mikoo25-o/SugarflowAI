import { Truck as TruckIcon } from "lucide-react";
import { TRUCKS } from "@/lib/data/transport-demo";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  loading: "bg-amber-50 text-amber-700",
  "en-route": "bg-blue-50 text-blue-700",
  "at-mill": "bg-brand-green/10 text-brand-green",
  idle: "bg-gray-100 text-gray-600",
};

export default function TransportPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-brand-dark sm:text-2xl">Transport & Map</h1>
        <p className="text-sm text-gray-500">
          Fleet status — positions below are static demo coordinates, not live GPS tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TRUCKS.map((truck) => (
          <div key={truck.plate} className="rounded-xl2 border border-gray-200 bg-white p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TruckIcon className="h-4 w-4 text-brand-green" />
                <span className="font-semibold text-brand-dark">{truck.plate}</span>
              </div>
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", STATUS_STYLES[truck.status])}>
                {truck.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-600">{truck.driver}</p>
            <p className="mt-1 text-sm text-gray-500">
              Load: {truck.currentLoadTons}/{truck.capacityTons} t
            </p>
            {truck.etaMinutes != null && (
              <p className="mt-1 text-sm text-gray-500">ETA: {truck.etaMinutes} min</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
