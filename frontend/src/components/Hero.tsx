import { Shield, ArrowRight, Lock, Sparkles, CheckCircle2 } from "lucide-react";

export default function Hero() {
  function scrollToChecker() {
    const el = document.querySelector("#checker");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32">
      {/* Soft radial cyan and violet glow behind hero */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#22D3EE]/15 via-[#A78BFA]/15 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Hackathon & Category Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141B3D] border border-[rgba(96,165,250,0.3)] text-xs text-[#CBD5E1] shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <span className="flex h-2 w-2 rounded-full bg-[#22D3EE] animate-ping" />
              <span className="font-semibold text-white">HackIndia x KIT 2026</span>
              <span className="text-slate-500">|</span>
              <span className="text-[#60A5FA]">Team Build Beyond</span>
            </div>

            {/* Main Headline with cyan-to-violet gradient highlight word */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              From Suspicion to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#A78BFA]">
                Safe Recovery
              </span>
            </h1>

            {/* One-line subtext required by prompt */}
            <p className="text-lg sm:text-xl text-white font-medium max-w-2xl mx-auto lg:mx-0">
              Explainable Hindi/English cyber-safety response agent
            </p>

            <p className="text-sm sm:text-base text-[#CBD5E1] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Don’t let digital fraudsters panic you. Paste any suspicious WhatsApp offer, fake KYC alert, or job notification to understand the exact evidence and get step-by-step recovery guidance.
            </p>

            {/* Primary Action Button (Blue-to-cyan gradient) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToChecker}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#60A5FA] to-[#22D3EE] hover:from-[#5294ea] hover:to-[#1cb8cf] text-slate-950 font-bold text-base shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
              >
                <span>Check a message</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#141B3D] hover:bg-[#1A2350] border border-[rgba(96,165,250,0.25)] text-white text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(96,165,250,0.15)]"
              >
                <span>How it works</span>
              </a>
            </div>

            {/* Trust points - Updated with Honesty Fix */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[rgba(96,165,250,0.2)] text-xs text-[#CBD5E1]">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Lock className="w-4 h-4 text-[#22D3EE] shrink-0" />
                <span>Never asks for OTP or PIN</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Sparkles className="w-4 h-4 text-[#A78BFA] shrink-0" />
                <span>Hindi & English Breakdown</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" />
                {/* Honesty fix: Changed from "1930 Helpline Aligned" */}
                <span>Guides you to the 1930 helpline</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean SVG Visual with Honesty Fixes */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#60A5FA]/20 via-[#22D3EE]/25 to-[#A78BFA]/20 blur-xl opacity-80" />

              {/* Terminal / Scanner Card */}
              <div className="relative rounded-2xl bg-[#141B3D] border border-[rgba(96,165,250,0.25)] p-5 sm:p-6 shadow-[0_4px_30px_rgba(11,18,48,0.6)]">
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-[rgba(96,165,250,0.2)] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FB7185]" />
                    <span className="w-3 h-3 rounded-full bg-[#FBBF24]" />
                    <span className="w-3 h-3 rounded-full bg-[#4ADE80]" />
                    <span className="ml-2 text-xs font-mono text-[#CBD5E1]">
                      scamsaathi.ai // scanner
                    </span>
                  </div>
                  {/* Honesty Fix: Changed "REAL-TIME" to "DEMO" */}
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#22D3EE] bg-[#0B1230] px-2 py-0.5 rounded border border-[#22D3EE]/40 font-bold">
                    <Shield className="w-3 h-3" />
                    DEMO
                  </span>
                </div>

                {/* Simulated Incoming SMS Bubble with "Example message" caption */}
                <div className="rounded-xl bg-[#0B1230] border border-[rgba(96,165,250,0.2)] p-3.5 mb-4">
                  <div className="flex items-center justify-between text-xs text-[#CBD5E1] mb-1.5">
                    <span className="font-mono text-white">VK-SBIPAY</span>
                    {/* Honesty Fix: Small "Example message" caption */}
                    <span className="text-[10px] text-[#A78BFA] font-medium uppercase tracking-wider">
                      Example message (Illustration)
                    </span>
                  </div>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed font-sans">
                    "Your SBI account has been locked. Update PAN immediately to avoid permanent deactivation: <span className="text-[#60A5FA] underline">bit.ly/sbi-pan-kyc</span>"
                  </p>
                </div>

                {/* Cyber Security Scanner SVG Visual */}
                <div className="relative w-full h-36 bg-[#0B1230]/70 rounded-xl border border-[rgba(96,165,250,0.2)] flex items-center justify-center overflow-hidden mb-4">
                  <svg
                    viewBox="0 0 300 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    aria-hidden="true"
                  >
                    {/* Background Grid Lines */}
                    <path
                      d="M0 30 H300 M0 60 H300 M0 90 H300 M60 0 V120 M120 0 V120 M180 0 V120 M240 0 V120"
                      stroke="#22D3EE"
                      strokeOpacity="0.12"
                      strokeWidth="0.8"
                      strokeDasharray="3 3"
                    />

                    {/* Threat Signal Pulse Line */}
                    <path
                      d="M 10 60 L 50 60 L 70 30 L 85 90 L 105 45 L 120 60 L 170 60 L 190 25 L 205 95 L 225 60 L 290 60"
                      stroke="#22D3EE"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-95"
                    />

                    {/* Radar Target Rings */}
                    <circle cx="150" cy="60" r="45" stroke="#60A5FA" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="4 4" />
                    <circle cx="150" cy="60" r="25" stroke="#22D3EE" strokeWidth="1.5" strokeOpacity="0.8" />
                    <circle cx="150" cy="60" r="4" fill="#22D3EE" />

                    {/* Threat Node Markers */}
                    <g transform="translate(85, 90)">
                      <circle cx="0" cy="0" r="4" fill="#FB7185" />
                      <circle cx="0" cy="0" r="8" stroke="#FB7185" strokeWidth="1" strokeOpacity="0.5" />
                    </g>
                    <g transform="translate(190, 25)">
                      <circle cx="0" cy="0" r="4" fill="#FB923C" />
                      <circle cx="0" cy="0" r="8" stroke="#FB923C" strokeWidth="1" strokeOpacity="0.5" />
                    </g>
                  </svg>

                  {/* Scanning Overlay Text */}
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#CBD5E1]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FB7185] animate-pulse" />
                      Deception Detected
                    </span>
                    <span className="text-[#FB7185] font-bold">Critical Risk</span>
                  </div>
                </div>

                {/* Evidence Extraction Chips */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-[#0B1230] border border-[rgba(96,165,250,0.2)] flex items-center justify-between">
                    <span className="text-[#CBD5E1]">Urgency:</span>
                    <span className="text-[#FB7185] font-semibold">Artificial Panic</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0B1230] border border-[rgba(96,165,250,0.2)] flex items-center justify-between">
                    <span className="text-[#CBD5E1]">Target Link:</span>
                    <span className="text-[#FB923C] font-semibold">Shortened / Fake</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
