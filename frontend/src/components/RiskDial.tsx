import { useEffect, useState } from "react";
import type { RiskLevel } from "../types";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "../i18n";

interface RiskDialProps {
  riskLevel: RiskLevel;
}

const TARGET_ANGLES: Record<RiskLevel, number> = {
  Low: -48,
  Caution: -12,
  High: 35,
  Critical: 72,
};

export default function RiskDial({ riskLevel }: RiskDialProps) {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [needleAngle, setNeedleAngle] = useState(TARGET_ANGLES[riskLevel]);

  useEffect(() => {
    // Smooth transition to updated risk level target angle
    const frameId = requestAnimationFrame(() => {
      setNeedleAngle(TARGET_ANGLES[riskLevel]);
    });
    return () => cancelAnimationFrame(frameId);
  }, [riskLevel]);

  const riskColors: Record<RiskLevel, { text: string; bg: string; border: string; label: string }> = {
    Low: {
      text: "#16A34A",
      bg: isDark ? "rgba(22, 163, 74, 0.15)" : "#DCFCE7",
      border: "#16A34A",
      label: t.riskTitleLow.split(" · ")[0],
    },
    Caution: {
      text: "#F59E0B",
      bg: isDark ? "rgba(245, 158, 11, 0.15)" : "#FEF3C7",
      border: "#F59E0B",
      label: t.riskTitleCaution.split(" · ")[0],
    },
    High: {
      text: "#F97316",
      bg: isDark ? "rgba(249, 115, 22, 0.15)" : "#FFEDD5",
      border: "#F97316",
      label: t.riskTitleHigh.split(" · ")[0],
    },
    Critical: {
      text: "#E11D48",
      bg: isDark ? "rgba(225, 29, 72, 0.15)" : "#FFE4E6",
      border: "#E11D48",
      label: t.riskTitleCritical.split(" · ")[0],
    },
  };

  const currentStyle = riskColors[riskLevel];

  return (
    <div
      className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 ${
        isDark
          ? "bg-[#141B3D] border-slate-700 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          : "bg-white border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
      }`}
    >
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
        {t.riskDialTitle}
      </div>

      {/* SVG Semi-Circle Gauge */}
      <div className="relative w-48 h-28 sm:w-56 sm:h-32 flex items-end justify-center overflow-hidden">
        <svg
          viewBox="0 0 200 115"
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            {/* 3D shadow for needle */}
            <filter id="dialShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
            </filter>
            <linearGradient id="needleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Background Track Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={isDark ? "#1E293B" : "#E2E8F0"}
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* 4 Colored Risk Zones */}
          {/* Low (Green #16A34A) */}
          <path
            d="M 20 100 A 80 80 0 0 1 54 44"
            fill="none"
            stroke="#16A34A"
            strokeWidth="16"
            strokeLinecap="round"
            className="opacity-90"
          />
          {/* Caution (Amber #F59E0B) */}
          <path
            d="M 58 40 A 80 80 0 0 1 98 20"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="16"
            className="opacity-90"
          />
          {/* High (Orange #F97316) */}
          <path
            d="M 102 20 A 80 80 0 0 1 142 40"
            fill="none"
            stroke="#F97316"
            strokeWidth="16"
            className="opacity-90"
          />
          {/* Critical (Red #E11D48) */}
          <path
            d="M 146 44 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#E11D48"
            strokeWidth="16"
            strokeLinecap="round"
            className="opacity-90"
          />

          {/* Needle Group with CSS smooth rotation */}
          <g
            transform={`rotate(${needleAngle}, 100, 100)`}
            style={{
              transition: "transform 850ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            filter="url(#dialShadow)"
          >
            {/* Needle pointer */}
            <polygon
              points="97,100 103,100 101,24 99,24"
              fill={isDark ? "#F8FAFC" : "#0F172A"}
            />
            {/* Needle indicator tip */}
            <circle cx="100" cy="23" r="3.5" fill={currentStyle.text} />
          </g>

          {/* Center 3D Bezel / Pivot */}
          <circle cx="100" cy="100" r="14" fill={isDark ? "#0F172A" : "#FFFFFF"} stroke={isDark ? "#334155" : "#CBD5E1"} strokeWidth="3" />
          <circle cx="100" cy="100" r="7" fill={currentStyle.text} />
        </svg>
      </div>

      {/* Numerical and Categorical Pill Badge */}
      <div className="mt-2 flex items-center gap-2">
        <span
          className="px-3.5 py-1 rounded-full text-xs font-bold border transition-colors shadow-sm"
          style={{
            backgroundColor: currentStyle.bg,
            color: currentStyle.text,
            borderColor: currentStyle.border,
          }}
        >
          {currentStyle.label}
        </span>
      </div>
    </div>
  );
}
