// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST route to generate JWT token upon successful Firebase login
router.post('/jwt', authController.generateToken);

module.exports = router;