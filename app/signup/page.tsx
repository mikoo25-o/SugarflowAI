"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, Loader2, CheckCircle2 } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured) {
      setError(
        "Signup isn't connected yet — add your Supabase URL and anon key to .env.local."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    if (!agreedToTerms) {
      setError("Please accept the terms to continue.");
      return;
    }

    setLoading(true);

    // Real account data — your actual name/email/password — is sent to a
    // server route that runs real anti-abuse checks (disposable-email
    // block + rate limiting) before creating the account. See
    // app/api/auth/signup/route.ts.
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullName, organization }),
    });

    const body = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(body.error || "Something went wrong. Please try again.");
      return;
    }

    setDone(true);
    // If your Supabase project has "Confirm email" turned OFF (Authentication
    // > Providers > Email), signup returns a real session immediately and we
    // can go straight into the app — no waiting on a verification email.
    if (body.session) {
      setSessionReady(true);
      setTimeout(() => router.push("/dashboard"), 1200);
    }
  }

  if (done) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-surface px-4 py-10">
        <div className="w-full max-w-sm rounded-xl2 border border-gray-200 bg-white p-6 text-center shadow-card sm:p-8">
          <CheckCircle2 className="mx-auto h-10 w-10 text-brand-green" />
          <h1 className="mt-4 text-lg font-semibold text-brand-dark">
            {sessionReady ? "Account created" : "Almost there"}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {sessionReady
              ? "Taking you to your dashboard..."
              : "Check your email to confirm your account before logging in. (Turn off \"Confirm email\" in Supabase Auth settings to skip this step.)"}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-surface px-4 py-10">
      <div className="w-full max-w-sm rounded-xl2 border border-gray-200 bg-white p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-brand-green" />
          <span className="text-lg font-semibold text-brand-dark">SugarFlow AI</span>
        </div>

        <h1 className="mt-6 text-xl font-semibold text-brand-dark">Create your account</h1>
        <p className="mt-1 text-sm text-gray-500">
          Your name, email, and password are real account data — not placeholders.
        </p>

        {!isSupabaseConfigured && (
          <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
            Supabase isn&apos;t configured yet, so signup can&apos;t create a
            real account right now.
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-xs text-red-700">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-brand-dark">Full name</span>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
              placeholder="Your real name"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-brand-dark">Organization (optional)</span>
            <input
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
              placeholder="Mill or cooperative name"
            />
          </label>

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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
              placeholder="At least 8 characters"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-brand-dark">Confirm password</span>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
            />
          </label>

          <label className="flex items-start gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5"
            />
            I agree to the terms of use for this prototype.
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-green-dark disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-brand-green">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
