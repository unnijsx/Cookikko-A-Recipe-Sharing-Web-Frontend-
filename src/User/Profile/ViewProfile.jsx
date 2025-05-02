import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import "./profileStyle.css"; // You can style it similarly to register
import Header from "../Header/Header";

const ViewProfile = () => {
  const [profile, setProfile] = useState({
    name: "" || "Usernte name",
    email: ""|| "email@emai.com",
    phn: ""|| "54566587552",
  });

  const userId = localStorage.getItem("userId"); // Or use context/auth
  const userType = localStorage.getItem("userType"); // 'seeker' or 'student'

  const endpoint =
    userType === "seeker"
      ? `http://localhost:8000/seekerprofile/${userId}`
      : `http://localhost:8000/studentprofile/${userId}`;

  const updateEndpoint =
    userType === "seeker"
      ? `http://localhost:8000/seekerupdate/${userId}`
      : `http://localhost:8000/studentupdate/${userId}`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
      });
  }, [endpoint]);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("phn", profile.phn);

    axios
      .put(updateEndpoint, formData)
      .then((res) => {
        alert("Profile updated successfully!");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Failed to update profile.");
      });
  };

  return (
    <div className="box">
        <Header/>
      <form className="main" onSubmit={handleUpdate}>
        <TextField
          required
          label="Name"
          name="name"
          value={profile.name}
          onChange={handleInputChange}
        />
        <TextField
          required
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleInputChange}
        />
        <TextField
          required
          label="Phone"
          name="phn"
          value={profile.phn}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained" endIcon={<SaveIcon />}>
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default ViewProfile;
