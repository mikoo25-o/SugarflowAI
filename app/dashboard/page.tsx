"use client";

import { Leaf, Truck, AlertTriangle, Wallet } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import EChart from "@/components/dashboard/EChart";
import { DASHBOARD_SUMMARY, YIELD_TREND } from "@/lib/data/dashboard-demo";
import { formatKsh } from "@/lib/utils";

export default function CommandCenterPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-brand-dark sm:text-2xl">Command Center</h1>
        <p className="text-sm text-gray-500">Overview of your operation this week.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Leaf} label="Active farms" value={String(DASHBOARD_SUMMARY.totalFarms)} />
        <StatCard icon={Truck} label="Tons this week" value={`${DASHBOARD_SUMMARY.tonsThisWeek} t`} />
        <StatCard icon={AlertTriangle} label="Open alerts" value={String(DASHBOARD_SUMMARY.openAlerts)} tone="warning" />
        <StatCard icon={Wallet} label="Pending payments" value={formatKsh(DASHBOARD_SUMMARY.pendingPaymentsKsh)} />
      </div>

      <div className="rounded-xl2 border border-gray-200 bg-white p-4 shadow-card sm:p-6">
        <h2 className="text-sm font-semibold text-brand-dark">Yield trend (tons/week)</h2>
        <div className="mt-4">
          <EChart
            height={280}
            option={{
              grid: { left: 40, right: 16, top: 20, bottom: 30 },
              tooltip: { trigger: "axis" },
              xAxis: {
                type: "category",
                data: YIELD_TREND.map((d) => d.week),
                axisLine: { lineStyle: { color: "#d1d5db" } },
              },
              yAxis: {
                type: "value",
                splitLine: { lineStyle: { color: "#eee" } },
              },
              series: [
                {
                  type: "line",
                  data: YIELD_TREND.map((d) => d.tons),
                  smooth: true,
                  symbolSize: 7,
                  lineStyle: { color: "#1E7A34", width: 2 },
                  itemStyle: { color: "#1E7A34" },
                  areaStyle: { color: "rgba(30,122,52,0.08)" },
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}
