from django.urls import path
from . import views

urlpatterns = [
    path('home', views.Home.as_view(), name='home'),
    path('create-user', views.CreateUser.as_view(), name='create_user'),
    path('list-user', views.ListUser.as_view(), name='list_user'),
    path('detail-user/<int:pk>', views.DetailUser.as_view(), name='detail_user'),
    path('update-user/<int:user_id>', views.update_user, name='update_user')
]


