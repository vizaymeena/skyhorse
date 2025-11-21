from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.flight.views import (
    AircraftViewSet,
    AirportNameViewSet,
    AirportViewSet,
    TerminalViewSet,
    WeekdayViewSet,
    FlightRoute,
    FlightLegViewSet,
    FlightScheduleViewSet,
    FareTypeViewSet,
    FlightClassViewSet,
    FlightClassFareViewSet,
    FlightSeatViewSet,
    PassengerViewSet,
)

router = DefaultRouter()

router.register("aircraft", AircraftViewSet)
router.register("airport-names", AirportNameViewSet)
router.register("airports", AirportViewSet)
router.register("terminals", TerminalViewSet)
router.register("weekdays", WeekdayViewSet)
router.register("flight-routes", FlightRoute)
router.register("flight-legs", FlightLegViewSet)
router.register("flight-schedules", FlightScheduleViewSet)
router.register("fare-types", FareTypeViewSet)
router.register("flight-classes", FlightClassViewSet)
router.register("flight-class-fares", FlightClassFareViewSet)
router.register("flight-seats", FlightSeatViewSet)
router.register("passengers", PassengerViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
