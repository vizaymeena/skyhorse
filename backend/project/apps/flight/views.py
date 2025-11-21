from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from apps.flight.models import *
from apps.flight.serializers import *
# Create your views here.


class AircraftViewSet(ModelViewSet):
    queryset = Aircraft.objects.all()
    serializer_class = AircraftSerializer

class AirportNameViewSet(ModelViewSet):
    queryset = AirportName.objects.all()
    serializer_class = AirportNameSerializer

class AirportViewSet(ModelViewSet):
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer

class TerminalViewSet(ModelViewSet):
    queryset = Terminal.objects.all()
    serializer_class = TerminalSerializer

class WeekdayViewSet(ModelViewSet):
    queryset = Weekday.objects.all()
    serializer_class = WeekdaySerializer

class FlightRoute(ModelViewSet):
    queryset = FlightRoute.objects.all()
    serializer_class = FlightRouteSerializer

class FlightLegViewSet(ModelViewSet):
    queryset  = FlightLeg.objects.all()
    serializer_class = FlightLegSerializer

class FlightScheduleViewSet(ModelViewSet):
    queryset = FlightSchedule.objects.all()
    serializer_class = FlightScheduleSerializer

class FareTypeViewSet(ModelViewSet):
    queryset = FareType.objects.all()
    serializer_class = FareTypeSerializer


class FlightClassViewSet(ModelViewSet):
    queryset = FlightClass.objects.all()
    serializer_class = FlightClassSerializer


class FlightClassFareViewSet(ModelViewSet):
    queryset = FlightClassFare.objects.all()
    serializer_class = FlightClassFareSerializer


class FlightSeatViewSet(ModelViewSet):
    queryset = FlightSeat.objects.all()
    serializer_class = FlightSeatSerializer


class PassengerViewSet(ModelViewSet):
    queryset = Passenger.objects.all()
    serializer_class = PassengerSerializer