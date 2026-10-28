"""
engine.py: the ScamSaathi analysis logic (framework independent).

Steps: 1) rules  2) link checks  3) optional Gemini (can only RAISE the risk).
Languages: lang="en" (English) or lang="hi" (Hindi, Devanagari).
Rule detection understands English, Roman Hinglish and Devanagari Hindi.

Important: the keys in `signals` stay the same in every language (the website uses
them for highlighting). The readable text for each signal is in `signal_labels`.
"""
import re
from urllib.parse import urlparse

from .ai_check import gemini_analyze
from .official_domains import GOV_NAME, classify_host
from .url_check import SHORTENERS as SHORT_HOSTS
from .url_check import deep_check_urls, expand_short_link, looks_like_brand_fake

LANGS = ("en", "hi")

# ---------------------------------------------------------------- patterns
OTP_WORDS = r"(?:\b(?:otp|pin|cvv|password|passcode)\b|ओटीपी|पिन|सीवीवी|पासवर्ड|पासकोड)"
# verbs that come BEFORE the secret ("share your OTP") and AFTER it ("OTP bhejein")
VERBS_BEFORE = (
    r"(?:share|send|tell|give|enter|bata\w*|bhej\w*|daal\w*|"
    r"\bde(?:na|do|dijiye|dein)?\b|शेयर|भेज|बता|दीजिए|दीजिये|दें|डाल)"
)
VERBS_AFTER = (
    r"(?:share|send|confirm|verify|bata\w*|bhej\w*|daal\w*|"
    r"\bde(?:na|do|dijiye|dein)?\b|शेयर|साझा|भेज|बता|दर्ज|दीजिए|दीजिये|दें|दो|डाल)"
)

# personal documents and details that scammers ask for
SENSITIVE_WORDS = (
    r"(?:aadhaar|aadhar|pan\s*card|pan\s*number|date of birth|\bdob\b|bank details|"
    r"account number|debit card|credit card|identity proof|identity document|personal details|"
    r"आधार|पैन\s*कार्ड|जन्म\s*तिथि|बैंक\s*खाता\s*नंबर|निजी\s*जानकारी|व्यक्तिगत\s*जानकारी|"
    r"पहचान\s*पत्र|दस्तावेज़?)"
)
SENSITIVE_VERBS = (
    r"(?:send|share|upload|submit|provide|give|whatsapp|bhej\w*|bata\w*|"
    r"भेज|शेयर|साझा|बता|अपलोड|दें)"
)

# (signal key, weight, regex pattern)
RULES = [
    ("Urgency", 1,
     r"urgent|immediately|expires?|last chance|turant|abhi|jaldi|aaj\s*hi|24\s*ghante"
     r"|तुरंत|जल्दी|फौरन|24\s*घंटे|अंतिम\s*तिथि|अंतिम\s*मौका|आज\s*ही"),
    ("OTP/PIN request", 3,
     VERBS_BEFORE + r".{0,30}" + OTP_WORDS
     + "|" + OTP_WORDS + r".{0,30}" + VERBS_AFTER
     + r"|(?:share|send|enter|give).{0,25}password"),
    ("Fake KYC / bank threat", 2,
     r"\bkyc\b|केवाईसी|account.{0,20}(?:blocked|suspended|closed|freeze|band|block\s*ho)"
     r"|खात[ाे].{0,25}(?:बंद|ब्लॉक|फ्रीज|सस्पेंड|निलंबित)|khata.{0,20}(?:band|block)"
     r"|bank account|net ?banking"),
    ("Payment demand", 3,
     r"registration fee|processing fee|security deposit|pay\s*(?:rs\.?|₹)?\s*\d+|send money|refund"
     r"|(?:paise|rupaye|rupees?|rs\.?|₹)\s*\d*.{0,20}(?:bhej\w*|jama|transfer)"
     r"|(?:bhej\w*|jama\s*kar\w*|transfer).{0,20}(?:rs\.?|₹|paise|rupaye|rupees)"
     r"|(?:रुपये|रुपए|₹|पैसे).{0,20}(?:भेज|जमा|ट्रांसफर)"
     r"|(?:भेज|जमा|ट्रांसफर).{0,20}(?:रुपये|रुपए|₹|पैसे)"
     r"|(?:फीस|शुल्क).{0,20}(?:भेज|जमा|ट्रांसफर|भुगतान|दें|दो)|राशि\s*जमा|रजिस्ट्रेशन\s*(?:फीस|शुल्क)|रिफंड"),
    ("Prize / lottery", 2,
     r"lottery|you (?:have )?won|prize|lucky draw|reward|inaam|लॉटरी|इनाम|ईनाम|पुरस्कार|लकी\s*ड्रॉ"
     r"|(?:जीता|जीते|जीती|jeeta|jeete).{0,20}(?:लाख|करोड़|lakh|crore)"),
    ("Job / internship bait", 1,
     r"selected for|internship|work from home|part[- ]?time job|ghar\s*baithe"
     r"|इंटर्नशिप|घर\s*बैठे|नौकरी.{0,20}(?:मिली|चयन)|चयन.{0,20}नौकरी"),
    ("Authority threat", 3,
     r"police|\bcbi\b|customs|arrest|legal action|digital arrest|case\s*darj"
     r"|पुलिस|सीबीआई|कस्टम|गिरफ्तार|वारंट|एफआईआर|डिजिटल\s*अरेस्ट|कानूनी\s*कार्रवाई|मुकदमा"),
    ("Sensitive personal information request", 2,
     SENSITIVE_VERBS + r".{0,35}" + SENSITIVE_WORDS + "|" + SENSITIVE_WORDS + r".{0,35}" + SENSITIVE_VERBS),
    ("Secrecy", 2,
     r"don'?t tell|do not tell|keep (?:this )?secret|kisi\s*ko\s*(?:bhi\s*)?(?:mat|na)\s*bata"
     r"|किसी\s*को\s*(?:भी\s*)?(?:मत|न)\s*बता|गुप्त\s*रख"),
]

# Real bank warnings like "Do not share OTP" must not be flagged as OTP requests
SAFE_NOTE = re.compile(r"\b(do not|don'?t|never|mat|na)\s+share", re.IGNORECASE)
SAFE_NOTE_LOCAL = re.compile(
    r"(?:" + OTP_WORDS + "|" + SENSITIVE_WORDS + r").{0,40}(?:"
    r"(?:शेयर|साझा)\s*(?:न|मत)\s*कर"
    r"|किसी\s*(?:को|के\s*साथ)\s*(?:भी\s*)?(?:शेयर|साझा|न|मत)"
    r"|share\s*(?:na|mat)\s*kar"
    r"|kisi\s*(?:ko|ke\s*saath)\s*(?:bhi\s*)?(?:share|mat|na)"
    r")",
    re.IGNORECASE,
)

URL_RE = re.compile(
    r"(?:https?://|www\.)[^\s]+|\b(?:bit\.ly|tinyurl\.com|cutt\.ly|rb\.gy|is\.gd|t\.co|goo\.gl)/[^\s]+",
    re.IGNORECASE,
)
SHORTENERS = {"bit.ly", "tinyurl.com", "cutt.ly", "rb.gy", "is.gd", "t.co", "goo.gl"}
ODD_TLDS = (".xyz", ".top", ".click", ".icu", ".live", ".buzz", ".shop")

# ------------------------------------------------------------- translations
SIGNAL_LABELS = {
    "en": {
        "Urgency": "Urgency: pressure to act fast",
        "OTP/PIN request": "Asks for OTP / PIN / password",
        "Fake KYC / bank threat": "Fake KYC or bank-account threat",
        "Payment demand": "Asks you to pay or send money",
        "Prize / lottery": "Prize or lottery bait",
        "Job / internship bait": "Job or internship bait",
        "Authority threat": "Police or legal threat",
        "Secrecy": "Asks you to keep it secret",
        "Sensitive personal information request": "Asks for personal documents or details (Aadhaar, PAN, bank details)",
        "Short link": "Shortened link",
        "Link copies an official website's name": "Link copies the name of an official website",
        "IP-address link": "Link uses an IP address",
        "Suspicious domain": "Suspicious website address",
        "Disguised (punycode) domain": "Disguised website address",
        "Link mein '@' trick": "'@' trick in the link",
        "Link secure (https) nahi hai": "Link is not secure (no https)",
        "Bahut zyada subdomains wala link": "Link has too many subdomains",
        "Bank/brand jaisa dikhne wala nakli domain": "Fake look-alike bank/brand domain",
        "Google Safe Browsing ne is link ko unsafe report kiya hai": "Google Safe Browsing flags this link as unsafe",
    },
    "hi": {
        "Urgency": "जल्दबाज़ी का दबाव",
        "OTP/PIN request": "OTP / PIN / पासवर्ड माँगा गया",
        "Fake KYC / bank threat": "नकली KYC / बैंक खाता बंद होने की धमकी",
        "Payment demand": "पैसे भेजने या फीस की माँग",
        "Prize / lottery": "इनाम / लॉटरी का लालच",
        "Job / internship bait": "नौकरी / इंटर्नशिप का झाँसा",
        "Authority threat": "पुलिस / कानूनी कार्रवाई की धमकी",
        "Secrecy": "किसी को न बताने का दबाव",
        "Sensitive personal information request": "आधार / PAN / बैंक जैसी निजी जानकारी माँगी गई",
        "Short link": "छोटा (shortened) लिंक",
        "Link copies an official website's name": "लिंक किसी आधिकारिक वेबसाइट के नाम की नकल करता है",
        "IP-address link": "लिंक में IP एड्रेस है",
        "Suspicious domain": "संदिग्ध वेबसाइट एड्रेस",
        "Disguised (punycode) domain": "छिपाया हुआ वेबसाइट एड्रेस",
        "Link mein '@' trick": "लिंक में '@' की चाल",
        "Link secure (https) nahi hai": "लिंक सुरक्षित (https) नहीं है",
        "Bahut zyada subdomains wala link": "लिंक में बहुत ज़्यादा सबडोमेन हैं",
        "Bank/brand jaisa dikhne wala nakli domain": "बैंक/ब्रांड जैसा दिखने वाला नकली डोमेन",
        "Google Safe Browsing ne is link ko unsafe report kiya hai": "Google Safe Browsing ने इस लिंक को असुरक्षित बताया है",
    },
}
DESTINATION_PREFIX = "Short link ka asli destination: "
DESTINATION_TEXT = {"en": "Short link leads to: ", "hi": "छोटा लिंक यहाँ ले जाता है: "}

EXPLANATION = {
    "en": {
        "flags": (
            "This message shows these red flags: {labels}. Scammers create pressure so you act "
            "without thinking, so pause and verify through an official channel first."
        ),
        "none": (
            "No major red flags were found, but stay careful. "
            "This does not guarantee the message is safe."
        ),
    },
    "hi": {
        "flags": (
            "इस संदेश में ये खतरे के संकेत मिले: {labels}। ठग जल्दबाज़ी का दबाव बनाते हैं, "
            "इसलिए रुककर पहले आधिकारिक माध्यम से जाँच करें।"
        ),
        "none": (
            "कोई बड़ा खतरे का संकेत नहीं मिला, फिर भी सावधान रहें। "
            "इसका मतलब यह नहीं कि संदेश सुरक्षित है।"
        ),
    },
}

ACTIONS = {
    "en": {
        "Low": [
            "Still, never share your OTP, PIN or password with anyone",
            "If in doubt, verify through an official channel",
        ],
        "Caution": [
            "Do not act in a hurry",
            "Verify the sender through an official channel",
            "Do not give any link or OTP to anyone",
        ],
        "High": [
            "Do not click the link and do not share any details",
            "Check yourself in the bank's official app or website",
            "Save the message and report it: call 1930 or visit cybercrime.gov.in",
        ],
    },
    "hi": {
        "Low": [
            "फिर भी OTP, PIN या पासवर्ड किसी के साथ साझा न करें",
            "शक हो तो आधिकारिक माध्यम से जाँच करें",
        ],
        "Caution": [
            "जल्दबाज़ी में कोई कदम न उठाएँ",
            "भेजने वाले की पहचान आधिकारिक माध्यम से जाँचें",
            "किसी को लिंक या OTP न दें",
        ],
        "High": [
            "लिंक पर क्लिक न करें और कोई जानकारी साझा न करें",
            "बैंक की आधिकारिक ऐप या वेबसाइट से खुद जाँच करें",
            "संदेश सहेजकर 1930 पर कॉल करें या cybercrime.gov.in पर रिपोर्ट करें",
        ],
    },
}
for _lang in ACTIONS:
    ACTIONS[_lang]["Critical"] = ACTIONS[_lang]["High"]


def signal_label(signal, lang):
    """Readable text for one signal in the chosen language."""
    if signal.startswith(DESTINATION_PREFIX):
        return DESTINATION_TEXT[lang] + signal[len(DESTINATION_PREFIX):]
    return SIGNAL_LABELS[lang].get(signal, signal)  # "AI: ..." signals are already in the right language


# ------------------------------------------------------- official source check
LINK_LABEL = {
    "en": {
        "official": "Matches a known official website: {name}.",
        "official_short": "This short link leads to a known official website: {name}.",
        "lookalike": "Looks like it copies {name}, but the address is not theirs. Do not trust it.",
        "unknown": "Not in our list of known official sites. This does not mean it is fake: check using the official app or website.",
    },
    "hi": {
        "official": "यह एक जानी-मानी आधिकारिक वेबसाइट से मेल खाता है: {name}।",
        "official_short": "यह छोटा लिंक एक जानी-मानी आधिकारिक वेबसाइट पर ले जाता है: {name}।",
        "lookalike": "यह {name} की नकल जैसा लगता है, पर यह पता उनका नहीं है। भरोसा न करें।",
        "unknown": "यह हमारी आधिकारिक वेबसाइटों की सूची में नहीं है। इसका मतलब नकली होना नहीं है: आधिकारिक ऐप या वेबसाइट से जाँचें।",
    },
}
GENERIC_NAME = {"en": "a known bank or brand", "hi": "किसी जाने-माने बैंक या ब्रांड"}
LINK_NOTE = {
    "en": "An official address only shows where the link goes. It does not prove the message itself is genuine.",
    "hi": "आधिकारिक पता सिर्फ़ यह बताता है कि लिंक कहाँ जाता है। इससे यह साबित नहीं होता कि संदेश खुद असली है।",
}


def _host_of(url):
    host = (urlparse(url).hostname or "").lower()
    return host[4:] if host.startswith("www.") else host


def build_link_checks(raw_urls, lang):
    """One entry per link (max 3): is it an official website, a look-alike, or unknown?"""
    checks, seen = [], set()
    for raw in raw_urls[:3]:
        url = raw if raw.lower().startswith("http") else "http://" + raw
        host = _host_of(url)
        if not host:
            continue
        leads_to = ""
        if host in SHORT_HOSTS:
            final = expand_short_link(url)
            if final != url:
                leads_to = _host_of(final)
        target = leads_to or host
        status, name = classify_host(target)
        if status == "unknown" and looks_like_brand_fake(target):
            status, name = "lookalike", ""
        if (host, leads_to) in seen:
            continue
        seen.add((host, leads_to))
        shown = name or GENERIC_NAME[lang]
        if name == GOV_NAME and lang == "hi":
            shown = "भारत सरकार की वेबसाइट"
        key = "official_short" if (status == "official" and leads_to) else status
        checks.append({
            "host": host,
            "leads_to": leads_to,
            "status": status,
            "organization": name,
            "label": LINK_LABEL[lang][key].format(name=shown),
        })
    return checks


# ------------------------------------------------------------------ logic
def check_urls(text):
    found, score = [], 0
    for raw in URL_RE.findall(text):
        url = raw if raw.lower().startswith("http") else "http://" + raw
        host = (urlparse(url).hostname or "").lower()
        if host.startswith("www."):
            host = host[4:]
        if host in SHORTENERS and "Short link" not in found:
            found.append("Short link")
            score += 2
        elif re.fullmatch(r"\d{1,3}(\.\d{1,3}){3}", host) and "IP-address link" not in found:
            found.append("IP-address link")
            score += 3
        elif host.endswith(ODD_TLDS) and "Suspicious domain" not in found:
            found.append("Suspicious domain")
            score += 2
    return found, score


def level_from(score):
    if score <= 1:
        return "Low"
    if score <= 3:
        return "Caution"
    if score <= 9:
        return "High"
    return "Critical"


def analyze_text(text, lang="en"):
    if lang not in LANGS:
        lang = "en"
    signals, score = [], 0

    # 1) Rule engine (always runs, it is the safety floor)
    english_warning = bool(SAFE_NOTE.search(text))
    local_warning = bool(SAFE_NOTE_LOCAL.search(text))
    for name, weight, pattern in RULES:
        if name in ("OTP/PIN request", "Sensitive personal information request") and (
            english_warning or local_warning
        ):
            continue
        if name == "Secrecy" and local_warning:
            continue
        if re.search(pattern, text, re.IGNORECASE | re.DOTALL):
            signals.append(name)
            score += weight

    # 2) Link checks (basic + deeper)
    url_signals, url_score = check_urls(text)
    signals += url_signals
    score += url_score

    extra_signals, extra_score = deep_check_urls(URL_RE.findall(text))
    for s in extra_signals:
        if s not in signals:
            signals.append(s)
    score += extra_score

    # 2b) Official source check (never lowers the risk, it only adds a warning for look-alikes)
    raw_links = URL_RE.findall(text)
    link_checks = build_link_checks(raw_links, lang)
    if any(c["status"] == "lookalike" for c in link_checks):
        if "Bank/brand jaisa dikhne wala nakli domain" not in signals and \
                "Link copies an official website's name" not in signals:
            signals.append("Link copies an official website's name")
            score += 3

    level = level_from(score)
    if signals:
        labels = ", ".join(signal_label(s, lang) for s in signals)
        explanation = EXPLANATION[lang]["flags"].format(labels=labels)
    else:
        explanation = EXPLANATION[lang]["none"]

    # 3) Gemini context analysis (optional: can only RAISE the risk, never lower it)
    ai = gemini_analyze(text, signals, lang)
    if ai:
        for s in ai["extra_signals"]:
            if "AI: " + s not in signals:
                signals.append("AI: " + s)
        order = ["Low", "Caution", "High", "Critical"]
        floor = {"likely_scam": "High", "suspicious": "Caution", "looks_ok": "Low"}[ai["verdict"]]
        if order.index(floor) > order.index(level):
            level = floor
        if ai["explanation"]:
            explanation = ai["explanation"]

    result = {
        "risk_level": level,
        "signals": signals,
        "signal_labels": {s: signal_label(s, lang) for s in signals},
        "explanation": explanation,
        "safe_actions": ACTIONS[lang][level],
        "link_checks": link_checks,
    }
    if link_checks:
        result["link_note"] = LINK_NOTE[lang]
    return result
