"use client";

import EChart from "@/components/dashboard/EChart";
import { MILL_DAILY_STATS, INVENTORY_ITEMS } from "@/lib/data/mill-demo";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  ok: "bg-brand-green/10 text-brand-green",
  low: "bg-amber-50 text-amber-700",
  critical: "bg-red-50 text-red-700",
};

export default function MillPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-brand-dark sm:text-2xl">Mill & Supply</h1>
        <p className="text-sm text-gray-500">Daily throughput and inventory levels.</p>
      </div>

      <div className="rounded-xl2 border border-gray-200 bg-white p-4 shadow-card sm:p-6">
        <h2 className="text-sm font-semibold text-brand-dark">Processed vs target (tons/day)</h2>
        <div className="mt-4">
          <EChart
            height={280}
            option={{
              grid: { left: 40, right: 16, top: 30, bottom: 30 },
              tooltip: { trigger: "axis" },
              legend: { top: 0, textStyle: { fontSize: 12 } },
              xAxis: {
                type: "category",
                data: MILL_DAILY_STATS.map((d) => d.day),
                axisLine: { lineStyle: { color: "#d1d5db" } },
              },
              yAxis: { type: "value", splitLine: { lineStyle: { color: "#eee" } } },
              series: [
                {
                  name: "Processed",
                  type: "bar",
                  data: MILL_DAILY_STATS.map((d) => d.processedTons),
                  itemStyle: { color: "#1E7A34", borderRadius: [4, 4, 0, 0] },
                  barMaxWidth: 28,
                },
                {
                  name: "Target",
                  type: "bar",
                  data: MILL_DAILY_STATS.map((d) => d.targetTons),
                  itemStyle: { color: "#c7d8cd", borderRadius: [4, 4, 0, 0] },
                  barMaxWidth: 28,
                },
              ],
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {INVENTORY_ITEMS.map((item) => (
          <div key={item.name} className="flex items-center justify-between rounded-xl2 border border-gray-200 bg-white p-4 shadow-card">
            <div>
              <p className="font-medium text-brand-dark">{item.name}</p>
              <p className="text-sm text-gray-500">{item.quantity} {item.unit}</p>
            </div>
            <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", STATUS_STYLES[item.status])}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
