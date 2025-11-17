const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// Get all sessions
router.get('/', sessionController.getAllSessions);

// Health check
router.get('/health', sessionController.healthCheck);

module.exports = router;