from apps.flight.models import *
from rest_framework.serializers import serializers 

class AircraftSerializer(serializers.ModelSerializer):

    class Meta:
        model = Aircraft
    pass


class AirportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Airport
    pass


class TerminalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Terminal
    pass


class WeekdaySerializer(serializers.ModelSerializer):

    class Meta:
        model = Weekday
    pass

class FlightRouteSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlightRoute
    pass

class FlightLegSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlightLeg
    pass

class FlightScheduleSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlightSchedule
    pass

class FareTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = FareType
    pass


class FlightClassSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlightClass
    pass

class FlightClassFareSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlightClassFare
    pass


class FlightSeatSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlightSeat
    pass

class PassengerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Passenger
    pass