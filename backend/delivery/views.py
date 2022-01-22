import requests
import json
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
	api_view,
	permission_classes
)
from django.contrib.staticfiles import finders
from .serializers import DeliverySerializer

from .models import Delivery

AccessLicenseNumber = '0DAF0615AF5FC01A'
Username = 'brabox123'
Password = 'Brabox2012'
transId = 'Transaction123'
transactionSrc = 'GG'
	

def set_shipper(shipper, payload, ship_from=False):
	shipper['Name'] = payload['Name']
	shipper['AttentionName'] = payload['AttentionName']
	shipper['TaxIdentificationNumber'] = payload['TaxIdentificationNumber']
	shipper['Phone'] = { 'Number': payload['Phone'] }
	
	if ship_from:
		shipper['ShipperNumber'] = payload['ShipperNumber']

	shipper['Address'] = {
		"AddressLine": payload['Address']['AddressLine'],
		"City": payload['Address']['City'],
		"StateProvinceCode": payload['Address']['StateProvinceCode'],
		"PostalCode": payload['Address']['PostalCode'],
		"CountryCode": payload['Address']['CountryCode']
	}


@api_view(['POST'])
def profile(request):
	if (not request.user):
		return JsonResponse({'status': 'Must be logged in!'})

	UPS = 'https://wwwcie.ups.com/ship/v1/shipments'
	headers = {
		'AccessLicenseNumber': AccessLicenseNumber,
		'Username' : Username, 
		'Password' : Password,
		'transId' : transId,
		'transactionSrc' : transactionSrc
	}

	with open(finders.find('request.json'), 'r') as file:
		request_json: dict = json.loads(file.read())
		shipper = request_json['ShipmentRequest']['Shipment']['Shipper']
		ship_to = request_json['ShipmentRequest']['Shipment']['ShipTo']
		ship_from = request_json['ShipmentRequest']['Shipment']['ShipFrom']

		set_shipper(shipper, request.data['shipper'], True)		
		set_shipper(ship_from, request.data['shipper'], True)
		set_shipper(ship_to, request.data['reciever'])

		request_json['ShipmentRequest']['Shipment']['PaymentInformation']['ShipmentCharge']['BillShipper']['AccountNumber'] = request.data['shipper']['ShipperNumber']

		res = requests.post(UPS, headers=headers, json=request_json)
		res = res.json()['ShipmentResponse']
		

		customer_info = {
			"cost": res['ShipmentResults']['ShipmentCharges']['TotalCharges'],
			"label": res['ShipmentResults']['PackageResults']['ShippingLabel']['GraphicImage'],
			"tracking": res['ShipmentResults']['ShipmentIdentificationNumber']
		}

		delivery = Delivery(carrier_name='ups', tracking_number=customer_info['tracking'], label=customer_info['label'], price=customer_info['cost']['MonetaryValue'] )
		delivery.save()
	
		return JsonResponse(customer_info)

@api_view(['GET'])
def ups_dashboard(request):
	delivery = Delivery.objects.filter(carrier_name='ups')
	delivery_serializer = DeliverySerializer(delivery, many=True)

	return JsonResponse({'deliveries': delivery_serializer.data})

@api_view(['GET'])
def ebay_dashboard(request):
	delivery = Delivery.objects.filter(carrier_name='ebay')
	delivery_serializer = DeliverySerializer(delivery, many=True)

	return JsonResponse({'deliveries': delivery_serializer.data})

@api_view(['GET'])
def dashboard(request):
	delivery = Delivery.objects.all()
	delivery_serializer = DeliverySerializer(delivery, many=True)

	return JsonResponse({'deliveries': delivery_serializer.data})