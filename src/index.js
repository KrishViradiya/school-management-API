const express = require('express');
const dotenv = require('dotenv');
const { sequelize, testConnection } = require('./config/dbConfig');
const routes = require('./routes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Simple health check that doesn't need DB
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Database middleware with better error handling
const withDB = async (req, res, next) => {
  try {
    if (!req.db) {
      const isConnected = await testConnection();
      if (!isConnected) {
        throw new Error('Database connection failed');
      }
      req.db = sequelize;
    }
    next();
  } catch (error) {
    console.error('Database middleware error:', error);
    res.status(500).json({ 
      error: 'Database connection failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Routes with DB connection
app.use('/api', withDB, routes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message 
  });
});

// Only start server in development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;