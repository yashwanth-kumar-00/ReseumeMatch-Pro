🚀 Overview

Profile Enhancer Suite is a full-stack application that connects recruiters and students.

Recruiters can post job descriptions (JDs).

Students can upload resumes against those JDs.

The system then analyzes resumes, stores results in a database, and makes them ready for ML model training (for future improvements like candidate ranking, recommendations, etc.).

Built with FastAPI (Python backend) and MongoDB, the platform is modular and extendable for advanced resume analysis pipelines.

✨ Features

👨‍💼 Recruiter Portal

Post job titles & descriptions

View all jobs and associated resumes

🎓 Student Portal

Upload resumes for a specific job

Get automated resume analysis (keyword matching, skill extraction, scoring, etc.)

📊 Resume Analyzer (Pluggable)

Currently uses a simple keyword matcher

Can be extended to use NLP/ML models (Spacy, Transformers, etc.)

💾 Database Integration

MongoDB stores job descriptions, resumes, and analysis results

Designed for future training dataset extraction

📂 File Uploads

Resumes stored locally (uploads/resumes/)

Ready for S3/Cloud migration

🔌 API-First Design

REST endpoints for Jobs & Resumes

Interactive API docs via Swagger (/docs) and ReDoc (/redoc)
