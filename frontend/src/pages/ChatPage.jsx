import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatInput from '../components/ChatInput';
import Sidebar from '../components/Sidebar';
import TableAnswer from '../components/TableAnswer';
import { chatAPI, sessionAPI } from '../utils/api';

function ChatPage() {
  const { sessionId } = useParams();
  const [currentSessionId, setCurrentSessionId] = useState(sessionId || null);
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all sessions on mount
  useEffect(() => {
    fetchSessions();
  }, []);

  // Fetch chat history when session changes
  useEffect(() => {
    if (currentSessionId && currentSessionId !== 'new') {
      fetchChatHistory(currentSessionId);
    } else {
      setMessages([]);
    }
  }, [currentSessionId]);

  // Fetch all sessions
  const fetchSessions = async () => {
    try {
      const data = await sessionAPI.getAllSessions();
      setSessions(data.sessions || []);
    } catch (err) {
      console.error('Failed to fetch sessions:', err);
    }
  };

  // Fetch chat history for current session
  const fetchChatHistory = async (sessionId) => {
    try {
      setIsLoading(true);
      const data = await chatAPI.getChatHistory(sessionId);
      setMessages(data.history || []);
      setError(null);
    } catch (err) {
      setError('Failed to load chat history');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Create new chat session
  const handleNewChat = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setMessages([]); // Clear messages first
      
      const data = await chatAPI.createNewChat();
      console.log('New session created:', data); // Debug log
      
      setCurrentSessionId(data.sessionId);
      await fetchSessions(); // Refresh sessions list
      
    } catch (err) {
      setError('Failed to create new chat');
      console.error('New chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Send message
  const handleSendMessage = async (question) => {
    if (!question.trim()) return;

    // If no session exists, create one first
    if (!currentSessionId) {
      await handleNewChat();
      return;
    }

    try {
      setIsLoading(true);
      
      // Add user message to UI immediately
      const userMessage = {
        question,
        answer: null,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Send to backend
      const data = await chatAPI.askQuestion(currentSessionId, question);
      
      // Update with actual response
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          question,
          answer: data.response,
          timestamp: data.response.timestamp,
        };
        return updated;
      });

      await fetchSessions(); // Refresh sessions to update lastActive
      setError(null);
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete session
  const handleDeleteSession = async (sessionId) => {
    try {
      await chatAPI.deleteSession(sessionId);
      await fetchSessions();
      
      // If deleted session is current, clear it
      if (sessionId === currentSessionId) {
        setCurrentSessionId(null);
        setMessages([]);
      }
    } catch (err) {
      console.error('Failed to delete session:', err);
    }
  };

  // Switch session
  const handleSessionChange = (sessionId) => {
    setCurrentSessionId(sessionId);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onNewChat={handleNewChat}
        onSessionSelect={handleSessionChange}
        onDeleteSession={handleDeleteSession}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {!currentSessionId && messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <h2 className="text-2xl font-semibold mb-2">
                  No messages yet. Ask something!
                </h2>
                <p>Click "New Chat" or start typing below</p>
              </div>
            </div>
          )}

          {isLoading && messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-400">Loading...</div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className="space-y-4">
              {/* User Question */}
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white px-4 py-3 rounded-lg max-w-2xl">
                  {msg.question}
                </div>
              </div>

              {/* AI Response */}
              {msg.answer && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-100 px-4 py-3 rounded-lg max-w-4xl w-full">
                    {/* Information Text */}
                    <p className="mb-4">{msg.answer.information}</p>
                    
                    {/* Table */}
                    {msg.answer.table && (
                      <TableAnswer table={msg.answer.table} />
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && messages.length > 0 && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-gray-400 px-4 py-3 rounded-lg">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

export default ChatPage;