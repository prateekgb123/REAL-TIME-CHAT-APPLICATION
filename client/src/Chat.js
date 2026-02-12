import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// create connection once
const socket = io("http://localhost:5000");

function Chat() {
  const [username, setUsername] = useState("");
  const [roomJoined, setRoomJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // send message to server
  const sendMessage = () => {
    if (message.trim() !== "") {
      const messageData = {
        author: username,
        message: message,
        time: new Date().toLocaleTimeString(),
      };

      socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  // receive message from server
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


  // join screen
  if (!roomJoined) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <input
          placeholder="Enter your name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => setRoomJoined(true)}>Join Chat</button>
      </div>
    );
  }

  // chat screen
  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <div
        style={{
          border: "1px solid gray",
          height: "300px",
          overflowY: "scroll",
          padding: "10px",
        }}
      >
        {messageList.map((msg, index) => (
          <div key={index}>
            <b>{msg.author}</b> [{msg.time}]: {msg.message}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          value={message}
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
