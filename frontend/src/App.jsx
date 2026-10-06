import React, { useState } from 'react';
import Header from './components/Header';
import ResumeUpload from './components/ResumeUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import LoadingState from './components/LoadingState';
import AnalysisResults from './components/AnalysisResults';
import { analyzeApplication } from './api/client';

function App() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (resumeText.length < 50 || jobDescription.length < 50) return;
    
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await analyzeApplication(resumeText, jobDescription);
      setResults(data);
    } catch (err) {
      setError(err.message || 'An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  const isBtnDisabled = resumeText.length < 50 || jobDescription.length < 50 || loading;

  return (
    <div className="container">
      <Header />

      <main>
        {!results && !loading && (
          <div className="grid-2" style={{ marginBottom: '3rem' }}>
            <ResumeUpload value={resumeText} onChange={setResumeText} />
            <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
          </div>
        )}

        {!results && !loading && (
          <div className="flex-center">
            <button 
              className="btn btn-primary" 
              style={{ fontSize: '1.25rem', padding: '1rem 3rem' }}
              onClick={handleAnalyze}
              disabled={isBtnDisabled}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.75rem' }}>
                <path d="M2 12h4l3-9 5 18 3-9h5"></path>
              </svg>
              Analyze Application
            </button>
          </div>
        )}

        {loading && <LoadingState />}

        {error && (
          <div className="glass-card" style={{ marginTop: '2rem', border: '1px solid var(--accent-rose)', background: 'rgba(244, 63, 94, 0.05)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--accent-rose)', marginBottom: '1rem' }}>Analysis Failed</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{error}</p>
            <button className="btn btn-secondary" onClick={() => setError(null)}>Try Again</button>
          </div>
        )}

        {results && !loading && (
          <AnalysisResults results={results} />
        )}
      </main>
    </div>
  );
}

export default App;
