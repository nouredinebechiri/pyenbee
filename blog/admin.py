"""
blog/admin.py

Enregistrement des modèles du blog dans l'admin Django.
"""

from django.contrib import admin
from django.utils.html import format_html

from .models import Article, Category, ContactMessage, Tag


# ---------------------------------------------------------------------------
# Category
# ---------------------------------------------------------------------------

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "color", "article_count")
    list_filter = ("color",)
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("name",)

    @admin.display(description="nb. articles")
    def article_count(self, obj):
        return obj.articles.count()


# ---------------------------------------------------------------------------
# Tag
# ---------------------------------------------------------------------------

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "article_count")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("name",)

    @admin.display(description="nb. articles")
    def article_count(self, obj):
        return obj.articles.count()


# ---------------------------------------------------------------------------
# Article
# ---------------------------------------------------------------------------

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "author",
        "status",
        "is_featured",
        "published_at",
        "views_count",
        "reading_time_display",
        "cover_thumbnail",
    )
    list_display_links = ("title",)
    list_filter = ("status", "is_featured", "category", "tags")
    search_fields = ("title", "excerpt", "content")
    prepopulated_fields = {"slug": ("title",)}
    autocomplete_fields = ("author", "category", "tags")
    date_hierarchy = "published_at"
    readonly_fields = ("created_at", "updated_at", "views_count", "cover_preview")
    actions = ["mark_as_published", "mark_as_draft", "mark_as_featured", "unmark_as_featured"]

    fieldsets = (
        ("Contenu", {
            "fields": ("title", "slug", "excerpt", "content")
        }),
        ("Image de couverture", {
            "fields": ("cover_image", "cover_preview", "cover_caption")
        }),
        ("Classement", {
            "fields": ("category", "tags", "author")
        }),
        ("Publication", {
            "fields": ("status", "is_featured", "published_at")
        }),
        ("Statistiques", {
            "fields": ("views_count", "created_at", "updated_at"),
            "classes": ("collapse",),
        }),
    )

    @admin.display(description="temps de lecture")
    def reading_time_display(self, obj):
        return f"{obj.reading_time} min"

    @admin.display(description="aperçu")
    def cover_thumbnail(self, obj):
        if obj.cover_image:
            return format_html(
                '<img src="{}" style="height:36px; border-radius:3px;" />', obj.cover_image.url
            )
        return "—"

    @admin.display(description="aperçu de l'image")
    def cover_preview(self, obj):
        if obj.cover_image:
            return format_html(
                '<img src="{}" style="max-height:220px; border-radius:6px;" />', obj.cover_image.url
            )
        return "Aucune image"

    @admin.action(description="Passer en publié")
    def mark_as_published(self, request, queryset):
        updated = queryset.update(status=Article.Status.PUBLISHED)
        self.message_user(request, f"{updated} article(s) publié(s).")

    @admin.action(description="Repasser en brouillon")
    def mark_as_draft(self, request, queryset):
        updated = queryset.update(status=Article.Status.DRAFT)
        self.message_user(request, f"{updated} article(s) repassé(s) en brouillon.")

    @admin.action(description="Mettre en avant (hero)")
    def mark_as_featured(self, request, queryset):
        updated = queryset.update(is_featured=True)
        self.message_user(request, f"{updated} article(s) mis en avant.")

    @admin.action(description="Retirer de la mise en avant")
    def unmark_as_featured(self, request, queryset):
        updated = queryset.update(is_featured=False)
        self.message_user(request, f"{updated} article(s) retiré(s) de la mise en avant.")


# ---------------------------------------------------------------------------
# ContactMessage
# ---------------------------------------------------------------------------

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("subject", "name", "email", "created_at", "is_read")
    list_filter = ("is_read", "created_at")
    search_fields = ("name", "email", "subject", "message")
    readonly_fields = ("name", "email", "subject", "message", "created_at")
    actions = ["mark_as_read", "mark_as_unread"]

    @admin.action(description="Marquer comme lu")
    def mark_as_read(self, request, queryset):
        updated = queryset.update(is_read=True)
        self.message_user(request, f"{updated} message(s) marqué(s) comme lu(s).")

    @admin.action(description="Marquer comme non lu")
    def mark_as_unread(self, request, queryset):
        updated = queryset.update(is_read=False)
        self.message_user(request, f"{updated} message(s) marqué(s) comme non lu(s).")