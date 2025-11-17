const app = require('./src/app');
const config = require('./src/config/server.config');

const PORT = process.env.PORT || config.port;


app.listen(PORT, () => {
  console.log('\n🚀 Server Started Successfully!\n');
  console.log(`📍 Server running on: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${config.env}\n`);
  console.log('📊 Available Endpoints:');
  console.log('   POST   /api/chat/new - Start new chat');
  console.log('   POST   /api/chat/:sessionId/ask - Ask question');
  console.log('   GET    /api/sessions - Get all sessions');
  console.log('   GET    /api/chat/:sessionId/history - Get session history');
  console.log('   DELETE /api/chat/:sessionId - Delete session');
  console.log('   GET    /api/health - Health check\n');
  console.log('✨ Ready to accept requests!\n');
});