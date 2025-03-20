import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TripForm from "./pages/TripForm";
import TripLogs from "./pages/TripLogs";
import Navbar from "./components/Navbar";
import TripList from "./pages/TripList";
import TripMap from "./pages/TripMap";
import Notification from "./components/Notification";
import { NotificationProvider } from "./contexts/NotificationContext";

const App = () => {
  return (
    <NotificationProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-trip" element={<TripForm />} />
          <Route path="/trip-logs/:trip_id" element={<TripLogs />} />
          <Route path="/trip-map/:trip_id" element={<TripMap />} />
          <Route path="/trips" element={<TripList />} />
        </Routes>
        <Notification />
      </Router>
    </NotificationProvider>
  );
};

export default App;
