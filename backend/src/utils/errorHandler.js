// backend/utils/errorHandler.js

class ErrorResponse extends Error {
    constructor(message, statusCode, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.details = details; // Optional details for validation errors
    }
}

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const response = {
        success: false,
        message: err.message || 'Internal Server Error',
        ...(err.details && { details: err.details }), // Include validation details if present
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Show stack trace in development
    };

    res.status(statusCode).json(response);
};

module.exports = { ErrorResponse, errorHandler };