import os
from sqlalchemy import create_engine, Column, Integer, String, Text, Float, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime
from models.models import Base

DATABASE_URL = os.getenv("DB_URL", "sqlite:///./app.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()

class Resume(Base):
    __tablename__ = "resumes"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=True)
    raw_text = Column(Text, nullable=False)
    processed_text = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=True)
    raw_text = Column(Text, nullable=False)
    processed_text = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class SimilarityRecord(Base):
    __tablename__ = "similarities"
    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, nullable=False)
    job_id = Column(Integer, nullable=False)
    score = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class ClassifierModelRecord(Base):
    __tablename__ = "classifier_models"
    id = Column(Integer, primary_key=True, index=True)
    path = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

def init_db():
    Base.metadata.create_all(bind=engine)