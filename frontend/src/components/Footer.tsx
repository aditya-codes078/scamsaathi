import { Shield, Lock, Heart } from "lucide-react";

export default function Footer() {
  function scrollToSection(href: string) {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <footer className="bg-[#0B1230] border-t border-[rgba(96,165,250,0.15)] text-[#CBD5E1] text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[rgba(96,165,250,0.15)]">
          {/* Brand & Mission */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#141B3D] border border-[rgba(96,165,250,0.3)] text-[#22D3EE]">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-white">ScamSaathi</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#141B3D] text-[#22D3EE] border border-[#22D3EE]/30">
                HackIndia 2026
              </span>
            </div>
            <p className="text-xs text-[#CBD5E1] max-w-sm">
              Explainable Hindi/English cyber-safety response agent for fraud detection and guided safe recovery.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-medium text-[#CBD5E1]">
            <button
              type="button"
              onClick={() => scrollToSection("#how-it-works")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              How it works
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("#checker")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Check a message
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("#why-scamsaathi")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Why ScamSaathi
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("#team")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Team
            </button>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#60A5FA] hover:underline"
            >
              cybercrime.gov.in
            </a>
          </div>
        </div>

        {/* Bottom Disclaimer and Hackathon Credential */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Required Footer text from prompt */}
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <span>HackIndia x KIT | Team Build Beyond</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#CBD5E1]">
            <Lock className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Zero-tracking · No personal credentials stored · 100% Client-Safe</span>
          </div>

          <div className="text-[11px] text-[#CBD5E1]/80 flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-[#FB7185] fill-[#FB7185]" />
            <span>for HackIndia x KIT Hackathon 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
