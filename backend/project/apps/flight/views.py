from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from apps.flight.models import *
from apps.flight.serializers import *
# Create your views here.


class AircraftViewSet(ModelViewSet):
    queryset = Aircraft.objects.all()
    serializer_class = AircraftSerializer

    