// backend/routes/tournamentRoutes.js

const express = require('express');
const router = express.Router();
const tc = require('../controllers/tournamentController');

// Tournament routes
router.post('/', tc.createTournament);
router.get('/', tc.getAllTournaments);
router.get('/:id', tc.getTournamentById);
router.patch('/:id', tc.updateTournament);
router.delete('/:id', tc.deleteTournament);

// Export the router
module.exports = router;
