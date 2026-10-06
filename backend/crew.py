from crewai import Crew, Process
from tasks import (
    create_parse_resume_task,
    create_analyze_job_task,
    create_score_skills_task,
    create_write_cover_letter_task
)
from models import AnalysisResponse

def run_analysis(resume_text: str, job_description: str) -> AnalysisResponse:
    try:
        # Create tasks
        parse_task = create_parse_resume_task(resume_text)
        analyze_task = create_analyze_job_task(job_description)
        score_task = create_score_skills_task(parse_task, analyze_task)
        cover_letter_task = create_write_cover_letter_task(parse_task, analyze_task, score_task)

        # Assemble Crew
        crew = Crew(
            agents=[
                parse_task.agent, 
                analyze_task.agent, 
                score_task.agent, 
                cover_letter_task.agent
            ],
            tasks=[parse_task, analyze_task, score_task, cover_letter_task],
            process=Process.sequential,
            verbose=False
        )

        # Execute
        crew.kickoff()

        # Extract outputs
        parsed_resume = parse_task.output.pydantic
        job_analysis = analyze_task.output.pydantic
        skill_gap_report = score_task.output.pydantic
        cover_letter = cover_letter_task.output.pydantic

        return AnalysisResponse(
            parsed_resume=parsed_resume,
            job_analysis=job_analysis,
            skill_gap_report=skill_gap_report,
            cover_letter=cover_letter
        )
    except Exception as e:
        # Re-raise or handle appropriately
        raise RuntimeError(f"Error during analysis: {str(e)}")
