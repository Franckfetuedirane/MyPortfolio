from django.db import models


class Project(models.Model):
    class Category(models.TextChoices):
        SOFTWARE = "Logiciel", "Logiciel"
        CLOUD = "Cloud", "Cloud"
        ELECTROTECHNICAL = "Électrotechnique", "Électrotechnique"

    class Status(models.TextChoices):
        IN_PROGRESS = "En cours", "En cours"
        COMPLETED = "Terminé", "Terminé"

    title = models.CharField(max_length=160)
    category = models.CharField(max_length=40, choices=Category.choices)
    status = models.CharField(max_length=30, choices=Status.choices, default=Status.IN_PROGRESS)
    description = models.TextField()
    technologies = models.JSONField(default=list, blank=True)
    image_url = models.CharField(max_length=500, blank=True, help_text="Chemin public, par exemple /projet/installation.jpg")
    video_url = models.CharField(max_length=500, blank=True, help_text="Chemin public ou URL MP4/WebM de la vidéo du projet")
    icon = models.CharField(max_length=40, default="Code2")
    color = models.CharField(max_length=120, default="from-blue-500 to-cyan-400")
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "-created_at"]

    def __str__(self):
        return self.title


class PortfolioItem(models.Model):
    class Category(models.TextChoices):
        ACADEMIC = "Parcours académique", "Parcours académique"
        ATTESTATION = "Attestation", "Attestation"
        PROFESSIONAL = "Parcours professionnel", "Parcours professionnel"
        FIELD = "Terrain & réalisations", "Terrain & réalisations"

    class MediaType(models.TextChoices):
        PDF = "PDF", "PDF"
        IMAGE = "Image", "Image"

    title = models.CharField(max_length=160)
    description = models.TextField()
    category = models.CharField(max_length=60, choices=Category.choices)
    media_type = models.CharField(max_length=10, choices=MediaType.choices)
    year = models.CharField(max_length=20, blank=True)
    file_url = models.CharField(max_length=500, help_text="Chemin public, par exemple /baccalauréat.pdf")
    accent = models.CharField(max_length=20, default="blue")
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "-created_at"]
        verbose_name = "élément de parcours"
        verbose_name_plural = "éléments de parcours"

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "message de contact"
        verbose_name_plural = "messages de contact"

    def __str__(self):
        return f"{self.name} - {self.email}"
