// backend/controllers/adminController.js

const Tournament = require('../models/Tournament');
const TournamentSubmission = require('../models/TournamentSubmission');
const { ErrorResponse } = require('../utils/errorHandler');

exports.getAdminMetrics = async (req, res) => {
    try {
        // Fetch counts
        const tournamentCount = await Tournament.countDocuments();
        const tournamentSubmissionCount = await TournamentSubmission.countDocuments();

        return res.status(200).json({
            tournamentCount,
            tournamentSubmissionCount
        });
    } catch (error) {
        const errorResponse = new ErrorResponse(`Failed to fetch admin metrics: ${error.message}`, 500);
        return res.status(500).json({ message: errorResponse.message });
    }
}