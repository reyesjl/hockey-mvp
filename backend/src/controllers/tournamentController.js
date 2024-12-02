// backend/controllers/tournamentController.js

const Tournament = require('../models/Tournament');
const { wrapResponse } = require('../utils/responseHandler');
const { ValidationError, NotFoundError, InternalServerError } = require('../utils/AppError');

// Create a new tournament
exports.create = async (req, res, next) => {
    const { name, location, date, contactEmail, notes, company, overallRating, refereeRating, tournamentCommunicationRating, gamesMinimum, levelOfPlay, ageGroups, usaHockeySanctioned, firstPlaceHardware, secondPlaceHardware, stayAndPlay, extendedCheckout, multiTeamDiscounts, earlyBirdDiscounts, otherDiscounts } = req.body;

    // Basic check for required fields
    if (!name || !location || !date || !contactEmail || !company || !gamesMinimum || !levelOfPlay || !ageGroups) {
        return next(new ValidationError('Please provide all required fields.'));
    }

    try {
        const tournament = new Tournament({
            name,
            location,
            date,
            contactEmail,
            notes,
            company,
            overallRating,
            refereeRating,
            tournamentCommunicationRating,
            gamesMinimum,
            levelOfPlay,
            ageGroups,
            usaHockeySanctioned,
            firstPlaceHardware,
            secondPlaceHardware,
            stayAndPlay,
            extendedCheckout,
            multiTeamDiscounts,
            earlyBirdDiscounts,
            otherDiscounts,
        });

        await tournament.save();
        return wrapResponse(res, 201, 'Tournament created successfully', tournament);
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
            return next(new ValidationError(`Tournament with the name "${keyValue}" already exists. Please choose a different name.`));
        }

        return next(new InternalServerError('Failed to create tournament. Please try again.'));
    }
};

// Get all tournaments
exports.index = async (req, res, next) => {
    const { search } = req.query;
    let query = {};

    // Use text search if a search term is provided
    if (search) {
        query = {
            $or: [
                { $text: { $search: search } },  // Text search for exact matches
                { name: { $regex: search, $options: 'i' } },  // Regex for partial matches
                { location: { $regex: search, $options: 'i' } }  // Regex for partial matches
            ]
        };
    }

    try {
        const tournaments = await Tournament.find(query);
        return wrapResponse(res, 200, 'Tournaments fetched successfully', tournaments);
    } catch (error) {
        return next(new InternalServerError('Failed to fetch tournaments. Please try again.'));
    }
};

// Get a tournament by ID
exports.show = async (req, res, next) => {
    const { id } = req.params;

    try {
        const tournament = await Tournament.findById(id);
        if (!tournament) {
            return next(new NotFoundError('Tournament not found.'));
        }
        return wrapResponse(res, 200, 'Tournament fetched successfully', tournament);
    } catch (error) {
        return next(new InternalServerError('Failed to fetch tournament. Please try again.'));
    }
};

// Update a tournament by ID
exports.update = async (req, res, next) => {
    const { id } = req.params;

    try {
        const tournament = await Tournament.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!tournament) {
            return next(new NotFoundError('Tournament not found.'));
        }
        return wrapResponse(res, 200, 'Tournament updated successfully', tournament);
    } catch (error) {
        return next(new ValidationError('Failed to update tournament. Please check your input.'));
    }
};

// Delete a tournament by ID
exports.destroy = async (req, res, next) => {
    const { id } = req.params;

    try {
        const tournament = await Tournament.findByIdAndDelete(id);
        if (!tournament) {
            return next(new NotFoundError('Tournament not found.'));
        }
        return res.status(204).send(); // No content
    } catch (error) {
        return next(new InternalServerError('Failed to delete tournament. Please try again.'));
    }
};