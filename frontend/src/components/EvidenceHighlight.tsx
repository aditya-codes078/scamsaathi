import { useState } from "react";
import { Info, CheckCircle } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "../i18n";

interface EvidenceHighlightProps {
  text: string;
  signals: string[];
}

interface ThreatRule {
  regex: RegExp;
  category: string;
  reason: string;
  color: string;
}

export default function EvidenceHighlight({ text, signals }: EvidenceHighlightProps) {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [activeTooltip, setActiveTooltip] = useState<{ id: number; reason: string; category: string } | null>(null);

  // Localized threat rules with WCAG AA compliant chip colors (≥ 4.5:1 text contrast on white text)
  const threatRules: ThreatRule[] = [
    {
      regex: /\b(urgent|urgently|immediately|immediate|expires|expiring|turant|jaldi|abhi|deadline|within \d+\s*(hours?|mins?|hrs?))\b/i,
      category: t.threatUrgencyCategory,
      reason: t.threatUrgencyReason,
      color: "#C2410C", // Orange-700 (5.4:1 contrast on white)
    },
    {
      regex: /\b(otp|one time password|pin|cvv|password|passcode)\b/i,
      category: t.threatOtpCategory,
      reason: t.threatOtpReason,
      color: "#BE123C", // Rose-700 (5.6:1 contrast on white)
    },
    {
      regex: /\b(bit\.ly\/[^\s]+|tinyurl\.com\/[^\s]+|cutt\.ly\/[^\s]+|https?:\/\/[^\s]+|\b\w+\.(xyz|top|click)\b)/i,
      category: t.threatLinkCategory,
      reason: t.threatLinkReason,
      color: "#6D28D9", // Violet-700 (6.8:1 contrast on white)
    },
    {
      regex: /\b(registration fee|processing fee|verification fee|refundable fee|pay rs|pay ₹|send ₹|pay inr|via upi|scanner)\b/i,
      category: t.threatFeeCategory,
      reason: t.threatFeeReason,
      color: "#B45309", // Amber-700 (5.1:1 contrast on white)
    },
    {
      regex: /\b(police|cbi|digital arrest|arrest warrant|court notice|customs|fir filed)\b/i,
      category: t.threatAuthorityCategory,
      reason: t.threatAuthorityReason,
      color: "#BE123C", // Rose-700 (5.6:1 contrast on white)
    },
    {
      regex: /\b(kyc|pan card|pan update|account (is |will be )?(blocked|suspended|frozen|locked)|khata band|electricity (cut off|disconnected))\b/i,
      category: t.threatAccountCategory,
      reason: t.threatAccountReason,
      color: "#C2410C", // Orange-700 (5.4:1 contrast on white)
    },
  ];

  if (!text || signals.length === 0) {
    return (
      <div
        className={`p-4 rounded-xl border ${
          isDark
            ? "bg-[#0B1230] border-slate-700 text-slate-300"
            : "bg-[#F8FAFC] border-slate-200 text-slate-700"
        }`}
      >
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#16A34A]">
          <CheckCircle className="w-4 h-4" />
          <span>{t.evidenceNoTriggersTitle}</span>
        </div>
        <p className="text-sm font-mono whitespace-pre-wrap leading-relaxed opacity-90">
          "{text}"
        </p>
      </div>
    );
  }

  // Find all matches across the text
  interface MatchRange {
    start: number;
    end: number;
    rule: ThreatRule;
    matchText: string;
  }

  const matches: MatchRange[] = [];
  for (const rule of threatRules) {
    const globalRegex = new RegExp(rule.regex.source, "gi");
    let match;
    while ((match = globalRegex.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        rule,
        matchText: match[0],
      });
    }
  }

  // Sort matches by start position and deduplicate overlapping ranges
  matches.sort((a, b) => a.start - b.start);
  const nonOverlapping: MatchRange[] = [];
  let lastEnd = 0;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      nonOverlapping.push(m);
      lastEnd = m.end;
    }
  }

  // Split text into highlighted chunks and plain chunks
  const chunks: Array<{ isHighlight: boolean; content: string; rule?: ThreatRule; id?: number }> = [];
  let currentIndex = 0;
  nonOverlapping.forEach((m, idx) => {
    if (m.start > currentIndex) {
      chunks.push({
        isHighlight: false,
        content: text.slice(currentIndex, m.start),
      });
    }
    chunks.push({
      isHighlight: true,
      content: text.slice(m.start, m.end),
      rule: m.rule,
      id: idx,
    });
    currentIndex = m.end;
  });
  if (currentIndex < text.length) {
    chunks.push({
      isHighlight: false,
      content: text.slice(currentIndex),
    });
  }

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        isDark
          ? "bg-[#0B1230] border-slate-700 text-slate-200"
          : "bg-[#FFFDF9] border-amber-900/10 text-slate-900 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#2563EB]" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {t.evidenceTitle}
          </span>
        </div>
        <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
          {t.evidencePatternsCount.replace("{count}", String(nonOverlapping.length))}
        </span>
      </div>

      {/* Render text with interactive highlight chips */}
      <div className="text-sm sm:text-base leading-relaxed font-sans relative">
        {chunks.map((chunk, i) => {
          if (!chunk.isHighlight || !chunk.rule) {
            return <span key={i}>{chunk.content}</span>;
          }

          const isActive = activeTooltip?.id === chunk.id;

          return (
            <span
              key={i}
              className="relative inline-block cursor-pointer mx-0.5 group"
              onMouseEnter={() =>
                setActiveTooltip({
                  id: chunk.id!,
                  category: chunk.rule!.category,
                  reason: chunk.rule!.reason,
                })
              }
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() =>
                setActiveTooltip(
                  isActive
                    ? null
                    : {
                        id: chunk.id!,
                        category: chunk.rule!.category,
                        reason: chunk.rule!.reason,
                      }
                )
              }
            >
              <mark
                className="px-1.5 py-0.5 rounded font-semibold text-white transition-all transform hover:scale-105"
                style={{
                  backgroundColor: chunk.rule.color,
                }}
              >
                {chunk.content}
              </mark>

              {/* Tooltip Popover */}
              {isActive && (
                <span
                  role="tooltip"
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 rounded-xl bg-slate-900 text-white text-xs font-normal shadow-2xl z-30 border border-slate-700 pointer-events-none animate-in fade-in zoom-in-95 duration-150"
                >
                  <strong
                    className="block font-bold text-[11px] uppercase tracking-wider mb-0.5"
                    style={{ color: chunk.rule.color }}
                  >
                    🚩 {chunk.rule.category}
                  </strong>
                  <span className="text-slate-200 leading-snug block">
                    {chunk.rule.reason}
                  </span>
                  <span className="block text-[10px] text-slate-400 mt-1 italic">
                    {t.evidenceTapToClose}
                  </span>
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
