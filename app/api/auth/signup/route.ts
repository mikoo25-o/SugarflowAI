import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isDisposableEmail } from "@/lib/security/disposable-domains";
import {
  checkSignupRateLimit,
  recordSignupAttempt,
  getClientIp,
} from "@/lib/security/rate-limit";

/**
 * Real signup endpoint with real abuse checks:
 *  1. Rejects known disposable-email domains (lib/security/disposable-domains.ts)
 *  2. Enforces a Postgres-backed rate limit per IP and per email
 *     (lib/security/rate-limit.ts + signup_attempts table)
 *  3. Only then calls supabase.auth.signUp with the REAL account fields the
 *     user actually typed in — account/login data is never placeholder data,
 *     per project rules. (Everything else in the app still uses demo data.)
 *
 * The signup page should POST here instead of calling supabase.auth.signUp
 * directly, so these checks can't be bypassed by calling the client SDK
 * straight from the browser.
 */

export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return NextResponse.json(
      {
        error:
          "Signup isn't connected yet — add your Supabase URL and anon key to .env.local.",
      },
      { status: 503 }
    );
  }

  let body: {
    email?: string;
    password?: string;
    fullName?: string;
    organization?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, password, fullName, organization } = body;

  if (!email || !password || !fullName) {
    return NextResponse.json(
      { error: "Full name, email, and password are required." },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  if (isDisposableEmail(email)) {
    return NextResponse.json(
      {
        error:
          "Please sign up with a permanent email address. Disposable/temporary email providers aren't accepted.",
      },
      { status: 400 }
    );
  }

  const ipAddress = getClientIp(request.headers);

  const rateLimit = await checkSignupRateLimit(ipAddress, email);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: rateLimit.reason }, { status: 429 });
  }

  const supabase = createClient(url, anonKey);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        organization: organization || null,
      },
    },
  });

  await recordSignupAttempt(ipAddress, email, !error);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    user: data.user,
    // true once you've disabled "Confirm email" in Supabase Auth settings,
    // in which case the user already has a session and can go straight in.
    session: data.session,
  });
}
