"""
url_check.py: extra link checks for ScamSaathi. Put this file next to main.py.

What it does:
- Local checks for disguised or look-alike domains (no network needed)
- Safe expansion of short links (bit.ly etc.): only public IPs, only http/https,
  max 4 hops, page content is never downloaded
- Optional Google Safe Browsing lookup (set SAFE_BROWSING_KEY in Render's
  Environment Variables; if it is missing, this step is simply skipped)

Important: a link that is NOT found in any list is not proven safe.
The result only adds warning signals, it never says "safe".
"""
import ipaddress
import os
import socket
from urllib.parse import urljoin, urlparse

import httpx

SAFE_BROWSING_KEY = os.getenv("SAFE_BROWSING_KEY")

SHORTENERS = {
    "bit.ly", "tinyurl.com", "cutt.ly", "rb.gy", "is.gd",
    "t.co", "goo.gl", "shorturl.at", "tiny.cc",
}
BRANDS = ("sbi", "hdfc", "icici", "axis", "paytm", "phonepe", "gpay", "irctc", "amazon", "flipkart", "aadhaar")
SECOND_LEVEL = {"co", "com", "org", "net", "gov", "ac", "nic", "edu"}
MAX_HOPS = 4
TIMEOUT = 3.0


def _host(url: str) -> str:
    return (urlparse(url).hostname or "").lower()


def _is_public_host(host: str) -> bool:
    """True only if every IP the host resolves to is public (blocks localhost and private networks)."""
    try:
        infos = socket.getaddrinfo(host, None)
        return bool(infos) and all(ipaddress.ip_address(i[4][0]).is_global for i in infos)
    except (OSError, ValueError):
        return False


_EXPAND_CACHE = {}


def expand_short_link(url: str) -> str:
    """Cached wrapper: the real work is done once per link."""
    if url in _EXPAND_CACHE:
        return _EXPAND_CACHE[url]
    final = _expand_short_link(url)
    if final != url:  # only remember successful expansions
        if len(_EXPAND_CACHE) >= 200:
            _EXPAND_CACHE.pop(next(iter(_EXPAND_CACHE)))
        _EXPAND_CACHE[url] = final
    return final


def _expand_short_link(url: str) -> str:
    """Follow the redirects of a short link and return the final URL.
    Only response headers are read. If anything looks unsafe or fails,
    the last known URL is returned."""
    current = url
    try:
        with httpx.Client(
            follow_redirects=False,
            timeout=TIMEOUT,
            headers={"User-Agent": "ScamSaathi-LinkCheck/1.0"},
        ) as client:
            for _ in range(MAX_HOPS):
                parsed = urlparse(current)
                host = (parsed.hostname or "").lower()
                if parsed.scheme not in ("http", "https") or parsed.port not in (None, 80, 443):
                    break
                if not host or not _is_public_host(host):
                    break
                with client.stream("GET", current) as resp:
                    target = resp.headers.get("location")
                    if resp.status_code in (301, 302, 303, 307, 308) and target:
                        current = urljoin(current, target)
                        continue
                break
    except Exception:
        pass
    return current


def _looks_like_brand_fake(host: str) -> bool:
    """e.g. sbi-kyc-update.xyz: a bank/brand name mixed with hyphens or digits."""
    parts = host.split(".")
    if len(parts) < 2:
        return False
    if len(parts) >= 3 and parts[-2] in SECOND_LEVEL:
        sld = parts[-3]
    else:
        sld = parts[-2]
    has_brand = any(b in sld for b in BRANDS)
    return has_brand and ("-" in sld or any(c.isdigit() for c in sld))


looks_like_brand_fake = _looks_like_brand_fake  # public name


def _safe_browsing_hit(urls) -> bool:
    if not SAFE_BROWSING_KEY or not urls:
        return False
    body = {
        "client": {"clientId": "scamsaathi", "clientVersion": "1.0"},
        "threatInfo": {
            "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [{"url": u} for u in urls[:20]],
        },
    }
    try:
        r = httpx.post(
            "https://safebrowsing.googleapis.com/v4/threatMatches:find",
            params={"key": SAFE_BROWSING_KEY},
            json=body,
            timeout=4.0,
        )
        return bool(r.json().get("matches"))
    except Exception:
        return False


def deep_check_urls(raw_urls):
    """raw_urls: URLs found in the message (at most 3 are checked).
    Returns (signals, score)."""
    signals, to_check = [], []
    score = 0

    def add(name: str, points: int):
        nonlocal score
        if name not in signals:
            signals.append(name)
            score += points

    for raw in raw_urls[:3]:
        url = raw if raw.lower().startswith("http") else "http://" + raw
        host = _host(url)
        if not host:
            continue
        to_check.append(url)

        if "xn--" in host:
            add("Disguised (punycode) domain", 3)
        if "@" in urlparse(url).netloc:
            add("Link mein '@' trick", 3)
        if raw.lower().startswith("http://"):
            add("Link secure (https) nahi hai", 1)
        if host.count(".") >= 4:
            add("Bahut zyada subdomains wala link", 1)
        if _looks_like_brand_fake(host):
            add("Bank/brand jaisa dikhne wala nakli domain", 3)

        if host in SHORTENERS:
            final = expand_short_link(url)
            if final != url:
                to_check.append(final)
                final_host = _host(final)
                # 0 points: this signal only shows where the short link leads
                add("Short link ka asli destination: " + final_host, 0)
                if _looks_like_brand_fake(final_host):
                    add("Bank/brand jaisa dikhne wala nakli domain", 3)

    if _safe_browsing_hit(to_check):
        add("Google Safe Browsing ne is link ko unsafe report kiya hai", 6)

    return signals, score
