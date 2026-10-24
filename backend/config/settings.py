"""Minimal Django settings for the ScamSaathi API (no database needed)."""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# On Render set DJANGO_SECRET_KEY in Environment Variables (never commit a real key)
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "dev-only-change-me")
DEBUG = os.getenv("DJANGO_DEBUG", "0") == "1"

ALLOWED_HOSTS = os.getenv(
    "DJANGO_ALLOWED_HOSTS", "scamsaathi.onrender.com,localhost,127.0.0.1"
).split(",")
if os.getenv("RENDER_EXTERNAL_HOSTNAME"):  # Render sets this automatically
    ALLOWED_HOSTS.append(os.environ["RENDER_EXTERNAL_HOSTNAME"])

INSTALLED_APPS = ["corsheaders", "analyzer"]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # must stay first
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

DATABASES = {}  # we store nothing
USE_TZ = True
APPEND_SLASH = False
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Which websites may call this API from the browser
CORS_ALLOWED_ORIGINS = ["https://scamsaathi.netlify.app"]
CORS_ALLOWED_ORIGIN_REGEXES = [r"^http://localhost:\d+$", r"^http://127\.0\.0\.1:\d+$"]
