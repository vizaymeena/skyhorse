from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from apps.common.models import *
from apps.common.serializer import ServiceProviderSerializer

# Create your views here.

class ServiceProviderViewSet(ModelViewSet):
    queryset = ServiceProvider.objects.all()
    serializer_class = ServiceProviderSerializer