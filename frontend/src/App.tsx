import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import MessageChecker from "./components/MessageChecker";
import WhyScamSaathi from "./components/WhyScamSaathi";
import SafetyBanner from "./components/SafetyBanner";
import Team from "./components/Team";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1230] via-[#10163A] to-[#1B1B4B] text-[#CBD5E1] flex flex-col font-sans selection:bg-[#22D3EE]/30 selection:text-white">
      {/* 1. Sticky Navbar */}
      <Navbar />

      {/* Main Single-Page Sections */}
      <main className="flex-1">
        {/* 2. Hero Section with CSS/SVG Visual and Soft Radial Glow */}
        <Hero />

        {/* 3. How It Works (5 sequential steps) */}
        <HowItWorks />

        {/* 4. Checker (Core feature + What Happened incident recovery) */}
        <MessageChecker />

        {/* 5. Why ScamSaathi (3 core cards) */}
        <WhyScamSaathi />

        {/* 6. Emergency Safety Banner (1930 & cybercrime.gov.in) */}
        <SafetyBanner />

        {/* 7. Team Section (HackIndia x KIT 2026 - Team Build Beyond) */}
        <Team />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}