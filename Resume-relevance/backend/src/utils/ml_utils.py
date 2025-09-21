import os
from sentence_transformers import SentenceTransformer, util
from keybert import KeyBERT
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import joblib
from typing import List

# model paths
MODEL_DIR = os.path.join(os.getcwd(), "models")
os.makedirs(MODEL_DIR, exist_ok=True)
EMBED_MODEL_NAME = os.getenv("EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
EMBED_MODEL_PATH = os.path.join(MODEL_DIR, "embedding_model")

# load embedding model (lazy)
_embed_model: SentenceTransformer = None
_kw_model: KeyBERT = None

def load_embedding_model():
    global _embed_model
    if _embed_model is None:
        _embed_model = SentenceTransformer(EMBED_MODEL_NAME)
    return _embed_model

def get_embedding(text: str):
    m = load_embedding_model()
    return m.encode(text, convert_to_numpy=True, show_progress_bar=False)

def cosine_similarity(a: np.ndarray, b: np.ndarray):
    # use sentence-transformers util
    return float(util.cos_sim(a, b).item())

def extract_keywords(text: str, top_n: int = 8):
    global _kw_model
    if _kw_model is None:
        _kw_model = KeyBERT(load_embedding_model())
    keywords = _kw_model.extract_keywords(text, top_n=top_n, keyphrase_ngram_range=(1,2))
    return [kw for kw, score in keywords]

# classifier helpers
CLASSIFIER_PATH = os.path.join(MODEL_DIR, "relevance_model.pkl")

def train_classifier(X: List[np.ndarray], y: List[int]):
    # X: list of embeddings
    Xv = np.stack(X)
    X_train, X_test, y_train, y_test = train_test_split(Xv, y, test_size=0.2, random_state=42)
    clf = LogisticRegression(max_iter=1000)
    clf.fit(X_train, y_train)
    acc = clf.score(X_test, y_test)
    joblib.dump(clf, CLASSIFIER_PATH)
    return {"accuracy": float(acc), "path": CLASSIFIER_PATH}

def load_classifier():
    if os.path.exists(CLASSIFIER_PATH):
        return joblib.load(CLASSIFIER_PATH)
    return None

def predict_with_classifier(embedding):
    clf = load_classifier()
    if clf is None:
        raise RuntimeError("No classifier model saved")
    pred = clf.predict(embedding.reshape(1, -1))
    prob = clf.predict_proba(embedding.reshape(1,-1)).max()
    return int(pred[0]), float(prob)