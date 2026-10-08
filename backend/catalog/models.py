from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    seller = models.CharField(max_length=150)
    location = models.CharField(max_length=100)
    material = models.CharField(max_length=100)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    image = models.URLField(max_length=1000)
    badge = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name
