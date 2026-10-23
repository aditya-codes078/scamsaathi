import { useState } from "react";
import { Search, MessageSquareText, Gauge, Compass, ShieldCheck, RotateCw } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface Step {
  number: string;
  title: string;
  icon: typeof Search;
  tagline: string;
  frontDetail: string;
  backDeepDive: string;
  actionTip: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Detect",
    icon: Search,
    tagline: "Scans text for psychological urgency, forged links, and impersonation.",
    frontDetail: "Extracts deceptive link shorteners, unauthorized payment keywords, and artificial deadlines.",
    backDeepDive: "Evaluates keyword frequencies and intent patterns without sending your message to external servers.",
    actionTip: "Never click links received from unknown senders without secondary verification.",
  },
  {
    number: "02",
    title: "Explain",
    icon: MessageSquareText,
    tagline: "Breaks down hidden traps in everyday Hindi, Hinglish, and English.",
    frontDetail: "Translates complex cybersecurity warnings into everyday relatable language for all family members.",
    backDeepDive: "Explains WHY an offer is fake — e.g. legitimate companies never demand security deposits for jobs.",
    actionTip: "Share plain-language explanations with elders who might be vulnerable to digital panic.",
  },
  {
    number: "03",
    title: "Assess risk",
    icon: Gauge,
    tagline: "Categorizes threats into transparent risk levels: Low, Caution, High, or Critical.",
    frontDetail: "Weighted scoring derived exclusively from observable evidence in the text.",
    backDeepDive: "OTP demands and authority threats receive high penalty weights due to immediate financial compromise risk.",
    actionTip: "Even a single OTP request triggers Critical severity — treat it as an active attack.",
  },
  {
    number: "04",
    title: "Guide",
    icon: Compass,
    tagline: "Delivers immediate containment steps tailored to what happened.",
    frontDetail: "Customized guidance if you clicked a link, downloaded an APK, or shared bank details.",
    backDeepDive: "Includes airplane mode disconnection, credential resets, and app permission revocation steps.",
    actionTip: "If an unauthorized APK was installed, turn on Airplane Mode immediately to kill remote access.",
  },
  {
    number: "05",
    title: "Act safely",
    icon: ShieldCheck,
    tagline: "Empowers swift incident recovery and direct reporting to India's official 1930 helpline.",
    frontDetail: "Facilitates rapid evidence compilation for cybercrime.gov.in and bank lien procedures.",
    backDeepDive: "Act within the golden hour so banks can freeze fraudulent transactions before money is withdrawn.",
    actionTip: "Note down transaction UTR numbers before dialing the 1930 National Helpline.",
  },
];

export default function HowItWorks() {
  const { isDark } = useTheme();
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

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
            Workflow & Agent Lifecycle
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How ScamSaathi Works
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 font-sans">
            A 5-step response engine that turns confusion into calm, decisive action. Tap any card to flip and explore tactical details.
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
                aria-label={`Step ${step.number}: ${step.title}. Tap to flip card.`}
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
                          Step {step.number}
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

                    {/* Bottom Flip Trigger Hint */}
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1 text-[#2563EB]">
                        <RotateCw className="w-3.5 h-3.5" />
                        Tap to flip
                      </span>
                      <span>3D Card</span>
                    </div>
                  </div>

                  {/* BACK FACE OF CARD (Flipped 180deg) */}
                  <div
                    className={`absolute inset-0 backface-hidden rotate-y-180 p-5 rounded-2xl border flex flex-col justify-between ${
                      isDark
                        ? "bg-[#1A2350] border-[#2563EB]/50 text-white"
                        : "bg-slate-900 border-slate-800 text-white shadow-xl"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                        <span className="font-mono font-bold text-[#14B8A6]">
                          Deep Dive · {step.title}
                        </span>
                        <RotateCw className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <p className="text-xs leading-relaxed text-slate-200 mb-3 font-sans">
                        {step.backDeepDive}
                      </p>
                      <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-amber-300 leading-relaxed">
                        <strong>🛡️ Defense Tip:</strong> {step.actionTip}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 text-center">
                      Tap card to flip back
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
