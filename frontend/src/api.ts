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
 */
export function runRuleBasedAnalyzer(text: string): AnalysisResult {
  const clean = text.trim();

  // Greetings, empty, or short harmless messages must always return Low with no signals
  if (!clean) {
    return {
      risk_level: "Low",
      signals: [],
      explanation: "Koi sandeh-janak message text nahi mila. Please message paste karein.",
      safe_actions: ["Kisi action ki zaroorat nahi hai."],
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
  // Ensure we DO NOT flag awareness text like "do not share your OTP"
  const hasOtpKeywords = /\b(otp|one time password|pin|cvv|password|passcode)\b/i.test(clean);
  if (hasOtpKeywords && !isOtpSafetyWarning(clean)) {
    const isRequesting =
      /\b(share|send|enter|provide|tell|submit|verify|bhejo|bhejein|daalein|batayein)\b.*?\b(otp|one time password|pin|cvv|password|passcode)\b/i.test(clean) ||
      /\b(otp|one time password|pin|cvv|password)\b.*?\b(share|send|enter|provide|tell|bhejo|bhejein|daalein|batayein|verify|required)\b/i.test(clean) ||
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
    /\b(account|khata|sim|card|connection)\b.*?\b(blocked|block|suspended|suspend|deactivated|closed|frozen|locked|band)\b/i.test(clean) ||
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
    /\b(registration fee|processing fee|verification fee|security deposit|refundable fee|activation charge|courier charge|delivery charge)\b/i.test(clean) ||
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
    /\b(won|winner|winning|selected for|jeeta|lottery)\b.*?\b(prize|lottery|lucky draw|crore|lakh|cash reward|kbc|gift voucher|car)\b/i.test(clean) ||
    /\b(claim your (prize|reward|gift|lottery))\b/i.test(clean);

  if (prizePattern) {
    detected.push({
      name: "Prize, lottery, or unrealistic reward lure",
      weight: 3,
    });
  }

  // 6. Job / Internship Bait (Weight: 2)
  const jobPattern =
    /\b(remote internship|internship offer|part[- ]time job|wfh job|work from home job|data entry job|earn money online|earn \d+ daily|daily income)\b/i.test(clean) ||
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
    /\b(police|cbi|crime branch|customs|enforcement directorate|ed department|interpol|narcotics|ncb)\b/i.test(clean) ||
    /\b(digital arrest|under arrest|arrest warrant|court notice|legal action|fir filed|non-bailable warrant|police complaint)\b/i.test(clean) ||
    /\b(jail|chalaan|penal code|ipc section)\b/i.test(clean);

  if (authorityPattern) {
    detected.push({
      name: "Authority impersonation / Arrest threat",
      weight: 6,
    });
  }

  // 8. Secrecy / Isolation Demand (Weight: 3)
  const secrecyPattern =
    /\b(don't tell anyone|do not tell anyone|kisi ko (bhi )?(mat|na) batana|keep this secret|keep it secret|strictly confidential|confidential call|do not inform family|stay in room)\b/i.test(clean);

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
      explanation:
        "Koi bada red flag nahi mila, par fir bhi savdhaan rahein. Is message mein koi known phishing, credential harvesting ya financial fraud patterns detect nahi hue hain.",
      safe_actions: [
        "Kisi emergency containment ya reporting ki zaroorat nahi hai.",
        "Anjaan vyakti se baat karte waqt bina official verification personal details share na karein.",
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
  if (detected.some((s) => s.name.includes("OTP"))) {
    explanationParts.push(
      "Message mein confidential credentials (OTP/PIN/Password) share karne ki demand ki gayi hai. Banks ya legitimate services kabhi bhi aise credentials SMS ya call par nahi maangte."
    );
  }
  if (detected.some((s) => s.name.includes("Arrest"))) {
    explanationParts.push(
      "Police, CBI ya customs ban kar 'digital arrest' ya FIR ki dhamki di ja rahi hai. Asli law enforcement agencies kabhi WhatsApp ya video call par arrest nahi karti."
    );
  }
  if (detected.some((s) => s.name.includes("KYC"))) {
    explanationParts.push(
      "Bank account ya connection block hone ka dar dikhaya gaya hai taaki aap ghabrahat mein unverified action lein."
    );
  }
  if (detected.some((s) => s.name.includes("payment"))) {
    explanationParts.push(
      "Upfront registration fee ya processing charge maangna job/service scams ka classic indicator hai."
    );
  }
  if (detected.some((s) => s.name.includes("shortened link"))) {
    explanationParts.push(
      "Shortened link (jaise bit.ly) ka istemaal actual malicious website ko chupane ke liye kiya gaya hai."
    );
  }
  if (explanationParts.length === 0) {
    explanationParts.push(
      "Message mein psychological pressure aur anjaan source se action lene ki baat kahi gayi hai."
    );
  }

  const explanation = explanationParts.join(" ");

  // Contextual safe actions based on detected signals
  const safe_actions: string[] = [];
  if (detected.some((s) => s.name.includes("OTP"))) {
    safe_actions.push("Apna OTP, PIN ya netbanking password kisi ke saath share na karein.");
  }
  if (detected.some((s) => s.name.includes("link"))) {
    safe_actions.push("Message mein diye link par bilkul click na karein.");
  }
  if (detected.some((s) => s.name.includes("payment"))) {
    safe_actions.push("Kisi bhi UPI ID ya QR code par paise transfer na karein.");
  }
  if (detected.some((s) => s.name.includes("KYC"))) {
    safe_actions.push("Bank ki official netbanking app ya branch mein jaakar account status check karein.");
  }
  if (detected.some((s) => s.name.includes("Arrest"))) {
    safe_actions.push("Ghabrayein nahi; turant call disconnect karein aur local police station se sampark karein.");
  }
  safe_actions.push("Sandeh hone par National Cyber Fraud Helpline 1930 par call karein.");

  return {
    risk_level,
    signals: signalNames,
    explanation,
    safe_actions,
  };
}

/**
 * Analyzes incoming message text via the backend API (or the offline analyzer in mock mode).
 * Contract:
 * POST {API_URL}/analyze
 * Request: { "text": string }
 * Response: { "risk_level": "Low" | "Caution" | "High" | "Critical", "signals": string[], "explanation": string, "safe_actions": string[] }
 */
export async function analyze(text: string): Promise<AnalysisResult> {
  if (USE_MOCK) {
    // Simulate realistic processing delay for smooth UI transition
    await new Promise((r) => setTimeout(r, 600));
    return runRuleBasedAnalyzer(text);
  }

  // Production/Dev API connection (VITE_API_URL on deploy, localhost:8000 in dev)
  let res: Response;
  try {
    res = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch {
    // Backend unreachable (offline or server asleep): fall back to the local rules
    return runRuleBasedAnalyzer(text);
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