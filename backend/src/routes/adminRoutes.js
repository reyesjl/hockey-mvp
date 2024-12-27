// backend/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const ac = require('../controllers/adminController');

// Admin routes
router.get('/metrics', ac.index);

module.exports = router;