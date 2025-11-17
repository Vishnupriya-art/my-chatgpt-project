const { v4: uuidv4 } = require('uuid');
const storage = require('../utils/storage');
const { getRandomTable, getRandomInfo } = require('../data/mockData');

const chatController = {
  // Create new chat session
  createNewChat: (req, res) => {
    try {
      const sessionId = uuidv4();
      const sessionTitle = `Chat Session ${storage.getAllSessions().length + 1}`;
      const timestamp = new Date().toISOString();
      
      const sessionData = {
        id: sessionId,
        title: sessionTitle,
        createdAt: timestamp,
        lastActive: timestamp
      };
      
      storage.createSession(sessionId, sessionData);
      
      res.status(201).json({
        success: true,
        sessionId,
        title: sessionTitle,
        createdAt: timestamp
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to create new chat session'
      });
    }
  },

  // Ask question in a chat session
  askQuestion: (req, res) => {
    try {
      const { sessionId } = req.params;
      const { question } = req.body;
      
      // Validate session
      if (!storage.sessionExists(sessionId)) {
        return res.status(404).json({
          success: false,
          error: 'Session not found'
        });
      }
      
      // Validate question
      if (!question || question.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Question is required'
        });
      }
      
      // Generate response with mock data
      const response = {
        table: getRandomTable(),
        information: getRandomInfo(),
        timestamp: new Date().toISOString()
      };
      
      // Save to history
      storage.addMessage(sessionId, {
        question,
        answer: response,
        timestamp: response.timestamp
      });
      
      // Update session last active time
      storage.updateSession(sessionId, {
        lastActive: response.timestamp
      });
      
      res.json({
        success: true,
        response
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to process question'
      });
    }
  },

  // Get chat history for a session
  getChatHistory: (req, res) => {
    try {
      const { sessionId } = req.params;
      
      if (!storage.sessionExists(sessionId)) {
        return res.status(404).json({
          success: false,
          error: 'Session not found'
        });
      }
      
      const session = storage.getSession(sessionId);
      const history = storage.getHistory(sessionId);
      
      res.json({
        success: true,
        session,
        history,
        messageCount: history.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch chat history'
      });
    }
  },

  // Delete a chat session
  deleteChat: (req, res) => {
    try {
      const { sessionId } = req.params;
      
      if (!storage.sessionExists(sessionId)) {
        return res.status(404).json({
          success: false,
          error: 'Session not found'
        });
      }
      
      storage.deleteSession(sessionId);
      
      res.json({
        success: true,
        message: 'Session deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to delete session'
      });
    }
  }
};

module.exports = chatController;