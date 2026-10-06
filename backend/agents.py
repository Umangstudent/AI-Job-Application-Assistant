from crewai import Agent, LLM

llm = LLM(model="groq/llama-3.3-70b-versatile")

resume_parser = Agent(
    role="Senior HR Data Analyst",
    goal="Extract comprehensive structured data from raw resume text with high accuracy",
    backstory="You have years of experience parsing thousands of resumes across various industries. You excel at extracting precise details even from unstructured text.",
    verbose=False,
    allow_delegation=False,
    llm=llm
)

job_analyzer = Agent(
    role="Technical Recruitment Specialist",
    goal="Parse job descriptions into structured, actionable requirements",
    backstory="You are an expert in tech industry hiring, capable of deeply understanding job descriptions and identifying core qualifications and responsibilities.",
    verbose=False,
    allow_delegation=False,
    llm=llm
)

skill_gap_scorer = Agent(
    role="Career Assessment Expert",
    goal="Accurately compare candidate skills against job requirements and identify gaps",
    backstory="With vast career counseling expertise, you possess a keen eye for evaluating candidate profiles against job demands, pinpointing precise areas of alignment and improvement.",
    verbose=False,
    allow_delegation=False,
    llm=llm
)

cover_letter_writer = Agent(
    role="Professional Career Consultant & Writer",
    goal="Draft compelling, tailored cover letters that highlight candidate strengths",
    backstory="As an accomplished writer with a track record of placement success, you know how to craft persuasive narratives that showcase a candidate's best assets tailored for a specific role.",
    verbose=False,
    allow_delegation=False,
    llm=llm
)
