import React from 'react';

const SkillGapChart = ({ report }) => {
  if (!report) return null;

  const score = report.overall_score || 0;
  
  // Calculate SVG circle properties
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let scoreColor = 'var(--accent-emerald)';
  if (score <= 40) scoreColor = 'var(--accent-rose)';
  else if (score <= 70) scoreColor = 'var(--accent-amber)';

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'match': return 'var(--accent-emerald)';
      case 'partial': return 'var(--accent-amber)';
      case 'gap': return 'var(--accent-rose)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="glass-card" style={{ animation: 'slideUp 0.6s ease', animationDelay: '0.3s', animationFillMode: 'both' }}>
      <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20V10"></path>
          <path d="M18 20V4"></path>
          <path d="M6 20v-4"></path>
        </svg>
        Skill Gap Analysis
      </h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '120px', height: '120px' }}>
            {/* Background circle */}
            <svg width="120" height="120" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--bg-secondary)" strokeWidth="8" />
              <circle 
                cx="50" 
                cy="50" 
                r={radius} 
                fill="none" 
                stroke={scoreColor} 
                strokeWidth="8"
                strokeLinecap="round"
                style={{ 
                  strokeDasharray: circumference, 
                  '--progress': strokeDashoffset,
                  animation: 'progressFill 1.5s ease-out forwards'
                }} 
              />
            </svg>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '2rem', fontWeight: '700', color: scoreColor }}>{score}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Match</span>
            </div>
          </div>
        </div>

        <div style={{ flex: '2', minWidth: '300px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'rgba(17, 24, 39, 0.5)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h4 style={{ color: 'var(--accent-emerald)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Matched</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {report.matched_skills?.map((s, i) => <span key={i} style={{ fontSize: '0.875rem' }}>{s}{i < report.matched_skills.length - 1 ? ',' : ''}</span>)}
            </div>
          </div>
          <div style={{ background: 'rgba(17, 24, 39, 0.5)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <h4 style={{ color: 'var(--accent-amber)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Partial</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {report.partial_skills?.map((s, i) => <span key={i} style={{ fontSize: '0.875rem' }}>{s}{i < report.partial_skills.length - 1 ? ',' : ''}</span>)}
            </div>
          </div>
          <div style={{ background: 'rgba(17, 24, 39, 0.5)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
            <h4 style={{ color: 'var(--accent-rose)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Missing</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {report.missing_skills?.map((s, i) => <span key={i} style={{ fontSize: '0.875rem' }}>{s}{i < report.missing_skills.length - 1 ? ',' : ''}</span>)}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Skill Details</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {report.skill_details?.map((skill, index) => (
            <div key={index} style={{ padding: '1rem', background: 'var(--bg-glass)', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '600' }}>{skill.skill}</span>
                <span className={`badge ${skill.match_status === 'match' ? 'badge-success' : skill.match_status === 'partial' ? 'badge-warning' : 'badge-error'}`}>
                  {skill.match_status}
                </span>
              </div>
              
              <div style={{ height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px', marginBottom: '0.75rem', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${(skill.proficiency_level || 0) * 10}%`, 
                  background: getStatusColor(skill.match_status),
                  transition: 'width 1s ease-out'
                }}></div>
              </div>
              
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{skill.recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {report.improvement_areas && report.improvement_areas.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Recommended Actions</h3>
          <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
            {report.improvement_areas.map((area, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{area}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default SkillGapChart;
