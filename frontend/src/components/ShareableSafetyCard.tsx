import { useState, useRef } from "react";
import { Share2, Check, AlertTriangle } from "lucide-react";
import type { RiskLevel } from "../types";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "../i18n";

interface ShareableSafetyCardProps {
  riskLevel: RiskLevel;
  signals: string[];
}

export default function ShareableSafetyCard({ riskLevel, signals }: ShareableSafetyCardProps) {
  const { isDark } = useTheme();
  const { t, lang } = useLanguage();
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const riskColors: Record<RiskLevel, { text: string; bg: string; label: string }> = {
    Low: { text: "#16A34A", bg: "#DCFCE7", label: lang === "hi" ? "कम जोखिम · सामान्य संदेश" : "LOW RISK · NO IMMINENT THREAT" },
    Caution: { text: "#F59E0B", bg: "#FEF3C7", label: lang === "hi" ? "चेतावनी · असत्यापित संकेत" : "CAUTION · SUSPICIOUS PATTERNS" },
    High: { text: "#F97316", bg: "#FFEDD5", label: lang === "hi" ? "उच्च जोखिम · धोखाधड़ी के लक्षण" : "HIGH RISK · DECEPTION DETECTED" },
    Critical: { text: "#E11D48", bg: "#FFE4E6", label: lang === "hi" ? "गंभीर जोखिम · खतरनाक फिशिंग हमला" : "CRITICAL · URGENT FRAUD TRAP" },
  };

  /**
   * Generates a 1080x1080 square safety advisory graphic on a Canvas element
   * Explicit requirement: Do NOT include user's original message text on the card.
   */
  async function generateCardBlob(): Promise<Blob | null> {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // 1. Background fill
    ctx.fillStyle = "#FFFDF9";
    ctx.fillRect(0, 0, 1080, 1080);

    // Decorative outer border
    ctx.lineWidth = 12;
    ctx.strokeStyle = "#1E293B";
    ctx.strokeRect(40, 40, 1000, 1000);

    // Inner subtle border
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#E2E8F0";
    ctx.strokeRect(55, 55, 970, 970);

    // 2. Brand Header
    ctx.fillStyle = "#2563EB";
    ctx.fillRect(90, 90, 80, 80);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 44px sans-serif";
    ctx.fillText("🛡️", 105, 148);

    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 46px sans-serif";
    ctx.fillText("ScamSaathi", 195, 135);

    ctx.fillStyle = "#64748B";
    ctx.font = "600 22px sans-serif";
    ctx.fillText("CYBER-SAFETY ADVISORY · HACKINDIA 2026", 195, 168);

    // Horizontal divider
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(90, 210);
    ctx.lineTo(990, 210);
    ctx.stroke();

    // 3. Risk Level Banner
    const style = riskColors[riskLevel];
    ctx.fillStyle = style.bg;
    ctx.beginPath();
    ctx.roundRect(90, 250, 900, 130, 24);
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = style.text;
    ctx.stroke();

    ctx.fillStyle = style.text;
    ctx.font = "bold 32px sans-serif";
    ctx.fillText(style.label, 130, 325);

    // 4. Detected Red Flags Section
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText(lang === "hi" ? "पहचाने गए खतरे (RED FLAGS):" : "OBSERVED THREAT RED FLAGS:", 90, 440);

    const displaySignals = signals.length > 0 ? signals.slice(0, 4) : [lang === "hi" ? "इस संदेश में कोई रेड फ्लैग नहीं मिला।" : "No red flag signals detected in this message."];
    let y = 495;
    ctx.font = "500 26px sans-serif";
    ctx.fillStyle = "#334155";

    displaySignals.forEach((sig) => {
      ctx.fillStyle = "#EF4444";
      ctx.beginPath();
      ctx.arc(110, y - 8, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#1E293B";
      ctx.fillText(sig, 135, y);
      y += 55;
    });

    // 5. Emergency Helpline Box (1930 & cybercrime.gov.in)
    ctx.fillStyle = "#0F172A";
    ctx.beginPath();
    ctx.roundRect(90, 720, 900, 180, 24);
    ctx.fill();

    ctx.fillStyle = "#F8FAFC";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText(lang === "hi" ? "🚨 भारत में वित्तीय साइबर अपराध की तुरंत रिपोर्ट करें:" : "🚨 IN INDIA: REPORT FINANCIAL CYBER FRAUD IMMEDIATELY", 130, 775);

    ctx.fillStyle = "#38BDF8";
    ctx.font = "bold 36px sans-serif";
    ctx.fillText("📞 Call Helpline: 1930", 130, 835);

    ctx.fillStyle = "#94A3B8";
    ctx.font = "600 24px sans-serif";
    ctx.fillText("Official Portal: cybercrime.gov.in", 130, 875);

    // 6. Footer Disclaimer
    ctx.fillStyle = "#64748B";
    ctx.font = "500 20px sans-serif";
    ctx.fillText("Never share OTP, PIN, passwords or bank details. Built by Team Build Beyond.", 90, 960);
    ctx.fillText("ScamSaathi explains evidence to guide safe family decisions.", 90, 990);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
  }

  async function handleShareOrDownload() {
    setSharing(true);
    try {
      const blob = await generateCardBlob();
      if (!blob) {
        alert("Could not generate card. Please try again.");
        return;
      }

      const file = new File([blob], "scamsaathi-safety-card.png", { type: "image/png" });

      // If navigator.canShare supports files (e.g. mobile devices / WhatsApp)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "ScamSaathi Cyber-Safety Card",
          text: `ScamSaathi Alert: ${riskLevel} Risk. Report cyber fraud to 1930 or cybercrime.gov.in`,
          files: [file],
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        // Fallback: Trigger instant image download
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `scamsaathi-${riskLevel.toLowerCase()}-safety-advisory.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err: unknown) {
      console.warn("Share aborted or failed:", err);
    } finally {
      setSharing(false);
    }
  }

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
        <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
        <span>{t.sharePrivacyNote}</span>
      </div>

      <button
        type="button"
        onClick={handleShareOrDownload}
        disabled={sharing}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-sm ${
          isDark
            ? "bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            : "bg-[#0F172A] hover:bg-slate-800 text-white shadow-md hover:-translate-y-0.5"
        }`}
        title={t.btnShareFamily}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{t.shareSaved}</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            <span>{sharing ? t.shareGenerating : t.btnShareFamily}</span>
          </>
        )}
      </button>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
