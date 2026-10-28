import { useState, useEffect, useRef } from "react";
import { Shield, ArrowRight, Lock, Sparkles, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "../i18n";

interface FloatingBubble {
  id: number;
  snippet: string;
  badge: string;
  badgeColor: string;
  tagline: string;
  explanation: string;
  positionClass: string;
}

export default function Hero() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [activeBubble, setActiveBubble] = useState<FloatingBubble | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isReducedMotion = useRef<boolean>(false);

  const floatingBubbles: FloatingBubble[] = [
    {
      id: 1,
      snippet: t.bubble1Snippet,
      badge: t.bubble1Badge,
      badgeColor: "#F59E0B",
      tagline: t.bubble1Tagline,
      explanation: t.bubble1Explanation,
      positionClass: "-top-6 -left-4 sm:-left-12",
    },
    {
      id: 2,
      snippet: t.bubble2Snippet,
      badge: t.bubble2Badge,
      badgeColor: "#E11D48",
      tagline: t.bubble2Tagline,
      explanation: t.bubble2Explanation,
      positionClass: "top-1/3 -right-4 sm:-right-12",
    },
    {
      id: 3,
      snippet: t.bubble3Snippet,
      badge: t.bubble3Badge,
      badgeColor: "#7C3AED",
      tagline: t.bubble3Tagline,
      explanation: t.bubble3Explanation,
      positionClass: "-bottom-6 -left-2 sm:-left-8",
    },
  ];

  useEffect(() => {
    isReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mobile device tilt listener if available
    function handleOrientation(e: DeviceOrientationEvent) {
      if (isReducedMotion.current) return;
      if (e.beta !== null && e.gamma !== null) {
        // Clamp tilt values for gentle 3D effect
        const tiltX = Math.max(-12, Math.min(12, (e.beta - 45) / 3));
        const tiltY = Math.max(-12, Math.min(12, e.gamma / 3));
        setRotate({ x: -tiltX, y: tiltY });
      }
    }

    const doe = window.DeviceOrientationEvent as unknown as { requestPermission?: () => unknown };
    if (window.DeviceOrientationEvent && typeof doe?.requestPermission !== "function") {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isReducedMotion.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    // Damped 3D rotation angles
    setRotate({
      x: -(y / 20),
      y: x / 20,
    });
  }

  function handleMouseLeave() {
    setRotate({ x: 0, y: 0 });
  }

  function scrollToChecker() {
    const el = document.querySelector("#checker");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
      {/* Asymmetric warm glow accents for bright theme */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-28 right-1/4 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Asymmetric large typography & honest copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Hackathon credential badge */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
                isDark
                  ? "bg-[#141B3D] border border-slate-700 text-slate-300"
                  : "bg-white border border-amber-900/15 text-slate-800"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span>{t.hackathonTeamBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              {t.heroHeadlinePart1}
              <span className="underline decoration-[#2563EB] decoration-wavy decoration-4 underline-offset-8">
                {t.heroHeadlineHighlight}
              </span>
            </h1>

            {/* Required one-line subtext */}
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-semibold max-w-2xl mx-auto lg:mx-0 font-sans">
              {t.heroSubtext}
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              {t.heroDescription}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToChecker}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-heading font-bold text-base shadow-[0_10px_25px_rgba(37,99,235,0.3)] transition-all transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <span>{t.heroCtaCheck}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#how-it-works"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                  isDark
                    ? "bg-[#141B3D] hover:bg-[#1E2958] text-slate-200 border border-slate-700"
                    : "bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm"
                }`}
              >
                <span>{t.heroCtaHow}</span>
              </a>
            </div>

            {/* Trust Points */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Lock className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>{t.heroTrustNoOtp}</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Sparkles className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span>{t.heroTrustBilingual}</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>{t.heroTrustHelpline}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hand-crafted 3D Phone + Shield with Interactive Floating Bubbles */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-sm sm:max-w-md perspective-1000 py-6 select-none"
            >
              {/* 3D Transform Container */}
              <div
                className="relative transition-transform duration-200 ease-out transform-style-3d flex items-center justify-center"
                style={{
                  transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                }}
              >
                {/* 3D Physical Phone Bezel */}
                <div className="relative w-64 sm:w-72 h-[410px] rounded-[40px] bg-slate-900 border-[7px] border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.35)] p-3 flex flex-col justify-between overflow-hidden">
                  {/* Speaker & Camera Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full flex items-center justify-center gap-1.5 z-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <span className="w-8 h-1 bg-slate-700 rounded-full" />
                  </div>

                  {/* Phone Screen */}
                  <div className="mt-4 w-full h-full rounded-[30px] bg-slate-950 p-3.5 flex flex-col justify-between text-white text-xs border border-slate-800">
                    <div>
                      {/* Top Header in Mockup */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center font-bold text-white text-[11px]">
                            SB
                          </div>
                          <div>
                            <span className="font-bold text-xs text-white block">{t.heroPhoneSender}</span>
                            <span className="text-[10px] text-slate-400 font-mono">+91 98XXX XXXXX</span>
                          </div>
                        </div>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {t.heroPhoneDemoBadge}
                        </span>
                      </div>

                      {/* Simulated Suspicious SMS Message Bubble */}
                      <div className="rounded-2xl rounded-tl-sm bg-slate-900 border border-slate-700 p-3 shadow-md space-y-1.5">
                        <p className="text-slate-200 text-xs leading-relaxed font-sans">
                          {t.heroPhoneMessage}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                          <span className="text-amber-400 font-medium">{t.heroPhoneExampleCaption}</span>
                          <span>10:42 AM</span>
                        </div>
                      </div>

                      {/* Detected Evidence Flags inside screen */}
                      <div className="mt-3 space-y-1.5">
                        <div className="flex items-center justify-between p-1.5 rounded-lg bg-rose-950/60 border border-rose-500/30 text-[11px] text-rose-300">
                          <span>{t.heroPhoneFlagUrgency}</span>
                          <span className="font-bold">High</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 rounded-lg bg-orange-950/60 border border-orange-500/30 text-[11px] text-orange-300">
                          <span>{t.heroPhoneFlagLink}</span>
                          <span className="font-bold">Alert</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Home Indicator Bar */}
                    <div className="w-24 h-1 bg-slate-600 rounded-full mx-auto" />
                  </div>
                </div>

                {/* Interactive 3D Shield Badge in center */}
                <div
                  className="absolute -right-3 bottom-12 w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#14B8A6] p-0.5 shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform"
                  style={{ transform: "translateZ(35px)" }}
                >
                  <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-[#14B8A6]" />
                  </div>
                </div>

                {/* Floating Scam Message Bubbles (Click to open red-flag popover) */}
                {floatingBubbles.map((bubble) => (
                  <button
                    key={bubble.id}
                    type="button"
                    onClick={() => setActiveBubble(bubble)}
                    className={`absolute ${bubble.positionClass} z-30 p-2.5 sm:p-3 rounded-2xl border text-left shadow-xl transition-all cursor-pointer transform hover:scale-105 active:scale-95 animate-bounce-slow ${
                      isDark
                        ? "bg-[#141B3D] border-slate-700 text-white"
                        : "bg-white border-amber-900/15 text-slate-900"
                    }`}
                    style={{ transform: `translateZ(${bubble.id * 15}px)` }}
                    title={t.bubbleHoverTitle}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: bubble.badgeColor }}
                      />
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded"
                        style={{
                          color: bubble.badgeColor,
                          backgroundColor: `${bubble.badgeColor}20`,
                        }}
                      >
                        {bubble.badge}
                      </span>
                    </div>
                    <span className="text-xs font-bold block truncate max-w-[150px]">
                      {bubble.snippet}
                    </span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium block">
                      {t.bubbleTapHint}
                    </span>
                  </button>
                ))}
              </div>

              {/* Popover explaining red flag when a bubble is clicked */}
              {activeBubble && (
                <div className="absolute inset-x-2 bottom-0 z-40 p-4 rounded-3xl bg-slate-900/95 text-white border border-slate-700 shadow-2xl backdrop-blur-md animate-fade-in font-sans">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                      <div>
                        <span className="font-heading font-bold text-sm text-white block">
                          {activeBubble.tagline}
                        </span>
                        <span className="text-[11px] text-amber-300 font-mono">
                          {activeBubble.snippet}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveBubble(null)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                      aria-label={t.closeExplanationAria}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeBubble.explanation}
                  </p>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveBubble(null)}
                      className="px-3 py-1 rounded-lg bg-[#2563EB] text-white text-xs font-bold hover:bg-[#1D4ED8] transition-colors cursor-pointer"
                    >
                      {t.bubbleCloseBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
