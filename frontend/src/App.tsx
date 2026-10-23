import { ThemeProvider, useTheme } from "./components/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import MessageChecker from "./components/MessageChecker";
import WhyScamSaathi from "./components/WhyScamSaathi";
import SafetyBanner from "./components/SafetyBanner";
import Team from "./components/Team";
import Footer from "./components/Footer";

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-[#2563EB]/20 selection:text-[#2563EB] ${
        isDark
          ? "bg-gradient-to-b from-[#0B1230] via-[#10163A] to-[#1B1B4B] text-slate-200"
          : "bg-gradient-to-b from-[#FFF9F0] via-[#FAF6F0] to-[#F4F1FF] text-slate-800"
      }`}
    >
      {/* 1. Sticky Navbar with Theme Toggle */}
      <Navbar />

      {/* Main Single-Page Sections */}
      <main className="flex-1">
        {/* 2. Hero Section with Interactive 3D Phone and Floating Popovers */}
        <Hero />

        {/* 3. How It Works (5 sequential 3D Flip cards) */}
        <HowItWorks />

        {/* 4. Checker (Core feature + 3D Risk Dial + Evidence Highlight + Share Card + Screenshot OCR + WhatHappened) */}
        <MessageChecker />

        {/* 5. Why ScamSaathi (3 core cards + Story image slots) */}
        <WhyScamSaathi />

        {/* 6. Emergency Safety Banner (1930 & cybercrime.gov.in) */}
        <SafetyBanner />

        {/* 7. Team Section (Team Build Beyond with photo slots) */}
        <Team />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}