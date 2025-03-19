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
