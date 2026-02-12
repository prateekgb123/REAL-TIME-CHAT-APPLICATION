# ⚡ Real-Time Chat Application

A modern full-stack real-time chat platform built using **React**, **Node.js**, **Socket.IO**, and **MongoDB**.

This application enables multiple users to communicate instantly, view chat history, and delete their own messages with live synchronization across all connected clients.

Built with production-style architecture and clean UI.

---

## 🚀 Features

- 🔴 Real-time messaging using WebSockets
- 💬 Instant broadcast to all users
- 🧠 MongoDB message persistence
- ♻️ Auto load chat history for new users
- 🗑 Delete your own messages (real-time)
- 👤 Username based chat identity
- 📜 Auto-scroll to latest message
- 🎨 Modern responsive UI with chat bubbles
- ⚡ Fast event-driven architecture
- 🔐 Environment variable configuration

---

## 🧰 Tech Stack

### Frontend
- React
- Socket.IO Client
- CSS (modern UI)

### Backend
- Node.js
- Express
- Socket.IO
- MongoDB + Mongoose

---

## 📁 Project Structure

realtime-chat-app/
│
├── client/ # React frontend
│ ├── public/
│ └── src/
│
├── server/ # Node + Socket.IO backend
│ ├── models/
│ └── server.js
│
├── .gitignore
└── README.md


---

## ⚙️ Environment Variables

Create a `.env` file inside the **server** folder.

PORT=5000
MONGO_URL=your mongodb url
CLIENT_URL=http://localhost:3000


---

## ▶️ How To Run Locally

### 1️⃣ Clone repository

git clone <your-repo-url>
cd realtime-chat-app


---

### 2️⃣ Start Backend

cd server
npm install
npm start


Server runs on:

http://localhost:5000


---

### 3️⃣ Start Frontend (new terminal)

cd client
npm install
npm start


App runs on:

http://localhost:3000


---

## 🧪 Testing Real-Time

Open two browser windows.

Join with different usernames.

Send messages → see instant updates ⚡

---

## 🗑 Delete Message Flow

1. User clicks delete icon.
2. Event sent to server.
3. Server removes message from MongoDB.
4. Updated history is broadcast.
5. All clients update immediately.

---

## 🧠 Architecture Overview

React Client
↓
Socket.IO
↓
Node / Express Server
↓
MongoDB


Server acts as single source of truth.

---

## 💡 What I Learned

- WebSocket based communication
- Real-time state synchronization
- MongoDB data modeling
- Event-driven backend design
- UI/UX for chat systems
- Managing listeners & cleanup
- Production folder structure

---

## 🌟 Future Improvements

- Authentication & JWT
- Private rooms
- Typing indicators
- Message editing
- Reactions
- File/image sharing
- Notifications
- Deployment (Render / Vercel)

---

## 👨‍💻 Author

**Prateek**

If you like this project, feel free to ⭐ the repository.