import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function App(){
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">ChatGPT-Style Demo</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => setDark(d => !d)} className="px-3 py-1 border rounded">{dark ? 'Light' : 'Dark'}</button>
            <Link to="/chat/new" className="bg-blue-600 text-white px-3 py-1 rounded">Start New Chat</Link>
          </div>
        </div>
        <p className="text-sm">This is a demo landing page. Click <strong>Start New Chat</strong> to create a session (it will redirect to a session URL).</p>
      </div>
    </div>
  )
}
