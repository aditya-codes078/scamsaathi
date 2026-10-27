import { PhoneCall, Globe, ShieldAlert, ArrowUpRight } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "../i18n";

export default function SafetyBanner() {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <section className="py-10 transition-colors" aria-label="National Cyber Fraud Helplines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-lg transition-all ${
            isDark
              ? "bg-gradient-to-r from-rose-950/40 via-[#141B3D] to-slate-900 border-slate-700"
              : "bg-gradient-to-r from-rose-50 via-white to-amber-50/50 border-rose-200/80 shadow-[0_10px_35px_rgba(225,29,72,0.06)]"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Banner Left: Text & Badges */}
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex p-3.5 rounded-2xl bg-rose-500 text-white shrink-0 shadow-md">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-[#E11D48] border border-rose-200 dark:border-rose-900 text-[11px] font-bold uppercase tracking-wider mb-2">
                  {t.bannerBadge}
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                  {t.bannerTitlePart1}
                  <span className="text-[#E11D48]">{t.bannerHelpline}</span>
                  {t.bannerTitlePart2}
                  <span className="text-[#2563EB]">{t.bannerPortal}</span>
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-sans">
                  {t.bannerDesc}
                </p>
              </div>
            </div>

            {/* Banner Right: Call and Web Actions */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0 font-sans">
              <a
                href="tel:1930"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#E11D48] hover:bg-rose-700 text-white font-bold text-sm shadow-[0_4px_15px_rgba(225,29,72,0.35)] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                <PhoneCall className="w-4 h-4 animate-pulse" />
                <span>{t.bannerCallBtn}</span>
              </a>

              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-2xl border font-bold text-sm transition-all cursor-pointer ${
                  isDark
                    ? "bg-[#141B3D] hover:bg-slate-800 border-slate-700 text-white"
                    : "bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-sm"
                }`}
              >
                <Globe className="w-4 h-4 text-[#2563EB]" />
                <span>cybercrime.gov.in</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
