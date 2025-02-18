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

import { AppError } from './AppError.js';

const errorHandler = (err, req, res, next) => {
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        const details = Object.keys(err.errors).map(key => ({
            field: key,
            message: err.errors[key].message,
        }));
        return res.status(400).json({
            errorCode: 'VALIDATION_ERROR',
            message: 'Validation failed.',
            details
        });
    }

    // Handle Mongoose duplicate key errors
    if (err.code === 11000) {
        return res.status(400).json({
            errorCode: 'DUPLICATE_KEY_ERROR',
            message: `This object has been failed to save due to a duplicate key error.`,
        });
    }

    // If the error is an instance of AppError, use its properties
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            errorCode: err.errorCode,
            message: err.message,
            details: err.details
        });
    }

    // For other types of errors, use default properties
    console.log('Unexpected Error:', err);
    return res.status(500).json({
        errorCode: 'UNEXPECTED_ERROR',
        message: 'Unexpected Error',
        details: err.message
    });
};

export default errorHandler;