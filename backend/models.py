from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class AnalysisRequest(BaseModel):
    resume_text: str = Field(..., min_length=50, description="Raw resume text")
    job_description: str = Field(..., min_length=50, description="Job description text")

class MatchStatus(str, Enum):
    MATCH = "match"
    PARTIAL = "partial"
    GAP = "gap"

class ParsedResume(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    summary: Optional[str] = None
    skills: list[str]
    experience: list[dict]  # Each dict has: title, company, duration, description
    education: list[dict]   # Each dict has: degree, institution, year
    certifications: list[str] = []

class JobAnalysis(BaseModel):
    title: str
    company: Optional[str] = None
    required_skills: list[str]
    preferred_skills: list[str] = []
    responsibilities: list[str]
    qualifications: list[str]
    experience_level: Optional[str] = None

class SkillGap(BaseModel):
    skill: str
    proficiency_level: int = Field(..., ge=1, le=10, description="1-10 proficiency score")
    match_status: MatchStatus
    recommendation: str

class SkillGapReport(BaseModel):
    overall_score: int = Field(..., ge=0, le=100, description="Overall match percentage")
    matched_skills: list[str]
    partial_skills: list[str]
    missing_skills: list[str]
    skill_details: list[SkillGap]
    improvement_areas: list[str]

class CoverLetter(BaseModel):
    subject: str
    body: str
    key_highlights: list[str]

class AnalysisResponse(BaseModel):
    parsed_resume: ParsedResume
    job_analysis: JobAnalysis
    skill_gap_report: SkillGapReport
    cover_letter: CoverLetter
