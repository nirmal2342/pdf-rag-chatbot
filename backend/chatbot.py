import faiss
import pickle
import google.generativeai as genai
from sentence_transformers import SentenceTransformer

# Configure Gemini API
genai.configure(api_key="AIzaSyDtu58aovMgJlw8tieWES1wJLikpT1cVl8")

gemini_model = genai.GenerativeModel("gemini-2.5-flash")

# Load embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Load FAISS index
index = faiss.read_index("vector.index")

# Load chunks
with open("chunks.pkl", "rb") as f:
    chunks = pickle.load(f)


def retrieve_chunks(question, k=5):

    question_embedding = embedding_model.encode([question])

    distances, indices = index.search(question_embedding, k)

    retrieved = []

    for idx in indices[0]:
        retrieved.append(chunks[idx])

    return retrieved


def generate_answer(question):

    retrieved_chunks = retrieve_chunks(question)

    context = "\n".join(retrieved_chunks)

    prompt = f"""
Answer the question using only the context below.

Context:
{context}

Question:
{question}

Answer:
"""

    response = gemini_model.generate_content(prompt)

    return response.text