import React from 'react';

const JobDescriptionInput = ({ value, onChange }) => {
  return (
    <div className="glass-card" style={{ animation: 'slideUp 0.6s ease', animationDelay: '0.1s', animationFillMode: 'both' }}>
      <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
        Job Description
      </h2>
      
      <div style={{ position: 'relative', height: 'calc(100% - 3rem)' }}>
        <textarea 
          placeholder="Paste the job description here...&#10;&#10;e.g., We are looking for a Frontend Engineer with React, Vite, and CSS experience..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ height: '100%', minHeight: '280px' }}
        />
        <span style={{ 
          position: 'absolute', 
          bottom: '1rem', 
          right: '1rem', 
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          {value.length} chars
        </span>
      </div>
    </div>
  );
};

export default JobDescriptionInput;
