// backend/controllers/tournamentSubmissionController.js

const TournamentSubmission = require('../models/TournamentSubmission');
const { ValidationError, NotFoundError, InternalServerError } = require('../utils/AppError');
const { wrapResponse } = require('../utils/responseHandler');

// Create a new tournament submission
exports.createTournamentSubmission = async (req, res, next) => {
    const { name, location, dates, contactEmail, notes, company, gamesMinimum, levelOfPlay, ageGroups, submittedBy } = req.body;

    // Basic check for required fields
    if (!name || !location || !dates || !contactEmail || !gamesMinimum || !levelOfPlay || !ageGroups || !submittedBy) {
        return next(new ValidationError('Please provide all required fields.'));
    }

    try {
        const tournamentSubmission = new TournamentSubmission({
            name,
            location,
            dates,
            contactEmail,
            notes,
            company,
            gamesMinimum,
            levelOfPlay,
            ageGroups,
            submittedBy
        });

        await tournamentSubmission.save();
        wrapResponse(res, 201, 'Tournament submission created successfully', tournamentSubmission);
    } catch (error) {
        // Collect all validation error details
        if (error.name === 'ValidationError') {
            const details = Object.keys(error.errors).map(key => ({
                field: key,
                message: error.errors[key].message,
            }));
            return next(new ValidationError('Validation failed.', details));
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            const keyValue = error.keyValue.name; // Get the value of the duplicate key
            return next(new ValidationError(`Tournament submission with the name "${keyValue}" already exists. Please choose a different name.`));
        }

        next(new InternalServerError('Failed to create tournament submission. Please try again.'));
    }
};

// Get all tournament submissions
exports.getAllTournamentSubmissions = async (req, res, next) => {
    const { submittedBy } = req.query;

    // Build the query object
    let query = {};
    if (submittedBy) {
        query.submittedBy = submittedBy; // Add filter for submittedBy email
    }

    try {
        const submissions = await TournamentSubmission.find(query);
        wrapResponse(res, 200, 'Tournament submissions fetched successfully', submissions);
    } catch (error) {
        next(new InternalServerError('Failed to fetch tournament submissions. Please try again.'));
    }
};

// Get a tournament submission by ID
exports.getTournamentSubmissionById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const submission = await TournamentSubmission.findById(id);
        if (!submission) {
            return next(new NotFoundError('Tournament submission not found.'));
        }
        wrapResponse(res, 200, 'Tournament submission fetched successfully', submission);
    } catch (error) {
        next(new InternalServerError('Failed to fetch tournament submission. Please try again.'));
    }
};

// Update a tournament submission by ID
exports.updateTournamentSubmission = async (req, res, next) => {
    const { id } = req.params;

    try {
        const submission = await TournamentSubmission.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!submission) {
            return next(new NotFoundError('Tournament submission not found.'));
        }
        wrapResponse(res, 200, 'Tournament submission updated successfully', submission);
    } catch (error) {
        next(new ValidationError('Failed to update tournament submission. Please check your input.'));
    }
};

// Delete a tournament submission by ID
exports.deleteTournamentSubmission = async (req, res, next) => {
    const { id } = req.params;

    try {
        const submission = await TournamentSubmission.findByIdAndDelete(id);
        if (!submission) {
            return next(new NotFoundError('Tournament submission not found.'));
        }
        res.status(204).send(); // No content
    } catch (error) {
        next(new InternalServerError('Failed to delete tournament submission. Please try again.'));
    }
};