import type { AnalysisResult, RiskLevel } from "./types";

/**
 * API MODE
 * USE_MOCK = false -> calls the FastAPI backend (VITE_API_URL when deployed, http://localhost:8000 in dev).
 * USE_MOCK = true  -> uses the offline rule-based analyzer below (no backend needed).
 */
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
export const USE_MOCK = false;

interface DetectedSignal {
  name: string;
  weight: number;
}

export const HINDI_SIGNAL_LABELS: Record<string, string> = {
  "Urgency / Immediate pressure tactics": "तात्कालिकता / जल्दबाज़ी का दबाव",
  "Request for OTP, PIN, CVV, or confidential password": "OTP, PIN या गोपनीय पासवर्ड की मांग",
  "Fake KYC or account suspension threat": "फर्जी KYC या खाता बंद करने की धमकी",
  "Upfront payment / registration fee demand": "अग्रिम भुगतान या रजिस्ट्रेशन फीस की मांग",
  "Prize, lottery, or unrealistic reward lure": "लॉटरी या फर्जी ईनाम का लालच",
  "Job or internship offer bait": "फर्जी नौकरी या इंटर्नशिप का झांसा",
  "Authority impersonation / Arrest threat": "पुलिस या अधिकारी बनकर डिजिटल अरेस्ट की धमकी",
  "Coercive secrecy / Isolation demand": "बात छुपाने या किसी को न बताने का दबाव",
  "Suspicious shortened link or high-risk domain": "संदिग्ध छोटा लिंक या खतरनाक डोमेन",
};

export const ENGLISH_SIGNAL_LABELS: Record<string, string> = {
  "Urgency / Immediate pressure tactics": "Urgency / Immediate pressure tactics",
  "Request for OTP, PIN, CVV, or confidential password": "Request for OTP, PIN, CVV, or confidential password",
  "Fake KYC or account suspension threat": "Fake KYC or account suspension threat",
  "Upfront payment / registration fee demand": "Upfront payment / registration fee demand",
  "Prize, lottery, or unrealistic reward lure": "Prize, lottery, or unrealistic reward lure",
  "Job or internship offer bait": "Job or internship offer bait",
  "Authority impersonation / Arrest threat": "Authority impersonation / Arrest threat",
  "Coercive secrecy / Isolation demand": "Coercive secrecy / Isolation demand",
  "Suspicious shortened link or high-risk domain": "Suspicious shortened link or high-risk domain",
};

/**
 * Checks whether an OTP mention is actually a safety warning (e.g. "do not share your OTP")
 * so legitimate bank warnings are not falsely flagged as credential requests.
 */
function isOtpSafetyWarning(text: string): boolean {
  const safetyPatterns = [
    /(do not|don't|never|kisi ko (bhi )?(mat|na)|na)\s+(share|give|tell|disclose|bhejo|bhejein|batayein).*?(otp|pin|cvv|password)/i,
    /(otp|pin|cvv|password).*?(kisi ko (bhi )?(mat|na)|na\s+karein|never\s+share|share\s+na\s+karein|confidential)/i,
    /bank\s+(never|kabhi\s+bhi)\s+asks?\s+for\s+(otp|pin|password)/i,
  ];
  return safetyPatterns.some((pattern) => pattern.test(text));
}

/**
 * Rule-based analyzer mirroring what an intelligent cyber-safety backend would do.
 * Extracts signals exclusively from evidence actually present in the text (English, Hindi, Hinglish).
 * Supports English and Hindi response outputs.
 */
export function runRuleBasedAnalyzer(text: string, lang: string = "en"): AnalysisResult {
  const clean = text.trim();
  const isHi = lang === "hi";

  // Greetings, empty, or short harmless messages must always return Low with no signals
  if (!clean) {
    return {
      risk_level: "Low",
      signals: [],
      signal_labels: isHi ? HINDI_SIGNAL_LABELS : ENGLISH_SIGNAL_LABELS,
      explanation: isHi
        ? "कोई संदेश टेक्स्ट नहीं मिला। कृपया जांचने के लिए टेक्स्ट पेस्ट करें।"
        : "No suspicious message text provided. Please paste message content to analyze.",
      safe_actions: [isHi ? "किसी कार्रवाई की आवश्यकता नहीं है।" : "No action required."],
    };
  }

  const detected: DetectedSignal[] = [];

  // 1. Urgency / Pressure tactics (Weight: 2)
  const urgencyPattern =
    /\b(urgent|urgently|immediately|immediate|expires|expiring|expire|deadline|within \d+\s*(hours?|mins?|minutes?|hrs?)|turant|jaldi|abhi|aaj hi|samay seema|aaj raat tak)\b/i;
  if (urgencyPattern.test(clean)) {
    detected.push({
      name: "Urgency / Immediate pressure tactics",
      weight: 2,
    });
  }

  // 2. OTP / PIN / CVV / Password Request (Weight: 6 - High impact)
  const hasOtpKeywords = /\b(otp|one time password|pin|cvv|password|passcode)\b/i.test(clean);
  if (hasOtpKeywords && !isOtpSafetyWarning(clean)) {
    const isRequesting =
      /\b(share|send|enter|provide|tell|submit|verify|bhejo|bhejein|daalein|batayein)\b.*?\b(otp|one time password|pin|cvv|password|passcode)\b/i.test(
        clean
      ) ||
      /\b(otp|one time password|pin|cvv|password)\b.*?\b(share|send|enter|provide|tell|bhejo|bhejein|daalein|batayein|verify|required)\b/i.test(
        clean
      ) ||
      /\b(enter your otp|share your otp|send your otp|give your otp|verify with otp)\b/i.test(clean);

    if (isRequesting) {
      detected.push({
        name: "Request for OTP, PIN, CVV, or confidential password",
        weight: 6,
      });
    }
  }

  // 3. Fake KYC or Bank Threat (Weight: 4)
  const kycPattern =
    /\b(kyc|pan card|pan update|aadhaar link|biometric update)\b/i.test(clean) ||
    /\b(account|khata|sim|card|connection)\b.*?\b(blocked|block|suspended|suspend|deactivated|closed|frozen|locked|band)\b/i.test(
      clean
    ) ||
    /\b(blocked|block|suspended|suspend|frozen|band).*?\b(account|khata|sim|card|connection)\b/i.test(clean) ||
    /\b(sbi yono|yono|electricity bill).*?\b(blocked|cut|disconnected|update|pending)\b/i.test(clean) ||
    /\b(electricity (will be|connection will be)? (disconnected|cut off|power off))\b/i.test(clean);

  if (kycPattern) {
    detected.push({
      name: "Fake KYC or account suspension threat",
      weight: 4,
    });
  }

  // 4. Payment Demand / Processing fee (Weight: 3)
  const paymentPattern =
    /\b(registration fee|processing fee|verification fee|security deposit|refundable fee|activation charge|courier charge|delivery charge)\b/i.test(
      clean
    ) ||
    /\b(pay|send|transfer|deposit|bhejo|bhejein)\b.*?(rs\.?|inr|₹|\d+\s*rupees)/i.test(clean) ||
    /\b(pay|send|transfer).*?\b(via upi|scanner|qr code|gpay|phonepe|paytm)\b/i.test(clean) ||
    /\b(refund|cashback).*?(claim|receive|ke liye)\b.*?(pay|fee|charge|transfer)/i.test(clean);

  if (paymentPattern) {
    detected.push({
      name: "Upfront payment / registration fee demand",
      weight: 3,
    });
  }

  // 5. Prize or Lottery Lure (Weight: 3)
  const prizePattern =
    /\b(won|winner|winning|selected for|jeeta|lottery)\b.*?\b(prize|lottery|lucky draw|crore|lakh|cash reward|kbc|gift voucher|car)\b/i.test(
      clean
    ) || /\b(claim your (prize|reward|gift|lottery))\b/i.test(clean);

  if (prizePattern) {
    detected.push({
      name: "Prize, lottery, or unrealistic reward lure",
      weight: 3,
    });
  }

  // 6. Job / Internship Bait (Weight: 2)
  const jobPattern =
    /\b(remote internship|internship offer|part[- ]time job|wfh job|work from home job|data entry job|earn money online|earn \d+ daily|daily income)\b/i.test(
      clean
    ) ||
    /\b(selected for (remote )?(internship|job|role))\b/i.test(clean) ||
    /\b(stipend:?\s*(₹|rs\.?|inr))\b/i.test(clean);

  if (jobPattern) {
    detected.push({
      name: "Job or internship offer bait",
      weight: 2,
    });
  }

  // 7. Authority Threat (Weight: 6 - High impact)
  const authorityPattern =
    /\b(police|cbi|crime branch|customs|enforcement directorate|ed department|interpol|narcotics|ncb)\b/i.test(
      clean
    ) ||
    /\b(digital arrest|under arrest|arrest warrant|court notice|legal action|fir filed|non-bailable warrant|police complaint)\b/i.test(
      clean
    ) ||
    /\b(jail|chalaan|penal code|ipc section)\b/i.test(clean);

  if (authorityPattern) {
    detected.push({
      name: "Authority impersonation / Arrest threat",
      weight: 6,
    });
  }

  // 8. Secrecy / Isolation Demand (Weight: 3)
  const secrecyPattern =
    /\b(don't tell anyone|do not tell anyone|kisi ko (bhi )?(mat|na) batana|keep this secret|keep it secret|strictly confidential|confidential call|do not inform family|stay in room)\b/i.test(
      clean
    );

  if (secrecyPattern) {
    detected.push({
      name: "Coercive secrecy / Isolation demand",
      weight: 3,
    });
  }

  // 9. Suspicious Links / Shorteners (Weight: 3)
  const linkPattern =
    /\b(bit\.ly|tinyurl\.com|cutt\.ly|t\.co|rb\.gy|shorturl\.at|is\.gd|tiny\.cc)\b/i.test(clean) ||
    /https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/i.test(clean) ||
    /https?:\/\/[^\s/$.?#].[^\s]*\.(xyz|top|click|club|buzz|loan|work|gq|cf|tk|ml)\b/i.test(clean) ||
    /\b[a-zA-Z0-9-]+\.(xyz|top|click|club|buzz|loan|gq|cf|tk|ml)\b/i.test(clean);

  if (linkPattern) {
    detected.push({
      name: "Suspicious shortened link or high-risk domain",
      weight: 3,
    });
  }

  // If no signals detected at all: return Low with empty signals array
  if (detected.length === 0) {
    return {
      risk_level: "Low",
      signals: [],
      signal_labels: isHi ? HINDI_SIGNAL_LABELS : ENGLISH_SIGNAL_LABELS,
      explanation: isHi
        ? "कोई बड़ा खतरा नहीं मिला, पर फिर भी सावधान रहें। इस संदेश में कोई ज्ञात फिशिंग, क्रेडेंशियल चोरी या वित्तीय धोखाधड़ी के पैटर्न नहीं मिले हैं।"
        : "No major red flags found, but remain cautious. No known phishing, credential harvesting, or financial fraud patterns were detected in this message.",
      safe_actions: isHi
        ? [
            "किसी आपातकालीन कदम या रिपोर्टिंग की आवश्यकता नहीं है।",
            "अपरिचित व्यक्ति से बातचीत करते समय बिना आधिकारिक पुष्टि व्यक्तिगत जानकारी साझा न करें।",
          ]
        : [
            "No emergency containment or reporting required.",
            "Never share personal or banking details with unverified contacts.",
          ],
    };
  }

  // Calculate cumulative score from verified evidence
  const totalScore = detected.reduce((acc, curr) => acc + curr.weight, 0);

  // Score mapping: 0 to 1 = Low, 2 to 3 = Caution, 4 to 9 = High, 10+ = Critical
  let risk_level: RiskLevel = "Low";
  if (totalScore >= 10) {
    risk_level = "Critical";
  } else if (totalScore >= 4) {
    risk_level = "High";
  } else if (totalScore >= 2) {
    risk_level = "Caution";
  } else {
    risk_level = "Low";
  }

  const signalNames = detected.map((s) => s.name);

  // Generate contextual explanation matching the detected evidence
  const explanationParts: string[] = [];

  if (isHi) {
    if (detected.some((s) => s.name.includes("OTP"))) {
      explanationParts.push(
        "संदेश में गोपनीय क्रेडेंशियल्स (OTP/PIN/पासवर्ड) साझा करने की मांग की गई है। बैंक या वैध संस्थाएं कभी भी ऐसे क्रेडेंशियल्स SMS या कॉल पर नहीं मांगतीं।"
      );
    }
    if (detected.some((s) => s.name.includes("Arrest"))) {
      explanationParts.push(
        "पुलिस, CBI या कस्टम्स बनकर 'डिजिटल अरेस्ट' या FIR की धमकी दी जा रही है। असली जांच एजेंसियां कभी WhatsApp या वीडियो कॉल पर अरेस्ट नहीं करतीं।"
      );
    }
    if (detected.some((s) => s.name.includes("KYC"))) {
      explanationParts.push(
        "बैंक खाता या कनेक्शन ब्लॉक होने का झूठा डर दिखाया गया है ताकि आप घबराहट में बिना सोचे कदम उठाएं।"
      );
    }
    if (detected.some((s) => s.name.includes("payment"))) {
      explanationParts.push(
        "एडवांस रजिस्ट्रेशन फीस या प्रोसेसिंग चार्ज मांगना जॉब और सर्विस स्कैम्स का मुख्य लक्षण है।"
      );
    }
    if (detected.some((s) => s.name.includes("shortened link"))) {
      explanationParts.push(
        "संदिग्ध छोटे लिंक (जैसे bit.ly) का इस्तेमाल वास्तविक दुर्भावनापूर्ण वेबसाइट को छुपाने के लिए किया गया है।"
      );
    }
    if (explanationParts.length === 0) {
      explanationParts.push(
        "संदेश में मनोवैज्ञानिक दबाव और अनजान स्रोत से तुरंत कार्रवाई करने की बात कही गई है।"
      );
    }
  } else {
    if (detected.some((s) => s.name.includes("OTP"))) {
      explanationParts.push(
        "The message attempts to harvest confidential credentials (OTP/PIN/Password). Banks and legitimate services never request these over SMS or calls."
      );
    }
    if (detected.some((s) => s.name.includes("Arrest"))) {
      explanationParts.push(
        "The sender impersonates police, CBI, or customs with threats of 'digital arrest' or legal action. Law enforcement agencies never arrest citizens over video calls."
      );
    }
    if (detected.some((s) => s.name.includes("KYC"))) {
      explanationParts.push(
        "A false threat of bank account or service suspension is used to induce panic and force hasty action."
      );
    }
    if (detected.some((s) => s.name.includes("payment"))) {
      explanationParts.push(
        "Demanding upfront registration or verification fees is a classic employment and service fraud tactic."
      );
    }
    if (detected.some((s) => s.name.includes("shortened link"))) {
      explanationParts.push(
        "A shortened or suspicious link (e.g. bit.ly) is used to obscure the actual malicious website."
      );
    }
    if (explanationParts.length === 0) {
      explanationParts.push(
        "The message exerts psychological urgency and prompts unverified action from an unfamiliar source."
      );
    }
  }

  const explanation = explanationParts.join(" ");

  // Contextual safe actions based on detected signals
  const safe_actions: string[] = [];
  if (isHi) {
    if (detected.some((s) => s.name.includes("OTP"))) {
      safe_actions.push("अपना OTP, PIN या नेटबैंकिंग पासवर्ड किसी के साथ साझा न करें।");
    }
    if (detected.some((s) => s.name.includes("link"))) {
      safe_actions.push("संदेश में दिए गए लिंक पर बिल्कुल क्लिक न करें।");
    }
    if (detected.some((s) => s.name.includes("payment"))) {
      safe_actions.push("किसी भी अनजान UPI ID या QR कोड पर पैसे ट्रांसफर न करें।");
    }
    if (detected.some((s) => s.name.includes("KYC"))) {
      safe_actions.push("बैंक की आधिकारिक ऐप या शाखा में जाकर अपने खाते की स्थिति जांचें।");
    }
    if (detected.some((s) => s.name.includes("Arrest"))) {
      safe_actions.push("घबराएं नहीं; तुरंत कॉल काटें और नजदीकी पुलिस स्टेशन या 1930 पर संपर्क करें।");
    }
    safe_actions.push("संदेह होने पर राष्ट्रीय साइबर हेल्पलाइन 1930 पर कॉल करें।");
  } else {
    if (detected.some((s) => s.name.includes("OTP"))) {
      safe_actions.push("Never disclose your OTP, PIN, CVV, or passwords to anyone.");
    }
    if (detected.some((s) => s.name.includes("link"))) {
      safe_actions.push("Do not click on links provided in unverified messages.");
    }
    if (detected.some((s) => s.name.includes("payment"))) {
      safe_actions.push("Do not transfer money to unfamiliar UPI IDs, scanners, or accounts.");
    }
    if (detected.some((s) => s.name.includes("KYC"))) {
      safe_actions.push("Verify your account status directly via official banking apps or branch visits.");
    }
    if (detected.some((s) => s.name.includes("Arrest"))) {
      safe_actions.push("Stay calm; hang up immediately and report to local police or the 1930 helpline.");
    }
    safe_actions.push("In case of doubt, report suspected cyber fraud to National Helpline 1930.");
  }

  return {
    risk_level,
    signals: signalNames,
    signal_labels: isHi ? HINDI_SIGNAL_LABELS : ENGLISH_SIGNAL_LABELS,
    explanation,
    safe_actions,
  };
}

/**
 * Analyzes incoming message text via the backend API (or the offline analyzer in mock mode).
 * Contract:
 * POST {API_URL}/analyze
 * Request: { "text": string, "lang": string }
 * Response: { "risk_level": "Low" | "Caution" | "High" | "Critical", "signals": string[], "explanation": string, "safe_actions": string[], "signal_labels"?: Record<string, string> }
 */
export async function analyze(text: string, lang: string = "en"): Promise<AnalysisResult> {
  if (USE_MOCK) {
    // Simulate realistic processing delay for smooth UI transition
    await new Promise((r) => setTimeout(r, 600));
    return runRuleBasedAnalyzer(text, lang);
  }

  // Production/Dev API connection (VITE_API_URL on deploy, localhost:8000 in dev)
  let res: Response;
  try {
    res = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, lang }),
    });
  } catch {
    // Backend unreachable (offline or server asleep): fall back to the local rules
    return runRuleBasedAnalyzer(text, lang);
  }

  if (!res.ok) {
    throw new Error(`Server returned error code ${res.status}`);
  }

  const data = await res.json();

  // Validate response contract
  if (
    !data ||
    typeof data.risk_level !== "string" ||
    !Array.isArray(data.signals) ||
    typeof data.explanation !== "string" ||
    !Array.isArray(data.safe_actions)
  ) {
    throw new Error("Invalid response format from server");
  }

  return data as AnalysisResult;
}
