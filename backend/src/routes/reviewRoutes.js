// backend/routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Review routes
router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.patch('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

// Export the router
module.exports = router;