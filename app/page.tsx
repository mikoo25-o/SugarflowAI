import Link from "next/link";
import { Leaf, Truck, BarChart3, ShieldCheck } from "lucide-react";

const FEATURES = [
  { icon: Leaf, title: "Farm Intelligence", description: "Track every farm's yield, weather, and health status in one place." },
  { icon: Truck, title: "Harvest & Transport", description: "Plan harvests and keep trucks moving between farms and the mill." },
  { icon: BarChart3, title: "Mill & Supply", description: "See daily throughput, inventory, and supply levels at a glance." },
  { icon: ShieldCheck, title: "Payments & Ledger", description: "Honest, auditable payment records for every delivery." },
];

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="text-lg font-semibold text-brand-dark">SugarFlow AI</span>
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-brand-dark hover:bg-black/5"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-dark"
          >
            Create account
          </Link>
        </nav>
      </header>

      <section className="mx-auto flex max-w-5xl flex-1 flex-col items-center px-6 py-16 text-center sm:py-24">
        <h1 className="text-3xl font-bold text-brand-dark sm:text-5xl">
          Run your sugar operation from one screen
        </h1>
        <p className="mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
          SugarFlow AI gives farm managers, transport coordinators, and mill
          operators a single real-time view — from farm to payment.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-lg bg-brand-green px-6 py-3 text-center font-medium text-white hover:bg-brand-green-dark"
          >
            Get started free
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-gray-300 px-6 py-3 text-center font-medium text-brand-dark hover:bg-black/5"
          >
            I already have an account
          </Link>
        </div>

        <div className="mt-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl2 border border-gray-200 bg-white p-5 text-left shadow-card"
            >
              <Icon className="h-6 w-6 text-brand-green" />
              <h3 className="mt-3 font-semibold text-brand-dark">{title}</h3>
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 py-6 text-center text-xs text-gray-400">
        SugarFlow AI — hackathon prototype. Operational data shown in the app
        is demo data unless otherwise labeled.
      </footer>
    </main>
  );
}
