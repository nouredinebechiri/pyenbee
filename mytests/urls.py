from django.urls import path
from . import views

urlpatterns = [
    path('', views.car_list, name='car_list'),
    path('add-car', views.add_car, name='add_car'),
    path('delete-car', views.delete_car, name='delete_car')
]
