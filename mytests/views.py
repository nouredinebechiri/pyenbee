from django.shortcuts import render, redirect
from .models import Car, Account
from .forms import RegisterForm


def register(request):
    if request.method == 'POST':
        username_in = request.POST.get('username_f')
        password_in = request.POST.get('password_f')
        user = Account(username=username_in, password=password_in)
        user.save()
        print(f"------------- user {user} created")
        return redirect ('user_list')
    else:
        return render(request, 'mytests/register.html', {'register_form': RegisterForm})

def user_list(request):
    users = Account.objects.all()
    return render(request, 'mytests/user_list.html', {'users': users})

def car_list(request):
    id_del = request.GET.get('pk') 
    cars = Car.objects.all()

    context = {
        'pk': id_del,
        'cars': cars
    }
    return render(request, 'mytests/car_list.html', context)

def add_car(request):
    if request.method == 'POST':
        brand_in = request.POST.get('brand')
        model_in = request.POST.get('model')
        year_in = request.POST.get('year')
        Car.objects.create(brand=brand_in, model=model_in, year=year_in)  
        return redirect('car_list')
    else:
        return render(request, 'mytests/add_car.html')

def delete_car(request):
    if request.method == 'POST':
        try:
            car_id = request.POST.get('pk')
            Car.objects.get(id=car_id).delete()
            print(20*'-', car_id)
            return redirect(f"/mytests/?pk={car_id}")
        except:
            return render(request, 'mytests/delete_car.html')
    else:
        #return redirect(f'/mytests/car-list?pk={request.GET.get('pk')}')
        return render(request, 'mytests/delete_car.html')

