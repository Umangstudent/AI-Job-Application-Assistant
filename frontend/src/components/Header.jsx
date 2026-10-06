import React from 'react';

const Header = () => {
  return (
    <header className="header-container" style={{ textAlign: 'center', marginBottom: '3rem', animation: 'fadeIn 1s ease' }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: '700',
        background: 'var(--gradient-primary)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '1rem',
        display: 'inline-block'
      }}>
        AI Job Application Assistant
      </h1>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '1.125rem',
        maxWidth: '800px',
        margin: '0 auto 2rem',
        lineHeight: '1.8'
      }}>
        Powered by multi-agent AI — parse your resume, analyze job requirements, identify skill gaps, and generate tailored cover letters.
      </p>
      
      <div style={{
        height: '3px',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto 2rem',
        background: 'var(--gradient-primary)',
        borderRadius: '2px',
        animation: 'gradientShift 3s ease infinite, pulse 2s ease infinite'
      }}></div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <span className="badge" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-glass)' }}>🤖 Multi-Agent AI</span>
        <span className="badge" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-glass)' }}>⚡ Instant Analysis</span>
        <span className="badge" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-glass)' }}>📝 Tailored Letters</span>
      </div>
    </header>
  );
};

export default Header;
