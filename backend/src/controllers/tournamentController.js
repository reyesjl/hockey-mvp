// backend/controllers/tournamentController.js

const Tournament = require('../models/Tournament');
const { ErrorResponse } = require('../utils/errorHandler');

// Create a new tournament
exports.createTournament = async (req, res, next) => {
    const { name, location, date, contactEmail, notes, company, overallRating, refereeRating, tournamentCommunicationRating, gamesMinimum, levelOfPlay, ageGroups, usaHockeySanctioned, firstPlaceHardware, secondPlaceHardware, stayAndPlay, extendedCheckout, multiTeamDiscounts, earlyBirdDiscounts, otherDiscounts } = req.body;

    // Basic check for required fields
    if (!name || !location || !date || !contactEmail || !company || !gamesMinimum || !levelOfPlay || !ageGroups) {
        return next(new ErrorResponse('Please provide all required fields.', 400));
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
        res.status(201).json(tournament);
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
            return next(new ErrorResponse(`Tournament with the name "${keyValue}" already exists. Please choose a different name.`, 400));
        }

        next(new ErrorResponse('Failed to create tournament. Please try again.', 500));
    }
};

// Get all tournaments
exports.getAllTournaments = async (req, res, next) => {
    const { search } = req.query;
    let query = {}

    // Build the query object
    if (search) {
        query = {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ]
        };
    }

    try {
        const tournaments = await Tournament.find(query);
        res.status(200).json(tournaments);
    } catch (error) {
        next(new ErrorResponse('Failed to fetch tournaments. Please try again.', 500));
    }
};

// Get a tournament by ID
exports.getTournamentById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const tournament = await Tournament.findById(id);
        if (!tournament) {
            return next(new ErrorResponse('Tournament not found.', 404));
        }
        res.status(200).json(tournament);
    } catch (error) {
        next(new ErrorResponse('Failed to fetch tournament. Please try again.', 500));
    }
};

// Update a tournament by ID
exports.updateTournament = async (req, res, next) => {
    const { id } = req.params;

    try {
        const tournament = await Tournament.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!tournament) {
            return next(new ErrorResponse('Tournament not found.', 404));
        }
        res.status(200).json(tournament);
    } catch (error) {
        next(new ErrorResponse('Failed to update tournament. Please check your input.', 400));
    }
};

// Delete a tournament by ID
exports.deleteTournament = async (req, res, next) => {
    const { id } = req.params;

    try {
        const tournament = await Tournament.findByIdAndDelete(id);
        if (!tournament) {
            return next(new ErrorResponse('Tournament not found.', 404));
        }
        res.status(204).send(); // No content
    } catch (error) {
        next(new ErrorResponse('Failed to delete tournament. Please try again.', 500));
    }
};