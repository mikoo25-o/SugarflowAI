"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Leaf } from "lucide-react";
import { FARMS, Farm } from "@/lib/data/farms-demo";
import { fetchFarms } from "@/lib/supabase/queries/farms";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<Farm["status"], string> = {
  healthy: "bg-brand-green/10 text-brand-green",
  attention: "bg-amber-50 text-amber-700",
  critical: "bg-red-50 text-red-700",
};

export default function FarmsPage() {
  const [farms, setFarms] = useState<Farm[]>(FARMS);

  useEffect(() => {
    fetchFarms().then((real) => {
      if (real && real.length > 0) setFarms(real);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-brand-dark sm:text-2xl">Farm Intelligence</h1>
        <p className="text-sm text-gray-500">{farms.length} farms tracked across your region.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {farms.map((farm) => (
          <Link
            key={farm.id}
            href={`/dashboard/farms/${farm.id}`}
            className="rounded-xl2 border border-gray-200 bg-white p-4 shadow-card transition-shadow hover:shadow-float sm:p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-brand-green" />
                <span className="text-sm font-semibold text-brand-dark">{farm.id}</span>
              </div>
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", STATUS_STYLES[farm.status])}>
                {farm.status}
              </span>
            </div>
            <p className="mt-3 font-medium text-brand-dark">{farm.farmerName}</p>
            <p className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-3.5 w-3.5" /> {farm.county} · {farm.sizeHectares} ha
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Expected yield: <span className="font-medium text-brand-dark">{farm.expectedYieldTons} t</span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
