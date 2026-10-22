import type { AnalysisResult } from "./types";

const USE_MOCK = true; // backend ready hone par false kar dena

export async function analyze(text: string): Promise<AnalysisResult> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 800));
    return {
      risk_level: "High",
      signals: ["Urgency", "OTP request", "Short link"],
      explanation:
        "Ye message jaldi karne ka pressure bana raha hai aur OTP maang raha hai.",
      safe_actions: [
        "Link par click na karein",
        "Bank ki official app mein check karein",
        "Message save karke 1930 par report karein",
      ],
    };
  }

  const res = await fetch("http://localhost:8000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Server error");
  return res.json();
}