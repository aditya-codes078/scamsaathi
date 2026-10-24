# ScamSaathi backend (Django)

Same API as before: `POST /analyze` with `{"text": "..."}` returns
`risk_level`, `signals`, `explanation`, `safe_actions`.

## Run locally (Windows PowerShell, one line at a time)
    python -m venv venv
    .\venv\Scripts\Activate.ps1
    python -m pip install -r requirements.txt
    $env:GEMINI_API_KEY="your-key"      # optional, rules work without it
    python manage.py runserver 8000

## Deploy on Render
- Root Directory: backend
- Build Command: pip install -r requirements.txt
- Start Command: gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
- Environment variables: GEMINI_API_KEY (optional), DJANGO_SECRET_KEY (use Render's Generate)

## Files
- config/       Django settings, urls, wsgi
- analyzer/views.py      the two endpoints (/ and /analyze)
- analyzer/engine.py     rules + link checks + optional Gemini
- analyzer/url_check.py  deeper link checks
- analyzer/ai_check.py   Gemini call (can only raise risk, never lower it)
