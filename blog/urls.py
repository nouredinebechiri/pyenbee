from django.urls import path

from . import views

app_name = "blog"

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path("articles/<slug:slug>/", views.ArticleDetailView.as_view(), name="article_detail"),
    path("categorie/<slug:slug>/", views.CategoryDetailView.as_view(), name="category_detail"),
    path("tag/<slug:slug>/", views.TagDetailView.as_view(), name="tag_detail"),
    path("recherche/", views.SearchAPIView.as_view(), name="search_api"),
    path("a-propos/", views.AboutView.as_view(), name="about"),
    path("contact/", views.ContactView.as_view(), name="contact"),
]