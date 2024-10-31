// backend/app.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '../.env' });

// Establish database connection
const connectDB = require('./config/db');
connectDB();

// Create the express application
const app = express();

// CORS middleware
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the YHT Reviews API v1.0 (MVP)');
});

// Import routes
const tournamentRoutes = require('./routes/tournamentRoutes');
app.use('/api/v1/tournaments/', tournamentRoutes);

// Error handling middleware
const { errorHandler } = require('./utils/errorHandler');
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});