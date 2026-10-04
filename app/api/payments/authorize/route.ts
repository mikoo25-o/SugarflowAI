import { NextRequest, NextResponse } from "next/server";
import { createPaymentRequest, calculatePayment } from "@/lib/services/paymentService";

export async function POST(request: NextRequest) {
  const { farmId, tons, rateKshPerTon } = await request.json();

  if (!farmId || !tons || !rateKshPerTon) {
    return NextResponse.json(
      { error: "farmId, tons, and rateKshPerTon are required." },
      { status: 400 }
    );
  }

  const amount = calculatePayment(tons, rateKshPerTon);
  const result = await createPaymentRequest(farmId, amount);

  return NextResponse.json({ amountKsh: amount, ...result });
}
