import json
import logging
import smtplib
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from django.conf import settings
from django.core.mail import EmailMessage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import ContactMessage, PortfolioItem, Project

logger = logging.getLogger(__name__)


def send_contact_email(subject, body, reply_to):
    if not settings.BREVO_API_KEY:
        return EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.CONTACT_RECIPIENT],
            reply_to=[reply_to],
        ).send(fail_silently=False)

    payload = {
        "sender": {
            "name": settings.BREVO_SENDER_NAME,
            "email": settings.BREVO_SENDER_EMAIL,
        },
        "to": [{"email": settings.CONTACT_RECIPIENT}],
        "replyTo": {"email": reply_to},
        "subject": subject,
        "textContent": body,
    }
    request = Request(
        "https://api.brevo.com/v3/smtp/email",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "api-key": settings.BREVO_API_KEY,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method="POST",
    )
    with urlopen(request, timeout=settings.EMAIL_TIMEOUT) as response:
        return response.status in (200, 201, 202)


def projects(request):
    if request.method != "GET":
        return JsonResponse({"detail": "Méthode non autorisée."}, status=405)
    data = list(Project.objects.filter(is_published=True).values(
        "id", "title", "category", "status", "description", "technologies", "image_url", "video_url", "icon", "color"
    ))
    return JsonResponse(data, safe=False)


def portfolio_items(request):
    if request.method != "GET":
        return JsonResponse({"detail": "Méthode non autorisée."}, status=405)
    data = list(PortfolioItem.objects.filter(is_published=True).values(
        "id", "title", "description", "category", "media_type", "year", "file_url", "accent"
    ))
    return JsonResponse(data, safe=False)


@csrf_exempt
def contact_message(request):
    if request.method != "POST":
        return JsonResponse({"detail": "Méthode non autorisée."}, status=405)

    try:
        payload = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"detail": "Le corps de la requête doit être un JSON valide."}, status=400)

    name = str(payload.get("name", "")).strip()
    email = str(payload.get("email", "")).strip()
    message = str(payload.get("message", "")).strip()

    if not name or not email or not message:
        return JsonResponse({"detail": "Le nom, l'email et le message sont obligatoires."}, status=400)
    if len(name) > 120 or len(message) > 5000 or "@" not in email:
        return JsonResponse({"detail": "Les données envoyées sont invalides."}, status=400)

    contact = ContactMessage.objects.create(name=name, email=email, message=message)
    subject = f"Nouveau message portfolio de {name}"
    body = f"Nom : {name}\nEmail : {email}\n\nMessage :\n{message}"

    try:
        send_contact_email(subject, body, email)
    except HTTPError:
        logger.exception("Le service email a refusé le message de contact")
        return JsonResponse(
            {"detail": "Le message a été enregistré, mais le service email a refusé l'envoi. Vérifiez la clé API Brevo et l'adresse expéditeur validée."},
            status=502,
        )
    except (TimeoutError, URLError, smtplib.SMTPServerDisconnected):
        logger.exception("Le service email ne répond pas")
        return JsonResponse(
            {"detail": "Le message a été enregistré, mais le service email ne répond pas. Vérifiez la configuration Brevo."},
            status=503,
        )
    except smtplib.SMTPAuthenticationError:
        logger.exception("Authentification SMTP Gmail refusée")
        return JsonResponse(
            {"detail": "Le message a été enregistré, mais Gmail refuse les identifiants SMTP. Vérifiez le mot de passe d'application."},
            status=502,
        )
    except Exception:
        logger.exception("Impossible d'envoyer le message de contact")
        return JsonResponse(
            {"detail": "Le message a été enregistré, mais l'envoi email a échoué. Vérifiez la clé API Brevo et l'adresse expéditeur validée."},
            status=502,
        )

    return JsonResponse({"id": contact.id, "detail": "Message envoyé avec succès."}, status=201)
