from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.src.database import SessionLocal
from src import crud, schemas
from src.utils.ml_utils import get_embedding, cosine_similarity, predict_with_classifier
import numpy as np

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/similarity")
def similarity(req: schemas.PredictRequest, db: Session = Depends(get_db)):
    resume = db.query(__import__("database").Resume).get(req.resume_id)
    job = db.query(__import__("database").Job).get(req.job_id)
    if not resume or not job:
        raise HTTPException(status_code=404, detail="Resume or Job not found")
    text_r = resume.processed_text or resume.raw_text
    text_j = job.processed_text or job.raw_text
    emb_r = get_embedding(text_r)
    emb_j = get_embedding(text_j)
    score = cosine_similarity(emb_r, emb_j)
    crud.create_similarity(db, req.resume_id, req.job_id, score)
    return {"resume_id": req.resume_id, "job_id": req.job_id, "score": score}

@router.post("/classifier_predict")
def classifier_predict(req: schemas.PredictRequest, db: Session = Depends(get_db)):
    resume = db.query(__import__("database").Resume).get(req.resume_id)
    job = db.query(__import__("database").Job).get(req.job_id)
    if not resume or not job:
        raise HTTPException(status_code=404, detail="Resume or Job not found")
    text_r = resume.processed_text or resume.raw_text
    text_j = job.processed_text or job.raw_text
    emb_r = get_embedding(text_r)
    emb_j = get_embedding(text_j)
    # simple approach: use difference or concatenation. We'll concatanate embeddings
    emb_concat = np.concatenate([emb_r, emb_j])
    try:
        pred, prob = predict_with_classifier(emb_concat)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"prediction": pred, "probability": prob}