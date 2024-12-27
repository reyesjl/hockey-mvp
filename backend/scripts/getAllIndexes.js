require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../src/config/db'); // Assuming you have the same db connection setup
const Tournament = require('../src/models/Tournament'); // Assuming Tournament model is correctly set up
const Review = require('../src/models/Review');

async function getIndexes() {
    try {
        // Connect to the database using your connectDB method
        await connectDB();
        console.log('Connected to MongoDB');

        // Fetch indexes from the 'tournaments' collection
        indexes = await mongoose.connection.db.collection('tournaments').indexes();

        console.log('Indexes for tournaments collection:');
        console.log(indexes); // This will display all indexes for the 'tournaments' collection

        // Fetch indexes from the 'reviews' collection
        indexes = await mongoose.connection.db.collection('reviews').indexes();

        console.log('Indexes for reviews collection:');
        console.log(indexes);
    } catch (err) {
        console.error('Error fetching indexes:', err);
    } finally {
        mongoose.connection.close(); // Ensure the connection is closed after fetching indexes
    }
}

getIndexes();
