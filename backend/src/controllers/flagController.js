// backend/controllers/flagController.js

const Flag = require('../models/Flag');
const Tournament = require('../models/Tournament');
const { wrapResponse } = require('../utils/responseHandler');
const { ValidationError, NotFoundError, InternalServerError } = require('../utils/AppError');

// Create a new flag for a tournament
exports.create = async (req, res, next) => {
    const { tournament, submittedBy, fields, reason } = req.body;

    // Basic check for required fields
    if (!tournament || !submittedBy || !fields || !reason) {
        return next(new ValidationError('Please provide all required fields.'));
    }

    try {
        // Ensure tournament exists
        const tournamentExists = await Tournament.findById(tournament);
        if (!tournamentExists) {
            return next(new NotFoundError('Tournament not found.'));
        }

        // Create the flag object
        const flag = new Flag({
            tournament,
            submittedBy,
            fields,
            reason
        });

        // Save the flag
        await flag.save();

        // Respond with the created flag
        return wrapResponse(res, 201, 'Flag created successfully', flag);
    } catch (error) {
        // Handle duplicate key error
        if (error.code === 11000) {
            return next(new ValidationError('You have already submitted a flag for this tournament.'));
        }

        // Handle error during creation
        return next(new InternalServerError('Failed to create flag. Please try again.'));
    }
};

// Get all flags (with optional search/filter by tournament)
exports.index = async (req, res, next) => {
    const { tournamentId } = req.query;
    let query = {};

    // Build the query object if tournamentId is provided
    if (tournamentId) {
        query.tournament = tournamentId;
    }

    try {
        const flags = await Flag.find(query);
        return wrapResponse(res, 200, 'Flags fetched successfully', flags);
    } catch (error) {
        return next(new InternalServerError('Failed to fetch flags. Please try again.'));
    }
};

// Get a specific flag by ID
exports.show = async (req, res, next) => {
    const { id } = req.params;

    try {
        const flag = await Flag.findById(id);
        if (!flag) {
            return next(new NotFoundError('Flag not found.'));
        }
        return wrapResponse(res, 200, 'Flag fetched successfully', flag);
    } catch (error) {
        return next(new InternalServerError('Failed to fetch flag. Please try again.'));
    }
};

// Update a flag by ID
exports.update = async (req, res, next) => {
    const { id } = req.params;
    const { fields, reason } = req.body;

    try {
        const flag = await Flag.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!flag) {
            return next(new NotFoundError('Flag not found.'));
        }
        return wrapResponse(res, 200, 'Flag updated successfully', flag);
    } catch (error) {
        return next(new ValidationError('Failed to update flag. Please check your input.'));
    }
};

// Delete a flag by ID
exports.destroy = async (req, res, next) => {
    const { id } = req.params;

    try {
        const flag = await Flag.findByIdAndDelete(id);
        if (!flag) {
            return next(new NotFoundError('Flag not found.'));
        }
        return res.status(204).send(); // No content
    } catch (error) {
        return next(new InternalServerError('Failed to delete flag. Please try again.'));
    }
};