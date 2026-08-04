from django.urls import path
from . import views

urlpatterns = [
    path('home', views.HomeTemplateView.as_view(), name='home'),
    path('create-user', views.UserCreateView.as_view(), name='create_user'),
    path('list-user', views.UserListView.as_view(), name='list_user'),
]


