from django.shortcuts import get_object_or_404, render, redirect
from django.http import HttpResponse
from django.views.generic import TemplateView, CreateView, ListView, DetailView
from . import models
from . import forms

class Home(TemplateView):
    template_name = 'accounts/home.html'
    
    
class CreateUser(CreateView):
    model = models.User
    fields = '__all__'
    template_name ='accounts/create_user.html'
    success_url = 'home'
    
    
class ListUser(ListView):
    model = models.User
    template_name = "accounts/list_user.html"
    context_object_name = 'users'

    
class DetailUser(DetailView):
    model = models.User
    template_name = 'accounts/detail_user.html'
    context_object_name = 'data_user'


def update_user(request, user_id):
    user = get_object_or_404(models.User, id=user_id) 

    if request.method == 'POST':
        # user = models.User.objects.filter(id=user_id)
        # fname_in = request.POST.get('first_name')
        # lname_in = request.POST.get('first_name')
        # age_in = request.POST.get('age')
        # user.update(first_name=fname_in, last_name=lname_in, age=age_in)

        user_form = forms.UserForm(request.POST, instance=user)
        user_form.save()

        return redirect('list_user')
    else:
        user_form = forms.UserForm(instance=user)

    return render(request, 'accounts/update_user.html', {'user_form': forms.UserForm})
    