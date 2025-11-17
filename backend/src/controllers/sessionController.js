const storage = require('../utils/storage');

const sessionController = {
  // Get all sessions
  getAllSessions: (req, res) => {
    try {
      const allSessions = storage.getAllSessions();
      
      res.json({
        success: true,
        sessions: allSessions,
        count: allSessions.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch sessions'
      });
    }
  },

  // Health check endpoint
  healthCheck: (req, res) => {
    try {
      const stats = storage.getStats();
      
      res.json({
        success: true,
        status: 'Server is running',
        timestamp: new Date().toISOString(),
        stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Health check failed'
      });
    }
  }
};

module.exports = sessionController;