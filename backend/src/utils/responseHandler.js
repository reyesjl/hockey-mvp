// backend/utils/responseHandler.js

// Helper function to wrap responses in a consistent format
const wrapResponse = (res, statusCode, message, data = null) => {
    const response = {
        success: true,
        message,
        ...(data && { data }),  // Include data if provided
    };
    res.status(statusCode).json(response);
};

module.exports = { wrapResponse };