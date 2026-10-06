export const API_BASE = 'http://localhost:8000';

export async function analyzeApplication(resumeText, jobDescription) {
    const response = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            resume_text: resumeText,
            job_description: jobDescription
        })
    });
    
    if (!response.ok) {
        let errorDetail = 'Analysis failed';
        try {
            const error = await response.json();
            errorDetail = error.detail || errorDetail;
        } catch (e) {
            // parse error
        }
        throw new Error(errorDetail);
    }
    return response.json();
}

export async function healthCheck() {
    const response = await fetch(`${API_BASE}/api/health`);
    return response.json();
}
