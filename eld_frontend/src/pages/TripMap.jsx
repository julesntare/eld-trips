import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import axios from "axios";
import L from "leaflet";

// Fix for default marker icons in Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const TripMap = () => {
  const { trip_id } = useParams();
  const [trip, setTrip] = useState(null);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/trips/${trip_id}/`
        );
        setTrip(response.data);

        // Example: Generate a route (you can replace this with actual route data from an API)
        const exampleRoute = [
          [
            response.data.current_location_lat,
            response.data.current_location_lng,
          ], // Current location
          [
            response.data.pickup_location_lat,
            response.data.pickup_location_lng,
          ], // Pickup location
          [
            response.data.dropoff_location_lat,
            response.data.dropoff_location_lng,
          ], // Dropoff location
        ];
        setRoute(exampleRoute);
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    };
    fetchTrip();
  }, [trip_id]);

  if (!trip) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Trip Map: {trip.pickup_location} to {trip.dropoff_location}
      </Typography>
      <MapContainer
        center={[trip.current_location_lat, trip.current_location_lng]} // Center map on current location
        zoom={6}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polyline positions={route} color="blue" />
        <Marker
          position={[trip.current_location_lat, trip.current_location_lng]}
        >
          <Popup>Current Location</Popup>
        </Marker>
        <Marker position={[trip.pickup_location_lat, trip.pickup_location_lng]}>
          <Popup>Pickup Location</Popup>
        </Marker>
        <Marker
          position={[trip.dropoff_location_lat, trip.dropoff_location_lng]}
        >
          <Popup>Dropoff Location</Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
};

export default TripMap;
