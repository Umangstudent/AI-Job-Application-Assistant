# AI Job Application Assistant

A full-stack multi-agent AI system that parses resumes, analyzes job descriptions, scores skill gaps, and drafts tailored cover letters — powered by **CrewAI**, **Groq-hosted LLMs**, **FastAPI**, and **React**.

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    React Frontend                        │
│  Resume Upload  |  Job Description  |  Results Display   │
└──────────────────────────┬───────────────────────────────┘
                           │ POST /api/analyze
┌──────────────────────────▼───────────────────────────────┐
│                   FastAPI Backend                         │
│              Pydantic Request Validation                  │
└──────────────────────────┬───────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────┐
│              CrewAI Multi-Agent Pipeline                  │
│                                                          │
│  ┌─────────────┐  ┌──────────────┐                       │
│  │ Resume      │  │ Job          │    (parallel)         │
│  │ Parser      │  │ Analyzer     │                       │
│  └──────┬──────┘  └──────┬───────┘                       │
│         └────────┬───────┘                               │
│          ┌───────▼───────┐                               │
│          │ Skill Gap     │                               │
│          │ Scorer        │                               │
│          └───────┬───────┘                               │
│          ┌───────▼───────┐                               │
│          │ Cover Letter  │                               │
│          │ Writer        │                               │
│          └───────────────┘                               │
│                                                          │
│          All agents use Groq LLM (llama-3.3-70b)         │
└──────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Python 3.10-3.13
- Node.js 18+
- A free [Groq API key](https://console.groq.com/keys)

### Backend Setup

```bash
cd backend

# Create a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure your API key
copy .env.example .env
# Edit .env and add your GROQ_API_KEY

# Start the server
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The UI will be available at `http://localhost:5173`.

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/analyze` | POST | Run the full analysis pipeline |

### POST `/api/analyze`

**Request Body:**
```json
{
  "resume_text": "John Doe\nSoftware Engineer...",
  "job_description": "We are looking for a Senior Developer..."
}
```

**Response:**
```json
{
  "parsed_resume": { "name": "John Doe", "skills": [...], ... },
  "job_analysis": { "title": "Senior Developer", "required_skills": [...], ... },
  "skill_gap_report": { "overall_score": 75, "matched_skills": [...], ... },
  "cover_letter": { "subject": "...", "body": "...", "key_highlights": [...] }
}
```

## 🤖 Multi-Agent System

| Agent | Role | Task |
|-------|------|------|
| **Resume Parser** | Senior HR Data Analyst | Extracts structured data from raw resume text |
| **Job Analyzer** | Technical Recruitment Specialist | Parses job descriptions into actionable requirements |
| **Skill Gap Scorer** | Career Assessment Expert | Compares skills and scores gaps (0-100) |
| **Cover Letter Writer** | Professional Career Consultant | Drafts a compelling, tailored cover letter |

## 🛠️ Tech Stack

- **Backend:** Python, FastAPI, CrewAI, Groq API, Pydantic
- **Frontend:** React 18, Vite
- **LLM:** Groq-hosted Llama 3.3 70B Versatile
- **Styling:** Vanilla CSS with glassmorphism, dark theme, micro-animations

## 📁 Project Structure

```
ai-job-assistant/
├── backend/
│   ├── main.py            # FastAPI app & endpoints
│   ├── models.py          # Pydantic request/response schemas
│   ├── agents.py          # 4 CrewAI agent definitions
│   ├── tasks.py           # 4 CrewAI task definitions
│   ├── crew.py            # Crew orchestration pipeline
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── api/client.js
│       └── components/
│           ├── Header.jsx
│           ├── ResumeUpload.jsx
│           ├── JobDescriptionInput.jsx
│           ├── LoadingState.jsx
│           ├── AnalysisResults.jsx
│           ├── SkillGapChart.jsx
│           └── CoverLetterDisplay.jsx
└── README.md
```
