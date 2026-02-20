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

    const userMessage = {
      sender: "user",
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        { question: input }
      );

      // Typing animation simulation
      const fullText = response.data.answer;
      let currentText = "";

      const botMessage = {
        sender: "bot",
        text: ""
      };

      setMessages(prev => [...prev, botMessage]);

      for (let i = 0; i < fullText.length; i++) {

        currentText += fullText[i];

        await new Promise(resolve => setTimeout(resolve, 10));

        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            sender: "bot",
            text: currentText
          };
          return updated;
        });
      }

    } catch {

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Error getting response." }
      ]);

    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (

    <div className={darkMode ? "app dark" : "app"}>

      <div className="chat-container">

        <div className="chat-header">

          <span>PDF Chatbot</span>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>

        <div className="chat-body">

          {messages.map((msg, index) => (

            <div key={index} className={`message ${msg.sender}`}>

              <div className="avatar">
                {msg.sender === "user" ? "🧑" : "🤖"}
              </div>

              <div className="bubble">
                {msg.text}
              </div>

            </div>

          ))}

          {loading && (

            <div className="message bot">

              <div className="avatar">🤖</div>

              <div className="bubble typing">
                <span></span>
                <span></span>
                <span></span>
              </div>

            </div>

          )}

          <div ref={messagesEndRef} />

        </div>

        <div className="chat-footer">

          <input
            type="text"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <button onClick={sendMessage}>
            Send
          </button>

        </div>

      </div>

    </div>

  );
}

export default App;