from django.urls import path

from .views import contact_message, portfolio_items, projects

urlpatterns = [
    path("contact/", contact_message, name="contact-message"),
    path("projects/", projects, name="projects"),
    path("portfolio-items/", portfolio_items, name="portfolio-items"),
]
