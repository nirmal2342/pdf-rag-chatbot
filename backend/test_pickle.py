import pickle

with open("chunks.pkl", "rb") as f:
    chunks = pickle.load(f)

print("Chunks loaded:", len(chunks))
print(chunks[0])