This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Django du formulaire de contact

Le formulaire utilise le backend Django situé dans `django_backend/`. En production, les messages et les données du portfolio sont enregistrés dans PostgreSQL et envoyés à `franckfetue@gmail.com` lorsque SMTP Gmail est configuré.

### Lancer l'API en local

```powershell
cd django_backend
python -m pip install -r requirements.txt
Copy-Item .env.example .env
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```

## Déployer le backend sur Render

Le fichier `render.yaml` crée le service web Django et sa base PostgreSQL. Dans Render, utilisez **New > Blueprint**, sélectionnez le dépôt, puis vérifiez les variables marquées `sync: false` :

- `DJANGO_ALLOWED_HOSTS` : le domaine Render de l'API, par exemple `portfolio-django-api.onrender.com`
- `CORS_ALLOWED_ORIGINS` : l'origine exacte du frontend AWS, sans slash final, par exemple `https://www.monsite.com`
- `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, `DEFAULT_FROM_EMAIL` et `CONTACT_RECIPIENT`

Après le déploiement, vérifiez `https://VOTRE-API.onrender.com/health/`. Dans l'environnement de build du frontend AWS, définissez `NEXT_PUBLIC_DJANGO_API_URL` sur `https://VOTRE-API.onrender.com`, puis relancez le build Next.js. Le formulaire accepte aussi l'override optionnel `NEXT_PUBLIC_DJANGO_CONTACT_URL` sur `https://VOTRE-API.onrender.com/api/contact/`. Les routes publiques disponibles sont `/api/contact/`, `/api/projects/` et `/api/portfolio-items/`.

Le backend est configuré pour envoyer par SMTP Gmail. Activez la validation en deux étapes, créez un mot de passe d'application, puis renseignez `EMAIL_HOST_PASSWORD` dans `django_backend/.env`. N'utilisez jamais le mot de passe normal du compte Gmail.

L'administration des messages est disponible sur `http://127.0.0.1:8000/admin/`. Créez un administrateur avec `python manage.py createsuperuser`.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
