const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Create new chat session
router.post('/new', chatController.createNewChat);

// Ask question in a session
router.post('/:sessionId/ask', chatController.askQuestion);

// Get chat history for a session
router.get('/:sessionId/history', chatController.getChatHistory);

// Delete a chat session
router.delete('/:sessionId', chatController.deleteChat);

module.exports = router;