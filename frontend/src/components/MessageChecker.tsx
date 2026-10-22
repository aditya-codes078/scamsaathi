import { useState } from "react";
import { analyze } from "../api";
import WhatHappened from "../WhatHappened";
import type { AnalysisResult, RiskLevel, ExampleMessage } from "../types";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Flame,
  CheckCircle,
  Sparkles,
  RefreshCw,
  Trash2,
  AlertCircle,
  Lock,
  ArrowRight,
} from "lucide-react";

// The 3 required clickable example messages
const EXAMPLE_MESSAGES: ExampleMessage[] = [
  {
    id: "fake-kyc",
    category: "Banking Phishing",
    title: "Fake KYC & OTP Request",
    riskHint: "Critical",
    text: "Dear Customer, your SBI account will be blocked today due to pending KYC. Visit http://bit.ly/sbi-kyc to update PAN and enter your OTP immediately to avoid suspension.",
  },
  {
    id: "fake-internship",
    category: "Student Scam",
    title: "Fake Internship Fee Offer",
    riskHint: "High",
    text: "Congratulations! Selected for Web Dev Remote Internship at TechCorp. Stipend: ₹25,000/month. Pay ₹499 refundable registration fee via UPI within 2 hours to confirm your offer.",
  },
  {
    id: "normal-meeting",
    category: "Safe Message",
    title: "Normal Routine Message",
    riskHint: "Low",
    text: "Hi, kal ka meeting 5 baje hai",
  },
];

// Exact Part A Risk Badge Colors: Low #4ADE80, Caution #FBBF24, High #FB923C, Critical #FB7185
const riskStyles: Record<
  RiskLevel,
  {
    badge: string;
    border: string;
    bg: string;
    icon: typeof ShieldCheck;
    textColor: string;
    glow: string;
    label: string;
  }
> = {
  Low: {
    badge: "bg-[#4ADE80]/15 text-[#4ADE80] border-[#4ADE80]/40 shadow-[0_0_15px_rgba(74,222,128,0.25)]",
    border: "border-[#4ADE80]/30",
    bg: "bg-[#4ADE80]/5",
    icon: ShieldCheck,
    textColor: "text-[#4ADE80]",
    glow: "shadow-[0_0_30px_rgba(74,222,128,0.12)]",
    label: "Low Risk · No Threat Signals Found",
  },
  Caution: {
    badge: "bg-[#FBBF24]/15 text-[#FBBF24] border-[#FBBF24]/40 shadow-[0_0_15px_rgba(251,191,36,0.25)]",
    border: "border-[#FBBF24]/30",
    bg: "bg-[#FBBF24]/5",
    icon: AlertTriangle,
    textColor: "text-[#FBBF24]",
    glow: "shadow-[0_0_30px_rgba(251,191,36,0.12)]",
    label: "Caution · Unverified Signals",
  },
  High: {
    badge: "bg-[#FB923C]/15 text-[#FB923C] border-[#FB923C]/40 shadow-[0_0_15px_rgba(251,146,60,0.25)]",
    border: "border-[#FB923C]/30",
    bg: "bg-[#FB923C]/5",
    icon: ShieldAlert,
    textColor: "text-[#FB923C]",
    glow: "shadow-[0_0_30px_rgba(251,146,60,0.12)]",
    label: "High Risk · Deception Patterns Detected",
  },
  Critical: {
    badge: "bg-[#FB7185]/15 text-[#FB7185] border-[#FB7185]/40 shadow-[0_0_15px_rgba(251,113,133,0.3)]",
    border: "border-[#FB7185]/40",
    bg: "bg-[#FB7185]/10",
    icon: Flame,
    textColor: "text-[#FB7185]",
    glow: "shadow-[0_0_35px_rgba(251,113,133,0.18)]",
    label: "Critical Risk · Urgent Phishing Trap",
  },
};

export default function MessageChecker() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [friendlyError, setFriendlyError] = useState<string | null>(null);

  async function handleCheck(customText?: string) {
    const input = (customText !== undefined ? customText : text).trim();
    if (!input || loading) return;

    setLoading(true);
    setFriendlyError(null);

    try {
      const res = await analyze(input);
      setResult(res);
    } catch (err: unknown) {
      console.error("Analysis request error:", err);
      // Friendly message required by Part B, never showing raw error
      setFriendlyError("Server abhi available nahi hai, thodi der baad try karein");
    } finally {
      setLoading(false);
    }
  }

  function handleSelectExample(example: ExampleMessage) {
    setText(example.text);
    setFriendlyError(null);
    handleCheck(example.text);
  }

  function handleClear() {
    setText("");
    setResult(null);
    setFriendlyError(null);
  }

  const isLowWithNoSignals = result && result.risk_level === "Low" && result.signals.length === 0;

  return (
    <section id="checker" className="relative py-16 sm:py-24 scroll-mt-16">
      {/* Soft radial cyan and violet glow behind checker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#22D3EE]/10 via-[#A78BFA]/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141B3D] border border-[rgba(96,165,250,0.3)] text-xs font-semibold text-[#22D3EE] mb-3 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Cyber-Safety Checker</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Check a Suspicious Message
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#CBD5E1]">
            Paste any doubtful SMS, WhatsApp message, Telegram job offer, or email. Evidence is evaluated strictly from the text.
          </p>
        </div>

        {/* 3 Clickable Example Buttons */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
              Try Clickable Hackathon Examples:
            </span>
            <span className="text-xs text-[#CBD5E1]/70 hidden sm:inline">
              Click any example to fill and test
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {EXAMPLE_MESSAGES.map((example) => {
              const style = riskStyles[example.riskHint];
              return (
                <button
                  key={example.id}
                  type="button"
                  onClick={() => handleSelectExample(example)}
                  className="flex flex-col text-left p-3.5 rounded-2xl bg-[#141B3D] border border-[rgba(96,165,250,0.25)] hover:border-[#22D3EE] hover:bg-[#1A2350] hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-200 cursor-pointer group transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className="text-[11px] font-semibold text-[#CBD5E1] group-hover:text-white">
                      {example.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${style.badge}`}
                    >
                      {example.riskHint}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-[#22D3EE] transition-colors line-clamp-1">
                    {example.title}
                  </span>
                  <p className="text-[11px] text-[#CBD5E1] line-clamp-2 mt-1 font-mono leading-relaxed">
                    "{example.text}"
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Card Container */}
        <div className="rounded-2xl bg-[#141B3D] border border-[rgba(96,165,250,0.25)] p-5 sm:p-7 shadow-[0_4px_30px_rgba(11,18,48,0.5)]">
          <div className="relative">
            <label htmlFor="message-input" className="sr-only">
              Suspicious message text
            </label>
            <textarea
              id="message-input"
              rows={5}
              className="w-full p-4 rounded-xl bg-[#0B1230] border border-[rgba(96,165,250,0.3)] text-white placeholder:text-[#CBD5E1]/60 text-sm sm:text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-[#22D3EE] transition-all resize-y font-sans"
              placeholder="Paste suspicious SMS, WhatsApp message, Telegram job offer, or email content here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={loading}
            />

            {/* Clear Button */}
            {text && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#141B3D] hover:bg-[#1A2350] text-[#CBD5E1] hover:text-white border border-[rgba(96,165,250,0.2)] transition-colors text-xs flex items-center gap-1 cursor-pointer"
                title="Clear message"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="sr-only sm:not-sr-only text-[11px]">Clear</span>
              </button>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Zero-trust Privacy Guarantee */}
            <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
              <Lock className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
              <span>
                Zero-trust privacy: Never paste OTP, PIN, password, or card numbers.
              </span>
            </div>

            {/* Check Button (disabled on empty or whitespace only) */}
            <button
              type="button"
              onClick={() => handleCheck()}
              disabled={!text.trim() || loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#60A5FA] to-[#22D3EE] hover:from-[#5294ea] hover:to-[#1cb8cf] text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all cursor-pointer transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Analyzing message...</span>
                </>
              ) : (
                <>
                  <span>Check Message</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Friendly Error Box with Retry Option */}
          {friendlyError && (
            <div className="mt-5 p-4 rounded-xl bg-rose-950/60 border border-[#FB7185]/40 text-[#CBD5E1] text-sm flex items-start justify-between gap-3 shadow-[0_0_20px_rgba(251,113,133,0.15)]">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#FB7185] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Temporary Notice</p>
                  <p className="text-xs text-[#CBD5E1] mt-0.5 leading-relaxed">
                    {friendlyError}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCheck()}
                className="shrink-0 px-3 py-1 text-xs font-bold rounded-lg bg-[#FB7185]/20 hover:bg-[#FB7185]/30 text-white border border-[#FB7185]/50 transition-colors"
              >
                Dobara try karein
              </button>
            </div>
          )}

          {/* Analysis Result Card */}
          {result && (
            <div
              className={`mt-6 rounded-2xl border p-5 sm:p-6 transition-all ${
                riskStyles[result.risk_level].bg
              } ${riskStyles[result.risk_level].border} ${riskStyles[result.risk_level].glow}`}
            >
              {/* Result Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(96,165,250,0.2)] pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
                      riskStyles[result.risk_level].badge
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    {result.risk_level} Risk
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {riskStyles[result.risk_level].label}
                  </span>
                </div>

                {/* Counter is hidden for Low risk with no signals (Part B item 6) */}
                {!isLowWithNoSignals && result.signals.length > 0 && (
                  <span className="text-xs text-[#CBD5E1] font-mono">
                    {result.signals.length} threat signal(s) analyzed
                  </span>
                )}
              </div>

              {/* Calm Green Reassurance for Low Risk with 0 signals */}
              {isLowWithNoSignals ? (
                <div className="mb-4 p-4 rounded-xl bg-[#4ADE80]/10 border border-[#4ADE80]/30 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#4ADE80] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Koi Threat Signal Detect Nahi Hua (Clean Message)
                    </h4>
                    <p className="text-xs text-[#CBD5E1] mt-0.5 leading-relaxed">
                      Is message mein koi bhi phishing URL, payment demand, authority threat, ya OTP request ke red flags nahi mile hain.
                    </p>
                  </div>
                </div>
              ) : (
                /* Threat Signal Chips (Only shown when signals exist) */
                result.signals.length > 0 && (
                  <div className="mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] block mb-2">
                      Observed Threat Signals:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {result.signals.map((sig) => (
                        <span
                          key={sig}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0B1230] border border-[rgba(96,165,250,0.3)] text-xs font-medium text-white shadow-sm"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 text-[#22D3EE]" />
                          {sig}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}

              {/* Explanation Section */}
              <div className="mb-5 bg-[#0B1230]/80 rounded-xl p-4 border border-[rgba(96,165,250,0.2)]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#60A5FA] block mb-1">
                  Agent Explanation:
                </span>
                <p className="text-sm sm:text-base text-white leading-relaxed font-sans">
                  {result.explanation}
                </p>
              </div>

              {/* Safe Actions List */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4ADE80] block mb-2">
                  Recommended Safe Actions:
                </span>
                <ul className="space-y-2">
                  {result.safe_actions.map((action, i) => (
                    <li
                      key={action}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1]"
                    >
                      <CheckCircle className="w-4 h-4 text-[#4ADE80] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white font-medium">Step {i + 1}: </strong>
                        {action}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Transparent Evidence Disclaimer */}
              <div className="mt-5 pt-3 border-t border-[rgba(96,165,250,0.2)] text-[11px] text-[#CBD5E1]/80 leading-relaxed">
                * ScamSaathi explains observable evidence so you can make informed decisions. It never guarantees 100% accuracy and does not replace official bank verification.
              </div>
            </div>
          )}
        </div>

        {/* Existing Incident Response Step */}
        {result && <WhatHappened />}
      </div>
    </section>
  );
}
