import React, { useState } from 'react';

const CoverLetterDisplay = ({ coverLetter }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter?.body || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!coverLetter) return null;

  return (
    <div className="glass-card" style={{ animation: 'slideUp 0.6s ease', animationDelay: '0.4s', animationFillMode: 'both' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          Generated Cover Letter
        </h2>
        <button 
          onClick={handleCopy}
          className="btn btn-secondary"
          style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Subject: </span>
        <span style={{ 
          background: 'var(--gradient-primary)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          fontWeight: '600'
        }}>
          {coverLetter.subject || 'Application'}
        </span>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--border-glass)',
        borderRadius: '8px',
        padding: '2rem',
        whiteSpace: 'pre-wrap',
        fontFamily: 'Inter, serif',
        lineHeight: '1.8',
        color: '#e2e8f0',
        marginBottom: '2rem'
      }}>
        {coverLetter.body || 'No cover letter generated.'}
      </div>

      <div>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Key Highlights Addressed:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {coverLetter.key_highlights && coverLetter.key_highlights.map((highlight, idx) => (
            <span key={idx} className="badge" style={{ 
              background: 'rgba(139, 92, 246, 0.1)', 
              color: 'var(--accent-violet)', 
              border: '1px solid rgba(139, 92, 246, 0.3)' 
            }}>
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterDisplay;
