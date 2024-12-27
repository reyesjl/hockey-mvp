// backend/routes/flagRoutes.js

const express = require('express');
const router = express.Router();
const fc = require('../controllers/flagController');

// Flag routes
router.get('/', fc.index);
router.post('/', fc.create);
router.get('/:id', fc.show);
router.patch('/:id', fc.update);
router.delete('/:id', fc.destroy);

// Export the router
module.exports = router;