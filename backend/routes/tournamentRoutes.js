// backend/routes/tournamentRoutes.js

const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournamentController');

// Route for submitting a new tournament
router.post('/submit', tournamentController.submitTournament);

// Export the router
module.exports = router;
