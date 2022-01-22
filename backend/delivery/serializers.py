from rest_framework import serializers
from .models import Delivery

class DeliverySerializer(serializers.ModelSerializer):

	class Meta:
		model = Delivery
		fields = ['carrier_name', 'tracking_number', 'price']