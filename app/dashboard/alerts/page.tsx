"use client";

import { useState } from "react";
import { AlertTriangle, Info, Siren, Send, Loader2 } from "lucide-react";
import { ALERTS } from "@/lib/data/alerts-demo";
import { cn } from "@/lib/utils";

const SEVERITY_STYLES: Record<string, { icon: typeof Info; classes: string }> = {
  info: { icon: Info, classes: "bg-blue-50 text-blue-700" },
  warning: { icon: AlertTriangle, classes: "bg-amber-50 text-amber-700" },
  critical: { icon: Siren, classes: "bg-red-50 text-red-700" },
};

export default function AlertsPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string; source?: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = question;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });
      const body = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: body.answer, source: body.source }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Couldn't reach the AI service." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-brand-dark sm:text-2xl">Alerts</h1>
        <div className="mt-4 flex flex-col gap-3">
          {ALERTS.map((alert) => {
            const { icon: Icon, classes } = SEVERITY_STYLES[alert.severity];
            return (
              <div key={alert.id} className="flex gap-3 rounded-xl2 border border-gray-200 bg-white p-4 shadow-card">
                <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", classes)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-brand-dark">{alert.title}</p>
                  <p className="text-sm text-gray-500">{alert.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex w-full flex-col rounded-xl2 border border-gray-200 bg-white p-4 shadow-card lg:w-96">
        <h2 className="text-sm font-semibold text-brand-dark">Ask AI</h2>
        <p className="mt-1 text-xs text-gray-400">
          Uses a real Claude API call when configured; otherwise a clearly labeled demo fallback.
        </p>

        <div className="mt-3 flex-1 space-y-2 overflow-y-auto text-sm">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "rounded-lg px-3 py-2",
                m.role === "user" ? "ml-auto max-w-[85%] bg-brand-green/10 text-brand-dark" : "max-w-[85%] bg-gray-50 text-gray-700"
              )}
            >
              {m.text}
              {m.source && <p className="mt-1 text-[10px] uppercase text-gray-400">{m.source}</p>}
            </div>
          ))}
        </div>

        <form onSubmit={handleAsk} className="mt-3 flex gap-2">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about farms, weather, or alerts..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center rounded-lg bg-brand-green px-3 text-white disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
