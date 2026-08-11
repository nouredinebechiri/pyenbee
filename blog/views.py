"""
blog/views.py

Vues du blog SYSLOG.
"""

import re

from django.contrib import messages
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import DetailView, ListView, TemplateView
from django.views.generic.edit import FormView

from .forms import ContactForm
from .models import Article, Category, ContactMessage, Tag


# ---------------------------------------------------------------------------
# Mixin partagé : catégories affichées dans le header/footer (base.html)
# ---------------------------------------------------------------------------

class NavContextMixin:
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["nav_categories"] = Category.objects.all()
        return context


# ---------------------------------------------------------------------------
# Page d'accueil
# ---------------------------------------------------------------------------

class HomeView(NavContextMixin, TemplateView):
    template_name = "blog/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        featured = list(
            Article.published.filter(is_featured=True)
            .select_related("category", "author")[:3]
        )
        # si moins de 3 articles "featured", on complète avec les plus récents
        if len(featured) < 3:
            extra = Article.published.exclude(
                id__in=[a.id for a in featured]
            ).select_related("category", "author")[: 3 - len(featured)]
            featured += list(extra)

        context["hero_main"] = featured[0] if featured else None
        context["hero_side"] = featured[1:3]

        # une section par catégorie, avec ses 3 derniers articles
        category_sections = []
        for category in Category.objects.all():
            articles = list(
                Article.published.filter(category=category)
                .select_related("category", "author")[:3]
            )
            if articles:
                category_sections.append({"category": category, "articles": articles})
        context["category_sections"] = category_sections

        context["popular_articles"] = Article.published.order_by("-views_count")[:4]
        context["all_tags"] = Tag.objects.all()
        return context


# ---------------------------------------------------------------------------
# Détail d'un article
# ---------------------------------------------------------------------------

# capture les <h2 id="...">texte</h2> et <h3 id="...">texte</h3> du contenu HTML
_HEADING_RE = re.compile(r'<h([23])\s+id="([^"]+)"[^>]*>(.*?)</h\1>', re.IGNORECASE | re.DOTALL)


def extract_table_of_contents(html_content):
    """
    Construit le sommaire à partir des <h2 id="..."> / <h3 id="...">
    présents dans le contenu de l'article (voir gabarit dans article.html :
    <h2 id="pourquoi"><span class="num">01.</span>Pourquoi...</h2>).
    """
    toc = []
    for level, heading_id, text in _HEADING_RE.findall(html_content or ""):
        clean_text = re.sub(r"<[^>]+>", "", text).strip()  # retire les balises internes (ex: <span class="num">)
        toc.append({"level": int(level), "id": heading_id, "text": clean_text})
    return toc


class ArticleDetailView(NavContextMixin, DetailView):
    model = Article
    template_name = "blog/article_detail.html"
    context_object_name = "article"
    slug_url_kwarg = "slug"

    def get_queryset(self):
        # un auteur/staff peut prévisualiser son brouillon, sinon on ne sert
        # que les articles publiés
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return Article.objects.select_related("category", "author")
        return Article.published.select_related("category", "author")

    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        # compteur de vues, en excluant l'auteur lui-même
        if self.object.author_id != getattr(request.user, "id", None):
            Article.objects.filter(pk=self.object.pk).update(
                views_count=self.object.views_count + 1
            )
        return response

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        article = self.object

        context["table_of_contents"] = extract_table_of_contents(article.content)

        context["related_articles"] = (
            Article.published.filter(category=article.category)
            .exclude(pk=article.pk)
            .select_related("category")[:3]
        )
        return context


# ---------------------------------------------------------------------------
# Catégorie / Tag (listes filtrées)
# ---------------------------------------------------------------------------

class CategoryDetailView(NavContextMixin, ListView):
    template_name = "blog/category_detail.html"
    context_object_name = "articles"
    paginate_by = 9

    def get_queryset(self):
        self.category = get_object_or_404(Category, slug=self.kwargs["slug"])
        return Article.published.filter(category=self.category).select_related("author")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["category"] = self.category
        return context


class TagDetailView(NavContextMixin, ListView):
    template_name = "blog/tag_detail.html"
    context_object_name = "articles"
    paginate_by = 9

    def get_queryset(self):
        self.tag = get_object_or_404(Tag, slug=self.kwargs["slug"])
        return Article.published.filter(tags=self.tag).select_related("category", "author")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["tag"] = self.tag
        context["all_tags"] = Tag.objects.all()
        return context


# ---------------------------------------------------------------------------
# Pages statiques
# ---------------------------------------------------------------------------

class AboutView(NavContextMixin, TemplateView):
    template_name = "blog/about.html"


class ContactView(NavContextMixin, FormView):
    """
    Enregistre simplement le message en base (ContactMessage), consultable
    depuis l'admin. Aucun envoi d'e-mail.
    """

    template_name = "blog/contact.html"
    form_class = ContactForm
    success_url = reverse_lazy("blog:contact")

    def form_valid(self, form):
        data = form.cleaned_data
        ContactMessage.objects.create(
            name=data["name"],
            email=data["email"],
            subject=data["subject"],
            message=data["message"],
        )
        messages.success(self.request, "Message envoyé, merci ! Je reviens vers vous rapidement.")
        return super().form_valid(form)