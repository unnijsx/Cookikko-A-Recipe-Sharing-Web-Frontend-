import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import Header from "../Header/Header";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userId = localStorage.getItem("userId"); // Assumes userId is stored

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    axios
      .post("http://localhost:8000/changepassword", {
        userId,
        oldPassword,
        newPassword,
      })
      .then((res) => {
        alert("Password changed successfully.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        console.error("Error changing password:", err);
        alert("Failed to change password. Please try again.");
      });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        marginTop: 10,
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
        <Header/>
      <Typography variant="h5" gutterBottom style={{color:"black"}}>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Current Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          endIcon={<LockResetIcon />}
          sx={{ mt: 2 }}
        >
          Update Password
        </Button>
      </form>
    </Box>
  );
};

export default ChangePassword;
