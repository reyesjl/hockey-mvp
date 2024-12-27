// backend/routes/tournamentRoutes.js

const express = require('express');
const router = express.Router();
const tc = require('../controllers/tournamentController');

// Tournament routes
router.get('/', tc.index);
router.post('/', tc.create);
router.get('/:id', tc.show);
router.patch('/:id', tc.update);
router.delete('/:id', tc.destroy);

// Export the router
module.exports = router;
