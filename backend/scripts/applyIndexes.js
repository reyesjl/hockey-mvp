// applyIndexes.js

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../src/config/db');
const Review = require('../src/models/Review');

async function applyIndexes() {
    try {
        // Connect to the database using your connectDB method
        await connectDB();

        console.log('Connected to MongoDB');

        // Apply indexes to the Review model
        await Review.createIndexes();

        console.log('Indexes applied successfully');
    } catch (err) {
        console.error('Error applying indexes:', err);
    } finally {
        mongoose.connection.close(); // Ensure the connection is closed after applying indexes
    }
}

applyIndexes();