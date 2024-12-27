// backend/scripts/migrateDateToDates.js

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../src/config/db');
const Tournament = require('../src/models/Tournament');

async function migrateDateField() {
    try {
        // Connect to the database
        await connectDB();

        // Find all tournaments with the old "date" field
        const tournaments = await Tournament.find({ date: { $exists: true } });

        for (const tournament of tournaments) {
            tournament.dates = tournament.date; // Copy the old "date" field data to "dates"
            tournament.date = undefined; // Remove the old "date" field
            await tournament.save(); // Save the changes
        }

        console.log('Migration completed successfully.');
    } catch (error) {
        console.error('Migration failed:', error.message);
    } finally {
        mongoose.connection.close(); // Ensure the connection is closed after migration
    }
}

migrateDateField();
