import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Img from '../assets/LoginLogo.png';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const Signup = () => {
  const [name, setName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = {
      name,
      email: userEmail,
      password,
      confirmPassword
    };

    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/signup`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className='signup'>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={4}>
          <Typography variant="h4" fontWeight="bold" gutterBottom style={{ color: '#9e40ff' }}>
            <i>Lets get Started</i>
          </Typography>
          <img src={Img} alt="Login" width="200" />
        </Box>

        <Paper elevation={3} sx={{ padding: 4, mt: -1 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={userEmail}
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
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
            />

            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" fullWidth>
              Signup
            </Button>
            <Typography variant="body2" align="center" style={{ color: 'blue' }}>
              Already have an account?{' '}
              <span style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>
                Login
              </span>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Signup;
