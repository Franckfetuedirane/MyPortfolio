from django.db import migrations


PROJECT_IMAGE_FILES = [
    "WhatsApp Image 2026-09-13 at 14.51.41 (1).jpeg",
    "WhatsApp Image 2026-09-13 at 14.51.41.jpeg",
    "WhatsApp Image 2026-09-13 at 14.51.42.jpeg",
    "WhatsApp Image 2026-09-13 at 14.51.43 (1).jpeg",
    "WhatsApp Image 2026-09-13 at 14.51.43.jpeg",
    "WhatsApp Image 2026-09-13 at 14.51.44 (1).jpeg",
    "WhatsApp Image 2026-09-13 at 14.51.44.jpeg",
    "WhatsApp Image 2026-09-13 at 14.51.45.jpeg",
    "WhatsApp Image 2026-09-13 at 14.51.49 (1).jpeg",
    "WhatsApp Image 2026-09-13 at 14.51.49.jpeg",
]


def seed_project_images(apps, schema_editor):
    Project = apps.get_model("contact", "Project")
    for index, filename in enumerate(PROJECT_IMAGE_FILES, start=1):
        Project.objects.get_or_create(
            title=f"Projet électrotechnique {index:02d}",
            defaults={
                "category": "Électrotechnique",
                "status": "Terminé" if index % 3 else "En cours",
                "description": "Réalisation électrotechnique documentée sur le terrain : installation, diagnostic, maintenance et mise en service.",
                "technologies": ["Électrotechnique", "Maintenance", "Diagnostic"],
                "image_url": f"/projet/{filename}",
                "icon": "Zap",
                "color": "from-emerald-500 to-green-400",
                "sort_order": index + 4,
            },
        )


class Migration(migrations.Migration):
    dependencies = [("contact", "0004_project_image")]

    operations = [migrations.RunPython(seed_project_images, migrations.RunPython.noop)]
