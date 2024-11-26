// backend/app.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const tournamentRoutes = require('./routes/tournamentRoutes');
const tournamentSubmissionRoutes = require('./routes/tournamentSubmissionRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminRoutes = require('./routes/adminRoutes');
const flagRoutes = require('./routes/flagRoutes');

// Import error handler and AppError class
const { errorHandler } = require('./utils/errorHandler');
const { ValidationError, NotFoundError, UnauthorizedError, InternalServerError } = require('./utils/AppError');

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

// Use routes
app.use('/api/v1/tournaments/', tournamentRoutes);
app.use('/api/v1/tournament-submissions/', tournamentSubmissionRoutes);
app.use('/api/v1/reviews/', reviewRoutes);
app.use('/api/v1/admin/', adminRoutes);
app.use('/api/v1/flags/', flagRoutes);

// Use error handler middleware at the end
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});