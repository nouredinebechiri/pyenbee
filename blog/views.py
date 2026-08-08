from django.shortcuts import render

# Create your views here.

def index_blog(request):
    return render(request, 'blog/index.html', {})

def posts_blog(request):
    return render(request, 'blog/posts.html', {})

def about_blog(request):
    return render(request, 'blog/about.html', {})

def tutorials_blog(request):
    return render(request, 'blog/tutorials.html', {})

def categories_blog(request):
    return render(request, 'blog/categories.html', {})

def linux(request):
    return render(request, 'blog/posts/linux.html')
