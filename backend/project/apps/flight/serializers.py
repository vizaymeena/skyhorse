from apps.flight.models import *
from rest_framework.serializers import serializers 

class AircraftSerializer(serializers.Serializer):
    # Write only fields
    AIRCRAFT_TYPES=[("small","Small"),("large","Large"),("big","Big")]
    aircraft_type=serializers.ChoiceField(choices=AIRCRAFT_TYPES)
    id = serializers.PositiveIntegerField(read_only=True)
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
    
    # ========= CREATE ========
    def create(self,validated_data):
        return Aircraft.objects.create(**validated_data)

    # ========= UPDATE =========
    def update(self,instance,validated_data):
        instance.seat_capacity = validated_data.get("seat_capacity", instance.seat_capacity)
        instance.business_seats = validated_data.get("business_seats", instance.business_seats)
        instance.economy_seats = validated_data.get("economy_seats", instance.economy_seats)
        instance.firstclass_seats = validated_data.get("firstclass_seats",instance.firstclass_seats)
        instance.save()

        return instance



class AirportSerializer(serializers.ModelSerializer):
    id = serializers.PositiveIntegerField(read_only=True)
    is_international=serializers.BooleanField(read_only=True)
    is_active=serializers.BooleanField(read_only=True)

    class Meta:
           model = Airport
           fields = "__all__"


    def validate(self,data):
         # check whether the value is of a data type or not.
        if not isinstance(data["name"],str):
            raise serializers.ValidationError("Airport name must be a valid string and does note contains numeric values")
        
        if len(data["name"].strip()) < 8:
         raise serializers.ValidationError("airport name cannot be less than 8 digits")
        
        if len(data["code"]) < 6:
         raise serializers.ValidationError("airport code must be in b/w 6-10 digits")
        
        if not (-90 <= data["latitude"] <= 90):
            raise serializers.ValidationError("Latitude must be between -90 and 90 degrees.")
        
        if not (-180 <= data["longitude"] <= 180):
            raise serializers.ValidationError("Longitude must be between -180 and 180 degrees.")
        
        if data.get("latitude")==0 and data.get("longitude")==0:
            raise serializers.ValidationError("Latitude and Longitude cannot both be zero.")
       
        return data
        
class TerminalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Terminal
        fields="__all__"
        read_only_field="id"

    # ======== VALIDATION ========
    def validate(self,data):
       terminal = data.get("terminal_name")
       if len(terminal) < 4 and len(terminal) > 10:
           raise serializers.ValidationError("terminal name must be in b/w 4-10 digits")
       
       return data
            
    
class WeekdaySerializer(serializers.ModelSerializer):

    class Meta:
        model = Weekday
        fields = "__all__"
        read_only_fields=["id"]
    

class FlightRouteSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlightRoute
        read_only_fields=["id"]

    def validate(self, data):
        origin = data.get("origin")
        destination = data.get("destination")
        airline = data.get("airline")
        flight_number = data.get("flight_number")
        operational_days = data.get("operational_days")

        # origin and destination must be different
        if origin == destination:
            raise serializers.ValidationError("Origin and destination cannot be the same airport.")

        # Flight number must be unique per airline
        if FlightRoute.objects.filter(
            airline=airline, 
            flight_number=flight_number
        ).exists():
            raise serializers.ValidationError("This flight number already exists for this airline.")

        # Must have at least one operational day
        if not operational_days:
            raise serializers.ValidationError("At least one operational day must be selected.")

        return data

        

class FlightLegSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlightLeg
    def validate(self, data):
        route = data.get("route")
        stop_order = data.get("stop_order")
        origin = data.get("origin")
        destination = data.get("destination")
        departure = data.get("departure_time")
        arrival = data.get("arrival_time")

        # origin and destination must be different
        if origin == destination:
            raise serializers.ValidationError("Origin and destination cannot be the same for a flight leg.")

        # stop_order must be unique inside a route
        if FlightLeg.objects.filter(route=route, stop_order=stop_order).exists():
            raise serializers.ValidationError("Stop order already exists for this route.")

        # departure time must be before arrival
        if departure >= arrival:
            raise serializers.ValidationError("Departure time must be earlier than arrival time.")

        return data

    

class FlightScheduleSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlightSchedule
    def validate(self, data):
        status = data.get("status")
        delay = data.get("delay_minutes")
        rescheduled_to = data.get("rescheduled_to")
        departure = data.get("departure_time")
        arrival = data.get("arrival_time")
        flight_date = data.get("flight_date")

        # departure before arrival
        if departure >= arrival:
            raise serializers.ValidationError("Departure time must be earlier than arrival time.")

        # delay only when status is delayed
        if status != "delayed" and delay:
            raise serializers.ValidationError("Delay minutes should only be set if flight is delayed.")

        # require delay when delayed
        if status == "delayed" and not delay:
            raise serializers.ValidationError("Delay minutes required when the flight is delayed.")

        # rescheduled_to only allowed if status is rescheduled
        if status != "rescheduled" and rescheduled_to:
            raise serializers.ValidationError("Rescheduled datetime only applies when status is rescheduled.")        # require rescheduled_to
        if status == "rescheduled" and not rescheduled_to:
            raise serializers.ValidationError("Rescheduled datetime is required when status is 'rescheduled'.")

        # Flight date cannot be in the past
        from datetime import date
        if flight_date < date.today():
            raise serializers.ValidationError("Flight date cannot be in the past.")

        return data

    

class FareTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = FareType
    def validate(self, data):
        name = data.get("name")
        baggage = data.get("baggage_allowance_kg", 0)
        extra_baggage_allowed = data.get("extra_baggage_allowed")

        # name should be unique
        if FareType.objects.filter(name__iexact=name).exists():
            raise serializers.ValidationError("A fare type with this name already exists.")

        # baggage cannot be negative (safety even though model field protects it)
        if baggage < 0:
            raise serializers.ValidationError("Baggage allowance cannot be negative.")

        # If extra baggage allowed, base baggage must be > 0
        if extra_baggage_allowed and baggage == 0:
            raise serializers.ValidationError(
                "Extra baggage cannot be allowed when base baggage allowance is zero."
            )

        return data


class FlightClassSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlightClass
    def validate(self, data):
        schedule = data.get("scheduled_flight")
        name = data.get("name")
        capacity = data.get("capacity")

        # ensure class name is unique per flight schedule
        if FlightClass.objects.filter(scheduled_flight=schedule, name=name).exists():
            raise serializers.ValidationError("This class type already exists for this scheduled flight.")

        # capacity cannot exceed aircraft capacity
        aircraft_capacity = schedule.aircraft.seat_capacity
        if capacity > aircraft_capacity:
            raise serializers.ValidationError("Class capacity cannot exceed aircraft seat capacity.")

        return data

class FlightClassFareSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlightClassFare
    def validate(self, data):
        flight_class = data.get("flight_class")
        fare_type = data.get("fare_type")
        price = data.get("price")
        # Price must be positive
        if price <= 0:
            raise serializers.ValidationError("Price must be greater than zero.")
        # Avoid duplicate fares
        if FlightClassFare.objects.filter(flight_class=flight_class, fare_type=fare_type).exists():
            raise serializers.ValidationError("This fare type already exists for this class.")

        return data

    


class FlightSeatSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlightSeat
    
    def validate(self, data):
        flight_class = data.get("flight_class")
        fare = data.get("flight_class_fare")
        seat_number = data.get("seat_number")

        # seat number must be unique inside class
        if FlightSeat.objects.filter(flight_class=flight_class, seat_number=seat_number).exists():
            raise serializers.ValidationError("Seat number already exists for this class.")

        # fare must belong to same class
        if fare.flight_class != flight_class:
            raise serializers.ValidationError("Selected fare does not belong to this flight class.")

        return data

    

class PassengerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Passenger

    def validate(self, data):
        passenger_type = data.get("passenger_type")
        guardian = data.get("guardian")
        email = data.get("email")
        contact = data.get("contact_number")

        # Child/infant must have adult guardian
        if passenger_type in ("child", "infant") and not guardian:
            raise serializers.ValidationError("Child or infant must be linked to an adult guardian.")

        # Adult cannot have a guardian
        if passenger_type == "adult" and guardian:
            raise serializers.ValidationError("Adult passengers cannot have a guardian.")

        # At least email or phone required (business rule)
        if not email and not contact:
            raise serializers.ValidationError("Provide either email or contact number.")

        return data

    