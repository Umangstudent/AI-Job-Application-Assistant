import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from models import AnalysisRequest, AnalysisResponse
from crew import run_analysis

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Job Application Assistant API")

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

@app.post("/api/analyze", response_model=AnalysisResponse)
def analyze_application(request: AnalysisRequest):
    try:
        if not os.getenv("GROQ_API_KEY"):
            raise HTTPException(status_code=500, detail="GROQ_API_KEY is not set.")
        
        response = run_analysis(request.resume_text, request.job_description)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
