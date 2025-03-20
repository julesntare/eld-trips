import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          ELD Logs App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/trips">
          All Trips
        </Button>
        <Button color="inherit" component={Link} to="/create-trip">
          Create Trip
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
