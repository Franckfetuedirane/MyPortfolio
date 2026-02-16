import os
import logging
import traceback

from flask import Flask, request, jsonify
from flask.cli import load_dotenv
from flask_cors import CORS
from flask_mail import Mail, Message

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configuration CORS permissive pour le developpement local
CORS(app, resources={
    r"/*": {
        "origins": ["http://127.0.0.1:5500", "http://localhost:5500"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True,
    }
})

# Charge .env si present, sinon continue avec les variables d'environnement systeme
load_dotenv()


def _required_env(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise RuntimeError(f"Variable d'environnement manquante: {name}")
    return value


# Configuration Flask-Mail
logger.info("=== Configuration du serveur mail ===")
app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER", "smtp.gmail.com").strip()
app.config["MAIL_PORT"] = int(os.getenv("MAIL_PORT", "587").strip())
app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS", "true").strip().lower() in {"1", "true", "yes", "on"}
app.config["MAIL_USERNAME"] = _required_env("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = _required_env("MAIL_PASSWORD").replace(" ", "")
app.config["MAIL_DEFAULT_SENDER"] = _required_env("MAIL_DEFAULT_SENDER")

logger.info("MAIL_SERVER: %s", app.config["MAIL_SERVER"])
logger.info("MAIL_PORT: %s", app.config["MAIL_PORT"])
logger.info("MAIL_USE_TLS: %s", app.config["MAIL_USE_TLS"])
logger.info("MAIL_USERNAME: %s", app.config["MAIL_USERNAME"])
logger.info("MAIL_DEFAULT_SENDER: %s", app.config["MAIL_DEFAULT_SENDER"])
logger.info("=== Fin de la configuration ===")

mail = Mail(app)


@app.route("/process_form", methods=["POST"])
def process_form():
    try:
        logger.info("=== Debut du traitement du formulaire ===")

        name = request.form.get("floatingName", "").strip()
        email = request.form.get("floatingEmail", "").strip()
        subject = request.form.get("floatingSubject", "").strip()
        message = request.form.get("floatingMessage", "").strip()

        logger.info("Donnees recues - Nom: %s, Email: %s, Sujet: %s", name, email, subject)

        msg = Message(
            subject=f"Nouveau message de {name}: {subject}",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[app.config["MAIL_DEFAULT_SENDER"]],
        )
        msg.body = (
            "Nouveau message recu du portfolio:\n\n"
            f"Nom: {name}\n"
            f"Email: {email}\n"
            f"Sujet: {subject}\n\n"
            "Message:\n"
            f"{message}\n"
        )

        logger.info("Tentative d'envoi de l'email...")
        mail.send(msg)
        logger.info("Email envoye avec succes")

        return jsonify({
            "status": "success",
            "message": "Votre message a ete envoye avec succes!",
        })

    except Exception as error:
        logger.error("Erreur lors de l'envoi de l'email: %s", str(error))
        logger.error("Details: %s", traceback.format_exc())
        return jsonify({
            "status": "error",
            "message": "Erreur lors de l'envoi de l'email. Verifiez la configuration SMTP.",
        }), 500


if __name__ == "__main__":
    print("=== Configuration du serveur ===")
    print(f"MAIL_SERVER: {app.config['MAIL_SERVER']}")
    print(f"MAIL_PORT: {app.config['MAIL_PORT']}")
    print(f"MAIL_USE_TLS: {app.config['MAIL_USE_TLS']}")
    print(f"MAIL_USERNAME: {app.config['MAIL_USERNAME']}")
    print(f"MAIL_DEFAULT_SENDER: {app.config['MAIL_DEFAULT_SENDER']}")
    print("=== Fin de la configuration ===")
    app.run(debug=True)