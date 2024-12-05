// backend/routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const rc = require('../controllers/reviewController');

// Review routes
router.get('/', rc.index);
router.post('/', rc.create);
router.get('/:id', rc.show);
router.get('/tournament/:tournamentId', rc.showByTournament);
router.patch('/:id', rc.update);
router.delete('/:id', rc.destroy);

// Export the router
module.exports = router;