from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
	api_view,
	permission_classes
)

from .serializers import UserSerializer
import os

# Create your views here.
def login(request):
	if request.method == 'POST':
		return HttpResponse('Login Success')
	
	return HttpResponseNotAllowed('Invalid Request')
	
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
	# get tracking info for user
	# get user
	# check password hash

	
	
	# user_serializer = UserSerializer(request.user)
	

	# print(user_serializer.data)
	if (not request.user):
		return JsonResponse({'status': 'User not found'})

	user_serializer = UserSerializer(request.user)
	return JsonResponse({'user': user_serializer.data})

@api_view(['POST'])
def register(request):
	
	username = request.data.get('username', '')
	password = request.data.get('password', '')
	email = request.data.get('email', '')

	found = User.objects.filter(username=username)

	if len(found):
		return JsonResponse({'status':'User already exists!'})
	

	user = User.objects.create_user(
		username=username,
		email=email,
		password=password
	)

	user.save()



	return JsonResponse({'status':'User added!'})