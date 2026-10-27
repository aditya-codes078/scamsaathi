"""
engine.py: the ScamSaathi analysis logic (framework independent).
Same steps as before: 1) kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk 2) link checks  3) optional Gemini (can only RAISE risk).
"""
import re
from urllib.parse import urlparse

from .ai_check import gemini_analyze
from .url_check import deep_check_urls

# (signal ka naam, weight, regex pattern)
RULES = [
    (
        "Urgency",
        1,
        r"urgent|immediately|expires?|last chance|turant|abhi|jaldi|"
        r"तुरंत|जल्दी|अभी|आज ही|अंतिम मौका",
    ),
    
    (
        "OTP/PIN request",
        3,
        r"(?:share|send|tell|give|enter|bata\w*|bhej\w*).{0,35}"
        r"\b(?:otp|pin|cvv)\b"
        r"|\b(?:otp|pin|cvv)\b.{0,35}"
        r"(?:share|send|confirm|verify|bata\w*|bhej\w*)"
        r"|(?:ओटीपी|पिन|सीवीवी).{0,35}(?:बताएं|बताइए|भेजें|शेयर करें|दर्ज करें)"
        r"|(?:बताएं|बताइए|भेजें|शेयर करें|साझा करें).{0,35}(?:ओटीपी|पिन|सीवीवी)",
    ),
    (
        "Fake KYC / bank threat",
        2,
        r"\bkyc\b.{0,35}(?:update|verify|complete|expire|blocked|suspend)"
        r"|account.{0,25}(?:blocked|suspended|closed|freeze)"
        r"|खाता.{0,25}(?:बंद|ब्लॉक|फ्रीज|निलंबित)"
        r"|बैंक खाते?.{0,30}(?:बंद|ब्लॉक|फ्रीज)",
    ),
    (
        "Payment demand",
        3,
        r"registration fee|processing fee|security deposit|"
        r"pay\s*(?:rs\.?|₹)?\s*\d+|send money|"
        r"पैसे भेजें|राशि जमा करें|शुल्क जमा करें|रजिस्ट्रेशन फीस",
    ),
    (
        "Prize / lottery",
        2,
        r"lottery|you (?:have )?won|prize|lucky draw|reward|"
        r"लॉटरी|इनाम जीत|पुरस्कार|लकी ड्रॉ",
    ),
    (
        "Job / internship bait",
        1,
        r"selected for|internship|work from home|part[- ]?time job|"
        r"नौकरी के लिए चयन|इंटर्नशिप|घर बैठे काम",
    ),
    (
        "Authority threat",
        3,
        r"police|\bcbi\b|customs|arrest|legal action|digital arrest|"
        r"पुलिस|गिरफ्तारी|कानूनी कार्रवाई|डिजिटल अरेस्ट",
    ),
    (
        "Secrecy",
        2,
        r"don't tell|do not tell|keep (?:this )?secret|"
        r"kisi ko mat batana|किसी को मत बताना|गुप्त रखें",
    ),
    (
        "Sensitive personal information request",
        2,
        r"aadhaar|aadhar|pan card|pan photo|date of birth|dob|"
        r"bank details|account number|debit card|"
        r"personal details|identity proof|identity document|"
        r"full name.{0,35}(?:address|dob|aadhaar|pan)|"
        r"send.{0,35}(?:aadhaar|aadhar|pan card|documents|"
        r"identity proof|bank details|account number)|"
        r"(?:aadhaar|aadhar|pan card|documents|identity proof)"
        r".{0,35}(?:send|share|upload|whatsapp|bhej|भेजें|शेयर करें)|"
        r"आधार|पैन कार्ड|जन्म तिथि|बैंक खाता नंबर|"
        r"निजी जानकारी|व्यक्तिगत जानकारी|पहचान पत्र|"
        r"दस्तावेज़ भेजें|दस्तावेज भेजें",
    ),
    
]

# "Do not share OTP" jaise asli bank messages ko galat flag hone se bachane ke liye
SAFE_NOTE = re.compile(
    r"\b(do not|don't|never|mat|na)\s+share\b"
    r"|(?:किसी को|किसीसे|किसी से).{0,20}"
    r"(?:ओटीपी|otp|पिन|pin|पासवर्ड|password).{0,20}"
    r"(?:न बताएं|मत बताएं|न बताएं|न दें|मत दें|शेयर न करें|साझा न करें)"
    r"|(?:ओटीपी|otp|पिन|pin|पासवर्ड|password).{0,20}"
    r"(?:किसी को न बताएं|किसी को मत बताएं|शेयर न करें|साझा न करें)",
    re.IGNORECASE,
)
URL_RE = re.compile(
    r"(?:https?://|www\.)[^\s]+|\b(?:bit\.ly|tinyurl\.com|cutt\.ly|rb\.gy|is\.gd|t\.co|goo\.gl)/[^\s]+",
    re.IGNORECASE,
)
SHORTENERS = {"bit.ly", "tinyurl.com", "cutt.ly", "rb.gy", "is.gd", "t.co", "goo.gl"}
ODD_TLDS = (".xyz", ".top", ".click", ".icu", ".live", ".buzz", ".shop")

ACTIONS = {
    "Low": [
        "Phir bhi OTP, PIN ya password kisi ko share na karein",
        "Shak ho toh official channel se verify karein",
    ],
    "Caution": [
        "Jaldi mein koi kadam na uthayein",
        "Sender ki pehchaan official channel se verify karein",
        "Link ya OTP kisi ko na dein",
    ],
    "High": [
        "Link par click na karein aur kuch bhi share na karein",
        "Bank ki official app ya website se khud verify karein",
        "Message save karke 1930 par ya cybercrime.gov.in par report karein",
    ],
}
ACTIONS["Critical"] = ACTIONS["High"]


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


def analyze_text(text):
    signals, score = [], 0

    # 1) Rule engine (always runs, it is the safety floor)
    for name, weight, pattern in RULES:
        if name == "OTP/PIN request" and SAFE_NOTE.search(text):
            continue
        if re.search(pattern, text, re.IGNORECASE):
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

    level = level_from(score)
    if signals:
        explanation = (
            "Is message mein ye red flags mile: " + ", ".join(signals) + ". "
            "Scammers aksar jaldi karne ka pressure banate hain, isliye ruk kar verify karein."
        )
    else:
        explanation = "Koi bada red flag nahi mila, par fir bhi savdhaan rahein."

    # 3) Gemini context analysis (optional: can only RAISE the risk, never lower it)
    ai = gemini_analyze(text, signals)
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

    return {
        "risk_level": level,
        "signals": signals,
        "explanation": explanation,
        "safe_actions": ACTIONS[level],
    }
