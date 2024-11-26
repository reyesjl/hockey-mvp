// backend/controllers/adminController.js

const Tournament = require('../models/Tournament');
const TournamentSubmission = require('../models/TournamentSubmission');
const { InternalServerError } = require('../utils/AppError');
const { wrapResponse } = require('../utils/responseHandler');

exports.getAdminMetrics = async (req, res, next) => {
    try {
        // Fetch counts
        const tournamentCount = await Tournament.countDocuments();
        const tournamentSubmissionCount = await TournamentSubmission.countDocuments();

        // Send success response with metrics data
        wrapResponse(res, 200, 'Admin metrics fetched successfully', {
            tournamentCount,
            tournamentSubmissionCount
        });
    } catch (error) {
        next(new InternalServerError(`Failed to fetch admin metrics: ${error.message}`));
    }
};
