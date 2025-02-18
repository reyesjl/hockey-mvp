import Review from '../models/Review.js';
import { sendResponse } from '../utils/responses/responseHandler.js';
import { ValidationError, NotFoundError, InternalServerError } from '../middlewares/errors/AppError.js';

// Create a new review
export async function create(req, res, next) {
    const { tournamentId, reviewer, rating, subject, comment } = req.body;

    // Basic check for required fields
    if (!tournamentId || !reviewer || !rating || !subject || !comment) {
        return next(new ValidationError('Please provide all required fields.'));
    }

    try {
        const review = new Review({ tournament: tournamentId, reviewer, rating, subject, comment });
        await review.save();
        return sendResponse(res, 201, 'Review created successfully', review);
    } catch (error) {
        return next(error);
    }
}

// Get all reviews for a tournament
export async function index(req, res, next) {
    const { tournamentId } = req.params;

    try {
        const reviews = await Review.find({ tournament: tournamentId });
        return sendResponse(res, 200, 'Reviews fetched successfully', reviews);
    } catch (error) {
        return next(error);
    }
}

// Get a review by ID
export async function show(req, res, next) {
    const { id } = req.params;

    try {
        const review = await Review.findById(id);
        if (!review) {
            return next(new NotFoundError('Review not found.'));
        }
        return sendResponse(res, 200, 'Review fetched successfully', review);
    } catch (error) {
        return next(error);
    }
}

// Update a review by ID
export async function update(req, res, next) {
    const { id } = req.params;

    try {
        const review = await Review.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!review) {
            return next(new NotFoundError('Review not found.'));
        }
        return sendResponse(res, 200, 'Review updated successfully', review);
    } catch (error) {
        return next(error);
    }
}

// Delete a review by ID
export async function destroy(req, res, next) {
    const { id } = req.params;

    try {
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return next(new NotFoundError('Review not found.'));
        }
        return res.status(204).send(); // No content
    } catch (error) {
        return next(error);
    }
}
