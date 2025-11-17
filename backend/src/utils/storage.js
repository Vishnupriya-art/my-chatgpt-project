// In-memory storage
const sessions = new Map();
const chatHistory = new Map();

const storage = {
  // Session operations
  createSession: (sessionId, sessionData) => {
    sessions.set(sessionId, sessionData);
    chatHistory.set(sessionId, []);
  },

  getSession: (sessionId) => {
    return sessions.get(sessionId);
  },

  getAllSessions: () => {
    return Array.from(sessions.values()).sort((a, b) => 
      new Date(b.lastActive) - new Date(a.lastActive)
    );
  },

  updateSession: (sessionId, updates) => {
    const session = sessions.get(sessionId);
    if (session) {
      Object.assign(session, updates);
    }
  },

  deleteSession: (sessionId) => {
    sessions.delete(sessionId);
    chatHistory.delete(sessionId);
  },

  sessionExists: (sessionId) => {
    return sessions.has(sessionId);
  },

  // Chat history operations
  addMessage: (sessionId, message) => {
    const history = chatHistory.get(sessionId);
    if (history) {
      history.push(message);
    }
  },

  getHistory: (sessionId) => {
    return chatHistory.get(sessionId) || [];
  },

  // Stats
  getStats: () => {
    return {
      totalSessions: sessions.size,
      totalMessages: Array.from(chatHistory.values()).reduce((sum, history) => sum + history.length, 0)
    };
  }
};

module.exports = storage;