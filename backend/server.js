const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const authRoutes = require('./Routes/authRoutes');
const blogRouter = require('./Routes/blogRoutes');

app.use('/api/auth', authRoutes);

app.get('/api/auth/verify', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.status(200).json({ authenticated: true, user: decoded });
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

app.use('/api/v1/blogs', blogRouter);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
