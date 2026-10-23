import { ShieldAlert, Languages, LockKeyhole, Info } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface FeatureCard {
  title: string;
  tagline: string;
  description: string;
  icon: typeof ShieldAlert;
  highlight: string;
  color: string;
}

const features: FeatureCard[] = [
  {
    title: "Not just detection, guided safe response",
    tagline: "Containment beyond just a warning label",
    description:
      "Most checkers simply flag a message as suspicious. ScamSaathi walks you through immediate containment steps if you already clicked a link, downloaded an APK, or sent money.",
    icon: ShieldAlert,
    highlight: "Incident Recovery Workflow",
    color: "#2563EB", // Electric blue
  },
  {
    title: "Hindi/Hinglish explanations",
    tagline: "Cyber awareness in your mother tongue",
    description:
      "Cybersecurity warnings often fail because of confusing technical jargon. ScamSaathi explains threat patterns in everyday Hindi and Hinglish so everyone in the family understands the trap.",
    icon: Languages,
    highlight: "Accessible to All Families",
    color: "#7C3AED", // Violet
  },
  {
    title: "Never asks for OTP, PIN, CVV or passwords",
    tagline: "Zero-trust privacy by design",
    description:
      "True safety begins with strict boundaries. ScamSaathi evaluates only the suspicious message text you paste. We never request your passwords, OTPs, or financial details. No tracking, zero storage.",
    icon: LockKeyhole,
    highlight: "Strict Zero-Storage Privacy",
    color: "#14B8A6", // Teal
  },
];

export default function WhyScamSaathi() {
  const { isDark } = useTheme();

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
            Core Principles
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why ScamSaathi?
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 font-sans">
            Engineered to bridge the critical gap between early fraud suspicion and safe recovery action.
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
              alt="Evidence over panic illustration"
              width={600}
              height={400}
              loading="lazy"
              className="w-full sm:w-44 h-36 object-cover rounded-2xl border border-slate-200 dark:border-slate-800"
            />
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
                Principle 01
              </span>
              <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                Evidence Over Panic
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Scammers rely on creating cognitive overload. We unpack observable clues so you can make a rational decision.
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
              alt="Incident containment illustration"
              width={600}
              height={400}
              loading="lazy"
              className="w-full sm:w-44 h-36 object-cover rounded-2xl border border-slate-200 dark:border-slate-800"
            />
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED]">
                Principle 02
              </span>
              <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                Incident Containment
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Taking action in the first 2 hours after a scam (the golden window) dramatically increases recovery rates.
              </p>
            </div>
          </div>
        </div>

        {/* Evidence & Transparency Notice */}
        <div
          className={`mt-8 rounded-2xl border p-5 flex flex-col sm:flex-row items-center gap-4 text-xs ${
            isDark
              ? "bg-[#141B3D] border-slate-700 text-slate-300"
              : "bg-white border-amber-900/15 text-slate-700 shadow-sm"
          }`}
        >
          <div className="p-2.5 rounded-xl bg-[#2563EB]/10 text-[#2563EB] shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="leading-relaxed font-sans">
            <strong className="text-slate-900 dark:text-white">Transparent AI Assistance: </strong>
            ScamSaathi does not make blind assertions or claim 100% automated accuracy. Instead, it systematically highlights observable evidence (urgency markers, disguised links, spoofed headers) so you can make a calm, safer decision with confidence.
          </div>
        </div>
      </div>
    </section>
  );
}
