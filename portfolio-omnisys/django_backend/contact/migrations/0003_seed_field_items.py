from django.db import migrations


def seed_field_items(apps, schema_editor):
    PortfolioItem = apps.get_model("contact", "PortfolioItem")
    for index in range(11):
        PortfolioItem.objects.get_or_create(
            title=f"Trace de terrain {index + 1:02d}",
            defaults={
                "description": "Une immersion dans mon environnement de travail et la mise en œuvre de solutions concrètes.",
                "category": "Terrain & réalisations",
                "media_type": "Image",
                "year": "2026",
                "file_url": f"/photo_{index + 1}_2026-09-13_11-42-49.jpg",
                "accent": "blue" if index % 2 == 0 else "orange",
                "sort_order": index + 6,
            },
        )


class Migration(migrations.Migration):
    dependencies = [("contact", "0002_project_portfolioitem")]

    operations = [migrations.RunPython(seed_field_items, migrations.RunPython.noop)]
