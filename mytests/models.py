from django.db import models

class Account(models.Model):
    """
        username = str,
        password = str
    """
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)


class Car(models.Model):
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.CharField(max_length=50)
    added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.model

    class Meta:
        verbose_name_plural = 'Car List'