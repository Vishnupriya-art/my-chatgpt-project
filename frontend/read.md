chatpage.jsx

import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import ChatInput from '../components/ChatInput'
import TableAnswer from '../components/TableAnswer'
import { chatAPI, sessionAPI } from '../utils/api';


export default function ChatPage(){
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const [session, setSession] = useState(sessionId === 'new' ? null : sessionId)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const messagesRef = useRef(null)

  useEffect(() => {
    if(sessionId === 'new'){
      // create new session via backend
      fetch('/api/sessions/new',{method:'POST'}).then(r=>r.json()).then(data=>{
        navigate(`/chat/${data.sessionId}`, { replace: true })
        setSession(data.sessionId)
      })
    } else if (sessionId){
      // load history
      fetch(`/api/sessions/${sessionId}/history`).then(r=>r.json()).then(data=>{
        setHistory(data.history || [])
      })
    }
  }, [sessionId])

  useEffect(()=>{
    if(messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [history])

  async function sendMessage(text){
    if(!session) return
    setLoading(true)
    const res = await fetch(`/api/sessions/${session}/message`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ text })
    })
    const data = await res.json()
    setHistory(prev => [...prev, { role:'user', text }, { role:'assistant', ...data.answer }])
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar onSelectSession={(id)=>{ navigate(`/chat/${id}`) }} />
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="font-semibold">Session: {session || 'creating...'}</h2>
          <div className="text-sm opacity-70">Theme toggle at top-left</div>
        </div>

        <div className="flex-1 overflow-auto p-4" ref={messagesRef}>
          {history.length===0 && <div className="text-center text-gray-500">No messages yet. Ask something!</div>}
          {history.map((m,idx)=>(
            <div key={idx} className="mb-6">
              {m.role === 'user' ? (
                <div className="text-right"><div className="inline-block bg-blue-100 dark:bg-blue-800 px-3 py-2 rounded">{m.text}</div></div>
              ) : (
                <div>
                  <div className="mb-2 text-sm text-gray-500">{m.description}</div>
                  <TableAnswer table={m.table || []} />
                  <div className="mt-2 flex gap-2">
                    <button className="px-2 py-1 border rounded">👍</button>
                    <button className="px-2 py-1 border rounded">👎</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <ChatInput onSend={sendMessage} loading={loading} />
      </div>
    </div>
  )
}



sidebad.jsx

import React, { useEffect, useState } from 'react'

export default function Sidebar({ onSelectSession }){
  const [sessions, setSessions] = useState([])
  const [open, setOpen] = useState(true)

  useEffect(()=>{
    fetch('/api/sessions').then(r=>r.json()).then(data=>setSessions(data.sessions || []))
  },[])

  return (
    <aside className={`w-80 border-r dark:border-gray-700 p-4 transition-transform ${open ? 'translate-x-0' : '-translate-x-80'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Chats</h3>
        <div className="flex gap-2">
          <button className="px-2 py-1 border rounded" onClick={()=>fetch('/api/sessions/new',{method:'POST'}).then(r=>r.json()).then(d=>onSelectSession(d.sessionId))}>New Chat</button>
          <button className="px-2 py-1 border rounded" onClick={()=>setOpen(o=>!o)}>{open ? 'Collapse' : 'Open'}</button>
        </div>
      </div>
      <ul className="space-y-2">
        {sessions.length===0 && <li className="text-sm text-gray-500">No sessions</li>}
        {sessions.map(s=>(
          <li key={s.sessionId}>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" onClick={()=>onSelectSession(s.sessionId)}>
              <div className="text-sm font-medium">{s.title || s.sessionId}</div>
              <div className="text-xs opacity-60">{s.createdAt}</div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}


tableanswer.jsx

import React from 'react'

export default function TableAnswer({ table }){
  if(!table || table.length===0) return <div className="text-sm text-gray-500">No tabular data.</div>
  const cols = Object.keys(table[0]||{})
  return (
    <div className="overflow-auto rounded border">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {cols.map(c=> <th key={c} className="px-3 py-2 text-left text-sm">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {table.map((r, i)=>(
            <tr key={i} className={i%2===0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
              {cols.map(c=> <td key={c} className="px-3 py-2 text-sm">{String(r[c])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


chatinput.jsx

import React, { useState } from 'react'

export default function ChatInput({ onSend, loading }){
  const [text, setText] = useState('')
  return (
    <div className="p-4 border-t dark:border-gray-700">
      <div className="flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Ask a question..." className="flex-1 px-3 py-2 border rounded" />
        <button disabled={loading || text.trim()===''} onClick={()=>{ onSend(text); setText('') }} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60">
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  )
}