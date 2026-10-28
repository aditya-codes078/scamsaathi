"""
official_domains.py: starter list of OFFICIAL websites for the "official source check".

How it is used: a link is "official" only if its address IS one of these domains or a
subdomain of it (so sbi.co.in.evil.com or notsbi.co.in never match).

IMPORTANT
- This is a small STARTER list. Before the event, open each site once and make sure the
  domain is right, and add more banks, apps and services (a great job for a teammate).
- "Not in the list" does NOT mean fake. It only means we could not confirm it.
- An official link does not prove the MESSAGE is genuine. It only shows where the link goes.
"""

# (domain, organisation). A link matches if its host equals the domain or ends with "." + domain.
OFFICIAL_DOMAINS = [
    ("sbi.co.in", "State Bank of India"),
    ("onlinesbi.sbi", "State Bank of India"),
    ("hdfcbank.com", "HDFC Bank"),
    ("icicibank.com", "ICICI Bank"),
    ("axisbank.com", "Axis Bank"),
    ("pnbindia.in", "Punjab National Bank"),
    ("bankofbaroda.in", "Bank of Baroda"),
    ("canarabank.com", "Canara Bank"),
    ("unionbankofindia.co.in", "Union Bank of India"),
    ("kotak.com", "Kotak Mahindra Bank"),
    ("rbi.org.in", "Reserve Bank of India"),
    ("npci.org.in", "NPCI (UPI)"),
    ("irctc.co.in", "IRCTC"),
    ("paytm.com", "Paytm"),
    ("phonepe.com", "PhonePe"),
]

# Indian government addresses (only government bodies can register these), e.g. cybercrime.gov.in
GOV_SUFFIXES = ("gov.in", "nic.in")
GOV_NAME = "Government of India website"


def _clean(host):
    host = (host or "").lower().strip(".")
    return host[4:] if host.startswith("www.") else host


def classify_host(host):
    """Returns (status, organisation): status is "official", "lookalike" or "unknown"."""
    host = _clean(host)
    if not host:
        return "unknown", ""
    for suffix in GOV_SUFFIXES:
        if host == suffix or host.endswith("." + suffix):
            return "official", GOV_NAME
    for domain, name in OFFICIAL_DOMAINS:
        if host == domain or host.endswith("." + domain):
            return "official", name
    # an official address hidden inside a different address, e.g. hdfcbank.com.verify-now.xyz
    for suffix in GOV_SUFFIXES:
        if suffix + "." in host:
            return "lookalike", GOV_NAME
    for domain, name in OFFICIAL_DOMAINS:
        if domain in host:
            return "lookalike", name
    return "unknown", ""
