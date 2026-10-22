import { useState } from "react";
import {
  ExternalLink,
  Smartphone,
  KeyRound,
  CreditCard,
  ShieldCheck,
  PhoneCall,
  Globe,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface IncidentOption {
  id: string;
  label: string;
  sublabel: string;
  icon: typeof ExternalLink;
  badge: string;
  steps: string[];
}

const incidentOptions: IncidentOption[] = [
  {
    id: "clicked",
    label: "Maine link par click kiya",
    sublabel: "Clicked on a suspicious link in SMS, email, or WhatsApp",
    icon: ExternalLink,
    badge: "Browser Exposure",
    steps: [
      "Us page par koi jaankari, password ya OTP na daalein",
      "Browser tab turant band karein aur browser cache/cookies clear karein",
      "Phone/computer mein reliable antivirus security scan chalayein",
      "Agar banking ya email credentials autofill hue hon toh turant password badal lein",
    ],
  },
  {
    id: "installed",
    label: "Maine koi app install ki",
    sublabel: "Downloaded an APK, AnyDesk, TeamViewer, or unauthorized utility",
    icon: Smartphone,
    badge: "Device Compromise",
    steps: [
      "Phone ko turant Airplane Mode par daalein taaki hacker ka remote access ruk jaye",
      "Unknown app (APK, QuickSupport, AnyDesk wagaira) ko turant Uninstall karein",
      "Accessibility aur Device Admin settings check karein aur unauthorized permissions revoke karein",
      "Bank aur UPI apps ke PIN aur passwords doosre safe device se badal lein",
    ],
  },
  {
    id: "shared",
    label: "Maine OTP ya personal jaankari share ki",
    sublabel: "Shared OTP, card numbers, Aadhaar, PAN, or passwords",
    icon: KeyRound,
    badge: "Credential Leak",
    steps: [
      "Turant apne bank helpline ko call karein aur debit/credit card ya netbanking temporary block karwayein",
      "UPI applications (GPay, PhonePe, Paytm) ke UPI PIN turant reset karein",
      "National Cyber Fraud Helpline 1930 par turant call karke incident report karein",
      "Sim swap ya call forwarding check karein (*#21# dial karke status dekhein)",
    ],
  },
  {
    id: "paid",
    label: "Maine paisa bheja",
    sublabel: "Sent money via UPI, QR code, bank transfer, or wallet",
    icon: CreditCard,
    badge: "Financial Loss",
    steps: [
      "Pehla Golden Hour: Turant 1930 par call karein! Jitni jaldi call karenge, paise freeze hone ke chances utne high honge",
      "Apne bank ko transaction UTR / Reference number ke saath inform karein taaki lien mark kiya ja sake",
      "cybercrime.gov.in portal par complaint darj karein (payment screenshots aur recipient details ke saath)",
      "Local police station ke Cyber Cell mein jaakar complaint copy submit karein",
    ],
  },
  {
    id: "none",
    label: "Maine kuch nahi kiya",
    sublabel: "Detected the fraud early and took no action on the message",
    icon: ShieldCheck,
    badge: "Safe Proactive",
    steps: [
      "Bahut achha! Aapne alert rehkar fraud ko rok liya",
      "Message ka screenshot aur sender number save kar lein evidence ke roop mein",
      "Sender number ko apne phone aur WhatsApp par block karein",
      "Chakshu portal (sancharsaathi.gov.in) par suspected fraud communication report karein",
    ],
  },
];

export default function WhatHappened() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((prev) => {
      if (id === "none") {
        return prev.includes("none") ? [] : ["none"];
      }
      // If choosing an active incident, deselect "none"
      const withoutNone = prev.filter((x) => x !== "none");
      if (withoutNone.includes(id)) {
        return withoutNone.filter((x) => x !== id);
      } else {
        return [...withoutNone, id];
      }
    });
  }

  // Aggregate steps across all selected checkboxes without duplicate steps
  const steps = Array.from(
    new Set(
      incidentOptions
        .filter((o) => selected.includes(o.id))
        .flatMap((o) => o.steps)
    )
  );

  const hasHighRiskSelection = selected.some((id) =>
    ["shared", "paid", "installed"].includes(id)
  );

  return (
    <div className="mt-8 rounded-2xl bg-[#141B3D] border border-[rgba(96,165,250,0.25)] p-6 sm:p-7 shadow-[0_4px_30px_rgba(11,18,48,0.5)]">
      <div className="flex items-start justify-between gap-4 border-b border-[rgba(96,165,250,0.2)] pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#0B1230] text-[#22D3EE] border border-[#22D3EE]/30 mb-2">
            Incident Response Guide
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Kya hua? Aapne kya kiya?
          </h2>
          <p className="text-sm text-[#CBD5E1] mt-1">
            Agar aapne is message par koi action liya hai, toh select karein. Hum aapko turant containment steps batayenge.
          </p>
        </div>
      </div>

      {/* Interactive Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6" role="group" aria-label="Incident response options">
        {incidentOptions.map((option) => {
          const isChecked = selected.includes(option.id);
          const Icon = option.icon;

          return (
            <label
              key={option.id}
              className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer select-none text-left ${
                isChecked
                  ? "bg-[#1A2350] border-[#22D3EE] shadow-[0_0_20px_rgba(34,211,238,0.15)] ring-1 ring-[#22D3EE]/40"
                  : "bg-[#0B1230]/70 border-[rgba(96,165,250,0.2)] hover:border-[rgba(96,165,250,0.4)] hover:bg-[#0B1230]"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(option.id)}
                className="mt-1 h-4 w-4 rounded border-[rgba(96,165,250,0.4)] bg-[#0B1230] text-[#22D3EE] focus:ring-[#22D3EE] focus:ring-offset-[#141B3D]"
                aria-label={option.label}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      isChecked ? "text-[#22D3EE]" : "text-[#60A5FA]"
                    }`}
                  />
                  <span className="font-semibold text-sm text-white">
                    {option.label}
                  </span>
                </div>
                <p className="text-xs text-[#CBD5E1] mt-0.5 leading-relaxed font-sans">
                  {option.sublabel}
                </p>
              </div>
            </label>
          );
        })}
      </div>

      {/* Tailored Steps Output */}
      {steps.length > 0 ? (
        <div className="rounded-xl bg-[#0B1230] border border-[rgba(96,165,250,0.25)] p-5 mt-4">
          <div className="flex items-center gap-2 mb-4">
            {hasHighRiskSelection ? (
              <AlertTriangle className="h-5 w-5 text-[#FBBF24]" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-[#4ADE80]" />
            )}
            <h3 className="font-bold text-base text-white">
              Aapke liye agle surakshit kadam (Tailored Safe Actions)
            </h3>
          </div>

          <ol className="space-y-3 pl-1">
            {steps.map((step, idx) => (
              <li
                key={step}
                className="flex items-start gap-3 text-sm text-[#CBD5E1] bg-[#141B3D]/80 p-3.5 rounded-lg border border-[rgba(96,165,250,0.2)]"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0B1230] text-xs font-bold text-[#22D3EE] border border-[#22D3EE]/40">
                  {idx + 1}
                </span>
                <span className="leading-snug pt-0.5 text-[#CBD5E1]">{step}</span>
              </li>
            ))}
          </ol>

          {/* Quick Helplines Box */}
          <div className="mt-5 pt-4 border-t border-[rgba(96,165,250,0.2)] flex flex-wrap items-center justify-between gap-3 text-xs text-[#CBD5E1]">
            <span className="font-medium text-[#CBD5E1]">
              National Emergency Contacts:
            </span>
            <div className="flex items-center gap-2">
              <a
                href="tel:1930"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-[#FB7185]/40 text-[#FB7185] font-semibold transition-colors shadow-[0_0_15px_rgba(251,113,133,0.15)]"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                Call 1930 Helpline
              </a>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141B3D] hover:bg-[#1A2350] border border-[rgba(96,165,250,0.3)] text-white font-medium transition-colors"
              >
                <Globe className="h-3.5 w-3.5 text-[#22D3EE]" />
                cybercrime.gov.in
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[rgba(96,165,250,0.25)] p-4 text-center text-sm text-[#CBD5E1]">
          Upar diye gaye options mein se select karein taaki hum aapko emergency recovery ke kadam dikha sakein.
        </div>
      )}

      {/* Always visible statutory footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-[#CBD5E1] border-t border-[rgba(96,165,250,0.15)] pt-3">
        <span>National Cyber Crime Reporting Helpline: 1930</span>
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#60A5FA] hover:underline inline-flex items-center gap-1 font-medium"
        >
          cybercrime.gov.in
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}