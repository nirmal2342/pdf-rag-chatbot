# 📄 PDF RAG Chatbot using Gemini Flash, FastAPI, React, and FAISS

A full-stack AI chatbot that answers questions from a PDF document using **Retrieval-Augmented Generation (RAG)**. The system extracts text using OCR, converts it into embeddings, stores them in a FAISS vector database, and uses **Gemini Flash** to generate accurate answers based on context.

---

## 🚀 Features

- 📄 Extracts text from PDF using OCR
- ✂️ Splits text into chunks for efficient processing
- 🧠 Converts text into vector embeddings
- 🗄️ Stores embeddings in FAISS vector database
- 🔍 Retrieves relevant chunks using cosine similarity
- 🤖 Uses Gemini Flash to generate context-based answers
- 🌐 Full-stack web app using React + FastAPI
- 🔒 Secure API key handling using `.env`

---

## 🧠 Architecture


User (React Frontend)
↓
FastAPI Backend
↓
Embedding Model (SentenceTransformers)
↓
FAISS Vector Database
↓
Retrieve relevant chunks
↓
Gemini Flash LLM
↓
Response returned to user


---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- HTML/CSS

### Backend
- FastAPI
- Python
- FAISS (Vector Database)
- SentenceTransformers (Embeddings)
- Gemini Flash API

### AI / ML
- OCR (Tesseract / PyMuPDF)
- Embedding Model: all-MiniLM-L6-v2
- LLM: Gemini 2.5 Flash
- Vector Search: FAISS

---

## 📁 Project Structure

```
pdf-rag-chatbot/
│
├── backend/
│   ├── main.py              # FastAPI server
│   ├── chatbot.py          # RAG logic
│   ├── vector.index        # FAISS vector database
│   ├── chunks.pkl          # Text chunks
│   ├── requirements.txt
│   ├── .env                # API key (not committed)
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── App.js          # React UI
│   │   └── ...
│   ├── package.json
│
└── README.md
```

---

