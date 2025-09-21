from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.src.database import SessionLocal
from src import crud, schemas
from src.utils.ml_utils import get_embedding, train_classifier, load_classifier
import numpy as np

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/classifier")
def train_classifier_endpoint(payload: schemas.TrainRequest, db: Session = Depends(get_db)):
    pairs = payload.resume_job_pairs
    labels = payload.labels
    if len(pairs) != len(labels):
        raise HTTPException(status_code=400, detail="pairs and labels length mismatch")
    X = []
    y = []
    for (rid, jid), lbl in zip(pairs, labels):
        r = db.query(__import__("database").Resume).get(rid)
        j = db.query(__import__("database").Job).get(jid)
        if not r or not j:
            raise HTTPException(status_code=404, detail=f"Missing resume {rid} or job {jid}")
        text_r = r.processed_text or r.raw_text
        text_j = j.processed_text or j.raw_text
        emb_r = get_embedding(text_r)
        emb_j = get_embedding(text_j)
        emb_concat = np.concatenate([emb_r, emb_j])
        X.append(emb_concat)
        y.append(lbl)
    result = train_classifier(X, y)
    # optionally save path to DB
    crud.save_classifier_model(db, result["path"])
    return {"status": "trained", "accuracy": result["accuracy"], "path": result["path"]}

@router.get("/classifier/status")
def classifier_status(db: Session = Depends(get_db)):
    clf = load_classifier()
    return {"exists": clf is not None}