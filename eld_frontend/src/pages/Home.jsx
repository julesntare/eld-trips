import { Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container
        maxWidth="md"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        <Typography variant="h3" gutterBottom>
          ELD Logs App
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Manage your trip logs with ease.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/create-trip")}
          style={{ marginTop: "20px" }}
        >
          Create New Trip
        </Button>
      </Container>
    </motion.div>
  );
};

export default Home;
