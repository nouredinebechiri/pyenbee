from django.contrib import admin
from .models import Blog, Category
# Register your models here.
admin.site.register(Blog)


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