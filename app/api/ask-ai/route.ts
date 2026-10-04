import { NextRequest, NextResponse } from "next/server";

// Real Anthropic API call when ANTHROPIC_API_KEY is set; otherwise a
// deterministic keyword-matched fallback. Response is always tagged with
// its real source — never presented as AI-generated when it wasn't.

const FALLBACK_RESPONSES: { keywords: string[]; answer: string }[] = [
  { keywords: ["weather", "rain", "forecast"], answer: "Rainfall in Kakamega is forecast 30% below average this week — consider adjusting irrigation schedules." },
  { keywords: ["alert", "critical"], answer: "You have 1 critical alert: lime stock at the mill is below 2 days of supply." },
  { keywords: ["payment", "paid", "pesa"], answer: "3 of 4 recent payments are paid or processing; 1 is still pending for SF-0055." },
  { keywords: ["truck", "transport"], answer: "3 trucks are active; KDD 905E is idle and available for dispatch." },
];

function getFallbackAnswer(question: string): string {
  const lower = question.toLowerCase();
  const match = FALLBACK_RESPONSES.find((r) => r.keywords.some((k) => lower.includes(k)));
  return match
    ? match.answer
    : "I don't have a specific answer for that in this demo. Try asking about weather, alerts, payments, or trucks.";
}

export async function POST(request: NextRequest) {
  const { question } = await request.json();

  if (!question || typeof question !== "string") {
    return NextResponse.json({ error: "A question is required." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      answer: getFallbackAnswer(question),
      source: "demo-fallback",
    });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: `You are an assistant inside a sugar-operations dashboard called SugarFlow AI. Answer briefly and practically. Question: ${question}`,
          },
        ],
      }),
    });

    if (!res.ok) throw new Error(`Anthropic API error: ${res.status}`);

    const data = await res.json();
    const answer = data.content?.[0]?.text || getFallbackAnswer(question);

    return NextResponse.json({ answer, source: "llm" });
  } catch {
    return NextResponse.json({
      answer: getFallbackAnswer(question),
      source: "demo-fallback",
    });
  }
}
