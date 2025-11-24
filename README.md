AI Chat Application – Full Stack Project

This is a full-stack AI Chat Application built with a Node.js backend and React + Vite frontend, integrating advanced chat capabilities powered by an AI model.

The project is structured into two main parts:

Backend → Node.js, Express, Controllers, Routes

Frontend → React, Tailwind CSS, Components, Pages 

📁 Project Structure
project/
│── src/
│   ├── config/
│   │   └── server.config.js
│   ├── controllers/
│   │   ├── chatController.js
│   │   └── sessionController.js
│   ├── data/
│   │   └── mockData.js
│   ├── routes/
│   │   ├── chatRoutes.js
│   │   └── sessionRoutes.js
│   ├── utils/
│   │   └── storage.js
│   ├── app.js
│   └── server.js
│
│── .gitignore
│── package.json
│── README.md
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInput.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── TableAnswer.jsx
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.cjs
│   ├── tailwind.config.cjs
│   ├── vite.config.js
│   ├── .gitignore
│   └── README.md

⚙️ Tech Stack
Backend

Node.js

Express.js

REST API Architecture

Controllers / Routes Pattern

dotenv

Custom storage utilities

Frontend

React (Vite)

Tailwind CSS

Component-based UI

Clean Chat Interface

Reusable UI components (ChatInput, Sidebar, TableAnswer)

🧩 Key Files Explained
app.js

Initializes Express app and middleware.

server.js

Starts backend server.

chatController.js

Handles AI responses, message processing, and logic.

sessionController.js

Manages user sessions and chat history.

storage.js

Temporary in-memory or file-based storage utilities.

mockData.js

Temporary data for testing (fake responses or sessions).

Frontend Components

ChatInput.jsx → Input box for messages

Sidebar.jsx → Left navigation / chat history

TableAnswer.jsx → Shows AI-generated table-like results

🚀 Future Enhancements

Database integration (MongoDB / PostgreSQL)

JWT-based authentication

Persistent session storage

Dark mode UI

Voice input/chat
