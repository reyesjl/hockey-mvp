// backend/routes/flagRoutes.js

const express = require('express');
const router = express.Router();
const flagController = require('../controllers/flagController');

// Flag routes
router.post('/', flagController.createFlag);
router.get('/', flagController.getAllFlags);
router.get('/:id', flagController.getFlagById);
router.patch('/:id', flagController.updateFlag);
router.delete('/:id', flagController.deleteFlag);

// Export the router
module.exports = router;