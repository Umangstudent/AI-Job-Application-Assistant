from crewai import Task
from agents import resume_parser, job_analyzer, skill_gap_scorer, cover_letter_writer
from models import ParsedResume, JobAnalysis, SkillGapReport, CoverLetter

def create_parse_resume_task(resume_text: str) -> Task:
    return Task(
        description=f"Parse the following raw resume text and extract structured data:\n{resume_text}",
        expected_output="A precisely structured JSON representation of the resume details.",
        agent=resume_parser,
        output_pydantic=ParsedResume
    )

def create_analyze_job_task(job_description: str) -> Task:
    return Task(
        description=f"Analyze the following job description and extract requirements, skills, and details:\n{job_description}",
        expected_output="A structured breakdown of the job description's core elements.",
        agent=job_analyzer,
        output_pydantic=JobAnalysis
    )

def create_score_skills_task(parse_task: Task, analyze_task: Task) -> Task:
    return Task(
        description="Using the parsed resume and job analysis from the previous tasks, assess the candidate's fit for the job. Identify matched skills, partial matches, and missing skills. Generate a detailed skill gap report.",
        expected_output="A structured report evaluating the candidate's skills against the job requirements.",
        agent=skill_gap_scorer,
        output_pydantic=SkillGapReport,
        context=[parse_task, analyze_task]
    )

def create_write_cover_letter_task(parse_task: Task, analyze_task: Task, score_task: Task) -> Task:
    return Task(
        description="Based on the parsed resume, job analysis, and skill gap report, write a compelling, tailored cover letter for the candidate targeting the specific job role.",
        expected_output="A professional cover letter with a subject, body, and key highlights.",
        agent=cover_letter_writer,
        output_pydantic=CoverLetter,
        context=[parse_task, analyze_task, score_task]
    )
