// backend/routes/tournamentSubmissionRoutes.js

const express = require('express');
const router = express.Router();
const tsc = require('../controllers/tournamentSubmissionController');

// Tournament submission routes
router.get('/', tsc.index);
router.post('/', tsc.create);
router.get('/:id', tsc.show);
router.patch('/:id', tsc.update);
router.delete('/:id', tsc.destroy);
router.post('/:id/approve', tsc.approve);

// Export the router
module.exports = router;