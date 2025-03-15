/**
 * Youth Hockey Tournaments
 * 
 * Author: Jose Reyes
 * Date: Dec 27, 2025
 * 
 * Copyright © 2025 Jose Reyes. All rights reserved.
 * 
 * This software is the intellectual property of Jose Reyes. Unauthorized copying, distribution, modification, or use of this file, 
 * in whole or in part, via any medium, is strictly prohibited without prior written consent from the author.
 * 
 * This code is developed for a private project and is not intended for commercial use, resale, or reproduction by any third party. 
 * Any unauthorized use may result in legal action.
 * 
 * For inquiries regarding licensing or permissions, please contact Jose Reyes.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errors/errorHandler.js';
import connectDB from './config/db.js';
import admin from './config/firebaseAdmin.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import tournamentRoutes from './routes/tournamentRoutes.js';

// .env config
dotenv.config();

// Establish database connection
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
app.use('/api/v1/auth/', authRoutes);
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/reviews/', reviewRoutes);
app.use('/api/v1/tournaments/', tournamentRoutes);

// Use error handler catch all middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});