// backend/controllers/tournamentSubmissionController.js

const TournamentSubmission = require('../models/TournamentSubmission');
const { ErrorResponse } = require('../utils/errorHandler');

// Create a new tournament submission
exports.createTournamentSubmission = async (req, res, next) => {
    const { name, location, dates, contactEmail, notes, company, gamesMinimum, levelOfPlay, ageGroups, submittedBy } = req.body;

    // Basic check for required fields
    if (!name || !location || !dates || !contactEmail || !gamesMinimum || !levelOfPlay || !ageGroups || !submittedBy) {
        return next(new ErrorResponse('Please provide all required fields.', 400));
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
        res.status(201).json(tournamentSubmission);
    } catch (error) {
        // Collect all validation error details
        if (error.name === 'ValidationError') {
            const details = Object.keys(error.errors).map(key => ({
                field: key,
                message: error.errors[key].message,
            }));
            return next(new ErrorResponse('Validation failed.', 400, details));
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            const keyValue = error.keyValue.name; // Get the value of the duplicate key
            return next(new ErrorResponse(`Tournament submission with the name "${keyValue}" already exists. Please choose a different name.`, 400));
        }

        next(new ErrorResponse('Failed to create tournament submission. Please try again.', 500));
    }
};

// Get all tournament submissions
exports.getAllTournamentSubmissions = async (req, res, next) => {
    try {
        const submissions = await TournamentSubmission.find();
        res.status(200).json(submissions);
    } catch (error) {
        next(new ErrorResponse('Failed to fetch tournament submissions. Please try again.', 500));
    }
};

// Get a tournament submission by ID
exports.getTournamentSubmissionById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const submission = await TournamentSubmission.findById(id);
        if (!submission) {
            return next(new ErrorResponse('Tournament submission not found.', 404));
        }
        res.status(200).json(submission);
    } catch (error) {
        next(new ErrorResponse('Failed to fetch tournament submission. Please try again.', 500));
    }
};

// Update a tournament submission by ID
exports.updateTournamentSubmission = async (req, res, next) => {
    const { id } = req.params;

    try {
        const submission = await TournamentSubmission.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!submission) {
            return next(new ErrorResponse('Tournament submission not found.', 404));
        }
        res.status(200).json(submission);
    } catch (error) {
        next(new ErrorResponse('Failed to update tournament submission. Please check your input.', 400));
    }
};

// Get tournament submissions by submittedBy email
exports.getTournamentSubmissionsByEmail = async (req, res, next) => {
    const { email } = req.query;

    // Check if email is provided
    if (!email) {
        return next(new ErrorResponse('Please provide an email address.', 400));
    }

    try {
        // Find all submissions with the specified submittedBy email
        const submissions = await TournamentSubmission.find({ submittedBy: email });
        
        // Check if there are any submissions
        if (submissions.length === 0) {
            return next(new ErrorResponse('No tournament submissions found for this email.', 404));
        }

        res.status(200).json(submissions);
    } catch (error) {
        next(new ErrorResponse('Failed to fetch tournament submissions. Please try again.', 500));
    }
};


// Delete a tournament submission by ID
exports.deleteTournamentSubmission = async (req, res, next) => {
    const { id } = req.params;

    try {
        const submission = await TournamentSubmission.findByIdAndDelete(id);
        if (!submission) {
            return next(new ErrorResponse('Tournament submission not found.', 404));
        }
        res.status(204).send(); // No content
    } catch (error) {
        next(new ErrorResponse('Failed to delete tournament submission. Please try again.', 500));
    }
};