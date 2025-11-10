const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const patientRoutes = require('./routes/patient');
const appointmentsRoutes = require('./routes/appointments');
const exerciseRoutes = require('./routes/exerciseRoutes');
const mealRoutes = require('./routes/mealRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dietRoutes = require('./routes/dietRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://nutri-track-app.netlify.app', // Netlify deployment
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? (allowedOrigins.length > 0 ? allowedOrigins : true)
    : true, // Allow all in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('NutriTrack API is running on MongoDB');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/diet', dietRoutes);

// 404 handler for undefined routes (must be after all routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error stack:', err.stack);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors).map(e => e.message).join(', ')
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate entry. This record already exists.'
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }
  
  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
