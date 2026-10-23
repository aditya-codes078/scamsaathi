import { useState } from "react";
import { Shield, Menu, X, PhoneCall, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Check a message", href: "#checker" },
    { label: "Why ScamSaathi", href: "#why-scamsaathi" },
    { label: "Team", href: "#team" },
  ];

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors ${
        isDark
          ? "bg-[#0B1230]/90 border-slate-800 text-white"
          : "bg-[#FFF9F0]/90 border-amber-900/10 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with hand-crafted styling (no generic template AI badges) */}
          <a
            href="#"
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB] rounded-xl p-1"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#2563EB] text-white shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                ScamSaathi
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium font-sans">
                Cyber-Safety Response Agent
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 font-sans" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Action: Helpline 1930 + Dark Mode Toggle + Check Button */}
          <div className="hidden md:flex items-center gap-3 font-sans">
            {/* Theme Toggle Button (React state only) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={isDark ? "Switch to Bright Mode" : "Switch to Dark Mode"}
              aria-label="Toggle bright/dark theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <a
              href="tel:1930"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-[#E11D48] text-xs font-bold transition-all shadow-sm"
              title="National Cyber Fraud Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>Helpline 1930</span>
            </a>

            <a
              href="#checker"
              onClick={(e) => handleNavClick(e, "#checker")}
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-heading font-bold rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all shadow-md cursor-pointer"
            >
              Check Message
            </a>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href="tel:1930"
              className="p-2 rounded-xl bg-rose-100 text-[#E11D48] border border-rose-200"
              aria-label="Call 1930"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-4 pt-2 pb-6 space-y-2 ${
            isDark ? "bg-[#0B1230] border-slate-800" : "bg-[#FFF9F0] border-amber-900/10"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-[#2563EB]/10 hover:text-[#2563EB] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <a
              href="tel:1930"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-rose-50 text-[#E11D48] border border-rose-200 text-sm font-bold"
            >
              <PhoneCall className="w-4 h-4" />
              Call 1930 National Helpline
            </a>
            <a
              href="#checker"
              onClick={(e) => handleNavClick(e, "#checker")}
              className="flex items-center justify-center w-full py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-sm"
            >
              Check a message now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
