from django.db import models


class Car(models.Model):
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.CharField(max_length=50)

    def __str__(self):
        return self.model