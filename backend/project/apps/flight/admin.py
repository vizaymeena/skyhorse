from django.contrib import admin
from apps.flight.models import *
# Register your models here.
admin.site.register([Aircraft,Airport,Terminal,FlightRoute,FlightLeg,FlightSchedule,FareType,FlightClass,FlightClassFare,Weekday,FlightSeat,Passenger])