from django.urls import re_path
from . import views

urlpatterns = [
    re_path('^$', views.dashboard),
    re_path(r'ups/$', views.ups_dashboard),
    re_path(r'ebay/$', views.ebay_dashboard),
    re_path(r'ups/create-label/$', views.profile)
]