// backend/routes/flagRoutes.js

const express = require('express');
const router = express.Router();
const fc = require('../controllers/flagController');

// Flag routes
router.post('/', fc.createFlag);
router.get('/', fc.getAllFlags);
router.get('/:id', fc.getFlagById);
router.patch('/:id', fc.updateFlag);
router.delete('/:id', fc.deleteFlag);

// Export the router
module.exports = router;