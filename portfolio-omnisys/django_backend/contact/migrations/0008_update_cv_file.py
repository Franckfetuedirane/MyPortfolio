from django.db import migrations


OLD_CV_PATH = "/CV_2026-08-14_Franck Dirane_TCHUMAMO FETUE.pdf"
NEW_CV_PATH = "/CV_2026-10-16_Franck Dirane_TCHUMAMO FETUE.pdf"


def update_cv_path(apps, schema_editor):
    portfolio_item = apps.get_model("contact", "PortfolioItem")
    portfolio_item.objects.filter(
        title="Curriculum vitae",
        file_url=OLD_CV_PATH,
    ).update(file_url=NEW_CV_PATH, year="2026")


def restore_cv_path(apps, schema_editor):
    portfolio_item = apps.get_model("contact", "PortfolioItem")
    portfolio_item.objects.filter(
        title="Curriculum vitae",
        file_url=NEW_CV_PATH,
    ).update(file_url=OLD_CV_PATH)


class Migration(migrations.Migration):
    dependencies = [("contact", "0007_project_video")]

    operations = [migrations.RunPython(update_cv_path, restore_cv_path)]
