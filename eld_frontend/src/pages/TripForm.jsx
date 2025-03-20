import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useNotification } from "../contexts/NotificationContext";

const TripForm = () => {
  const [formData, setFormData] = useState({
    current_location: "",
    current_location_lat: "",
    current_location_lng: "",
    pickup_location: "",
    pickup_location_lat: "",
    pickup_location_lng: "",
    dropoff_location: "",
    dropoff_location_lat: "",
    dropoff_location_lng: "",
    current_cycle_used: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/trips/",
        formData
      );
      showNotification("Trip created successfully!", "success");
      navigate(`/trip-logs/${response.data.id}`);
    } catch (error) {
      console.log(error);

      showNotification("Error creating trip. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Create New Trip
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Current Location"
          name="current_location"
          value={formData.current_location}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Current Location Latitude"
          name="current_location_lat"
          type="number"
          value={formData.current_location_lat}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Current Location Longitude"
          name="current_location_lng"
          type="number"
          value={formData.current_location_lng}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Pickup Location"
          name="pickup_location"
          value={formData.pickup_location}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Pickup Location Latitude"
          name="pickup_location_lat"
          type="number"
          value={formData.pickup_location_lat}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Pickup Location Longitude"
          name="pickup_location_lng"
          type="number"
          value={formData.pickup_location_lng}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Dropoff Location"
          name="dropoff_location"
          value={formData.dropoff_location}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Dropoff Location Latitude"
          name="dropoff_location_lat"
          type="number"
          value={formData.dropoff_location_lat}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Dropoff Location Longitude"
          name="dropoff_location_lng"
          type="number"
          value={formData.dropoff_location_lng}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Current Cycle Used (Hours)"
          name="current_cycle_used"
          type="number"
          value={formData.current_cycle_used}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: "20px" }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>
    </Container>
  );
};

export default TripForm;
