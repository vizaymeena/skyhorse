from apps.flight.models import *
from rest_framework.serializers import serializers 

class AircraftSerializer(serializers.Serializer):
    # Write only fields
    AIRCRAFT_TYPES=[("small","Small"),("large","Large"),("big","Big")]
    aircraft_type=serializers.ChoiceField(choices=AIRCRAFT_TYPES)
    seat_capacity=serializers.PositiveIntegerField()
    economy_seats=serializers.PositiveIntegerField()
    business_seats=serializers.PositiveIntegerField()
    firstclass_seats=serializers.PositiveIntegerField()
    is_active=serializers.BooleanField(read_only=True)   # Read only field

    # validation 
    Limits = {
        "small":60,
        "large":100,
        "big":200
    }

    def validate(self,data):
        total = data["economy_seats"] + data["business_seats"] + data["firstclass_seats"] # total seats
        max_capacity = self.Limits[data["aircraft_type"]] # type based seat capacity

        if total < 0:
            raise serializers.ValidationError("sum of total seat types cannot be 0")
        
        if total != data["seat_capacity"]:
            raise serializers.ValidationError("total of seat type should match seat capacity")
        
        if data["seat_capacity"] <= 0:
            raise serializers.ValidationError("seat capacity cannot be 0 or less than it ")
        
        if data["seat_capacity"] > max_capacity:
            raise serializers.ValidationError(
                f"${data["aircraft_type"].capitalize()} aircraft cannot exceed {max_capacity} seats"
            )

        return data
   


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