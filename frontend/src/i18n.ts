/* oxlint-disable react/only-export-components */
import { createContext, useContext, useState, useEffect, createElement, type ReactNode } from "react";

export type Language = "en" | "hi";

export interface LanguageContextType {
  lang: Language;
  setLang: (newLang: Language) => void;
  toggleLang: () => void;
  t: typeof translations.en;
}

export const translations = {
  en: {
    // Brand
    brandName: "ScamSaathi",
    brandTagline: "Cyber-Safety Response Agent",
    hackathonTeamBadge: "HackIndia x KIT 2026 · Team Build Beyond",

    // Navbar
    navHowItWorks: "How it works",
    navCheckMessage: "Check a message",
    navWhyScamSaathi: "Why ScamSaathi",
    navTeam: "Team",
    navHelpline1930: "Helpline 1930",
    navHelplineTitle: "National Cyber Fraud Helpline 1930",
    navCheckBtn: "Check Message",
    navThemeLight: "Switch to Bright Mode",
    navThemeDark: "Switch to Dark Mode",
    navLangAria: "Switch language",
    navMenuAria: "Toggle navigation menu",

    // Hero
    heroHeadlinePart1: "From Suspicion to ",
    heroHeadlineHighlight: "Safe Recovery",
    heroSubtext: "Explainable Hindi/English cyber-safety response agent",
    heroDescription:
      "Digital scams exploit panic and urgency. ScamSaathi breaks down suspicious WhatsApp messages, fake job offers, and bogus bank notices into plain, evidence-backed advice so you can respond safely.",
    heroCtaCheck: "Check a message",
    heroCtaHow: "How it works (5 steps)",
    heroTrustNoOtp: "Never asks for OTP or PIN",
    heroTrustBilingual: "Hindi & English Breakdown",
    heroTrustHelpline: "Guides you to the 1930 helpline",

    // Hero Phone Mockup
    heroPhoneSender: "SafeBank Alerts",
    heroPhoneDemoBadge: "DEMO",
    heroPhoneMessage:
      '"Dear Customer, your SafeBank account is locked today due to pending KYC. Visit http://bit.ly/safebank-kyc and verify OTP immediately to avoid permanent deactivation."',
    heroPhoneExampleCaption: "Example message (Illustration)",
    heroPhoneFlagUrgency: "🚩 False Account Urgency",
    heroPhoneFlagLink: "🔗 Suspicious Shortener (bit.ly)",

    // Floating Bubbles
    bubble1Snippet: "Win ₹50,000 Cash Prize!",
    bubble1Badge: "Prize Scam",
    bubble1Tagline: "Unsolicited Reward Bait",
    bubble1Explanation:
      "Scammers promise unexpected lottery or prize money to demand advance processing fees or personal bank data.",

    bubble2Snippet: "CBI Digital Arrest Notice",
    bubble2Badge: "Authority Threat",
    bubble2Tagline: "Coercive Police Impersonation",
    bubble2Explanation:
      "Law enforcement and CBI never conduct arrests, trials, or asset seizures via WhatsApp or video calls.",

    bubble3Snippet: "Part-time review ₹3000/day",
    bubble3Badge: "Task Scam",
    bubble3Tagline: "Prepaid Job Trap",
    bubble3Explanation:
      "Victims are lured with easy rating jobs, then trapped into paying deposits for nonexistent commission withdrawals.",

    bubbleTapHint: "Tap to reveal trap 👆",
    bubbleCloseBtn: "Close",
    bubbleHoverTitle: "Click to view why this message is a red flag",
    closeExplanationAria: "Close explanation",

    // How It Works
    howBadge: "Workflow & Agent Lifecycle",
    howTitle: "How ScamSaathi Works",
    howSubtitle:
      "A 5-step response engine that turns confusion into calm, decisive action. Tap any card to flip and explore tactical details.",
    stepNumberPrefix: "Step",
    stepTapFlip: "Tap to flip",
    stepTapBack: "Tap card to flip back",
    stepDeepDivePrefix: "Deep Dive · ",
    stepDefenseTipPrefix: "🛡️ Defense Tip:",

    // Steps 1 to 5
    step1Title: "Detect",
    step1Tagline: "Scans text for psychological urgency, forged links, and impersonation.",
    step1Front: "Extracts deceptive link shorteners, unauthorized payment keywords, and artificial deadlines.",
    step1Back: "Evaluates keyword frequencies and intent patterns without sending your message to external servers.",
    step1Tip: "Never click links received from unknown senders without secondary verification.",

    step2Title: "Explain",
    step2Tagline: "Breaks down hidden traps in everyday Hindi, Hinglish, and English.",
    step2Front: "Translates complex cybersecurity warnings into everyday relatable language for all family members.",
    step2Back: "Explains WHY an offer is fake — e.g. legitimate companies never demand security deposits for jobs.",
    step2Tip: "Share plain-language explanations with elders who might be vulnerable to digital panic.",

    step3Title: "Assess risk",
    step3Tagline: "Categorizes threats into transparent risk levels: Low, Caution, High, or Critical.",
    step3Front: "Weighted scoring derived exclusively from observable evidence in the text.",
    step3Back: "OTP demands and authority threats receive high penalty weights due to immediate financial compromise risk.",
    step3Tip: "Even a single OTP request triggers Critical severity — treat it as an active attack.",

    step4Title: "Guide",
    step4Tagline: "Delivers immediate containment steps tailored to what happened.",
    step4Front: "Customized guidance if you clicked a link, downloaded an APK, or shared bank details.",
    step4Back: "Includes airplane mode disconnection, credential resets, and app permission revocation steps.",
    step4Tip: "If an unauthorized APK was installed, turn on Airplane Mode immediately to kill remote access.",

    step5Title: "Act safely",
    step5Tagline: "Empowers swift incident recovery and direct reporting to India's official 1930 helpline.",
    step5Front: "Facilitates rapid evidence compilation for cybercrime.gov.in and bank lien procedures.",
    step5Back: "Act within the golden hour so banks can freeze fraudulent transactions before money is withdrawn.",
    step5Tip: "Note down transaction UTR numbers before dialing the 1930 National Helpline.",

    // Checker Section
    checkerBadge: "Unified Inspection Engine",
    checkerTitle: "Check a Message, Link, or Screenshot",
    checkerSubtitle:
      "Choose your input method below. We inspect structure and deceptive signals without storing your data.",
    tabMessage: "Message",
    tabLink: "Link",
    tabScreenshot: "Screenshot",

    // Message Examples
    example1Category: "Banking Fraud",
    example1Title: "Fake KYC & OTP Request",
    example2Category: "Student Scam",
    example2Title: "Fake Internship Fee Offer",
    example3Category: "Safe Message",
    example3Title: "Normal Routine Message",

    // Link Examples
    linkEx1Category: "Suspicious Shortener",
    linkEx1Title: "Shortened Bank Phishing Link",
    linkEx2Category: "High-Risk Domain",
    linkEx2Title: "Lottery Claim .xyz Domain",
    linkEx3Category: "Normal Work URL",
    linkEx3Title: "Google Meet Workspace Link",

    // Message Tab
    messageExamplesLabel: "Try Message Examples:",
    messageExamplesHint: "Click to fill & check",
    messagePlaceholder: "Paste suspicious SMS, WhatsApp message, Telegram job offer, or email content here...",
    messagePrivacy: "Never paste OTP, PIN, password, or card numbers.",
    btnCheckMessage: "Check Message",
    btnEvaluatingMessage: "Evaluating message...",
    btnClear: "Clear",

    // Link Tab
    linkExamplesLabel: "Try Link Examples:",
    linkExamplesHint: "Click to test URL analysis",
    linkPlaceholder: "https://bit.ly/update-kyc or https://unknown-link.xyz",
    linkNeverOpenNote:
      "We never open the link for you. We only inspect how it looks (shorteners, forged domains, high-risk TLDs).",
    linkZeroTrustNote: "Links are inspected purely syntactically on your command.",
    btnCheckLink: "Check Link",
    btnInspectingUrl: "Inspecting URL...",
    linkLowNoticeTitle: "Link Inspection Notice",
    linkLowNoticeText: "No known red flags found. This does not guarantee the link is safe.",
    linkLowNoticeSub:
      "Fraudsters frequently register brand-new domains. Always ensure you know the sender before opening unfamiliar URLs.",

    // Screenshot Tab
    screenshotPrivacy: "Your screenshot stays on your device.",
    screenshotPrivacySub: "100% Client-Side OCR · Zero Image Uploads",
    screenshotDropTitle: "Drop your screenshot here, or click to browse",
    screenshotPasteHint: "You can also press Ctrl + V to paste a copied screenshot directly.",
    screenshotMeta: "PNG, JPG, WEBP · Max 5 MB · Auto-downscaled for speed",
    screenshotRemove: "Remove",
    screenshotReady: "Ready to read text in English and Hindi.",
    btnExtractText: "Extract Text with OCR",
    btnCancelScan: "Cancel Scan",
    scanCancelled: "Scan cancelled by user.",
    extractedLabel: "Text found in screenshot (please check and fix any mistakes)",
    ocrComplete: "OCR Complete",
    ocrWarning: "OCR can misread links and numbers. Verify links by eye.",
    btnCheckThisText: "Check this text",
    evaluatingText: "Evaluating text...",
    errFileType: "Please upload PNG, JPG, or WEBP only.",
    errFileSize: "File size is larger than 5MB. Maximum allowed size is 5MB.",
    errNoText: "No readable text found. Please upload a clearer or higher-contrast screenshot.",
    errOcrGeneric: "OCR scanning failed. Ensure your connection allows initial model loading, or type the text manually.",
    ocrLoadingEngine: "Loading on-device OCR engine...",
    ocrInitEngine: "Initializing English + Hindi recognition...",
    ocrExtractingProgress: "Extracting text ({pct}%)...",
    screenshotFileInputAria: "Screenshot file input",
    screenshotPreviewAlt: "Screenshot preview",

    // Result Card
    riskDialTitle: "3D Risk Assessment Dial",
    riskTitleLow: "Low Risk · Safe Message",
    riskTitleCaution: "Caution · Unverified Signals",
    riskTitleHigh: "High Risk · Deception Patterns",
    riskTitleCritical: "Critical Risk · Urgent Phishing Trap",
    riskBadgeLow: "Low Risk",
    riskBadgeCaution: "Caution",
    riskBadgeHigh: "High Risk",
    riskBadgeCritical: "Critical Risk",
    resultDerivedNote:
      "Derived exclusively from verifiable linguistic markers and threat patterns present in the inspected text.",
    cleanMessageTitle: "Clean Message (No Red Flags Found)",
    cleanMessageDesc:
      "No phishing links, payment demands, authority threats, or credential harvesting signals were detected in this message.",
    observedRedFlags: "Observed Red Flags:",
    agentExplanation: "Agent Explanation:",
    recommendedSafeActions: "Recommended Safe Actions:",
    threatSignalsAnalyzed: "{count} threat signal(s) analyzed",
    stepPrefix: "Step",
    offlineNotice: "Offline Mode: Explanations are generated using built-in linguistic rules.",

    // Evidence Highlight
    evidenceTitle: "Evidence Highlight (Tap/Hover trigger words)",
    evidencePatternsCount: "{count} detected pattern(s)",
    evidenceNoTriggersTitle: "No Threat Triggers Found in Message Text",
    evidenceTapToClose: "Tap anywhere to close",

    // Evidence Tooltips
    threatUrgencyCategory: "Urgency Pressure",
    threatUrgencyReason: "Psychological urgency designed to induce panic and rush unverified decisions.",
    threatOtpCategory: "Credential Request",
    threatOtpReason: "Direct attempt to harvest banking credentials. Legitimate institutions never ask for OTP/PIN.",
    threatLinkCategory: "Disguised Link",
    threatLinkReason: "Shortened or unverified domain used to disguise a malicious phishing destination.",
    threatFeeCategory: "Upfront Fee",
    threatFeeReason: "Demand for advance money under the pretext of job verification or lottery claim.",
    threatAuthorityCategory: "Authority Threat",
    threatAuthorityReason: "Coercive authority impersonation. Real police officers never arrest via video calls or SMS.",
    threatAccountCategory: "Account Threat",
    threatAccountReason: "Fabricated threat of service deactivation to frighten the recipient into taking hasty action.",

    // Share Card
    sharePrivacyNote: "Card hides your private text & only shares verified evidence.",
    btnShareFamily: "Share with family",
    shareGenerating: "Generating Card...",
    shareSaved: "Card Saved / Shared!",

    // What Happened (Incident Response)
    whatBadge: "Incident Response Guide",
    whatTitle: "What happened? What did you do?",
    whatSubtitle:
      "If you took any action on this message, select below. We will guide you through immediate containment steps.",
    whatTailoredTitle: "Tailored Safe Actions for You",
    whatEmergencyTitle: "National Emergency Contacts:",
    btnCall1930: "Call 1930 Helpline",
    portalLink: "cybercrime.gov.in",
    whatSelectPrompt: "Select options above to view immediate containment steps.",
    whatStatutoryHelpline: "National Cyber Crime Reporting Helpline: 1930",
    whatGroupAria: "Incident response options",

    // What Happened Options
    optClickedLabel: "I clicked on a link",
    optClickedSub: "Clicked on a suspicious link in SMS, email, or WhatsApp",
    optInstalledLabel: "I installed an app",
    optInstalledSub: "Downloaded an APK, AnyDesk, TeamViewer, or unauthorized utility",
    optSharedLabel: "I shared OTP or personal info",
    optSharedSub: "Shared OTP, card numbers, Aadhaar, PAN, or passwords",
    optPaidLabel: "I sent money",
    optPaidSub: "Sent money via UPI, QR code, bank transfer, or wallet",
    optNoneLabel: "I took no action",
    optNoneSub: "Detected the fraud early and took no action on the message",

    // Why ScamSaathi
    whyBadge: "Core Principles",
    whyTitle: "Why ScamSaathi?",
    whySubtitle: "Engineered to bridge the critical gap between early fraud suspicion and safe recovery action.",
    whyCard1Title: "Not just detection, guided safe response",
    whyCard1Tagline: "Containment beyond just a warning label",
    whyCard1Desc:
      "Most checkers simply flag a message as suspicious. ScamSaathi walks you through immediate containment steps if you already clicked a link, downloaded an APK, or sent money.",
    whyCard1Badge: "Incident Recovery Workflow",

    whyCard2Title: "Hindi/Hinglish explanations",
    whyCard2Tagline: "Cyber awareness in your mother tongue",
    whyCard2Desc:
      "Cybersecurity warnings often fail because of confusing technical jargon. ScamSaathi explains threat patterns in everyday Hindi and Hinglish so everyone in the family understands the trap.",
    whyCard2Badge: "Accessible to All Families",

    whyCard3Title: "Never asks for OTP, PIN, CVV or passwords",
    whyCard3Tagline: "Zero-trust privacy by design",
    whyCard3Desc:
      "True safety begins with strict boundaries. ScamSaathi evaluates only the suspicious message text you paste. We never request your passwords, OTPs, or financial details. No tracking, zero storage.",
    whyCard3Badge: "Strict Zero-Storage Privacy",

    whyStory1Principle: "Principle 01",
    whyStory1Title: "Evidence Over Panic",
    whyStory1Desc:
      "Scammers rely on creating cognitive overload. We unpack observable clues so you can make a rational decision.",
    whyStory1ImgAlt: "Evidence over panic illustration",

    whyStory2Principle: "Principle 02",
    whyStory2Title: "Incident Containment",
    whyStory2Desc:
      "Taking action in the first 2 hours after a scam (the golden window) dramatically increases recovery rates.",
    whyStory2ImgAlt: "Incident containment illustration",

    whyTransparencyTitle: "Transparent AI Assistance:",
    whyTransparencyDesc:
      "ScamSaathi does not make blind assertions or claim 100% automated accuracy. Instead, it systematically highlights observable evidence (urgency markers, disguised links, spoofed headers) so you can make a calm, safer decision with confidence.",

    // Safety Banner
    bannerBadge: "Emergency National Citizen Advisory",
    bannerTitlePart1: "In India, report financial cyber fraud: call ",
    bannerHelpline: "1930",
    bannerTitlePart2: " or visit ",
    bannerPortal: "cybercrime.gov.in",
    bannerDesc:
      "Act within the Golden Hour. Immediate reporting to the National Cyber Crime Helpline (1930) gives banks the critical window to freeze transacted amounts before scammers siphon funds.",
    bannerCallBtn: "Call 1930 Helpline",

    // Team
    teamBadge: "HackIndia x KIT AI & CyberTech Hackathon 2026",
    teamTitle: "Meet Team Build Beyond",
    teamSubtitle:
      "A specialized student team combining agent workflows, modern frontend engineering, backend security, and cyber defense research.",
    memberAnshiRole: "AI / Agent Workflow & Pitch lead",
    memberAnshiFocus: "Prompt engineering, agentic workflow orchestration, and pitch presentation.",
    memberAdityaRole: "Frontend / UI Developer",
    memberAdityaFocus: "Responsive 3D UI/UX architecture, design systems, and incident response interactions.",
    memberShouryaRole: "Backend / Security Developer",
    memberShouryaFocus: "FastAPI server, threat signal extraction pipeline, and cybercrime API integrations.",
    memberDevanshiRole: "Research / QA",
    memberDevanshiFocus: "Phishing attack taxonomy, test case validation, and Indian cyber law compliance.",
    teamPhotoAlt: "Photo of {name}, {role}",
    teamGithubAria: "{name} on GitHub (opens in a new tab)",

    // Footer
    footerMission: "Explainable Hindi/English cyber-safety response agent for fraud detection and guided safe recovery.",
    footerCredits: "HackIndia x KIT | Team Build Beyond",
    footerPrivacy: "Zero-tracking · No credentials requested · Client-Safe",
    footerBuiltWithLove: "Built with",
    footerBuiltWith: "for HackIndia x KIT Hackathon 2026",

    // Errors
    errorTitle: "Temporary Notice",
    errorServerUnavailable: "Server is currently unavailable, please try again in a moment.",
    btnRetry: "Try again",
  },

  hi: {
    // Brand
    brandName: "ScamSaathi",
    brandTagline: "साइबर-सुरक्षा रिस्पॉन्स एजेंट",
    hackathonTeamBadge: "हैकइंडिया x KIT 2026 · टीम बिल्ड बियॉन्ड",

    // Navbar
    navHowItWorks: "यह कैसे काम करता है",
    navCheckMessage: "संदेश जांचें",
    navWhyScamSaathi: "ScamSaathi क्यों",
    navTeam: "हमारी टीम",
    navHelpline1930: "हेल्पलाइन 1930",
    navHelplineTitle: "राष्ट्रीय साइबर धोखाधड़ी हेल्पलाइन 1930",
    navCheckBtn: "संदेश जांचें",
    navThemeLight: "लाइट मोड चालू करें",
    navThemeDark: "डार्क मोड चालू करें",
    navLangAria: "भाषा बदलें",
    navMenuAria: "नेविगेशन मेनू खोलें या बंद करें",

    // Hero
    heroHeadlinePart1: "संदेह से ",
    heroHeadlineHighlight: "सुरक्षित समाधान",
    heroSubtext: "सरल हिंदी और अंग्रेजी में साइबर-सुरक्षा रिस्पॉन्स एजेंट",
    heroDescription:
      "डिजिटल धोखाधड़ी डर और जल्दबाज़ी का फायदा उठाती है। ScamSaathi संदिग्ध WhatsApp संदेशों, फर्जी जॉब ऑफर्स और बैंक अलर्ट्स को आसान भाषा में समझाकर आपको सुरक्षित कदम उठाने में मदद करता है।",
    heroCtaCheck: "संदेश की जांच करें",
    heroCtaHow: "यह कैसे काम करता है (5 कदम)",
    heroTrustNoOtp: "कभी OTP या PIN नहीं मांगता",
    heroTrustBilingual: "हिंदी और अंग्रेजी में सरल व्याख्या",
    heroTrustHelpline: "1930 राष्ट्रीय हेल्पलाइन के लिए मार्गदर्शन",

    // Hero Phone Mockup
    heroPhoneSender: "SafeBank अलर्ट",
    heroPhoneDemoBadge: "डेमो",
    heroPhoneMessage:
      '"प्रिय ग्राहक, KYC पेंडिंग होने के कारण आपका SafeBank खाता आज ब्लॉक कर दिया गया है। स्थायी रूप से बंद होने से बचाने के लिए तुरंत http://bit.ly/safebank-kyc पर जाकर OTP सत्यापित करें।"',
    heroPhoneExampleCaption: "उदाहरण संदेश (चित्रांकन)",
    heroPhoneFlagUrgency: "🚩 खाते का झूठा डर",
    heroPhoneFlagLink: "🔗 संदिग्ध छोटा लिंक (bit.ly)",

    // Floating Bubbles
    bubble1Snippet: "₹50,000 नकद ईनाम जीतें!",
    bubble1Badge: "लॉटरी फ्रॉड",
    bubble1Tagline: "झूठे ईनाम का झांसा",
    bubble1Explanation:
      "ठग अचानक लॉटरी या ईनाम का झांसा देकर एडवांस प्रोसेसिंग फीस या बैंक डिटेल्स मांगते हैं।",

    bubble2Snippet: "CBI डिजिटल अरेस्ट नोटिस",
    bubble2Badge: "अधिकारी का डर",
    bubble2Tagline: "पुलिस या CBI का फर्जी रूप",
    bubble2Explanation:
      "कानून प्रवर्तन और CBI कभी भी WhatsApp या वीडियो कॉल पर गिरफ्तारी या जब्ती की कार्रवाई नहीं करती।",

    bubble3Snippet: "पार्ट-टाइम रिव्यू ₹3000/दिन",
    bubble3Badge: "टास्क फ्रॉड",
    bubble3Tagline: "फर्जी वर्क फ्रॉम होम",
    bubble3Explanation:
      "आसान रेटिंग या लाइक के काम का लालच देकर पैसे जमा करवाए जाते हैं और फिर पैसे वापस नहीं मिलते।",

    bubbleTapHint: "धोखा देखने के लिए टैप करें 👆",
    bubbleCloseBtn: "बंद करें",
    bubbleHoverTitle: "इस संदेश में छिपे खतरे को देखने के लिए क्लिक करें",
    closeExplanationAria: "व्याख्या बंद करें",

    // How It Works
    howBadge: "कार्यप्रणाली एवं सुरक्षा चक्र",
    howTitle: "ScamSaathi कैसे काम करता है",
    howSubtitle:
      "एक 5-चरणीय सुरक्षा इंजन जो घबराहट को शांत और सही निर्णय में बदलता है। कार्ड को पलटकर विस्तार से देखें।",
    stepNumberPrefix: "कदम",
    stepTapFlip: "पलटने के लिए टैप करें",
    stepTapBack: "वापस पलटने के लिए टैप करें",
    stepDeepDivePrefix: "विस्तृत जानकारी · ",
    stepDefenseTipPrefix: "🛡️ बचाव टिप:",

    // Steps 1 to 5
    step1Title: "पहचानें (Detect)",
    step1Tagline: "जल्दबाज़ी का दबाव, फर्जी लिंक और पहचान चोरी की जांच करता है।",
    step1Front: "संदिग्ध छोटे लिंक, अनधिकृत पेमेंट शब्द और समय सीमा की पहचान करता है।",
    step1Back: "संदेश को किसी बाहरी सर्वर पर भेजे बिना भाषा और पैटर्न का विश्लेषण करता है।",
    step1Tip: "अनजान नंबर से आए लिंक पर बिना जांच कभी क्लिक न करें।",

    step2Title: "समझें (Explain)",
    step2Tagline: "छिपे हुए खतरों को सरल हिंदी और रोजमर्रा की भाषा में समझाता है।",
    step2Front: "जटिल साइबर चेतावनियों को परिवार के सभी सदस्यों के लिए आसान भाषा में बदलता है।",
    step2Back: "समझाता है कि ऑफर क्यों फर्जी है — जैसे असली कंपनियां कभी नौकरी के लिए पैसे नहीं मांगती।",
    step2Tip: "घर के बुजुर्गों को यह आसान व्याख्या समझाएं ताकि वे घबराएं नहीं।",

    step3Title: "जोखिम आकलन (Assess)",
    step3Tagline: "स्पष्ट स्तरों में बांटता है: कम (Low), चेतावनी (Caution), उच्च (High) या गंभीर (Critical)।",
    step3Front: "संदेश में मौजूद वास्तविक सबूतों के आधार पर पारदर्शी जोखिम स्कोर।",
    step3Back: "OTP मांग और गिरफ्तारी की धमकियों को तुरंत वित्तीय नुकसान के कारण उच्चतम जोखिम माना जाता है।",
    step3Tip: "OTP मांगने वाला एक भी संदेश गंभीर माना जाता है — इसे तुरंत हमला समझें।",

    step4Title: "मार्गदर्शन (Guide)",
    step4Tagline: "आपके उठाए गए कदम के अनुसार तुरंत बचाव के उपाय बताता है।",
    step4Front: "यदि आपने लिंक क्लिक किया, APK इंस्टॉल किया या जानकारी साझा की तो उचित सलाह।",
    step4Back: "फ़ोन को एयरप्लेन मोड पर डालना, पासवर्ड बदलना और अनुमतियां हटाना शामिल है।",
    step4Tip: "यदि कोई अनजान APK इंस्टॉल हो गई है, तो रिमोट एक्सेस रोकने के लिए तुरंत एयरप्लेन मोड चालू करें।",

    step5Title: "सुरक्षित कदम (Act)",
    step5Tagline: "भारत की आधिकारिक 1930 हेल्पलाइन पर तुरंत शिकायत दर्ज करने में मदद।",
    step5Front: "cybercrime.gov.in और बैंक में पैसे फ्रीज करवाने के लिए तुरंत साक्ष्य जुटाता है।",
    step5Back: "गोल्डन ऑवर में कार्रवाई करें ताकि ठगी का पैसा निकलने से पहले बैंक उसे फ्रीज कर सके।",
    step5Tip: "1930 पर कॉल करने से पहले ट्रांजेक्शन का UTR नंबर लिखकर रख लें।",

    // Checker Section
    checkerBadge: "एकीकृत जांच इंजन",
    checkerTitle: "संदेश, लिंक या स्क्रीनशॉट की जांच करें",
    checkerSubtitle:
      "नीचे अपनी पसंद का विकल्प चुनें। हम आपका डेटा स्टोर किए बिना केवल धोखाधड़ी के संकेतों की जांच करते हैं।",
    tabMessage: "संदेश",
    tabLink: "लिंक",
    tabScreenshot: "स्क्रीनशॉट",

    // Message Examples
    example1Category: "बैंकिंग धोखाधड़ी",
    example1Title: "फर्जी KYC व OTP अनुरोध",
    example2Category: "छात्र धोखाधड़ी",
    example2Title: "फर्जी इंटर्नशिप फीस का झांसा",
    example3Category: "सुरक्षित संदेश",
    example3Title: "सामान्य दिनचर्या संदेश",

    // Link Examples
    linkEx1Category: "संदिग्ध छोटा लिंक",
    linkEx1Title: "बैंक फिशिंग हेतु छोटा लिंक",
    linkEx2Category: "खतरनाक डोमेन",
    linkEx2Title: "लॉटरी दावा .xyz डोमेन",
    linkEx3Category: "सामान्य कार्य URL",
    linkEx3Title: "Google Meet मीटिंग लिंक",

    // Message Tab
    messageExamplesLabel: "उदाहरण संदेश आज़माएं:",
    messageExamplesHint: "भरने और जांचने के लिए क्लिक करें",
    messagePlaceholder: "संदिग्ध SMS, WhatsApp संदेश, टेलीग्राम जॉब ऑफर या ईमेल यहां पेस्ट करें...",
    messagePrivacy: "कभी भी अपना OTP, PIN, पासवर्ड या कार्ड नंबर न डालें।",
    btnCheckMessage: "संदेश जांचें",
    btnEvaluatingMessage: "संदेश की जांच हो रही है...",
    btnClear: "साफ़ करें",

    // Link Tab
    linkExamplesLabel: "उदाहरण लिंक आज़माएं:",
    linkExamplesHint: "जांच के लिए क्लिक करें",
    linkPlaceholder: "https://bit.ly/update-kyc या https://unknown-link.xyz",
    linkNeverOpenNote:
      "हम कभी भी आपके लिए लिंक नहीं खोलते। हम केवल इसकी बनावट (छोटा लिंक, फर्जी डोमेन) की जांच करते हैं।",
    linkZeroTrustNote: "लिंक केवल तकनीकी रूप से जांची जाती हैं, कोई वेबसाइट लोड नहीं होती।",
    btnCheckLink: "लिंक जांचें",
    btnInspectingUrl: "लिंक की जांच हो रही है...",
    linkLowNoticeTitle: "लिंक जांच सूचना",
    linkLowNoticeText: "कोई ज्ञात खतरा नहीं मिला। यह गारंटी नहीं है कि लिंक पूरी तरह सुरक्षित है।",
    linkLowNoticeSub:
      "धोखेबाज अक्सर नए डोमेन बनाते हैं। अनजान व्यक्ति द्वारा भेजे गए किसी भी लिंक को खोलने से पहले पुष्टि करें।",

    // Screenshot Tab
    screenshotPrivacy: "आपका स्क्रीनशॉट आपके डिवाइस पर ही रहता है।",
    screenshotPrivacySub: "100% ऑन-डिवाइस OCR · कोई इमेज अपलोड नहीं होती",
    screenshotDropTitle: "स्क्रीनशॉट यहां छोड़ें, या चुनने के लिए क्लिक करें",
    screenshotPasteHint: "आप स्क्रीनशॉट कॉपी करके सीधे Ctrl + V से भी पेस्ट कर सकते हैं।",
    screenshotMeta: "PNG, JPG, WEBP · अधिकतम 5 MB · तेज गति हेतु स्वतः रीसाइज़",
    screenshotRemove: "हटाएं",
    screenshotReady: "अंग्रेजी और हिंदी में पढ़ने के लिए तैयार।",
    btnExtractText: "OCR से टेक्स्ट निकालें",
    btnCancelScan: "स्कैन रद्द करें",
    scanCancelled: "स्कैन उपयोगकर्ता द्वारा रद्द किया गया।",
    extractedLabel: "स्क्रीनशॉट से मिला टेक्स्ट (कृपया गलतियां जांचें और ठीक करें)",
    ocrComplete: "OCR पूरा हुआ",
    ocrWarning: "OCR से लिंक और नंबरों में गलती हो सकती है। ध्यान से जांचें।",
    btnCheckThisText: "इस टेक्स्ट की जांच करें",
    evaluatingText: "टेक्स्ट की जांच हो रही है...",
    errFileType: "कृपया केवल PNG, JPG, या WEBP फाइल अपलोड करें।",
    errFileSize: "फाइल का आकार 5MB से अधिक है। कृपया 5MB से छोटी फाइल चुनें।",
    errNoText: "कोई पठनीय टेक्स्ट नहीं मिला। कृपया अधिक स्पष्ट स्क्रीनशॉट अपलोड करें।",
    errOcrGeneric: "OCR स्कैन विफल रहा। कृपया टेक्स्ट को स्वयं टाइप या पेस्ट करें।",
    ocrLoadingEngine: "ऑन-डिवाइस OCR इंजन लोड हो रहा है...",
    ocrInitEngine: "अंग्रेजी और हिंदी पहचान मॉडल तैयार हो रहे हैं...",
    ocrExtractingProgress: "टेक्स्ट निकाला जा रहा है ({pct}%)...",
    screenshotFileInputAria: "स्क्रीनशॉट फाइल चुनें",
    screenshotPreviewAlt: "स्क्रीनशॉट पूर्वावलोकन",

    // Result Card
    riskDialTitle: "3D जोखिम आकलन डायल",
    riskTitleLow: "कम जोखिम · सामान्य संदेश",
    riskTitleCaution: "चेतावनी · असत्यापित संकेत",
    riskTitleHigh: "उच्च जोखिम · धोखाधड़ी के लक्षण",
    riskTitleCritical: "गंभीर जोखिम · खतरनाक फिशिंग हमला",
    riskBadgeLow: "कम जोखिम",
    riskBadgeCaution: "सावधानी",
    riskBadgeHigh: "उच्च जोखिम",
    riskBadgeCritical: "गंभीर जोखिम",
    resultDerivedNote:
      "जांचे गए टेक्स्ट में मौजूद भाषा और धोखाधड़ी के स्पष्ट संकेतों पर आधारित।",
    cleanMessageTitle: "सुरक्षित संदेश (कोई खतरा नहीं मिला)",
    cleanMessageDesc:
      "इस संदेश में कोई फिशिंग लिंक, पैसे की मांग, पुलिस/CBI की धमकी, या OTP मांगने का संकेत नहीं मिला है।",
    observedRedFlags: "पाए गए खतरे (Red Flags):",
    agentExplanation: "एजेंट की व्याख्या:",
    recommendedSafeActions: "सुरक्षित कदम (क्या करें):",
    threatSignalsAnalyzed: "{count} खतरे के संकेत विश्लेषित",
    stepPrefix: "कदम",
    offlineNotice: "ऑफ़लाइन मोड: व्याख्याएं अंतर्निहित नियमों पर आधारित हैं।",

    // Evidence Highlight
    evidenceTitle: "साक्ष्य हाइलाइट (संकेत शब्दों पर टैप करें)",
    evidencePatternsCount: "{count} चिन्हित संकेत",
    evidenceNoTriggersTitle: "संदेश में कोई संदिग्ध संकेत शब्द नहीं मिले",
    evidenceTapToClose: "बंद करने के लिए कहीं भी टैप करें",

    // Evidence Tooltips
    threatUrgencyCategory: "तात्कालिकता का दबाव",
    threatUrgencyReason: "घबराहट पैदा करने और बिना सोचे-समझे निर्णय लेने के लिए जल्दबाज़ी का दबाव।",
    threatOtpCategory: "गोपनीय जानकारी की मांग",
    threatOtpReason: "बैंकिंग क्रेडेंशियल चुराने का सीधा प्रयास। असली बैंक कभी OTP या PIN नहीं मांगते।",
    threatLinkCategory: "भ्रामक छोटा लिंक",
    threatLinkReason: "असली वेबसाइट छुपाकर फर्जी फिशिंग पेज पर ले जाने वाला संदिग्ध लिंक।",
    threatFeeCategory: "अग्रिम फीस की मांग",
    threatFeeReason: "नौकरी सत्यापन या ईनाम के बहाने पहले पैसे वसूलने का झांसा।",
    threatAuthorityCategory: "अधिकारी बनकर धमकी",
    threatAuthorityReason: "फर्जी पुलिस या CBI अधिकारी बनकर डराना। असली अधिकारी कभी वीडियो कॉल पर गिरफ्तारी नहीं करते।",
    threatAccountCategory: "खाता बंद करने की धमकी",
    threatAccountReason: "जल्दबाज़ी में कदम उठाने के लिए सेवा बंद होने का मनगढ़ंत डर।",

    // Share Card
    sharePrivacyNote: "यह कार्ड आपका निजी संदेश छुपाकर केवल सुरक्षा साक्ष्य दिखाता है।",
    btnShareFamily: "परिवार के साथ शेयर करें",
    shareGenerating: "कार्ड बन रहा है...",
    shareSaved: "कार्ड सहेजा / शेयर किया गया!",

    // What Happened (Incident Response)
    whatBadge: "घटना प्रतिक्रिया गाइड",
    whatTitle: "क्या हुआ? आपने क्या किया?",
    whatSubtitle:
      "यदि आपने इस संदेश पर कोई कदम उठाया है, तो नीचे चुनें। हम तुरंत नुकसान रोकने के उपाय बताएंगे।",
    whatTailoredTitle: "आपके लिए व्यक्तिगत सुरक्षा कदम",
    whatEmergencyTitle: "राष्ट्रीय आपातकालीन संपर्क:",
    btnCall1930: "1930 हेल्पलाइन पर कॉल करें",
    portalLink: "cybercrime.gov.in",
    whatSelectPrompt: "तत्काल रोकथाम के कदम देखने के लिए ऊपर दिए गए विकल्पों में से चुनें।",
    whatStatutoryHelpline: "राष्ट्रीय साइबर अपराध रिपोर्टिंग हेल्पलाइन: 1930",
    whatGroupAria: "घटना प्रतिक्रिया विकल्प",

    // What Happened Options
    optClickedLabel: "मैंने लिंक पर क्लिक किया",
    optClickedSub: "SMS, ईमेल या WhatsApp में संदिग्ध लिंक खोला",
    optInstalledLabel: "मैंने कोई ऐप इंस्टॉल की",
    optInstalledSub: "कोई APK, AnyDesk, QuickSupport या अनजान ऐप डाउनलोड की",
    optSharedLabel: "मैंने OTP या निजी जानकारी शेयर की",
    optSharedSub: "OTP, कार्ड नंबर, आधार, पैन या पासवर्ड बता दिया",
    optPaidLabel: "मैंने पैसे भेजे",
    optPaidSub: "UPI, QR कोड, बैंक ट्रांसफर या वॉलेट से पैसे ट्रांसफर किए",
    optNoneLabel: "मैंने कुछ नहीं किया",
    optNoneSub: "धोखाधड़ी समय पर पहचान ली और कोई कदम नहीं उठाया",

    // Why ScamSaathi
    whyBadge: "मूल सिद्धांत",
    whyTitle: "ScamSaathi क्यों?",
    whySubtitle: "धोखाधड़ी के संदेह और सुरक्षित समाधान के बीच की खाई को पाटने के लिए निर्मित।",
    whyCard1Title: "सिर्फ चेतावनी नहीं, पूरा बचाव मार्गदर्शन",
    whyCard1Tagline: "अलर्ट से आगे बढ़कर नुकसान रोकने का समाधान",
    whyCard1Desc:
      "अधिकांश टूल्स सिर्फ यह बताते हैं कि संदेश संदिग्ध है। ScamSaathi यह बताता है कि अगर आपने लिंक पर क्लिक कर दिया, ऐप इंस्टॉल कर ली, या पैसे भेज दिए तो आगे क्या करना है।",
    whyCard1Badge: "घटना उपरांत समाधान प्रक्रिया",

    whyCard2Title: "हिंदी और सरल भाषा में व्याख्या",
    whyCard2Tagline: "अपनी मातृभाषा में साइबर जागरूकता",
    whyCard2Desc:
      "साइबर चेतावनियां अक्सर कठिन तकनीकी शब्दों के कारण समझ नहीं आतीं। ScamSaathi रोजमर्रा की हिंदी में समझाता है ताकि घर का हर व्यक्ति खतरे को समझ सके।",
    whyCard2Badge: "हर परिवार के लिए सुलभ",

    whyCard3Title: "कभी OTP, PIN या पासवर्ड नहीं मांगता",
    whyCard3Tagline: "डिज़ाइन से ही पूर्ण गोपनीयता",
    whyCard3Desc:
      "सच्ची सुरक्षा सीमाओं से शुरू होती है। ScamSaathi केवल आपके द्वारा पेस्ट किए गए टेक्स्ट की जांच करता है। हम कभी गोपनीय जानकारी नहीं मांगते। कोई ट्रैकिंग नहीं, शून्य स्टोरेज।",
    whyCard3Badge: "पूर्ण डेटा गोपनीयता",

    whyStory1Principle: "सिद्धांत 01",
    whyStory1Title: "डर नहीं, साक्ष्य पर ध्यान",
    whyStory1Desc:
      "ठग जल्दबाज़ी और घबराहट पैदा करते हैं। हम स्पष्ट सबूत दिखाते हैं ताकि आप शांत रहकर सही निर्णय ले सकें।",
    whyStory1ImgAlt: "घबराहट के बदले साक्ष्य पर ध्यान चित्रांकन",

    whyStory2Principle: "सिद्धांत 02",
    whyStory2Title: "तुरंत नुकसान पर रोक",
    whyStory2Desc:
      "धोखाधड़ी के शुरुआती 2 घंटों (गोल्डन पीरियड) में कदम उठाने से पैसे वापस मिलने की संभावना सबसे अधिक होती है।",
    whyStory2ImgAlt: "घटना रोकथाम चित्रांकन",

    whyTransparencyTitle: "पारदर्शी AI सहायता:",
    whyTransparencyDesc:
      "ScamSaathi कोई मनगढ़ंत दावा या 100% सटीकता का दावा नहीं करता। इसके बजाय, यह स्पष्ट सबूतों (जल्दबाज़ी का दबाव, फर्जी लिंक) को उजागर करता है ताकि आप आत्मविश्वास से सुरक्षित निर्णय ले सकें।",

    // Safety Banner
    bannerBadge: "राष्ट्रीय नागरिक आपातकालीन सलाह",
    bannerTitlePart1: "भारत में वित्तीय साइबर धोखाधड़ी की रिपोर्ट करें: कॉल करें ",
    bannerHelpline: "1930",
    bannerTitlePart2: " या विजिट करें ",
    bannerPortal: "cybercrime.gov.in",
    bannerDesc:
      "गोल्डन ऑवर में कदम उठाएं। राष्ट्रीय साइबर हेल्पलाइन (1930) पर तुरंत सूचना देने से बैंक को ठगी की रकम फ्रीज करने का महत्वपूर्ण समय मिलता है।",
    bannerCallBtn: "1930 हेल्पलाइन पर कॉल करें",

    // Team
    teamBadge: "हैकइंडिया x KIT AI एवं साइबरटेक हैकथॉन 2026",
    teamTitle: "मिलिए टीम बिल्ड बियॉन्ड से",
    teamSubtitle:
      "एजेंट वर्कफ़्लो, आधुनिक फ़्रंटएंड, बैकएंड सुरक्षा और साइबर शोध को जोड़ने वाली समर्पित टीम।",
    memberAnshiRole: "AI / एजेंट वर्कफ़्लो एवं पिच लीड",
    memberAnshiFocus: "प्रॉम्प्ट इंजीनियरिंग, एजेंट वर्कफ़्लो और प्रस्तुति नेतृत्व।",
    memberAdityaRole: "फ़्रंटएंड / UI डेवलपर",
    memberAdityaFocus: "रिस्पॉन्सिव 3D UI/UX आर्किटेक्चर, डिज़ाइन सिस्टम और सुरक्षा इंटरफ़ेस।",
    memberShouryaRole: "बैकएंड / सिक्योरिटी डेवलपर",
    memberShouryaFocus: "FastAPI सर्वर, सिग्नल निष्कर्षण पाइपलाइन और साइबर सुरक्षा एकीकरण।",
    memberDevanshiRole: "रिसर्च / QA",
    memberDevanshiFocus: "फिशिंग अटैक विश्लेषण, टेस्ट केस सत्यापन और साइबर कानून अनुपालन।",
    teamPhotoAlt: "{name}, {role} का चित्र",
    teamGithubAria: "GitHub पर {name} की प्रोफाइल (नए टैब में खुलती है)",

    // Footer
    footerMission: "धोखाधड़ी की पहचान और सुरक्षित समाधान के लिए हिंदी/अंग्रेजी साइबर-सुरक्षा एजेंट।",
    footerCredits: "हैकइंडिया x KIT | टीम बिल्ड बियॉन्ड",
    footerPrivacy: "शून्य ट्रैकिंग · कोई पासवर्ड/OTP संग्रह नहीं · पूर्णतः सुरक्षित",
    footerBuiltWithLove: "समर्पण से निर्मित",
    footerBuiltWith: "हैकइंडिया x KIT हैकथॉन 2026 के लिए निर्मित",

    // Errors
    errorTitle: "अस्थायी सूचना",
    errorServerUnavailable: "सर्वर अभी उपलब्ध नहीं है, कृपया थोड़ी देर बाद पुनः प्रयास करें",
    btnRetry: "दोबारा प्रयास करें",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Requirement: React state only, no localStorage, default "en"
  const [lang, setLangState] = useState<Language>("en");

  // Requirement 7: Set the page <html lang> attribute to "hi" or "en" to match
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(newLang: Language) {
    setLangState(newLang);
  }

  function toggleLang() {
    setLangState((prev) => (prev === "en" ? "hi" : "en"));
  }

  const value: LanguageContextType = {
    lang,
    setLang,
    toggleLang,
    t: translations[lang],
  };

  return createElement(LanguageContext.Provider, { value }, children);
}

export function useLanguage(): LanguageContextType {
  return useContext(LanguageContext);
}
