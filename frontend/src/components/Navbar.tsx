import { useState } from "react";
import { Shield, Menu, X, PhoneCall } from "lucide-react";

export default function Navbar() {
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
    <header className="sticky top-0 z-50 w-full bg-[#0B1230]/90 backdrop-blur-md border-b border-[rgba(96,165,250,0.25)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50 rounded-lg p-1"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#60A5FA]/20 via-[#141B3D] to-[#22D3EE]/20 border border-[#22D3EE]/40 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <Shield className="w-5 h-5 text-[#22D3EE]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#4ADE80] rounded-full ring-2 ring-[#0B1230]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                ScamSaathi
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#141B3D] text-[#22D3EE] border border-[#22D3EE]/40">
                  AI Guard
                </span>
              </span>
              <span className="text-[10px] text-[#CBD5E1] -mt-0.5 font-medium">
                Team Build Beyond
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-2 text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-[#141B3D] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:1930"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-[#FB7185]/40 text-[#FB7185] text-xs font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(251,113,133,0.15)]"
              title="National Cyber Financial Fraud Reporting Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>Cyber Helpline 1930</span>
            </a>
            <a
              href="#checker"
              onClick={(e) => handleNavClick(e, "#checker")}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#60A5FA] to-[#22D3EE] hover:from-[#5294ea] hover:to-[#1cb8cf] text-slate-950 transition-all shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] cursor-pointer"
            >
              Check Message
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:1930"
              className="p-2 rounded-lg bg-rose-950/40 text-[#FB7185] border border-[#FB7185]/40"
              aria-label="Call 1930 cyber fraud helpline"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#CBD5E1] hover:text-white hover:bg-[#141B3D] border border-[rgba(96,165,250,0.25)] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[rgba(96,165,250,0.25)] bg-[#0B1230]/98 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#CBD5E1] hover:bg-[#141B3D] hover:text-[#22D3EE] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[rgba(96,165,250,0.2)] space-y-2">
            <a
              href="tel:1930"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-rose-950/60 border border-[#FB7185]/40 text-[#FB7185] text-sm font-semibold"
            >
              <PhoneCall className="w-4 h-4" />
              Call 1930 National Helpline
            </a>
            <a
              href="#checker"
              onClick={(e) => handleNavClick(e, "#checker")}
              className="flex items-center justify-center w-full py-2.5 rounded-xl bg-gradient-to-r from-[#60A5FA] to-[#22D3EE] text-slate-950 font-bold text-sm"
            >
              Check a message now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
