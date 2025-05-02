import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const navigate = useNavigate();
  const [logd, setLogd] = useState({
    username: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    setLogd({ ...logd, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Submitted:", logd);  // Debugging line

    // Check for the specific case (email == a@gmail.com && password == a)
    if (logd.username === "a@gmail.com" && logd.password === "a") {
      // Debugging line
      console.log("Special login detected, navigating to /home");
      navigate('/home');
      return; // Stop further code execution
    }
  
    };

  return (
    <div>
      <form className="login" onSubmit={handleSubmit}>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            type="email"
            name="username"
            value={logd.username}  // Correct binding
            onChange={handleInput}
          />
        </FormControl>

        <FormControl style={{ marginTop: "-90px" }} sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={logd.password}  // Correct binding
            onChange={handleInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  disableRipple
                  disableFocusRipple
                  sx={{ backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' } }}                
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button style={{ marginTop: "-70px" }} variant="contained" type="submit">
          Login
        </Button>
        <Link style={{ marginTop: "-90px" }} to='/register'>
          New user? Register now!
        </Link>
        <Link style={{ marginTop: "-90px" }} to='/forgotpass'>
          Forgot Password!
        </Link>
      </form>
    </div>
  );
};

export default Login;
