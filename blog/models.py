"""
blog/models.py

Modèles Django pour le site SYSLOG (blog IT).

Hypothèses reprises de ton architecture existante :
- Tu as déjà une app `accounts` avec un CustomUser (AUTH_USER_MODEL) :
  les FK vers l'auteur pointent donc sur settings.AUTH_USER_MODEL plutôt
  que de dupliquer un modèle Author.
- Pillow est installé (nécessaire pour les ImageField).
"""

import math

from django.conf import settings
from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.text import slugify

import markdown


# ---------------------------------------------------------------------------
# Catégorie & Tag
# ---------------------------------------------------------------------------

class Category(models.Model):
    """
    Grande rubrique du blog (ex: Sécurité, Linux, Virtualisation).
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
    color = models.CharField(
        "couleur du tag", max_length=10, choices=Color.choices, default=Color.TEAL
    )

    class Meta:
        verbose_name = "catégorie"
        verbose_name_plural = "catégories"
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("blog:category_detail", kwargs={"slug": self.slug})


class Tag(models.Model):
    """Étiquette libre affichée dans le nuage de tags de la sidebar (#linux, #docker...)."""

    name = models.CharField("nom", max_length=50, unique=True)
    slug = models.SlugField("slug", max_length=60, unique=True, blank=True)

    class Meta:
        verbose_name = "tag"
        verbose_name_plural = "tags"
        ordering = ["name"]

    def __str__(self):
        return f"#{self.name}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("blog:tag_detail", kwargs={"slug": self.slug})


# ---------------------------------------------------------------------------
# Article
# ---------------------------------------------------------------------------

class PublishedArticleManager(models.Manager):
    """Retourne uniquement les articles publiés (statut + date <= maintenant)."""

    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .filter(status=Article.Status.PUBLISHED, published_at__lte=timezone.now())
        )


class Article(models.Model):
    """Un article du blog (~/categorie/slug.md dans le template)."""

    class Status(models.TextChoices):
        DRAFT = "draft", "Brouillon"
        PUBLISHED = "published", "Publié"
        ARCHIVED = "archived", "Archivé"

    title = models.CharField("titre", max_length=200)
    slug = models.SlugField("slug", max_length=220, unique=True, blank=True)

    excerpt = models.CharField(
        "chapô",
        max_length=300,
        blank=True,
        help_text="Résumé court affiché sur les cartes et sous le titre (.excerpt / .dek).",
    )    
     
    content = models.TextField(
        "contenu",
        help_text="Corps de l'article. Peut être écrit en Markdown si tu utilises "
        "django-markdownx / mistune côté rendu.",
    )

    cover_image = models.ImageField(
        "image de couverture", upload_to="articles/covers/%Y/%m/", blank=True, null=True
    )
    cover_caption = models.CharField("légende de l'image", max_length=200, blank=True)

    category = models.ForeignKey(
        Category,
        verbose_name="catégorie",
        related_name="articles",
        on_delete=models.PROTECT,
    )
    tags = models.ManyToManyField(Tag, verbose_name="tags", related_name="articles", blank=True)

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name="auteur",
        related_name="articles",
        on_delete=models.PROTECT,
    )

    status = models.CharField(
        "statut", max_length=10, choices=Status.choices, default=Status.DRAFT
    )
    is_featured = models.BooleanField(
        "mis en avant",
        default=False,
        help_text="Affiché dans le grand encart du hero en page d'accueil.",
    )

    published_at = models.DateTimeField("publié le", default=timezone.now)
    created_at = models.DateTimeField("créé le", auto_now_add=True)
    updated_at = models.DateTimeField("modifié le", auto_now=True)

    views_count = models.PositiveIntegerField("nombre de vues", default=0)

    objects = models.Manager()          # manager par défaut (tous les statuts)
    published = PublishedArticleManager()  # articles publiés uniquement

    class Meta:
        verbose_name = "article"
        verbose_name_plural = "articles"
        ordering = ["-published_at"]
        indexes = [
            models.Index(fields=["-published_at"]),
            models.Index(fields=["status"]),
        ]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("blog:article_detail", kwargs={"slug": self.slug})

    @property
    def reading_time(self):
        """Temps de lecture estimé en minutes, ~200 mots/minute (arrondi au-dessus)."""
        word_count = len(self.content.split())
        return max(1, math.ceil(word_count / 200))

    @property
    def is_published(self):
        return self.status == self.Status.PUBLISHED and self.published_at <= timezone.now()

    @property
    def rendered_markdown(self):
        return markdown.markdown(
            self.content,
            extensions=['toc', 'fenced_code', 'tables'],
    )
        


# ---------------------------------------------------------------------------
# Message de contact
# ---------------------------------------------------------------------------

class ContactMessage(models.Model):
    """
    Trace en base de chaque soumission du formulaire de contact.
    Consultable et gérable depuis l'admin Django (pas d'envoi d'e-mail).
    """

    name = models.CharField("nom", max_length=100)
    email = models.EmailField("e-mail")
    subject = models.CharField("sujet", max_length=150)
    message = models.TextField("message")

    created_at = models.DateTimeField("reçu le", auto_now_add=True)
    is_read = models.BooleanField("lu", default=False)

    class Meta:
        verbose_name = "message de contact"
        verbose_name_plural = "messages de contact"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.subject} — {self.name} ({self.email})"