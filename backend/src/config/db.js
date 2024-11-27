// backend/config/db.js
const mongoose = require('mongoose');
const { InternalServerError } = require('../utils/AppError');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error for debugging
    console.error(`Database connection error: ${error.message}`);
    
    // Throw an InternalServerError with relevant details
    throw new InternalServerError('Database connection failed', {
      originalError: error.message,
    });
  }
};

module.exports = connectDB;