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
import { useTheme } from "./components/ThemeContext";

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
  const { isDark } = useTheme();
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
    <div
      className={`mt-8 rounded-3xl border p-6 sm:p-7 shadow-lg transition-colors ${
        isDark
          ? "bg-[#141B3D] border-slate-700"
          : "bg-white border-amber-900/15 shadow-[0_10px_35px_rgba(0,0,0,0.05)]"
      }`}
    >
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#2563EB]/10 text-[#2563EB] mb-2 font-sans">
            Incident Response Guide
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Kya hua? Aapne kya kiya?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-sans">
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
              className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer select-none text-left ${
                isChecked
                  ? "bg-[#2563EB]/10 border-[#2563EB] ring-2 ring-[#2563EB]/30 shadow-md"
                  : isDark
                  ? "bg-[#0B1230]/70 border-slate-700 hover:border-slate-500 hover:bg-[#0B1230]"
                  : "bg-[#FFFDF9] border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(option.id)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                aria-label={option.label}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      isChecked ? "text-[#2563EB]" : "text-slate-500"
                    }`}
                  />
                  <span className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                    {option.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed font-sans">
                  {option.sublabel}
                </p>
              </div>
            </label>
          );
        })}
      </div>

      {/* Tailored Steps Output */}
      {steps.length > 0 ? (
        <div
          className={`rounded-2xl border p-5 mt-4 ${
            isDark ? "bg-[#0B1230] border-slate-700" : "bg-[#FAF8F5] border-slate-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            {hasHighRiskSelection ? (
              <AlertTriangle className="h-5 w-5 text-[#F59E0B]" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-[#16A34A]" />
            )}
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
              Aapke liye agle surakshit kadam (Tailored Safe Actions)
            </h3>
          </div>

          <ol className="space-y-3 pl-1 font-sans">
            {steps.map((step, idx) => (
              <li
                key={step}
                className={`flex items-start gap-3 text-sm p-3.5 rounded-xl border ${
                  isDark
                    ? "bg-[#141B3D] border-slate-700 text-slate-200"
                    : "bg-white border-slate-200 text-slate-800 shadow-sm"
                }`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-xs font-bold text-white">
                  {idx + 1}
                </span>
                <span className="leading-snug pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          {/* Quick Helplines Box */}
          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
            <span className="font-medium text-slate-600 dark:text-slate-400">
              National Emergency Contacts:
            </span>
            <div className="flex items-center gap-2">
              <a
                href="tel:1930"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E11D48] text-white font-bold transition-colors shadow-sm"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                Call 1930 Helpline
              </a>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border font-bold transition-colors ${
                  isDark
                    ? "bg-[#141B3D] border-slate-700 text-white"
                    : "bg-white border-slate-300 text-slate-800 shadow-sm"
                }`}
              >
                <Globe className="h-3.5 w-3.5 text-[#2563EB]" />
                cybercrime.gov.in
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-4 text-center text-sm text-slate-500 font-sans">
          Upar diye gaye options mein se select karein taaki hum aapko emergency recovery ke kadam dikha sakein.
        </div>
      )}

      {/* Always visible statutory footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-3 font-sans">
        <span>National Cyber Crime Reporting Helpline: 1930</span>
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2563EB] hover:underline inline-flex items-center gap-1 font-semibold"
        >
          cybercrime.gov.in
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}