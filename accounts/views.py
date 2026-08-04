from django.shortcuts import render
from django.views.generic import TemplateView, CreateView, ListView
from . import models
# Create your views here.


class HomeTemplateView(TemplateView):
    template_name = 'accounts/home.html'
    
    
class UserCreateView(CreateView):
    model = models.User
    fields = '__all__'
    template_name ='accounts/create_user.html'
    success_url = 'home'
    
    
class UserListView(ListView):
    model = models.User
    template_name = "accounts/list_user.html"
    context_object_name = 'users'
    


