import { useState } from "react";
import { analyze } from "./api";
import type { AnalysisResult, RiskLevel } from "./types";

const colors: Record<RiskLevel, string> = {
  Low: "bg-green-600",
  Caution: "bg-yellow-500",
  High: "bg-orange-600",
  Critical: "bg-red-700",
};

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setLoading(true);
    try {
      setResult(await analyze(text));
    } catch {
      alert("Kuch gadbad hui, dobara try karein");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">ScamSaathi</h1>

      <textarea
        className="w-full h-40 p-3 rounded bg-slate-900 border border-slate-700"
        placeholder="Suspicious message ya link yahan paste karein..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleCheck}
        disabled={!text.trim() || loading}
        className="mt-3 px-5 py-2 rounded bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Checking..." : "Check"}
      </button>

      {result && (
        <div className="mt-6 p-4 rounded bg-slate-900 border border-slate-700">
          <span
            className={`px-3 py-1 rounded font-semibold ${colors[result.risk_level]}`}
          >
            {result.risk_level} risk
          </span>

          <div className="flex gap-2 flex-wrap mt-3">
            {result.signals.map((s) => (
              <span key={s} className="px-2 py-1 text-sm rounded bg-slate-800">
                {s}
              </span>
            ))}
          </div>

          <p className="mt-3">{result.explanation}</p>

          <ul className="mt-3 list-disc pl-5">
            {result.safe_actions.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}