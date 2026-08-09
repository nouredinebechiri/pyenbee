from django.urls import path
from . import views


app_name = 'blog'

urlpatterns = [
    path('', views.index, name='index'),
    path('posts', views.posts, name='posts'),
    path('about', views.about, name='about'),
    path('tutorials', views.tutorials, name='tutorials'),
    path('categories', views.categories, name='categories'),
    path('post/linux', views.linux, name='linux'),
]
