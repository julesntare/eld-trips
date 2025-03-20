import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/lab/Alert";
import { useNotification } from "../contexts/NotificationContext"; // Import the named export

const Notification = () => {
  const { notification, closeNotification } = useNotification(); // Use the hook

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={6000}
      onClose={closeNotification}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={closeNotification}
        severity={notification.severity}
      >
        {notification.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Notification;
