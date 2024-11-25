// backend/controllers/flagController.js

const Flag = require('../models/Flag');
const Tournament = require('../models/Tournament');
const { ErrorResponse } = require('../utils/errorHandler');

// Create a new flag for a tournament
exports.createFlag = async (req, res, next) => {
    const { tournament, submittedBy, fields, reason } = req.body;

    // Basic check for required fields
    if (!tournament || !submittedBy || !fields || !reason) {
        return next(new ErrorResponse('Please provide all required fields.', 400));
    }

    try {
        // Ensure tournament exists
        const tournamentExists = await Tournament.findById(tournament);
        if (!tournamentExists) {
            return next(new ErrorResponse('Tournament not found.', 404));
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

        res.status(201).json(flag);
    } catch (error) {
        // Handle duplicate key error
        if (error.code === 11000) {
            return next(new ErrorResponse('You have already submitted a flag for this tournament.', 400));
        }

        // Handle error during creation
        next(new ErrorResponse('Failed to create flag. Please try again.', 500));
    }
};

// Get all flags (with optional search/filter by tournament)
exports.getAllFlags = async (req, res, next) => {
    const { tournamentId } = req.query;
    let query = {};

    // Build the query object if tournamentId is provided
    if (tournamentId) {
        query.tournament = tournamentId;
    }

    try {
        const flags = await Flag.find(query);
        res.status(200).json(flags);
    } catch (error) {
        next(new ErrorResponse('Failed to fetch flags. Please try again.', 500));
    }
};

// Get a specific flag by ID
exports.getFlagById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const flag = await Flag.findById(id);
        if (!flag) {
            return next(new ErrorResponse('Flag not found.', 404));
        }
        res.status(200).json(flag);
    } catch (error) {
        next(new ErrorResponse('Failed to fetch flag. Please try again.', 500));
    }
};

// Update a flag by ID
exports.updateFlag = async (req, res, next) => {
    const { id } = req.params;
    const { fields, reason } = req.body;

    try {
        const flag = await Flag.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!flag) {
            return next(new ErrorResponse('Flag not found.', 404));
        }
        res.status(200).json(flag);
    } catch (error) {
        next(new ErrorResponse('Failed to update flag. Please check your input.', 400));
    }
};

// Delete a flag by ID
exports.deleteFlag = async (req, res, next) => {
    const { id } = req.params;

    try {
        const flag = await Flag.findByIdAndDelete(id);
        if (!flag) {
            return next(new ErrorResponse('Flag not found.', 404));
        }
        res.status(204).send(); // No content
    } catch (error) {
        next(new ErrorResponse('Failed to delete flag. Please try again.', 500));
    }
};