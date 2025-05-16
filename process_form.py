import os
from flask import Flask, request, jsonify, render_template
from flask.cli import load_dotenv
from flask_mail import Mail, Message
from flask_cors import CORS
import traceback
import logging

# Configuration du logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Configuration CORS plus permissive pour le développement
CORS(app, resources={
    r"/*": {
        "origins": ["http://127.0.0.1:5500", "http://localhost:5500"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})
load_dotenv()

# Configuration de Flask-Mail avec plus de logs
logger.info("=== Configuration du serveur de mail ===")
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'franckfetuef@gmail.com'
app.config['MAIL_PASSWORD'] = 'tobb hpjk uyyf tish'
app.config['MAIL_DEFAULT_SENDER'] = 'franckfetuef@gmail.com'

logger.info(f"MAIL_SERVER: {app.config['MAIL_SERVER']}")
logger.info(f"MAIL_PORT: {app.config['MAIL_PORT']}")
logger.info(f"MAIL_USE_TLS: {app.config['MAIL_USE_TLS']}")
logger.info(f"MAIL_USERNAME: {app.config['MAIL_USERNAME']}")
logger.info(f"MAIL_DEFAULT_SENDER: {app.config['MAIL_DEFAULT_SENDER']}")
logger.info("=== Fin de la configuration ===")

mail = Mail(app)

@app.route('/process_form', methods=['POST'])
def process_form():
    try:
        logger.info("=== Début du traitement du formulaire ===")
        
        # Récupération des données du formulaire
        name = request.form.get('floatingName', '')
        email = request.form.get('floatingEmail', '')
        subject = request.form.get('floatingSubject', '')
        message = request.form.get('floatingMessage', '')

        logger.info(f"Données reçues:")
        logger.info(f"Nom: {name}")
        logger.info(f"Email: {email}")
        logger.info(f"Sujet: {subject}")
        logger.info(f"Message: {message}")

        # Création du message
        logger.info("Création du message email...")
        msg = Message(
            subject=f"Nouveau message de {name}: {subject}",
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=['franckfetuef@gmail.com']
        )
        msg.body = f"""
Nouveau message reçu du portfolio:

Nom: {name}
Email: {email}
Sujet: {subject}

Message:
{message}
"""
        logger.info("Tentative d'envoi de l'email...")
        
        try:
            mail.send(msg)
            logger.info("Email envoyé avec succès!")
            return jsonify({
                'status': 'success',
                'message': 'Votre message a été envoyé avec succès!'
            })
        except Exception as mail_error:
            logger.error(f"Erreur lors de l'envoi de l'email: {str(mail_error)}")
            logger.error(f"Détails de l'erreur: {traceback.format_exc()}")
            return jsonify({
                'status': 'error',
                'message': f'Erreur lors de l\'envoi de l\'email: {str(mail_error)}'
            }), 500
            
    except Exception as e:
        error_details = traceback.format_exc()
        logger.error("=== ERREUR DÉTAILLÉE ===")
        logger.error(error_details)
        logger.error("=== FIN DE L'ERREUR ===")
        return jsonify({
            'status': 'error',
            'message': f'Une erreur s\'est produite: {str(e)}'
        }), 500

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    # Vérification de la configuration au démarrage
    print("=== Configuration du serveur ===")
    print(f"MAIL_SERVER: {app.config['MAIL_SERVER']}")
    print(f"MAIL_PORT: {app.config['MAIL_PORT']}")
    print(f"MAIL_USE_TLS: {app.config['MAIL_USE_TLS']}")
    print(f"MAIL_USERNAME: {app.config['MAIL_USERNAME']}")
    print(f"MAIL_DEFAULT_SENDER: {app.config['MAIL_DEFAULT_SENDER']}")
    print("=== Fin de la configuration ===")
    app.run(debug=True)

