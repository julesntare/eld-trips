from django.urls import path
from .views import TripIdListView, TripListView, TripListCreateView, ELDLogListView

urlpatterns = [
    path('trips/', TripListCreateView.as_view(), name='trip-list-create'),
    path('trips', TripListView.as_view(), name='trips-list'),
    path('trips/<int:id>', TripIdListView.as_view(), name='trips-id-list'),
    path('trips/<int:trip_id>/logs/', ELDLogListView.as_view(), name='log-list'),
]
