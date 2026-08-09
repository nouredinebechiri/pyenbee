from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from taggit.managers import TaggableManager


class Blog(models.Model):
    title = models.CharField(max_length=500)
    content = models.TextField()
    date = models.DateField(auto_now_add=True)
    img = models.ImageField(upload_to='config/images/blog/')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = TaggableManager()

    def __str__(self):
        return self.title


class Category(models.Model):
    """
    Grande rubrique du blog (ex: Sécurité, Infrastructure, Virtualisation).
    Le champ `color` correspond aux classes .tag / .tag.amber / .tag.red
    du template, pour garder la cohérence visuelle par thématique.
    """

    class Color(models.TextChoices):
        TEAL = "teal", "Teal (défaut)"
        AMBER = "amber", "Ambre"
        RED = "red", "Rouge"

    name = models.CharField("nom", max_length=80, unique=True)
    slug = models.SlugField("slug", max_length=90, unique=True, blank=True)
    description = models.CharField("description", max_length=255, blank=True)
    color = models.CharField("couleur du tag", max_length=10, choices=Color.choices, default=Color.TEAL)

    class Meta:
        verbose_name = "catégorie"
        verbose_name_plural = "catégories"
        ordering = ["name"]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("blog:category_detail", kwargs={"slug": self.slug})


    