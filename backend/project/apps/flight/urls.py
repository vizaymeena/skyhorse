from rest_framework.routers import DefaultRouter
from django.urls import path,include
from apps.flight.views import *

router = DefaultRouter()

router.register("aircraft", AircraftViewSet, basename="aircraft")


urlpatterns=[
    path("",include(router.urls))
]
