from rest_framework import serializers
from .models import Trip, ELDLog


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'

    def create(self, validated_data):
        trip = Trip.objects.create(**validated_data)
        trip.generate_eld_logs()  # Generate logs after creating the trip
        return trip


class ELDLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ELDLog
        fields = '__all__'
