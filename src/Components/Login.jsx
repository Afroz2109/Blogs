import React, { useState } from 'react';
import {
  Box,TextField,Button,Typography,Container,Paper} from '@mui/material';
import Img from '../assets/SignupLogo.webp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[error, setError]= useState();
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
    );

    const token = response.data.token;

    localStorage.setItem("userEmail", email);
    localStorage.setItem("token", token);
    console.log("Token saved to localStorage:", localStorage.getItem("token"));

    navigate("/");

  } catch (error) {
    console.error("Login error:", error.response?.data || error);
    setError(error.response?.data?.message || "Login failed");
  }
};


  return (
    <div>
      <Container maxWidth="sm">
      <Box textAlign="center" mt={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom style={{color:'#9e40ff'}}>
          Welcome back
        </Typography>
        <img src={Img} alt="Login" width="250" />
      </Box>

      <Paper elevation={3} sx={{ padding: 4, mt: 0 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
          <Typography variant="body2"  align="center" style={{color:'blue'}}>
            Don&apos;t have an account?<span style={{cursor:'pointer'}} onClick={()=> navigate('/Signup')}>Signup</span>
          </Typography>
        </Box>
      </Paper>
    </Container>
    </div>
  );
};

export default Login;
