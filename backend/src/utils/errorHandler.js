// backend/utils/errorHandler.js

const { AppError } = require('./AppError');

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const response = {
        success: false,
        message: err.message || 'Internal Server Error',
        errorCode: err.errorCode || 'INTERNAL_SERVER_ERROR',
        ...(err.details && { details: err.details }), // Optional details for validation errors
    };

    // Include stack trace in development only for debugging
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    // Handle specific operational errors like ValidationError, NotFoundError, etc.
    if (err instanceof AppError && err.isOperational) {
        res.status(statusCode).json(response);
    } else {
        // Log programming errors (like unhandled errors) for debugging and monitoring
        console.error(err);  // This logs the error for developers/administrators to see

        // Send a generic response for server errors
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.',
            errorCode: 'SERVER_ERROR',
        });
    }
};

module.exports = { errorHandler };