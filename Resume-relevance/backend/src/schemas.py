from pydantic import BaseModel

class PredictRequest(BaseModel):
    resume_text: str
    job_description: str

class TrainRequest(BaseModel):
    resumes: list[str]
    job_descriptions: list[str]
    labels: list[int]  # 0 or 1