import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Functions
export const chatAPI = {
  // Create new chat session
  createNewChat: async () => {
    try {
      const response = await api.post('/chat/new');
      return response.data;
    } catch (error) {
      console.error('Error creating new chat:', error);
      throw error;
    }
  },

  // Ask question in a session
  askQuestion: async (sessionId, question) => {
    try {
      const response = await api.post(`/chat/${sessionId}/ask`, { question });
      return response.data;
    } catch (error) {
      console.error('Error asking question:', error);
      throw error;
    }
  },

  // Get chat history
  getChatHistory: async (sessionId) => {
    try {
      const response = await api.get(`/chat/${sessionId}/history`);
      return response.data;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  },

  // Delete session
  deleteSession: async (sessionId) => {
    try {
      const response = await api.delete(`/chat/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  },
};

export const sessionAPI = {
  // Get all sessions
  getAllSessions: async () => {
    try {
      const response = await api.get('/sessions');
      return response.data;
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }
  },
};

export default api;