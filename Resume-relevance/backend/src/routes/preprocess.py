from fastapi import APIRouter, Depends, HTTPException
from backend.src.database import SessionLocal
from sqlalchemy.orm import Session
from src import crud
from src.utils.text_utils import clean_text
from src.utils.ml_utils import extract_keywords, get_embedding
import src.schemas as schemas

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/resume/{resume_id}")
def preprocess_resume(resume_id: int, db: Session = Depends(get_db)):
    r = db.query(SessionLocal().get_bind().mapper_registry.mapped_classes)  # placeholder - we won't use
    # simpler:
    resume = db.query(__import__("database").Resume).get(resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    processed = clean_text(resume.raw_text)
    keywords = extract_keywords(processed, top_n=8)
    db = db
    crud.update_processed_resume(db, resume_id, processed)
    emb = get_embedding(processed)
    return {"id": resume_id, "processed": processed[:200], "keywords": keywords}

@router.post("/job/{job_id}")
def preprocess_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(__import__("database").Job).get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    processed = clean_text(job.raw_text)
    keywords = extract_keywords(processed, top_n=8)
    crud.update_processed_job(db, job_id, processed)
    emb = get_embedding(processed)
    return {"id": job_id, "processed": processed[:200], "keywords": keywords}