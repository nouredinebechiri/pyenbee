from django.urls import path
from . import views

urlpatterns = [
    path('', views.index_blog, name='index_blog'),
    path('posts', views.posts_blog, name='posts_blog'),
    path('about', views.about_blog, name='about_blog'),
    path('tutorials', views.tutorials_blog, name='tutorials_blog'),
    path('categories', views.categories_blog, name='categories_blog'),
    path('post/linux', views.linux, name='linux'),
]
