import React, { useState } from "react";
import axios from "axios";

function App() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askQuestion = async () => {

    if (!question) return;

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          question: question
        }
      );

      setAnswer(response.data.answer);

    } catch (error) {

      console.error(error);
      setAnswer("Error getting response");

    }
  };

  return (

    <div style={{ padding: "40px" }}>

      <h1>PDF Chatbot</h1>

      <input
        type="text"
        placeholder="Ask your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "400px",
          padding: "10px",
          fontSize: "16px"
        }}
      />

      <br /><br />

      <button
        onClick={askQuestion}
        style={{
          padding: "10px 20px",
          fontSize: "16px"
        }}
      >
        Ask
      </button>

      <br /><br />

      <h3>Answer:</h3>

      <div style={{
        width: "600px",
        padding: "10px",
        border: "1px solid gray"
      }}>
        {answer}
      </div>

    </div>

  );
}

export default App;