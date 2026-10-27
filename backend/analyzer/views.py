import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .engine import LANGS, analyze_text


def health(request):
    return JsonResponse({"status": "ok", "service": "ScamSaathi API"})


@csrf_exempt  # public JSON API, no cookies or sessions are used
@require_http_methods(["POST"])
def analyze(request):
    """POST /analyze  body: {"text": "...", "lang": "en" | "hi"}
    ->  risk_level, signals, signal_labels, explanation, safe_actions"""
    try:
        data = json.loads(request.body or b"{}")
    except json.JSONDecodeError:
        return JsonResponse({"detail": "Invalid JSON"}, status=400)

    if not isinstance(data, dict) or not isinstance(data.get("text"), str):
        return JsonResponse({"detail": "'text' (a string) is required"}, status=422)

    lang = data.get("lang", "en")
    if lang not in LANGS:
        lang = "en"

    return JsonResponse(analyze_text(data["text"][:10000], lang), json_dumps_params={"ensure_ascii": False})
