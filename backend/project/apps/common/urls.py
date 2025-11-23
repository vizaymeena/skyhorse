from rest_framework.routers import DefaultRouter
from django.urls import path,include
from apps.common.views import ServiceProviderViewSet
routes = DefaultRouter()

routes.register("serviceprovider",ServiceProviderViewSet,basename="serviceprovider")

urlpatterns=[
    path("",include(routes.urls))
]