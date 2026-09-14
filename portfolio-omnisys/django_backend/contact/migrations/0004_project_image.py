from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("contact", "0003_seed_field_items")]

    operations = [
        migrations.AddField(
            model_name="project",
            name="image_url",
            field=models.CharField(
                blank=True,
                help_text="Chemin public, par exemple /projet/installation.jpg",
                max_length=500,
            ),
        ),
    ]
