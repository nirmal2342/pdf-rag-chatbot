import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

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
    setLoading(true);

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        { question: input }
      );

      const botMessage = {
        sender: "bot",
        text: res.data.answer
      };

      setMessages(prev => [...prev, botMessage]);

    } catch {

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Error getting response." }
      ]);

    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (

    <div className="app">

      <div className="chat-card">

        {/* Header */}

        <div className="header">

          <div className="logo">
            ✦
          </div>

          <div>
            <div className="title">PDF Chatbot</div>
            <div className="subtitle">AI Assistant</div>
          </div>

          <div className="spacer" />

          <div className="theme-btn">☀</div>

        </div>

        {/* Body */}

        <div className="body">

          {messages.length === 0 && (

            <div className="welcome">

              <div className="bot-icon">🤖</div>

              <h2>How can I help you today?</h2>

              <p>
                I can answer questions about your PDF documents.
                Just type your query below.
              </p>

            </div>

          )}

          {messages.map((msg, i) => (

            <div key={i} className={`msg ${msg.sender}`}>

              {msg.text}

            </div>

          ))}

          {loading && (
            <div className="msg bot">Typing...</div>
          )}

          <div ref={messagesEndRef} />

        </div>

        {/* Input */}

        <div className="input-area">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask something..."
          />

          <button onClick={sendMessage}>
            ➤
          </button>

        </div>

        <div className="footer">
          AI can make mistakes. Please verify important information.
        </div>

      </div>

    </div>
  );
}

export default App;