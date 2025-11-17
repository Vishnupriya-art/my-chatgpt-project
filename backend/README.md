# ChatGPT-Style Backend

## Installation
npm install

## Run Development Server
npm run dev

## Run Production Server
npm start

## API Endpoints
- POST /api/chat/new - Start new chat
- POST /api/chat/:sessionId/ask - Ask question
- GET /api/sessions - Get all sessions
- GET /api/chat/:sessionId/history - Get session history
- DELETE /api/chat/:sessionId - Delete session