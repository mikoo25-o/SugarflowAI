"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Leaf,
  Truck,
  Factory,
  Wallet,
  Bell,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Command Center", icon: LayoutDashboard },
  { href: "/dashboard/farms", label: "Farm Intelligence", icon: Leaf },
  { href: "/dashboard/harvest", label: "Harvest Planner", icon: Truck },
  { href: "/dashboard/transport", label: "Transport & Map", icon: Truck },
  { href: "/dashboard/alerts", label: "Alerts & AI", icon: Bell },
  { href: "/dashboard/mill", label: "Mill & Supply", icon: Factory },
  { href: "/dashboard/payments", label: "Payments & Ledger", icon: Wallet },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-gray-200 bg-brand-dark px-4 py-5 transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-brand-emerald" />
            <span className="text-base font-semibold text-white">SugarFlow AI</span>
          </div>
          <button onClick={onClose} className="text-gray-300 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-green text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
