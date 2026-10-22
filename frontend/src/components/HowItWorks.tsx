import { Search, MessageSquareText, Gauge, Compass, ShieldCheck, ArrowRight } from "lucide-react";

interface Step {
  number: string;
  title: string;
  icon: typeof Search;
  tagline: string;
  detail: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Detect",
    icon: Search,
    tagline: "Scans text for psychological urgency, forged links, and impersonation signals.",
    detail: "Identifies fake sender headers, deceptive shortened links, and artificial panic tactics.",
  },
  {
    number: "02",
    title: "Explain",
    icon: MessageSquareText,
    tagline: "Breaks down hidden traps in everyday Hindi, Hinglish, and English without tech jargon.",
    detail: "Translates complex cyber threat patterns into clear, relatable language anyone can understand.",
  },
  {
    number: "03",
    title: "Assess risk",
    icon: Gauge,
    tagline: "Categorizes threats into transparent risk levels: Low, Caution, High, or Critical.",
    detail: "Calculates an evidence-based score using weighted red flags present in the message.",
  },
  {
    number: "04",
    title: "Guide",
    icon: Compass,
    tagline: "Delivers immediate containment steps tailored to what happened.",
    detail: "Specific guidance if you clicked a link, downloaded an APK, or disclosed any confidential info.",
  },
  {
    number: "05",
    title: "Act safely",
    icon: ShieldCheck,
    tagline: "Empowers swift incident recovery and direct reporting to India's official 1930 helpline.",
    detail: "Coordinates official cybercrime portal reporting, bank freeze steps, and future fraud prevention.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 border-t border-[rgba(96,165,250,0.15)] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141B3D] border border-[rgba(96,165,250,0.3)] text-xs font-semibold text-[#22D3EE] mb-3 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            Workflow & Agent Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How ScamSaathi Works
          </h2>
          <p className="mt-3 text-base text-[#CBD5E1]">
            A 5-step explainable response workflow designed to turn panic into informed, safe action.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div
                key={step.title}
                className="group relative flex flex-col justify-between rounded-2xl bg-[#141B3D] border border-[rgba(96,165,250,0.25)] p-5 hover:border-[#22D3EE] hover:bg-[#1A2350] transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] hover:-translate-y-1"
              >
                <div>
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#22D3EE] px-2 py-0.5 rounded-md bg-[#0B1230] border border-[#22D3EE]/30">
                      Step {step.number}
                    </span>
                    <div className="p-2 rounded-xl bg-[#0B1230] text-[#60A5FA] group-hover:text-[#22D3EE] group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Short Line */}
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium text-[#CBD5E1] leading-snug mb-2">
                    {step.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[rgba(96,165,250,0.15)] text-xs text-[#CBD5E1] leading-relaxed">
                  {step.detail}
                </div>

                {/* Arrow connector indicator for desktop flow */}
                {!isLast && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[rgba(96,165,250,0.4)]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
