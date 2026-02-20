from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chatbot import generate_answer

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "PDF Chatbot API running"}


@app.post("/chat")
def chat(request: dict):

    question = request.get("question")

    answer = generate_answer(question)

    return {
        "question": question,
        "answer": answer
    }