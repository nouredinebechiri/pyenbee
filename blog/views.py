from django.shortcuts import render
from .models import *
# Create your views here.

def index(request):
    all_blogs = Blog.objects.all().order_by('-id')
    return render(request, 'blog/index.html', {'all_blogs':all_blogs})

def posts(request):
    return render(request, 'blog/posts.html', {})

def about(request):
    return render(request, 'blog/about.html', {})

def tutorials(request):
    return render(request, 'blog/tutorials.html', {})

def categories(request):
    return render(request, 'blog/categories.html', {})

def linux(request):
    return render(request, 'blog/posts/linux.html')
