from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session
from backend.src.database import SessionLocal
from src import crud

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- Upload Resume ----------------
@router.post("/resume")
async def upload_resume(
    file: UploadFile = File(...),   # 👈 must be "file" to match frontend
    db: Session = Depends(get_db)
):
    content_bytes = await file.read()
    try:
        content = content_bytes.decode("utf-8", errors="ignore")
    except Exception:
        content = ""  # fallback for non-text files

    r = crud.create_resume(db, text=content, filename=file.filename)
    return {"id": r.id, "filename": r.filename}

# ---------------- Upload Job Description ----------------
@router.post("/job")
async def upload_job(
    file: UploadFile = File(...),   # 👈 again use "file" to match frontend
    title: str = Form(None),
    db: Session = Depends(get_db)
):
    content_bytes = await file.read()
    try:
        content = content_bytes.decode("utf-8", errors="ignore")
    except Exception:
        content = ""

    j = crud.create_job(db, text=content, title=title)
    return {"id": j.id, "title": j.title, "filename": file.filename}

# ---------------- List Resumes ----------------
@router.get("/resumes")
def list_resumes(db: Session = Depends(get_db)):
    return crud.get_resumes(db)

# ---------------- List Jobs ----------------
@router.get("/jobs")
def list_jobs(db: Session = Depends(get_db)):
    return crud.get_jobs(db)