import React, { useState, useRef } from 'react';

const ResumeUpload = ({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file) => {
    if (file && (file.type === 'text/plain' || file.name.endsWith('.txt'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target.result);
      };
      reader.readAsText(file);
    } else if (file && file.name.endsWith('.pdf')) {
      onChange(`[PDF Uploaded: ${file.name}] Please paste text manually or implement PDF parsing backend.`);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  return (
    <div className="glass-card" style={{ animation: 'slideUp 0.6s ease' }}>
      <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        Resume
      </h2>
      
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? 'var(--accent-violet)' : 'var(--border-glass)'}`,
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center',
          cursor: 'pointer',
          marginBottom: '1rem',
          background: isDragging ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
          transition: 'all 0.3s ease'
        }}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept=".txt,.pdf"
          onChange={handleFileSelect}
        />
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem', display: 'block' }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <p style={{ color: 'var(--text-secondary)' }}>Drop your resume here or click to upload</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Supports .txt (PDF mock)</p>
      </div>

      <div style={{ position: 'relative' }}>
        <textarea 
          placeholder="Or paste your resume text here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
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

export default ResumeUpload;
