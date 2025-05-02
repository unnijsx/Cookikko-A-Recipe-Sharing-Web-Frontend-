import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import './login.css';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/forgot-password', { email });
      setMsg("Reset link sent to your email.");
    } catch (err) {
      console.error(err);
      setMsg("Email not found or failed to send.");
    }
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="forgot-email">Email</InputLabel>
          <Input
            id="forgot-email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>

        <Button variant="contained" type="submit">
          Send Reset Link
        </Button>

        {msg && <p className="forgot-password-message">{msg}</p>}
      </form>
    </div>
  );
};

export default ForgotPass;
