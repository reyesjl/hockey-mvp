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

import { connect } from 'mongoose';
import { InternalServerError } from '../middlewares/errors/AppError.js';

const connectDB = async () => {
  try {
    const conn = await connect(process.env.DB_URI);
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

export default connectDB;