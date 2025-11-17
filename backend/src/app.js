const express = require('express');
const cors = require('cors');
const config = require('./config/server.config');
const chatRoutes = require('./routes/chatRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();

// Middleware
app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/health', sessionRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'ChatGPT-Style Backend API',
    version: '1.0.0',
    endpoints: {
      chat: {
        createNew: 'POST /api/chat/new',
        askQuestion: 'POST /api/chat/:sessionId/ask',
        getHistory: 'GET /api/chat/:sessionId/history',
        deleteSession: 'DELETE /api/chat/:sessionId'
      },
      sessions: {
        getAll: 'GET /api/sessions'
      },
      health: {
        check: 'GET /api/health'
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

module.exports = app;