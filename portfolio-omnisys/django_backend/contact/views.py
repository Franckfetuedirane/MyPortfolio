import json
import logging
import smtplib

from django.conf import settings
from django.core.mail import EmailMessage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import ContactMessage, PortfolioItem, Project

logger = logging.getLogger(__name__)


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
        EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.CONTACT_RECIPIENT],
            reply_to=[email],
        ).send(fail_silently=False)
    except (TimeoutError, smtplib.SMTPServerDisconnected):
        logger.exception("Le serveur SMTP Gmail ne répond pas")
        return JsonResponse(
            {"detail": "Le message a été enregistré, mais Gmail ne répond pas depuis cette connexion réseau. Réessayez ou utilisez un autre réseau."},
            status=503,
        )
    except smtplib.SMTPAuthenticationError:
        logger.exception("Authentification SMTP Gmail refusée")
        return JsonResponse(
            {"detail": "Le message a été enregistré, mais Gmail refuse les identifiants SMTP. Vérifiez le mot de passe d'application."},
            status=502,
        )
    except Exception:
        logger.exception("Impossible d'envoyer le message de contact par email")
        return JsonResponse(
            {"detail": "Le message a été enregistré, mais l'envoi email a échoué. Vérifiez la configuration Gmail."},
            status=502,
        )

    return JsonResponse({"id": contact.id, "detail": "Message envoyé avec succès."}, status=201)
