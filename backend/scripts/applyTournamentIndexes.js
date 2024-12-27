// applyTournamentIndexes.js

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../src/config/db');
const Tournament = require('../src/models/Tournament');

async function applyTournamentIndexes() {
    try {
        // Connect to the database using your connectDB method
        await connectDB();

        console.log('Connected to MongoDB');

        // Apply indexes to the Tournament model
        await Tournament.createIndexes();

        console.log('Indexes applied successfully');
    } catch (err) {
        console.error('Error applying indexes:', err);
    } finally {
        mongoose.connection.close(); // Ensure the connection is closed after applying indexes
    }
}

applyTournamentIndexes();
