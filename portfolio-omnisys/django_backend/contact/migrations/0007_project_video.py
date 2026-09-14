from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("contact", "0006_attestation_category")]

    operations = [
        migrations.AddField(
            model_name="project",
            name="video_url",
            field=models.CharField(
                blank=True,
                help_text="Chemin public ou URL MP4/WebM de la vidéo du projet",
                max_length=500,
            ),
        ),
    ]
