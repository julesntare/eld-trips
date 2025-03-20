from rest_framework import generics
from .models import Trip, ELDLog
from .serializers import TripSerializer, ELDLogSerializer


class TripListCreateView(generics.ListCreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer


class ELDLogListView(generics.ListAPIView):
    serializer_class = ELDLogSerializer

    def get_queryset(self):
        trip_id = self.kwargs['trip_id']
        return ELDLog.objects.filter(trip_id=trip_id)

class TripIdListView(generics.ListAPIView):
    serializer_class = TripSerializer

    def get_queryset(self):
        trip_id = self.kwargs['id']
        return Trip.objects.filter(id=trip_id)

class TripListView(generics.ListAPIView):
    serializer_class = TripSerializer

    def get_queryset(self):
        return Trip.objects.all()