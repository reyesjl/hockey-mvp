// backend/controllers/reviewController.js

const Review = require('../models/Review');
const Tournament = require('../models/Tournament');
const { ErrorResponse } = require('../utils/errorHandler');

// Create a new review for a tournament
exports.createReview = async (req, res, next) => {
    const { tournamentId, submittedBy, comment, overallRating, refereeRating, communicationRating, parkingNotes } = req.body;

    // Basic check for required fields
    if (!tournamentId || !submittedBy || !comment || !overallRating || !refereeRating || !communicationRating) {
        return next(new ErrorResponse('Please provide all required fields.', 400));
    }

    try {
        // Ensure tournament exists
        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
            return next(new ErrorResponse('Tournament not found.', 404));
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

        res.status(201).json(review);
    } catch (error) {
        // Handle error during creation
        next(new ErrorResponse('Failed to create review. Please try again.', 500));
    }
};

// Get all reviews (with optional search/filter by tournamentId)
exports.getAllReviews = async (req, res, next) => {
    const { tournamentId } = req.query;
    let query = {};

    // Build the query object if tournamentId is provided
    if (tournamentId) {
        query.tournamentId = tournamentId;
    }

    try {
        const reviews = await Review.find(query);
        res.status(200).json(reviews);
    } catch (error) {
        next(new ErrorResponse('Failed to fetch reviews. Please try again.', 500));
    }
};

// Get a specific review by ID
exports.getReviewById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const review = await Review.findById(id);
        if (!review) {
            return next(new ErrorResponse('Review not found.', 404));
        }
        res.status(200).json(review);
    } catch (error) {
        next(new ErrorResponse('Failed to fetch review. Please try again.', 500));
    }
};

// Update a review by ID
exports.updateReview = async (req, res, next) => {
    const { id } = req.params;
    const { comment, overallRating, refereeRating, communicationRating, parkingNotes } = req.body;

    try {
        const review = await Review.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!review) {
            return next(new ErrorResponse('Review not found.', 404));
        }
        res.status(200).json(review);
    } catch (error) {
        next(new ErrorResponse('Failed to update review. Please check your input.', 400));
    }
};

// Delete a review by ID
exports.deleteReview = async (req, res, next) => {
    const { id } = req.params;

    try {
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return next(new ErrorResponse('Review not found.', 404));
        }
        res.status(204).send(); // No content
    } catch (error) {
        next(new ErrorResponse('Failed to delete review. Please try again.', 500));
    }
};