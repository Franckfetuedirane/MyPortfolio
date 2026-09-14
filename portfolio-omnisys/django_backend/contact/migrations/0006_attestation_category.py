from django.db import migrations, models


def move_bachelor_to_attestation(apps, schema_editor):
    PortfolioItem = apps.get_model("contact", "PortfolioItem")
    PortfolioItem.objects.filter(title="Attestation de Bachelor").update(category="Attestation")


class Migration(migrations.Migration):
    dependencies = [("contact", "0005_seed_project_images")]

    operations = [
        migrations.AlterField(
            model_name="portfolioitem",
            name="category",
            field=models.CharField(
                choices=[
                    ("Parcours académique", "Parcours académique"),
                    ("Attestation", "Attestation"),
                    ("Parcours professionnel", "Parcours professionnel"),
                    ("Terrain & réalisations", "Terrain & réalisations"),
                ],
                max_length=60,
            ),
        ),
        migrations.RunPython(move_bachelor_to_attestation, migrations.RunPython.noop),
    ]
