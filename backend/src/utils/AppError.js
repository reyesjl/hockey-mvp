// backend/utils/AppError.js

class AppError extends Error {
    constructor(message, statusCode, errorCode, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;
        this.isOperational = true;  // To distinguish between operational and programming errors
        Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
}

class ValidationError extends AppError {
    constructor(message = 'Validation Error', details = null) {
        super(message, 400, 'VALIDATION_ERROR', details);
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Resource Not Found') {
        super(message, 404, 'NOT_FOUND');
    }
}

class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401, 'UNAUTHORIZED');
    }
}

class InternalServerError extends AppError {
    constructor(message = 'Internal Server Error') {
        super(message, 500, 'INTERNAL_SERVER_ERROR');
    }
}

module.exports = { AppError, ValidationError, NotFoundError, UnauthorizedError, InternalServerError };