from django.urls import path
from . import views


urlpatterns = [
    path('home', views.index, name='index'),
    path('book-create', views.BookCreate.as_view(), name='book_create'),
    path('book-list', views.BookList.as_view(), name='book_list'),
    path('book-detail/<int:pk>', views.BookDetail.as_view(), name='book_detail'),
]
