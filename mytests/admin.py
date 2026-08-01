from django.contrib import admin
from .models import Car

class CarAdmin(admin.ModelAdmin):
    list_display = ['model', 'brand', 'year', 'added']
    list_editable = ['year']
    list_filter = ['brand', 'year']
    search_fields = ['model', 'brand']

admin.site.register(Car, CarAdmin)


