from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from src.database import init_db
from src.routes import upload, preprocess, predict, train

app = FastAPI(title="Profile Enhancer Backend")

# Update CORS allowed origins
origins = [
    os.getenv("CLIENT_URL", "http://localhost:8080"),  # 👈 match frontend port
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB tables
init_db()

# include routers
app.include_router(upload.router, prefix="/api/upload", tags=["upload"])
app.include_router(preprocess.router, prefix="/api/preprocess", tags=["preprocess"])
app.include_router(predict.router, prefix="/api/predict", tags=["predict"])
app.include_router(train.router, prefix="/api/train", tags=["train"])

@app.get("/")
def root():
    return {"message": "Profile Enhancer Backend running ✅"}