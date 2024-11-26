// backend/routes/tournamentSubmissionRoutes.js

const express = require('express');
const router = express.Router();
const tsc = require('../controllers/tournamentSubmissionController');

// Tournament submission routes
router.post('/', tsc.createTournamentSubmission);
router.get('/', tsc.getAllTournamentSubmissions);
router.get('/:id', tsc.getTournamentSubmissionById);
router.patch('/:id', tsc.updateTournamentSubmission);
router.delete('/:id', tsc.deleteTournamentSubmission);

// Export the router
module.exports = router;