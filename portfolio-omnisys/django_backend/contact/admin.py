from django.contrib import admin

from .models import ContactMessage, PortfolioItem, Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "status", "is_published", "sort_order", "updated_at")
    list_filter = ("category", "status", "is_published")
    search_fields = ("title", "description", "image_url", "video_url")
    list_editable = ("status", "is_published", "sort_order")


@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "media_type", "year", "is_published", "sort_order")
    list_filter = ("category", "media_type", "is_published")
    search_fields = ("title", "description", "file_url")
    list_editable = ("is_published", "sort_order")


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "created_at", "is_read")
    list_filter = ("is_read", "created_at")
    search_fields = ("name", "email", "message")
    readonly_fields = ("created_at",)
