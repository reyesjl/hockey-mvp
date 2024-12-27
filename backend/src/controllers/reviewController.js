// backend/controllers/reviewController.js

const Review = require('../models/Review');
const Tournament = require('../models/Tournament');
const { wrapResponse } = require('../utils/responseHandler');
const { ValidationError, NotFoundError, InternalServerError } = require('../utils/AppError');

// Create a new review for a tournament
exports.create = async (req, res, next) => {
    const { tournamentId, submittedBy, comment, overallRating, refereeRating, communicationRating, parkingNotes } = req.body;

    // Basic check for required fields
    if (!tournamentId || !submittedBy || !comment || !overallRating || !refereeRating || !communicationRating) {
        return next(new ValidationError('Please provide all required fields.'));
    }

    try {
        // Ensure tournament exists
        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
            return next(new NotFoundError('Tournament not found.'));
        }

        // Create the review object
        const review = new Review({
            tournamentId,
            submittedBy,
            comment,
            overallRating,
            refereeRating,
            communicationRating,
            parkingNotes
        });

        // Save the review
        await review.save();

        // Use wrapResponse to return a consistent success response
        wrapResponse(res, 201, 'Review created successfully', review);
    } catch (error) {
        // Handle duplicate key error
        if (error.code === 11000) {
            return next(new ValidationError('You have already submitted a review for this tournament.'));
        }

        // Handle other errors during creation
        next(new InternalServerError('Failed to create review. Please try again.'));
    }
};

// Get all reviews (with optional search/filter by tournamentId)
exports.index = async (req, res, next) => {
    const { tournamentId } = req.query;
    let query = {};

    // Build the query object if tournamentId is provided
    if (tournamentId) {
        query.tournamentId = tournamentId;
    }

    try {
        const reviews = await Review.find(query);
        // Use wrapResponse for consistency
        wrapResponse(res, 200, 'Reviews fetched successfully', reviews);
    } catch (error) {
        next(new InternalServerError('Failed to fetch reviews. Please try again.'));
    }
};

// Get a specific review by ID
exports.show = async (req, res, next) => {
    const { id } = req.params;

    try {
        const review = await Review.findById(id);
        if (!review) {
            return next(new NotFoundError('Review not found.'));
        }
        // Use wrapResponse to return the review
        wrapResponse(res, 200, 'Review fetched successfully', review);
    } catch (error) {
        next(new InternalServerError('Failed to fetch review. Please try again.'));
    }
};

// Get all reviews for a specific tournament
exports.showByTournament = async (req, res, next) => {
    const { tournamentId } = req.params;

    try {
        // Fetch reviews associated with the given tournament ID
        const reviews = await Review.find({ tournamentId });

        // If no reviews found, return an empty array (not an error)
        wrapResponse(res, 200, 'Reviews fetched successfully', reviews);
    } catch (error) {
        next(new InternalServerError('Failed to fetch reviews for this tournament. Please try again.'));
    }
};

// Update a review by ID
exports.update = async (req, res, next) => {
    const { id } = req.params;
    const { comment, overallRating, refereeRating, communicationRating, parkingNotes } = req.body;

    try {
        const review = await Review.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!review) {
            return next(new NotFoundError('Review not found.'));
        }
        // Use wrapResponse to return the updated review
        wrapResponse(res, 200, 'Review updated successfully', review);
    } catch (error) {
        next(new InternalServerError('Failed to update review. Please check your input.'));
    }
};

// Delete a review by ID
exports.destroy = async (req, res, next) => {
    const { id } = req.params;

    try {
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return next(new NotFoundError('Review not found.'));
        }
        // Use wrapResponse to confirm deletion
        res.status(204).send(); // No content
    } catch (error) {
        next(new InternalServerError('Failed to delete review. Please try again.'));
    }
};