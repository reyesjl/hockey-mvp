// backend/routes/tournamentSubmissionRoutes.js

const express = require('express');
const router = express.Router();
const tournamentSubmissionController = require('../controllers/tournamentSubmissionController');

// Tournament submission routes
router.post('/', tournamentSubmissionController.createTournamentSubmission);
router.get('/', tournamentSubmissionController.getAllTournamentSubmissions);
router.get('/by-email', tournamentSubmissionController.getTournamentSubmissionsByEmail);
router.get('/:id', tournamentSubmissionController.getTournamentSubmissionById);
router.patch('/:id', tournamentSubmissionController.updateTournamentSubmission);
router.delete('/:id', tournamentSubmissionController.deleteTournamentSubmission);

// Export the router
module.exports = router;