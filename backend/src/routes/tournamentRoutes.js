// backend/routes/tournamentRoutes.js

const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournamentController');

// Tournament routes
router.post('/', tournamentController.createTournament);
router.get('/', tournamentController.getAllTournaments);
router.get('/:id', tournamentController.getTournamentById);
router.patch('/:id', tournamentController.updateTournament);
router.delete('/:id', tournamentController.deleteTournament);

// Export the router
module.exports = router;
