import { ShieldAlert, Languages, LockKeyhole, Info } from "lucide-react";

interface FeatureCard {
  title: string;
  tagline: string;
  description: string;
  icon: typeof ShieldAlert;
  highlight: string;
}

const features: FeatureCard[] = [
  {
    title: "Not just detection, guided safe response",
    tagline: "Containment beyond just a warning label",
    description:
      "Most anti-fraud tools stop at telling you 'This looks suspicious'. ScamSaathi goes further by providing concrete recovery workflows if you already clicked a link, downloaded an APK, shared personal data, or sent money.",
    icon: ShieldAlert,
    highlight: "Post-incident recovery workflow",
  },
  {
    title: "Hindi/Hinglish explanations",
    tagline: "Cyber awareness in your mother tongue",
    description:
      "Cybersecurity warnings often fail because they are packed with intimidating technical jargon. ScamSaathi explains threat signals in everyday Hindi and Hinglish so that every family member can understand the deception tactics.",
    icon: Languages,
    highlight: "Accessible to non-technical users",
  },
  {
    title: "Never asks for OTP, PIN, CVV or passwords",
    tagline: "Zero-trust privacy by design",
    description:
      "True safety starts with strict boundaries. ScamSaathi only evaluates the suspicious message text you paste. We never request your phone number, banking PIN, CVV, OTP, or passwords. No user tracking, no data storage.",
    icon: LockKeyhole,
    highlight: "Zero confidential data collection",
  },
];

export default function WhyScamSaathi() {
  return (
    <section id="why-scamsaathi" className="py-16 sm:py-24 border-t border-[rgba(96,165,250,0.15)] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141B3D] border border-[rgba(96,165,250,0.3)] text-xs font-semibold text-[#22D3EE] mb-3 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            Core Principles
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why ScamSaathi?
          </h2>
          <p className="mt-3 text-base text-[#CBD5E1]">
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
                className="rounded-2xl bg-[#141B3D] border border-[rgba(96,165,250,0.25)] p-6 sm:p-7 flex flex-col justify-between hover:border-[#22D3EE] hover:bg-[#1A2350] hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-300 group transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-[#0B1230] text-[#22D3EE] border border-[rgba(96,165,250,0.25)] group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#CBD5E1] bg-[#0B1230] px-2.5 py-1 rounded-md border border-[rgba(96,165,250,0.2)]">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#60A5FA] mb-3">
                    {item.tagline}
                  </p>

                  <p className="text-sm text-[#CBD5E1] leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Evidence & Transparency Notice */}
        <div className="mt-8 rounded-2xl bg-[#141B3D] border border-[rgba(96,165,250,0.25)] p-5 flex flex-col sm:flex-row items-center gap-4 text-xs text-[#CBD5E1] shadow-[0_4px_20px_rgba(11,18,48,0.4)]">
          <div className="p-2 rounded-xl bg-[#0B1230] text-[#22D3EE] shrink-0 border border-[#22D3EE]/30">
            <Info className="w-4 h-4" />
          </div>
          <div className="leading-relaxed">
            <span className="font-semibold text-white">Transparent AI Assistance: </span>
            ScamSaathi does not make blind assertions or claim 100% automated accuracy. Instead, it systematically highlights observable evidence (urgency markers, disguised links, spoofed headers) so you can make a calm, safer decision with confidence.
          </div>
        </div>
      </div>
    </section>
  );
}
