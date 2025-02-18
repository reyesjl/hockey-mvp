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

/**
 * Custom error class for application-specific errors.
 * @extends Error
 */
class AppError extends Error {
    /**
     * Creates an instance of AppError.
     * @param {string} message - Error message.
     * @param {number} statusCode - HTTP status code.
     * @param {string} errorCode - Custom error code.
     * @param {any} [details=null] - Additional error details.
     */
    constructor(message, statusCode, errorCode, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;
        this.isOperational = true;  // To distinguish between operational and programming errors
        Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
}

/**
 * Custom error class for validation errors.
 * @extends AppError
 */
class ValidationError extends AppError {
    /**
     * Creates an instance of ValidationError.
     * @param {string} [message='Validation Error'] - Error message.
     * @param {any} [details=null] - Additional error details.
     */
    constructor(message = 'Validation Error', details = null) {
        super(message, 400, 'VALIDATION_ERROR', details);
    }
}

/**
 * Custom error class for not found errors.
 * @extends AppError
 */
class NotFoundError extends AppError {
    /**
     * Creates an instance of NotFoundError.
     * @param {string} [message='Resource Not Found'] - Error message.
     */
    constructor(message = 'Resource Not Found') {
        super(message, 404, 'NOT_FOUND');
    }
}

/**
 * Custom error class for unauthorized errors.
 * @extends AppError
 */
class UnauthorizedError extends AppError {
    /**
     * Creates an instance of UnauthorizedError.
     * @param {string} [message='Unauthorized'] - Error message.
     */
    constructor(message = 'Unauthorized') {
        super(message, 401, 'UNAUTHORIZED');
    }
}

/**
 * Custom error class for internal server errors.
 * @extends AppError
 */
class InternalServerError extends AppError {
    /**
     * Creates an instance of InternalServerError.
     * @param {string} [message='Internal Server Error'] - Error message.
     */
    constructor(message = 'Internal Server Error') {
        super(message, 500, 'INTERNAL_SERVER_ERROR');
    }
}

export { 
    AppError,
    ValidationError,
    NotFoundError,
    UnauthorizedError,
    InternalServerError 
};