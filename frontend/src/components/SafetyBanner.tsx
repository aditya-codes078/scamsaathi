import { PhoneCall, Globe, ShieldAlert, ArrowUpRight } from "lucide-react";

export default function SafetyBanner() {
  return (
    <section className="py-10 border-t border-b border-[rgba(96,165,250,0.15)]" aria-label="National Cyber Fraud Helplines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-950/40 via-[#141B3D] to-cyan-950/40 border border-[rgba(96,165,250,0.25)] p-6 sm:p-8 shadow-[0_4px_30px_rgba(11,18,48,0.5)]">
          {/* Subtle glow accent */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-[#FB7185]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Banner Left: Text & Badges */}
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex p-3 rounded-xl bg-[#0B1230] border border-[#FB7185]/40 text-[#FB7185] shrink-0 shadow-[0_0_15px_rgba(251,113,133,0.15)]">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0B1230] text-[#FB7185] border border-[#FB7185]/30 text-[11px] font-bold uppercase tracking-wider mb-2">
                  Emergency National Citizen Advisory
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  In India, report financial cyber fraud: call <span className="text-[#FB7185] font-extrabold">1930</span> or visit <span className="text-[#22D3EE] font-extrabold">cybercrime.gov.in</span>
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#CBD5E1] max-w-2xl leading-relaxed font-sans">
                  Act within the <strong className="text-white">Golden Hour</strong>. Immediate reporting to the National Cyber Crime Helpline (1930) gives banks the critical window to freeze transacted amounts before scammers siphon funds.
                </p>
              </div>
            </div>

            {/* Banner Right: Call and Web Actions */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href="tel:1930"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-[#FB7185] hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm shadow-[0_0_20px_rgba(251,113,133,0.3)] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FB7185]"
              >
                <PhoneCall className="w-4 h-4 animate-pulse" />
                <span>Call 1930 Helpline</span>
              </a>

              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-[#0B1230] hover:bg-[#1A2350] border border-[rgba(96,165,250,0.3)] text-white font-semibold text-sm transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
              >
                <Globe className="w-4 h-4 text-[#22D3EE]" />
                <span>cybercrime.gov.in</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#CBD5E1]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
