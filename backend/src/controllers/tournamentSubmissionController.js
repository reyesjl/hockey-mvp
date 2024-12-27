// backend/controllers/tournamentSubmissionController.js

const Tournament = require('../models/Tournament'); // Import Tournament model
const TournamentSubmission = require('../models/TournamentSubmission');
const { ValidationError, NotFoundError, InternalServerError } = require('../utils/AppError');
const { wrapResponse } = require('../utils/responseHandler');


// Create a new tournament submission
exports.create = async (req, res, next) => {
    const { name, location, dates, contactEmail, notes, company, gamesMinimum, levelOfPlay, ageGroups, userUid } = req.body;

    // Basic check for required fields
    if (!name || !location || !dates || !contactEmail || !gamesMinimum || !levelOfPlay || !ageGroups || !userUid) {
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
            userUid
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
exports.index = async (req, res, next) => {
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
exports.show = async (req, res, next) => {
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
exports.update = async (req, res, next) => {
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

// Approve a tournament submission
exports.approve = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find the submission
    const submission = await TournamentSubmission.findById(id);
    if (!submission) {
      return next(new NotFoundError('Tournament submission not found.'));
    }

    // Check if already approved or denied
    if (submission.approvalStatus !== 'pending') {
      return next(new ValidationError(`Submission is already ${submission.approvalStatus}.`));
    }

    // Create a new Tournament from submission data
    const {
      name,
      location,
      dates,
      contactEmail,
      notes,
      company,
      gamesMinimum,
      levelOfPlay,
      ageGroups
    } = submission;

    // Create the Tournament
    const newTournament = new Tournament({
      name,
      location,
      dates,
      contactEmail,
      notes,
      company,
      gamesMinimum,
      levelOfPlay,
      ageGroups,
      // All rating sums and counts start at 0 by default
      // Additional fields in Tournament default to false or empty arrays as defined
    });

    await newTournament.save();

    // Update the submission status to approved or delete it
    // Mark as approved FOR NOW:
    submission.approvalStatus = 'approved';
    await submission.save();

    // IMPLEMENT LATER MAYBE?
    // Delete after approval:
    // await TournamentSubmission.findByIdAndDelete(id);

    wrapResponse(res, 200, 'Tournament submission approved and new tournament created.', {
      tournament: newTournament
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const details = Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message,
      }));
      return next(new ValidationError('Validation failed.', details));
    }

    next(new InternalServerError('Failed to approve tournament submission. Please try again.'));
  }
};

// Delete a tournament submission by ID
exports.destroy = async (req, res, next) => {
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