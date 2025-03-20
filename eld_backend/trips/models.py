from django.db import models


class Trip(models.Model):
    current_location = models.CharField(max_length=255)
    current_location_lat = models.FloatField(default=0)
    current_location_lng = models.FloatField(default=0)
    pickup_location = models.CharField(max_length=255)
    pickup_location_lat = models.FloatField(default=0)
    pickup_location_lng = models.FloatField(default=0)
    dropoff_location = models.CharField(max_length=255)
    dropoff_location_lat = models.FloatField(default=0)
    dropoff_location_lng = models.FloatField(default=0)
    current_cycle_used = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Trip from {self.pickup_location} to {self.dropoff_location}"

    def generate_eld_logs(self):
        # Example logic for generating logs based on HOS rules
        logs = []

        # Calculate driving time, rest breaks, etc.
        driving_time = 11  # Example: 11 hours of driving
        rest_breaks = 0.5  # Example: 30-minute rest break

        # Create log data
        log_data = {
            'driving_time': driving_time,
            'rest_breaks': rest_breaks,
            'total_hours': self.current_cycle_used + driving_time + rest_breaks,
        }

        # Save the log
        ELDLog.objects.create(trip=self, log_data=log_data)

        return log_data


class ELDLog(models.Model):
    trip = models.ForeignKey(
        Trip, on_delete=models.CASCADE, related_name='logs')
    log_data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ELD Log for Trip {self.trip.id}"
