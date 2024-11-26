// backend/routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const rc = require('../controllers/reviewController');

// Review routes
router.post('/', rc.createReview);
router.get('/', rc.getAllReviews);
router.get('/:id', rc.getReviewById);
router.get('/tournament/:tournamentId', rc.getReviewsByTournamentId);
router.patch('/:id', rc.updateReview);
router.delete('/:id', rc.deleteReview);

// Export the router
module.exports = router;