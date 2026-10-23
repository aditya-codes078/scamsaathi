import { Shield, Lock, Heart } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function Footer() {
  const { isDark } = useTheme();

  function scrollToSection(href: string) {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <footer
      className={`border-t py-12 transition-colors ${
        isDark
          ? "bg-[#0B1230] border-slate-800 text-slate-400"
          : "bg-[#FFF9F0] border-amber-900/10 text-slate-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          {/* Brand & Mission */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-[#2563EB] text-white">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                ScamSaathi
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#2563EB]/10 text-[#2563EB]">
                HackIndia 2026
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm font-sans">
              Explainable Hindi/English cyber-safety response agent for fraud detection and guided safe recovery.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold font-sans">
            <button
              type="button"
              onClick={() => scrollToSection("#how-it-works")}
              className="hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              How it works
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("#checker")}
              className="hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              Check a message
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("#why-scamsaathi")}
              className="hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              Why ScamSaathi
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("#team")}
              className="hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              Team
            </button>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] hover:underline"
            >
              cybercrime.gov.in
            </a>
          </div>
        </div>

        {/* Bottom Disclaimer and Hackathon Credential */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left font-sans text-xs">
          {/* Required Footer text */}
          <div className="font-heading font-bold text-slate-900 dark:text-white text-sm">
            HackIndia x KIT | Team Build Beyond
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Lock className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>Zero-tracking · No credentials requested · Client-Safe</span>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-[#E11D48] fill-[#E11D48]" />
            <span>for HackIndia x KIT Hackathon 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
