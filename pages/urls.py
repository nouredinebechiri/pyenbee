from django.urls import path, include
from . import views


app_name = 'pages'

urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.About.as_view(), name='about'),
    path('blog/', include('blog.urls')),
]