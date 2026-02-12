import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "./Chat.css";

const socket = io("http://localhost:5000");

function Chat() {
  const [username, setUsername] = useState("");
  const [roomJoined, setRoomJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const bottomRef = useRef(null);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const messageData = {
        author: username,
        message,
        time: new Date().toLocaleTimeString(),
      };

      socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  useEffect(() => {
    const handleReceive = (data) => {
      setMessageList((list) => [...list, data]);
    };

    const handleHistory = (history) => {
      setMessageList(history);
    };

    socket.on("receive_message", handleReceive);
    socket.on("chat_history", handleHistory);

    return () => {
      socket.off("receive_message", handleReceive);
      socket.off("chat_history", handleHistory);
    };
  }, []);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

 if (!roomJoined) {
  return (
    <div className="joinWrapper">
      <div className="joinCard">
        <h2>⚡ Real Time Chat</h2>

        <input
          placeholder="Enter your name"
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={() => setRoomJoined(true)}>Join Chat</button>
      </div>
    </div>
  );
}


  return (
    <div className="chatContainer">
      <div className="chatHeader">⚡ Real Time Chat</div>

      <div className="chatBody">
        {messageList.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.author === username ? "own" : "other"
            }`}
          >
            <div className="meta">
              {msg.author} • {msg.time}
            </div>
            <div className="text">{msg.message}</div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="chatFooter">
        <input
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
