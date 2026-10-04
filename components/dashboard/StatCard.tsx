import { LucideIcon } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: "default" | "warning" | "critical";
}) {
  const toneClasses =
    tone === "critical"
      ? "text-red-600 bg-red-50"
      : tone === "warning"
        ? "text-amber-600 bg-amber-50"
        : "text-brand-green bg-brand-green/10";

  return (
    <div className="rounded-xl2 border border-gray-200 bg-white p-4 shadow-card sm:p-5">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${toneClasses}`}>
        <Icon className="h-4.5 w-4.5" />
      </div>
      <p className="mt-3 text-2xl font-semibold text-brand-dark">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
