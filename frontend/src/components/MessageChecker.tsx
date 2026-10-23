import { useState } from "react";
import { analyze } from "../api";
import WhatHappened from "../WhatHappened";
import RiskDial from "./RiskDial";
import EvidenceHighlight from "./EvidenceHighlight";
import ShareableSafetyCard from "./ShareableSafetyCard";
import ScreenshotOcrUpload from "./ScreenshotOcrUpload";
import type { AnalysisResult, RiskLevel, ExampleMessage } from "../types";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Flame,
  CheckCircle,
  RefreshCw,
  Trash2,
  AlertCircle,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "./ThemeContext";

// The 3 required clickable example messages
const EXAMPLE_MESSAGES: ExampleMessage[] = [
  {
    id: "fake-kyc",
    category: "Banking Fraud",
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

// Exact Risk Colors: Low #16A34A, Caution #F59E0B, High #F97316, Critical #E11D48
const riskStyles: Record<
  RiskLevel,
  {
    badge: string;
    border: string;
    bg: string;
    textColor: string;
    label: string;
    icon: typeof ShieldCheck;
  }
> = {
  Low: {
    badge: "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/30",
    border: "border-[#16A34A]/30",
    bg: "bg-[#16A34A]/5",
    textColor: "text-[#16A34A]",
    label: "Low Risk · Safe Message",
    icon: ShieldCheck,
  },
  Caution: {
    badge: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30",
    border: "border-[#F59E0B]/30",
    bg: "bg-[#F59E0B]/5",
    textColor: "text-[#F59E0B]",
    label: "Caution · Unverified Signals",
    icon: AlertTriangle,
  },
  High: {
    badge: "bg-[#F97316]/10 text-[#F97316] border-[#F97316]/30",
    border: "border-[#F97316]/30",
    bg: "bg-[#F97316]/5",
    textColor: "text-[#F97316]",
    label: "High Risk · Deception Patterns",
    icon: ShieldAlert,
  },
  Critical: {
    badge: "bg-[#E11D48]/10 text-[#E11D48] border-[#E11D48]/30",
    border: "border-[#E11D48]/40",
    bg: "bg-[#E11D48]/5",
    textColor: "text-[#E11D48]",
    label: "Critical Risk · Urgent Phishing Trap",
    icon: Flame,
  },
};

export default function MessageChecker() {
  const { isDark } = useTheme();
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
      console.error("Analysis request failed:", err);
      // Friendly message required by prompt
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
    <section id="checker" className="py-16 sm:py-24 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2563EB]/10 text-[#2563EB] mb-3">
            <span>Direct Signal Inspector</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Check a Suspicious Message
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans">
            Paste any doubtful SMS, WhatsApp offer, job notice, or banking notification below. Evidence is evaluated strictly from the text.
          </p>
        </div>

        {/* 3 Clickable Example Buttons */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Try Clickable Hackathon Examples:
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Click any sample to test instant analysis
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
                  className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer group hover:-translate-y-0.5 shadow-sm hover:shadow-md ${
                    isDark
                      ? "bg-[#141B3D] border-slate-700 hover:border-[#2563EB]"
                      : "bg-white border-amber-900/15 hover:border-[#2563EB]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                      {example.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${style.badge}`}>
                      {example.riskHint}
                    </span>
                  </div>
                  <span className="font-heading text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#2563EB] transition-colors line-clamp-1">
                    {example.title}
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 font-mono leading-relaxed">
                    "{example.text}"
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Input Card */}
        <div
          className={`rounded-3xl border p-5 sm:p-7 shadow-lg transition-colors ${
            isDark
              ? "bg-[#141B3D] border-slate-700"
              : "bg-white border-amber-900/15 shadow-[0_10px_35px_rgba(0,0,0,0.05)]"
          }`}
        >
          <div className="relative">
            <label htmlFor="message-input" className="sr-only">
              Suspicious message text
            </label>
            <textarea
              id="message-input"
              rows={5}
              className={`w-full p-4 rounded-2xl text-sm sm:text-base leading-relaxed border transition-all resize-y font-sans focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                isDark
                  ? "bg-[#0B1230] border-slate-700 text-white placeholder:text-slate-500"
                  : "bg-[#FFFDF9] border-slate-200 text-slate-900 placeholder:text-slate-400"
              }`}
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
                className="absolute top-3 right-3 p-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                title="Clear text"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="sr-only sm:not-sr-only text-[11px]">Clear</span>
              </button>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Lock className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>Zero-trust privacy: Never paste OTP, PIN, password, or card numbers.</span>
            </div>

            {/* Check Button: disabled when empty or whitespace only */}
            <button
              type="button"
              onClick={() => handleCheck()}
              disabled={!text.trim() || loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-heading font-bold text-sm shadow-[0_4px_15px_rgba(37,99,235,0.35)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all cursor-pointer transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating text signals...</span>
                </>
              ) : (
                <>
                  <span>Check Message</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Optional Experimental Screenshot Upload */}
          <ScreenshotOcrUpload
            onTextExtracted={(extracted) => {
              setText(extracted);
              handleCheck(extracted);
            }}
          />

          {/* Friendly Error Box with Retry */}
          {friendlyError && (
            <div className="mt-5 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-sm flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-rose-900 dark:text-rose-100">Temporary Notice</p>
                  <p className="text-xs text-rose-700 dark:text-rose-300 mt-0.5">{friendlyError}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCheck()}
                className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Dobara try karein
              </button>
            </div>
          )}

          {/* Analysis Result Card */}
          {result && (
            <div
              className={`mt-6 rounded-2xl border p-5 sm:p-7 transition-all ${
                riskStyles[result.risk_level].bg
              } ${riskStyles[result.risk_level].border}`}
            >
              {/* Header with Risk Dial + Badge */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-slate-200 dark:border-slate-800 pb-5 mb-5">
                <div className="md:col-span-7 space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
                        riskStyles[result.risk_level].badge
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                      {result.risk_level} Risk
                    </span>
                    {!isLowWithNoSignals && result.signals.length > 0 && (
                      <span className="text-xs text-slate-500 font-mono">
                        {result.signals.length} threat signal(s) analyzed
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
                    {riskStyles[result.risk_level].label}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
                    Derived exclusively from verifiable linguistic markers and threat patterns present in the message.
                  </p>
                </div>

                {/* Animated 3D Risk Dial */}
                <div className="md:col-span-5 flex justify-center md:justify-end">
                  <RiskDial riskLevel={result.risk_level} />
                </div>
              </div>

              {/* Calm Green Reassurance for Low Risk with 0 signals */}
              {isLowWithNoSignals ? (
                <div className="mb-4 p-4 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading text-sm font-bold text-[#16A34A]">
                      Clean Message (No Red Flags Found)
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed font-sans">
                      Is message mein koi phishing link, payment demand, authority arrest threat, ya OTP maangne ke signals detect nahi hue hain.
                    </p>
                  </div>
                </div>
              ) : (
                /* Signal Chips (Only when signals exist) */
                result.signals.length > 0 && (
                  <div className="mb-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-2">
                      Observed Red Flags:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {result.signals.map((sig) => (
                        <span
                          key={sig}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium ${
                            isDark
                              ? "bg-[#0B1230] border-slate-700 text-white"
                              : "bg-white border-amber-900/15 text-slate-800 shadow-sm"
                          }`}
                        >
                          <AlertTriangle className="w-3.5 h-3.5 text-[#F97316]" />
                          {sig}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}

              {/* Evidence Highlight in User's Text */}
              <div className="mb-5">
                <EvidenceHighlight text={text} signals={result.signals} />
              </div>

              {/* Agent Explanation */}
              <div
                className={`mb-5 p-4 rounded-xl border ${
                  isDark
                    ? "bg-[#0B1230]/70 border-slate-700 text-slate-200"
                    : "bg-white/80 border-slate-200 text-slate-800"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block mb-1">
                  Agent Explanation:
                </span>
                <p className="text-sm leading-relaxed font-sans">{result.explanation}</p>
              </div>

              {/* Safe Actions */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] block mb-2">
                  Recommended Safe Actions:
                </span>
                <ul className="space-y-2">
                  {result.safe_actions.map((action, i) => (
                    <li key={action} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-900 dark:text-white font-medium">Step {i + 1}: </strong>
                        {action}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shareable Safety Card for Family */}
              <ShareableSafetyCard riskLevel={result.risk_level} signals={result.signals} />
            </div>
          )}
        </div>

        {/* Existing WhatHappened Component */}
        {result && <WhatHappened />}
      </div>
    </section>
  );
}
