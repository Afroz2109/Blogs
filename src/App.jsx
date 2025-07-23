import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Logo from "./assets/newBlog.png";

import Postblogs from './Components/Postblogs';
import Home from "./Components/Home";
import YourBlogs from './Components/YourBlogs';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Sports from './Components/Sports';
import Movies from './Components/Movies';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname;
    const publicPaths = ['/login', '/signup'];

    if (token) {
      setUser(token);
      if (publicPaths.includes(currentPath)) {
        navigate('/');
      }
    } else {
      if (!publicPaths.includes(currentPath)) {
        navigate('/login');
      }
    }

    setLoading(false); 
  }, []);

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }
}, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  if (loading) return null; 

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{ backgroundColor: '#E75480', margin: 0, padding: 0 }}
        >
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 0 }}>
              <img style={{ height: '37px', padding: '2px' }} src={Logo} alt="logo" />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: '',
                fontWeight: '700',
                fontFamily: 'sans-serif',
                fontSize: '1.5rem',
                marginLeft: '-0.8%',
                marginTop: '0.1%'
              }}
            >
              Media <span style={{ color: 'white' }}>Verse</span>
            </Typography>

            {user ? (
              <Button onClick={handleLogout} sx={{ color: 'white', backgroundColor: 'purple' }}>
                Logout
              </Button>
            ) : (
              <Button onClick={() => navigate('/login')} sx={{ color: 'white', backgroundColor: '#9e40ff' }}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postblogs" element={<Postblogs />} />
        <Route path="/yourblogs" element={<YourBlogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </div>
  );
}

export default App;
