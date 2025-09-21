from src import database as models
from backend.src.database import SessionLocal, Resume, Job, SimilarityRecord, ClassifierModelRecord
from sqlalchemy.orm import Session
from typing import Optional
from models.models import Resume, Job

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_resume(db: Session, text: str, filename: str = None):
    r = Resume(text=text, filename=filename)
    db.add(r)
    db.commit()
    db.refresh(r)
    return r

def create_job(db: Session, text: str, title: str = None):
    j = Job(text=text, title=title)
    db.add(j)
    db.commit()
    db.refresh(j)
    return j

def update_processed_resume(db: Session, resume_id: int, processed_text: str):
    r = db.query(Resume).get(resume_id)
    r.processed_text = processed_text
    db.commit()
    db.refresh(r)
    return r

def update_processed_job(db: Session, job_id: int, processed_text: str):
    j = db.query(Job).get(job_id)
    j.processed_text = processed_text
    db.commit()
    db.refresh(j)
    return j

def create_similarity(db: Session, resume_id: int, job_id: int, score: float):
    rec = SimilarityRecord(resume_id=resume_id, job_id=job_id, score=score)
    db.add(rec)
    db.commit()
    db.refresh(rec)
    return rec

def save_classifier_model(db: Session, path: str):
    rec = ClassifierModelRecord(path=path)
    db.add(rec)
    db.commit()
    db.refresh(rec)
    return rec

# Fetch all resumes
def get_resumes(db: Session):
    return db.query(models.Resume).all()

# Fetch all jobs
def get_jobs(db: Session):
    return db.query(models.Job).all()

