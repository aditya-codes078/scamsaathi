import { useState } from "react";
import { Shield, Menu, X, PhoneCall, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "../i18n";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t.navHowItWorks, href: "#how-it-works" },
    { label: t.navCheckMessage, href: "#checker" },
    { label: t.navWhyScamSaathi, href: "#why-scamsaathi" },
    { label: t.navTeam, href: "#team" },
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
                {t.brandTagline}
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
                className="px-3 py-2 text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Action: Language Switch + Helpline 1930 + Dark Mode Toggle + Check Button */}
          <div className="hidden md:flex items-center gap-2.5 font-sans">
            {/* Language Switch: Accessible EN | हिन्दी pill */}
            <div
              className={`flex items-center p-0.5 rounded-xl border ${
                isDark ? "bg-[#141B3D] border-slate-700" : "bg-slate-100/90 border-slate-200"
              }`}
              role="group"
              aria-label={t.navLangAria}
            >
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  lang === "en"
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("hi")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  lang === "hi"
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                aria-pressed={lang === "hi"}
              >
                हिन्दी
              </button>
            </div>

            {/* Theme Toggle Button (React state only) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              title={isDark ? t.navThemeLight : t.navThemeDark}
              aria-label="Toggle bright/dark theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <a
              href="tel:1930"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-[#E11D48] text-xs font-bold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
              title="National Cyber Fraud Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>{t.navHelpline1930}</span>
            </a>

            <a
              href="#checker"
              onClick={(e) => handleNavClick(e, "#checker")}
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-heading font-bold rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              {t.navCheckBtn}
            </a>
          </div>

          {/* Mobile Menu & Language / Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Language Switch */}
            <div
              className={`flex items-center p-0.5 rounded-xl border text-[11px] ${
                isDark ? "bg-[#141B3D] border-slate-700" : "bg-slate-100 border-slate-200"
              }`}
              role="group"
              aria-label={t.navLangAria}
            >
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  lang === "en" ? "bg-[#2563EB] text-white" : "text-slate-600 dark:text-slate-400"
                }`}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("hi")}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${
                  lang === "hi" ? "bg-[#2563EB] text-white" : "text-slate-600 dark:text-slate-400"
                }`}
                aria-pressed={lang === "hi"}
              >
                हिन्दी
              </button>
            </div>

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
              <span>{t.navHelpline1930}</span>
            </a>
            <a
              href="#checker"
              onClick={(e) => handleNavClick(e, "#checker")}
              className="flex items-center justify-center w-full py-3 rounded-xl bg-[#2563EB] text-white text-sm font-bold"
            >
              {t.navCheckBtn}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
