import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input
    };

    setMessages(prev => [...prev, userMessage]);

    setInput("");

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          question: input
        }
      );

      const botMessage = {
        sender: "bot",
        text: response.data.answer
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {

      const botMessage = {
        sender: "bot",
        text: "Error getting response"
      };

      setMessages(prev => [...prev, botMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (

    <div className="chat-container">

      <div className="chat-header">
        PDF Chatbot
      </div>

      <div className="chat-body">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}`}
          >
            {msg.text}
          </div>
        ))}

        <div ref={messagesEndRef} />

      </div>

      <div className="chat-footer">

        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>

  );
}

export default App;