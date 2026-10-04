import { NextResponse } from "next/server";
import { isMpesaConfigured } from "@/lib/services/paymentService";

export async function GET() {
  return NextResponse.json({
    mpesaConfigured: isMpesaConfigured(),
    mode: isMpesaConfigured() ? "real-credentials-present" : "demo-sandbox",
  });
}
