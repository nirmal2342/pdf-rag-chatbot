import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const question = input;

    const userMsg = {
      sender: "user",
      text: question
    };

    setMessages(prev => [...prev, userMsg]);

    setInput("");
    setLoading(true);

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        { question }
      );

      const botMsg = {
        sender: "bot",
        text: res.data.answer
      };

      setMessages(prev => [...prev, botMsg]);

    } catch {

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "Error getting response"
        }
      ]);

    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (

    <div className={darkMode ? "app dark" : "app light"}>

      <div className="chat-card">

        {/* Header */}

        <div className="header">

          <div className="header-left">
            <div className="logo">✦</div>
            <div>
              <div className="title">PDF Chatbot</div>
              <div className="subtitle">AI Assistant</div>
            </div>
          </div>

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>

        {/* Body */}

        <div className="body">

          {messages.length === 0 && (

            <div className="welcome">

              <div className="bot-icon">🤖</div>

              <h2>How can I help you today?</h2>

              <p>
                Ask questions about your PDF document.
              </p>

            </div>

          )}

          {messages.map((msg, i) => (

            <div
              key={i}
              className={`message-row ${msg.sender}`}
            >

              <div className={`bubble ${msg.sender}`}>
                {msg.text}
              </div>

            </div>

          ))}

          {/* Typing indicator */}

          {loading && (

            <div className="message-row bot">

              <div className="bubble bot typing">

                <span></span>
                <span></span>
                <span></span>

              </div>

            </div>

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