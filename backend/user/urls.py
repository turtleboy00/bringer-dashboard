from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from . import views

urlpatterns = [
    path('', views.profile),
    path('login/', views.login),
    path('register/', views.register),
    path('token/', TokenObtainPairView.as_view()),
    path('refresh-token/', TokenRefreshView.as_view()),
]