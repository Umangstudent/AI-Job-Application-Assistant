import React, { useState, useEffect } from 'react';

const steps = [
  "🔍 Parsing Resume...",
  "📋 Analyzing Job Description...",
  "📊 Scoring Skill Gaps...",
  "✍️ Writing Cover Letter..."
];

const LoadingState = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2500); // cycle through steps
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginTop: '3rem', animation: 'fadeIn 0.5s ease' }}>
      <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  opacity: isActive || isCompleted ? 1 : 0.4,
                  transition: 'opacity 0.3s ease',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isCompleted ? 'var(--accent-emerald)' : (isActive ? 'var(--accent-violet)' : 'var(--bg-secondary)'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: isActive ? 'pulse 2s infinite' : 'none'
                }}>
                  {isCompleted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    isActive && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 2s linear infinite' }}>
                        <line x1="12" y1="2" x2="12" y2="6"></line>
                        <line x1="12" y1="18" x2="12" y2="22"></line>
                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                        <line x1="2" y1="12" x2="6" y2="12"></line>
                        <line x1="18" y1="12" x2="22" y2="12"></line>
                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                      </svg>
                    )
                  )}
                </div>
                <span style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
                }}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: '2rem', opacity: 0.3 }}>
        <div className="glass-card" style={{ height: '300px', background: 'linear-gradient(90deg, var(--bg-glass) 25%, var(--border-glass) 50%, var(--bg-glass) 75%)', backgroundSize: '400% 100%', animation: 'shimmer 2s infinite linear' }}></div>
        <div className="glass-card" style={{ height: '300px', background: 'linear-gradient(90deg, var(--bg-glass) 25%, var(--border-glass) 50%, var(--bg-glass) 75%)', backgroundSize: '400% 100%', animation: 'shimmer 2s infinite linear' }}></div>
      </div>
    </div>
  );
};

export default LoadingState;
