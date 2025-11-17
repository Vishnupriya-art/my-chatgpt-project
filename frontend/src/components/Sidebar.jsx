import { useNavigate } from 'react-router-dom';

function Sidebar({ 
  sessions, 
  currentSessionId, 
  onNewChat, 
  onSessionSelect, 
  onDeleteSession 
}) {
  const navigate = useNavigate();

  const handleNewChat = async () => {
    try {
      await onNewChat();
      // Session created successfully
      console.log('New chat created from sidebar');
    } catch (err) {
      console.error('New chat failed:', err);
    }
  };

  const handleSessionSelect = (sessionId) => {
    onSessionSelect(sessionId);
    navigate(`/chat/${sessionId}`);
  };

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white mb-4">Chats</h1>
        <button
          onClick={handleNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          New Chat
        </button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {sessions.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">No sessions</p>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              className={`p-3 rounded-lg cursor-pointer transition group ${
                currentSessionId === session.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
              onClick={() => handleSessionSelect(session.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{session.title}</p>
                  <p className="text-xs opacity-70 truncate">
                    {new Date(session.lastActive).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  className="ml-2 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Theme Toggle Info */}
      <div className="p-4 border-t border-gray-700 text-xs text-gray-400 text-center">
        Theme toggle at top-left
      </div>
    </div>
  );
}

export default Sidebar;