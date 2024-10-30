// backend/config/db.js
const mongoose = require('mongoose');
const { ErrorResponse } = require('../utils/errorHandler'); // Adjust the path as necessary

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // Use the ErrorResponse class to handle the error
    const errorResponse = new ErrorResponse(`Database connection failed: ${error.message}`, 500);
    console.error(`Error: ${errorResponse.message}`);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;