import { ShieldAlert, Languages, LockKeyhole, Info } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "../i18n";

interface FeatureCard {
  title: string;
  tagline: string;
  description: string;
  icon: typeof ShieldAlert;
  highlight: string;
  color: string;
}

export default function WhyScamSaathi() {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const features: FeatureCard[] = [
    {
      title: t.whyCard1Title,
      tagline: t.whyCard1Tagline,
      description: t.whyCard1Desc,
      icon: ShieldAlert,
      highlight: t.whyCard1Badge,
      color: "#2563EB", // Electric blue
    },
    {
      title: t.whyCard2Title,
      tagline: t.whyCard2Tagline,
      description: t.whyCard2Desc,
      icon: Languages,
      highlight: t.whyCard2Badge,
      color: "#7C3AED", // Violet
    },
    {
      title: t.whyCard3Title,
      tagline: t.whyCard3Tagline,
      description: t.whyCard3Desc,
      icon: LockKeyhole,
      highlight: t.whyCard3Badge,
      color: isDark ? "#14B8A6" : "#0F766E", // Teal (≥ 4.5:1 text contrast in both themes)
    },
  ];

  return (
    <section
      id="why-scamsaathi"
      className={`py-16 sm:py-24 border-t transition-colors scroll-mt-16 ${
        isDark ? "bg-[#0B1230] border-slate-800" : "bg-[#FFF9F0]/60 border-amber-900/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2563EB]/10 text-[#2563EB] mb-3">
            {t.whyBadge}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.whyTitle}
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 font-sans">
            {t.whySubtitle}
          </p>
        </div>

        {/* 3 Core Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`rounded-3xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isDark
                    ? "bg-[#141B3D] border-slate-700 hover:border-slate-500"
                    : "bg-white border-amber-900/15 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:border-[#2563EB]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="p-3 rounded-2xl transition-colors"
                      style={{
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full border"
                      style={{
                        color: item.color,
                        borderColor: `${item.color}30`,
                        backgroundColor: `${item.color}10`,
                      }}
                    >
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p
                    className="text-xs font-semibold mb-3"
                    style={{ color: item.color }}
                  >
                    {item.tagline}
                  </p>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Story Illustration Slots using public/images/ */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`rounded-3xl border p-5 flex flex-col sm:flex-row items-center gap-5 overflow-hidden ${
              isDark ? "bg-[#141B3D] border-slate-700" : "bg-white border-amber-900/15 shadow-sm"
            }`}
          >
            <img
              src="/images/story-1.jpg"
              alt={t.whyStory1ImgAlt}
              width={600}
              height={400}
              loading="lazy"
              className="w-full sm:w-44 h-36 object-cover rounded-2xl border border-slate-200 dark:border-slate-800"
            />
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
                {t.whyStory1Principle}
              </span>
              <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                {t.whyStory1Title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                {t.whyStory1Desc}
              </p>
            </div>
          </div>

          <div
            className={`rounded-3xl border p-5 flex flex-col sm:flex-row items-center gap-5 overflow-hidden ${
              isDark ? "bg-[#141B3D] border-slate-700" : "bg-white border-amber-900/15 shadow-sm"
            }`}
          >
            <img
              src="/images/story-2.jpg"
              alt={t.whyStory2ImgAlt}
              width={600}
              height={400}
              loading="lazy"
              className="w-full sm:w-44 h-36 object-cover rounded-2xl border border-slate-200 dark:border-slate-800"
            />
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] dark:text-[#14B8A6]">
                {t.whyStory2Principle}
              </span>
              <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                {t.whyStory2Title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                {t.whyStory2Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Transparent AI / Agent Disclaimer Box */}
        <div
          className={`mt-8 p-5 sm:p-6 rounded-3xl border flex items-start gap-4 ${
            isDark ? "bg-[#141B3D]/70 border-slate-700" : "bg-white border-amber-900/15 shadow-sm"
          }`}
        >
          <div className="p-2.5 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1">
              {t.whyTransparencyTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              {t.whyTransparencyDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
