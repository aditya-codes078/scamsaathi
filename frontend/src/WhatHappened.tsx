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
import { useLanguage } from "./i18n";

interface IncidentOption {
  id: string;
  label: string;
  sublabel: string;
  icon: typeof ExternalLink;
  badge: string;
  steps: string[];
}

export default function WhatHappened() {
  const { isDark } = useTheme();
  const { lang, t } = useLanguage();
  const [selected, setSelected] = useState<string[]>([]);

  const incidentOptionsEn: IncidentOption[] = [
    {
      id: "clicked",
      label: "I clicked on a link",
      sublabel: "Clicked on a suspicious link in SMS, email, or WhatsApp",
      icon: ExternalLink,
      badge: "Browser Exposure",
      steps: [
        "Do not enter any personal info, password, or OTP on that webpage",
        "Immediately close the browser tab and clear your browser cache & cookies",
        "Run a reliable malware/antivirus security scan on your device",
        "If passwords autofilled, immediately reset your bank/email credentials from a safe browser",
      ],
    },
    {
      id: "installed",
      label: "I installed an app",
      sublabel: "Downloaded an APK, AnyDesk, TeamViewer, or unauthorized utility",
      icon: Smartphone,
      badge: "Device Compromise",
      steps: [
        "Immediately switch your phone to Airplane Mode to sever remote access",
        "Uninstall the unauthorized app (APK, AnyDesk, QuickSupport) immediately",
        "Check Accessibility and Device Admin permissions in Settings to revoke rogue rights",
        "Reset your banking and UPI PINs using a separate, safe device",
      ],
    },
    {
      id: "shared",
      label: "I shared OTP or personal info",
      sublabel: "Shared OTP, card numbers, Aadhaar, PAN, or passwords",
      icon: KeyRound,
      badge: "Credential Leak",
      steps: [
        "Immediately call your bank helpline to temporarily freeze netbanking and cards",
        "Reset your UPI PIN across payment apps (GPay, PhonePe, Paytm)",
        "Dial 1930 immediately to register an official cyber incident report",
        "Check for SIM swapping or unauthorized call forwarding by dialing *#21#",
      ],
    },
    {
      id: "paid",
      label: "I sent money",
      sublabel: "Sent money via UPI, QR code, bank transfer, or wallet",
      icon: CreditCard,
      badge: "Financial Loss",
      steps: [
        "First Golden Hour: Call 1930 immediately to trigger rapid transaction freeze",
        "Report the transaction UTR / Reference number to your bank to mark a lien",
        "Lodge a complaint on cybercrime.gov.in with payment proofs & recipient details",
        "Submit an acknowledged copy of the complaint to your local Cyber Crime Police Cell",
      ],
    },
    {
      id: "none",
      label: "I took no action",
      sublabel: "Detected the fraud early and took no action on the message",
      icon: ShieldCheck,
      badge: "Safe Proactive",
      steps: [
        "Great work! Your early vigilance prevented financial and credential harm",
        "Save screenshots of the message and sender number as evidence",
        "Block the fraudulent sender on your phone and messaging apps",
        "Report the suspect communication on the Chakshu portal (sancharsaathi.gov.in)",
      ],
    },
  ];

  const incidentOptionsHi: IncidentOption[] = [
    {
      id: "clicked",
      label: "मैंने लिंक पर क्लिक किया",
      sublabel: "SMS, ईमेल या WhatsApp में संदिग्ध लिंक खोला",
      icon: ExternalLink,
      badge: "ब्राउज़र एक्सपोज़र",
      steps: [
        "उस पेज पर कोई भी जानकारी, पासवर्ड या OTP न डालें",
        "ब्राउज़र टैब तुरंत बंद करें और ब्राउज़र की कैश/कुकीज़ साफ़ करें",
        "अपने फ़ोन/कंप्यूटर में एंटीवायरस सुरक्षा स्कैन चलाएं",
        "यदि बैंकिंग या ईमेल पासवर्ड अपने आप भर गए हों तो तुरंत पासवर्ड बदलें",
      ],
    },
    {
      id: "installed",
      label: "मैंने कोई ऐप इंस्टॉल की",
      sublabel: "कोई APK, AnyDesk, QuickSupport या अनजान ऐप डाउनलोड की",
      icon: Smartphone,
      badge: "डिवाइस समझौता",
      steps: [
        "फ़ोन को तुरंत एयरप्लेन मोड (Airplane Mode) पर डालें ताकि हैकर का रिमोट एक्सेस रुक सके",
        "संदिग्ध ऐप (APK, QuickSupport, AnyDesk आदि) को तुरंत Uninstall करें",
        "Accessibility और Device Admin सेटिंग्स में जाकर अनजान अनुमतियां हटाएं",
        "बैंक और UPI ऐप्स के PIN और पासवर्ड किसी दूसरे सुरक्षित डिवाइस से बदलें",
      ],
    },
    {
      id: "shared",
      label: "मैंने OTP या निजी जानकारी शेयर की",
      sublabel: "OTP, कार्ड नंबर, आधार, पैन या पासवर्ड बता दिया",
      icon: KeyRound,
      badge: "क्रेडेंशियल लीक",
      steps: [
        "तुरंत अपने बैंक की हेल्पलाइन पर कॉल करें और डेबिट/क्रेडिट कार्ड व नेटबैंकिंग अस्थायी रूप से ब्लॉक करवाएं",
        "UPI ऐप्स (GPay, PhonePe, Paytm) के UPI PIN तुरंत रीसेट करें",
        "राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर तुरंत कॉल करके घटना दर्ज कराएं",
        "सिम स्वैप या कॉल फॉरवर्डिंग जांचने के लिए *#21# डायल करके स्थिति देखें",
      ],
    },
    {
      id: "paid",
      label: "मैंने पैसे भेजे",
      sublabel: "UPI, QR कोड, बैंक ट्रांसफर या वॉलेट से पैसे ट्रांसफर किए",
      icon: CreditCard,
      badge: "वित्तीय नुकसान",
      steps: [
        "पहला गोल्डन ऑवर: तुरंत 1930 पर कॉल करें! जितनी जल्दी कॉल करेंगे, पैसे फ्रीज होने की संभावना उतनी अधिक होगी",
        "अपने बैंक को ट्रांजेक्शन UTR / संदर्भ संख्या के साथ सूचित करें ताकि लियन (Lien) मार्क किया जा सके",
        "cybercrime.gov.in पोर्टल पर पेमेंट स्क्रीनशॉट और प्राप्तकर्ता विवरण के साथ शिकायत दर्ज करें",
        "नज़दीकी पुलिस स्टेशन के साइबर सेल में जाकर शिकायत की प्रति जमा करें",
      ],
    },
    {
      id: "none",
      label: "मैंने कुछ नहीं किया",
      sublabel: "धोखाधड़ी समय पर पहचान ली और कोई कदम नहीं उठाया",
      icon: ShieldCheck,
      badge: "सतर्क सुरक्षा",
      steps: [
        "बहुत बढ़िया! आपने सतर्क रहकर धोखाधड़ी को विफल कर दिया",
        "संदेश का स्क्रीनशॉट और भेजने वाले का नंबर सबूत के तौर पर सहेज लें",
        "भेजने वाले का नंबर अपने फ़ोन और WhatsApp पर ब्लॉक करें",
        "चक्षु पोर्टल (sancharsaathi.gov.in) पर संदिग्ध धोखाधड़ी संचार की रिपोर्ट करें",
      ],
    },
  ];

  const currentOptions = lang === "hi" ? incidentOptionsHi : incidentOptionsEn;

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
      currentOptions
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
            {t.whatTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-sans">
            {t.whatSubtitle}
          </p>
        </div>
      </div>

      {/* Interactive Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6" role="group" aria-label="Incident response options">
        {currentOptions.map((option) => {
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
              {t.whatTailoredTitle}
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
              {t.whatEmergencyTitle}
            </span>
            <div className="flex items-center gap-2">
              <a
                href="tel:1930"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E11D48] text-white font-bold transition-colors shadow-sm"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                {t.btnCall1930}
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
                {t.portalLink}
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-4 text-center text-sm text-slate-500 font-sans">
          {t.whatSelectPrompt}
        </div>
      )}

      {/* Always visible statutory footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-3 font-sans">
        <span>{t.whatStatutoryHelpline}</span>
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2563EB] hover:underline inline-flex items-center gap-1 font-semibold"
        >
          {t.portalLink}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
