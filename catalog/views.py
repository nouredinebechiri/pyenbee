from django.shortcuts import render
from . import models
from django.views import generic


def index(request):
    num_books = models.Book.objects.all().count()
    num_book_intance = models.BookInstance.objects.all().count()
    num_book_available = models.BookInstance.objects.filter(status__exact='a').count()
    
    context = {
        'num_books': num_books,
        'num_book_intance': num_book_intance,
        'num_book_available': num_book_available
    }
    return render(request, 'catalog/index.html', context)


class BookCreate(generic.CreateView):
    model = models.Book
    fields = '__all__'
    template_name = 'catalog/book_create.html'
    success_url = 'home'


class BookList(generic.ListView):
    model = models.Book
    template_name = 'catalog/book_list.html'
    context_object_name = 'books'
    

class BookDetail(generic.DeleteView):
    model = models.Book
    template_name = 'catalog/book_detail.html'
    context_object_name = 'book'

    


