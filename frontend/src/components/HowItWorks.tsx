import { useState } from "react";
import { Search, MessageSquareText, Gauge, Compass, ShieldCheck, RotateCw } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "../i18n";

interface Step {
  number: string;
  title: string;
  icon: typeof Search;
  tagline: string;
  frontDetail: string;
  backDeepDive: string;
  actionTip: string;
}

export default function HowItWorks() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const steps: Step[] = [
    {
      number: "01",
      title: t.step1Title,
      icon: Search,
      tagline: t.step1Tagline,
      frontDetail: t.step1Front,
      backDeepDive: t.step1Back,
      actionTip: t.step1Tip,
    },
    {
      number: "02",
      title: t.step2Title,
      icon: MessageSquareText,
      tagline: t.step2Tagline,
      frontDetail: t.step2Front,
      backDeepDive: t.step2Back,
      actionTip: t.step2Tip,
    },
    {
      number: "03",
      title: t.step3Title,
      icon: Gauge,
      tagline: t.step3Tagline,
      frontDetail: t.step3Front,
      backDeepDive: t.step3Back,
      actionTip: t.step3Tip,
    },
    {
      number: "04",
      title: t.step4Title,
      icon: Compass,
      tagline: t.step4Tagline,
      frontDetail: t.step4Front,
      backDeepDive: t.step4Back,
      actionTip: t.step4Tip,
    },
    {
      number: "05",
      title: t.step5Title,
      icon: ShieldCheck,
      tagline: t.step5Tagline,
      frontDetail: t.step5Front,
      backDeepDive: t.step5Back,
      actionTip: t.step5Tip,
    },
  ];

  function toggleFlip(stepNumber: string) {
    setFlippedCards((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  }

  return (
    <section
      id="how-it-works"
      className={`py-16 sm:py-24 border-t transition-colors scroll-mt-20 ${
        isDark ? "bg-[#0B1230] border-slate-800" : "bg-[#FFF9F0]/60 border-amber-900/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#2563EB]/10 text-[#2563EB] mb-3">
            {t.howBadge}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.howTitle}
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 font-sans">
            {t.howSubtitle}
          </p>
        </div>

        {/* 5 Sequential 3D Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isFlipped = !!flippedCards[step.number];

            return (
              <div
                key={step.number}
                className="perspective-1000 h-[340px] cursor-pointer"
                onClick={() => toggleFlip(step.number)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFlip(step.number);
                  }
                }}
                aria-label={`${t.stepNumberPrefix} ${step.number}: ${step.title}. ${t.stepTapFlip}.`}
              >
                <div
                  className={`relative w-full h-full transform-style-3d transition-transform duration-500 rounded-2xl shadow-sm hover:shadow-xl ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* FRONT FACE OF CARD */}
                  <div
                    className={`absolute inset-0 backface-hidden p-5 rounded-2xl border flex flex-col justify-between transition-colors ${
                      isDark
                        ? "bg-[#141B3D] border-slate-700 text-slate-200"
                        : "bg-white border-amber-900/15 text-slate-800"
                    }`}
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[#2563EB]/10 text-[#2563EB]">
                          {t.stepNumberPrefix} {step.number}
                        </span>
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#2563EB]">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#2563EB] mb-2 leading-snug">
                        {step.tagline}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                        {step.frontDetail}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{t.stepTapFlip}</span>
                      <RotateCw className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>

                  {/* BACK FACE OF CARD (FLIPPED 3D VIEW) */}
                  <div
                    className={`absolute inset-0 backface-hidden rotate-y-180 p-5 rounded-2xl border flex flex-col justify-between transition-colors ${
                      isDark
                        ? "bg-gradient-to-br from-[#1E2958] to-[#141B3D] border-[#2563EB]/40 text-slate-100"
                        : "bg-gradient-to-br from-[#EEF2FF] to-white border-[#2563EB]/30 text-slate-900"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                          {t.stepDeepDivePrefix}{step.number}
                        </span>
                        <RotateCw className="w-4 h-4 text-[#2563EB]" />
                      </div>
                      <h4 className="font-heading text-lg font-bold mb-2">
                        {step.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 mb-3 font-sans">
                        {step.backDeepDive}
                      </p>
                      <div className="p-2.5 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 text-xs">
                        <span className="font-bold text-[#2563EB] block mb-0.5">
                          {t.stepDefenseTipPrefix}
                        </span>
                        <p className="text-[11px] leading-snug text-slate-700 dark:text-slate-200">
                          {step.actionTip}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 text-center text-[10px] text-slate-400">
                      {t.stepTapBack}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
