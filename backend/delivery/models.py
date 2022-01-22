from django.db import models

# Create your models here.
class Delivery(models.Model):
	carrier_name = models.CharField(max_length=5)
	tracking_number = models.CharField(max_length=40)
	label = models.ImageField()
	price = models.DecimalField(max_digits=8, decimal_places=2)


