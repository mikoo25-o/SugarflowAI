"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, Loader2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured || !supabase) {
      // Demo Mode: no real backend configured, so skip straight to the
      // dashboard instead of pretending to authenticate.
      router.push("/dashboard");
      return;
    }

    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-surface px-4 py-10">
      <div className="w-full max-w-sm rounded-xl2 border border-gray-200 bg-white p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-brand-green" />
          <span className="text-lg font-semibold text-brand-dark">SugarFlow AI</span>
        </div>

        <h1 className="mt-6 text-xl font-semibold text-brand-dark">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-500">Log in to your account.</p>

        {!isSupabaseConfigured && (
          <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
            Supabase isn&apos;t configured — logging in will enter Demo Mode
            instead of a real account.
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-xs text-red-700">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-brand-dark">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
              placeholder="you@company.com"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-brand-dark">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-green-dark disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-brand-green">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
