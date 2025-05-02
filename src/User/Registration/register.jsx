import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import "./registerStyle.css";

const Register = () => {
  const navigate = useNavigate();
  const [u, setUser] = useState({
    name: "",
    email: "",
    phn: "",
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInput = (e) => {
    setUser({ ...u, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("name", u.name);
    formData.append("email", u.email);
    formData.append("phn", u.phn);
    formData.append("password", password);


    axios
      .post(endpoint, formData)
      .then((res) => {
        alert("Registered successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("Registration failed");
      });
  };


  return (
    <div className="box">
      <form className="main" onSubmit={handleSubmit}>
        <TextField required label="Name" name="name" onChange={handleInput} />
        <TextField required label="Email" name="email" onChange={handleInput} />
        <TextField required label="Phone" name="phn" onChange={handleInput} />
        <TextField required label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <TextField required label="Confirm Password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
        <Button type="submit" variant="contained" endIcon={<HowToRegIcon />}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
