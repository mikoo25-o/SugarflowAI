// Honest demo/real split for M-Pesa payments. Without real Daraja
// credentials in .env.local, every payment action runs in a clearly
// labeled sandbox mode — nothing here ever claims a real M-Pesa transaction
// happened unless it genuinely did.

export function calculatePayment(tons: number, rateKshPerTon: number): number {
  return Math.round(tons * rateKshPerTon);
}

export function isMpesaConfigured(): boolean {
  return Boolean(
    process.env.MPESA_CONSUMER_KEY &&
      process.env.MPESA_CONSUMER_SECRET &&
      process.env.MPESA_SHORTCODE &&
      process.env.MPESA_PASSKEY
  );
}

export interface PaymentRequestResult {
  mode: "real" | "demo-sandbox";
  status: "initiated" | "not-implemented";
  message: string;
}

export async function createPaymentRequest(
  _farmId: string,
  _amountKsh: number
): Promise<PaymentRequestResult> {
  if (isMpesaConfigured()) {
    // Real Daraja credentials are present, but the live STK Push call isn't
    // wired up in this prototype yet — say so honestly instead of faking it.
    return {
      mode: "real",
      status: "not-implemented",
      message:
        "M-Pesa credentials are configured, but the live Daraja STK Push call isn't implemented in this build yet.",
    };
  }

  return {
    mode: "demo-sandbox",
    status: "initiated",
    message:
      "Running in sandbox mode — no real M-Pesa transaction was sent. Add MPESA_* credentials to enable live payments.",
  };
}
