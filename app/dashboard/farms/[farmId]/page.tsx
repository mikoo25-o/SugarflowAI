"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, Thermometer, CloudSun, ListChecks } from "lucide-react";
import { Farm, getFarmByCode } from "@/lib/data/farms-demo";
import { fetchFarmByCode } from "@/lib/supabase/queries/farms";

export default function FarmDetailPage() {
  const params = useParams<{ farmId: string }>();
  const [farm, setFarm] = useState<Farm | undefined>(getFarmByCode(params.farmId));

  useEffect(() => {
    fetchFarmByCode(params.farmId).then((real) => {
      if (real) setFarm(real);
    });
  }, [params.farmId]);

  if (!farm) {
    return <p className="text-sm text-gray-500">Farm not found.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-brand-dark sm:text-2xl">{farm.id}</h1>
        <p className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="h-3.5 w-3.5" /> {farm.county} · {farm.sizeHectares} ha
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl2 border border-gray-200 bg-white p-4 shadow-card">
          <p className="text-xs text-gray-400">Farmer</p>
          <p className="mt-1 font-medium text-brand-dark">{farm.farmerName}</p>
        </div>
        <div className="rounded-xl2 border border-gray-200 bg-white p-4 shadow-card">
          <p className="text-xs text-gray-400">Expected yield</p>
          <p className="mt-1 font-medium text-brand-dark">{farm.expectedYieldTons} t</p>
        </div>
        <div className="rounded-xl2 border border-gray-200 bg-white p-4 shadow-card">
          <p className="text-xs text-gray-400">Last harvest</p>
          <p className="mt-1 font-medium text-brand-dark">{farm.lastHarvestDate}</p>
        </div>
      </div>

      {farm.weatherTempC != null && (
        <div className="rounded-xl2 border border-gray-200 bg-white p-4 shadow-card sm:p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-dark">
            <CloudSun className="h-4 w-4 text-brand-blue" /> Weather
          </h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <Thermometer className="h-4 w-4" /> {farm.weatherTempC}°C — {farm.weatherCondition}
          </p>
        </div>
      )}

      {farm.suggestedActions && farm.suggestedActions.length > 0 && (
        <div className="rounded-xl2 border border-gray-200 bg-white p-4 shadow-card sm:p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-dark">
            <ListChecks className="h-4 w-4 text-brand-green" /> Suggested actions
          </h2>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-gray-600">
            {farm.suggestedActions.map((action) => (
              <li key={action}>• {action}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
