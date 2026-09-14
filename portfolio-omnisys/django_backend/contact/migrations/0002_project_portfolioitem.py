from django.db import migrations, models


def seed_portfolio_data(apps, schema_editor):
    Project = apps.get_model("contact", "Project")
    PortfolioItem = apps.get_model("contact", "PortfolioItem")

    project_rows = [
        ("TechFix App", "Logiciel", "En cours", "Plateforme backend robuste développée avec Django. Gestion de bases de données relationnelles, migrations complexes et environnements virtuels sécurisés Python.", ["Python", "Django", "PostgreSQL", "Scripts"], "Code2", "from-blue-500 to-cyan-400"),
        ("Infrastructure OmniSys", "Cloud", "Terminé", "Déploiement d'une architecture haute disponibilité sur AWS. Conteneurisation des services et mise en place d'un pipeline CI/CD.", ["AWS EC2", "Docker", "DevOps", "Linux"], "Cloud", "from-orange-500 to-amber-400"),
        ("Fresh Natura Web", "Logiciel", "En cours", "Conception architecturale pour un écosystème digital, avec optimisation de l'interface et structuration des données.", ["Next.js", "UI/UX", "Architecture", "Figma"], "Code2", "from-blue-500 to-cyan-400"),
        ("Contrôle Puissance", "Électrotechnique", "Terminé", "Diagnostic et maintenance de systèmes matériels, configuration BIOS, pilotes et gestion de l'alimentation électrique.", ["Hardware", "Circuits", "Maintenance", "BIOS"], "Zap", "from-emerald-500 to-green-400"),
    ]
    for order, row in enumerate(project_rows):
        Project.objects.get_or_create(title=row[0], defaults={"category": row[1], "status": row[2], "description": row[3], "technologies": row[4], "icon": row[5], "color": row[6], "sort_order": order})

    item_rows = [
        ("Baccalauréat scientifique", "Le socle académique de mon parcours d'ingénieur.", "Parcours académique", "PDF", "2018", "/baccalauréat.pdf", "blue"),
        ("BTS en électrotechnique", "Formation pratique dédiée aux installations électriques et à l'automatisation.", "Parcours académique", "PDF", "2021", "/Bts.pdf", "orange"),
        ("Attestation de Bachelor", "Spécialisation en génie logiciel et architecture des systèmes.", "Parcours académique", "PDF", "2024", "/attestation_bachelor.pdf", "emerald"),
        ("Relevé de notes B3", "Détail de mon parcours de troisième année.", "Parcours académique", "PDF", "2024", "/relevé de notes B3.pdf", "violet"),
        ("Relevé du baccalauréat", "Relevé officiel de la première étape académique.", "Parcours académique", "PDF", "2018", "/relevé_bacc.pdf", "blue"),
        ("Curriculum vitae", "Mon parcours complet, mes expériences et mes technologies.", "Parcours professionnel", "PDF", "2026", "/CV_2026-08-14_Franck Dirane_TCHUMAMO FETUE.pdf", "cyan"),
    ]
    item_rows.extend(
        (
            f"Trace de terrain {index + 1:02d}",
            "Une immersion dans mon environnement de travail et la mise en œuvre de solutions concrètes.",
            "Terrain & réalisations",
            "Image",
            "2026",
            f"/photo_{index + 1}_2026-09-13_11-42-49.jpg",
            "blue" if index % 2 == 0 else "orange",
        )
        for index in range(11)
    )
    for order, row in enumerate(item_rows):
        PortfolioItem.objects.get_or_create(title=row[0], defaults={"description": row[1], "category": row[2], "media_type": row[3], "year": row[4], "file_url": row[5], "accent": row[6], "sort_order": order})


class Migration(migrations.Migration):
    dependencies = [
        ("contact", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="PortfolioItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=160)),
                ("description", models.TextField()),
                ("category", models.CharField(choices=[("Parcours académique", "Parcours académique"), ("Parcours professionnel", "Parcours professionnel"), ("Terrain & réalisations", "Terrain & réalisations")], max_length=60)),
                ("media_type", models.CharField(choices=[("PDF", "PDF"), ("Image", "Image")], max_length=10)),
                ("year", models.CharField(blank=True, max_length=20)),
                ("file_url", models.CharField(help_text="Chemin public, par exemple /baccalauréat.pdf", max_length=500)),
                ("accent", models.CharField(default="blue", max_length=20)),
                ("sort_order", models.PositiveIntegerField(default=0)),
                ("is_published", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["sort_order", "-created_at"], "verbose_name": "élément de parcours", "verbose_name_plural": "éléments de parcours"},
        ),
        migrations.CreateModel(
            name="Project",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=160)),
                ("category", models.CharField(choices=[("Logiciel", "Logiciel"), ("Cloud", "Cloud"), ("Électrotechnique", "Électrotechnique")], max_length=40)),
                ("status", models.CharField(choices=[("En cours", "En cours"), ("Terminé", "Terminé")], default="En cours", max_length=30)),
                ("description", models.TextField()),
                ("technologies", models.JSONField(blank=True, default=list)),
                ("icon", models.CharField(default="Code2", max_length=40)),
                ("color", models.CharField(default="from-blue-500 to-cyan-400", max_length=120)),
                ("sort_order", models.PositiveIntegerField(default=0)),
                ("is_published", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["sort_order", "-created_at"]},
        ),
        migrations.RunPython(seed_portfolio_data, migrations.RunPython.noop),
    ]
