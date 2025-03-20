import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/trips");
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        All Trips
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {trips.map((trip) => (
            <Grid item key={trip.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {trip.pickup_location} to {trip.dropoff_location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Current Location: {trip.current_location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Cycle Used: {trip.current_cycle_used} hours
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginTop: "10px" }}
                    onClick={() => navigate(`/trip-logs/${trip.id}`)}
                  >
                    View Logs
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    style={{ marginTop: "10px", marginLeft: "10px" }}
                    onClick={() => navigate(`/trip-map/${trip.id}`)}
                  >
                    View Map
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default TripList;
