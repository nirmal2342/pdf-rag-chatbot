import React, { useState } from "react";
import axios from "axios";

function App() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askQuestion = async () => {

    const res = await axios.post("http://127.0.0.1:8000/chat", {
      question: question
    });

    setAnswer(res.data.answer);
  };

  return (

    <div style={{ padding: "40px" }}>

      <h1>PDF Chatbot</h1>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask question..."
        style={{ width: "400px", padding: "10px" }}
      />

      <br /><br />

      <button onClick={askQuestion}>
        Ask
      </button>

      <br /><br />

      <h3>Answer:</h3>

      <p>{answer}</p>

    </div>
  );
}

export default App;