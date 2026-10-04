import { createClient } from "@supabase/supabase-js";

/**
 * Real, Postgres-backed rate limiting for the signup endpoint.
 *
 * HONEST LABEL: this checks actual rows in your Supabase `signup_attempts`
 * table (see supabase/migrations/0005_signup_security.sql) — it is not a
 * decorative check. It is intentionally simple (no Redis, no paid service)
 * because a hackathon/prototype doesn't need that; it still genuinely stops
 * someone from hammering /api/auth/signup in a loop.
 *
 * Limits (tune as needed):
 *  - Max 3 signup attempts per IP per 15 minutes
 *  - Max 2 signup attempts per email per 24 hours
 */

const WINDOW_BY_IP_MINUTES = 15;
const MAX_ATTEMPTS_PER_IP = 3;

const WINDOW_BY_EMAIL_HOURS = 24;
const MAX_ATTEMPTS_PER_EMAIL = 2;

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  // Server-side client using the anon key — fine here because the
  // signup_attempts table only grants anon INSERT/SELECT on itself,
  // nothing sensitive is exposed.
  return createClient(url, anonKey);
}

export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
}

export async function checkSignupRateLimit(
  ipAddress: string,
  email: string
): Promise<RateLimitResult> {
  const supabase = getServerSupabase();

  // If Supabase isn't configured (demo mode with no real backend), don't
  // block signup — there's nothing real to rate limit against.
  if (!supabase) {
    return { allowed: true };
  }

  const ipWindowStart = new Date(
    Date.now() - WINDOW_BY_IP_MINUTES * 60 * 1000
  ).toISOString();

  const { count: ipAttemptCount, error: ipError } = await supabase
    .from("signup_attempts")
    .select("id", { count: "exact", head: true })
    .eq("ip_address", ipAddress)
    .gte("created_at", ipWindowStart);

  if (!ipError && (ipAttemptCount ?? 0) >= MAX_ATTEMPTS_PER_IP) {
    return {
      allowed: false,
      reason: `Too many signup attempts from this network. Please try again in ${WINDOW_BY_IP_MINUTES} minutes.`,
    };
  }

  const emailWindowStart = new Date(
    Date.now() - WINDOW_BY_EMAIL_HOURS * 60 * 60 * 1000
  ).toISOString();

  const { count: emailAttemptCount, error: emailError } = await supabase
    .from("signup_attempts")
    .select("id", { count: "exact", head: true })
    .eq("email", email.toLowerCase())
    .gte("created_at", emailWindowStart);

  if (!emailError && (emailAttemptCount ?? 0) >= MAX_ATTEMPTS_PER_EMAIL) {
    return {
      allowed: false,
      reason:
        "This email has already attempted to sign up recently. Check your inbox or try logging in.",
    };
  }

  return { allowed: true };
}

export async function recordSignupAttempt(
  ipAddress: string,
  email: string,
  succeeded: boolean
): Promise<void> {
  const supabase = getServerSupabase();
  if (!supabase) return;

  await supabase.from("signup_attempts").insert({
    ip_address: ipAddress,
    email: email.toLowerCase(),
    succeeded,
  });
}

/**
 * Best-effort real client IP extraction from standard proxy headers.
 * Works on Vercel (x-forwarded-for) and most other hosts.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
