// const express = require("express");
// const dotenv = require("dotenv");
// const sequelize = require("./config/dbConfig");
// const routes = require("./routes");

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Health check route
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK" });
// });

// // Routes
// app.use("/api", routes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Something broke!" });
// });

// // Handle serverless environment
// if (process.env.NODE_ENV !== "production") {
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }

// // Database connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connected successfully");
//     return sequelize.sync({ alter: true });
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

// // Export for serverless
// module.exports = app;


const express = require('express');
const dotenv = require('dotenv');

// Load env variables first
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic health check that doesn't depend on DB
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// Initialize database connection only when needed
let sequelize = null;
const getDB = async () => {
  if (!sequelize) {
    const dbConfig = require('./config/dbConfig');
    sequelize = await dbConfig.initialize();
  }
  return sequelize;
};

// Middleware to ensure DB connection
const withDB = async (req, res, next) => {
  try {
    req.db = await getDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
};

// Routes that need DB connection
app.use('/api', withDB, require('./routes'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message 
  });
});

// Start server if not in production
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;