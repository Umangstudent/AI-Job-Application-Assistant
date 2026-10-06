import React from 'react';
import SkillGapChart from './SkillGapChart';
import CoverLetterDisplay from './CoverLetterDisplay';

const AnalysisResults = ({ results }) => {
  if (!results) return null;

  const { parsed_resume, job_analysis, skill_gap_report, cover_letter } = results;

  return (
    <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div className="grid-2">
        {/* Parsed Resume Card */}
        <div className="glass-card" style={{ animation: 'slideUp 0.6s ease', animationFillMode: 'both' }}>
          <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>Resume Profile</span>
          </h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{parsed_resume?.name || 'Unknown Name'}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              {parsed_resume?.email} {parsed_resume?.phone ? `• ${parsed_resume.phone}` : ''}
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase' }}>Skills</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {parsed_resume?.skills?.map((skill, idx) => (
                <span key={idx} className="badge badge-info">{skill}</span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase' }}>Experience</h4>
            {parsed_resume?.experience?.map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '1rem', borderLeft: '2px solid var(--border-glass)', paddingLeft: '1rem' }}>
                <div style={{ fontWeight: '600' }}>{exp.title}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{exp.company} | {exp.duration}</div>
              </div>
            ))}
          </div>
          
          <div>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase' }}>Education</h4>
            {parsed_resume?.education?.map((edu, idx) => (
              <div key={idx} style={{ fontSize: '0.875rem' }}>
                <span style={{ fontWeight: '500' }}>{edu.degree}</span> - {edu.institution}
              </div>
            ))}
          </div>
        </div>

        {/* Job Analysis Card */}
        <div className="glass-card" style={{ animation: 'slideUp 0.6s ease', animationDelay: '0.1s', animationFillMode: 'both' }}>
          <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>Job Requirements</span>
          </h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{job_analysis?.title || 'Role'}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{job_analysis?.company || 'Company'}</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase' }}>Required Skills</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {job_analysis?.required_skills?.map((skill, idx) => (
                <span key={idx} className="badge badge-error">{skill}</span>
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase' }}>Preferred Skills</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {job_analysis?.preferred_skills?.map((skill, idx) => (
                <span key={idx} className="badge badge-warning">{skill}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase' }}>Key Responsibilities</h4>
            <ul style={{ paddingLeft: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {job_analysis?.responsibilities?.map((resp, idx) => (
                <li key={idx} style={{ marginBottom: '0.25rem' }}>{resp}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <SkillGapChart report={skill_gap_report} />
      
      <CoverLetterDisplay coverLetter={cover_letter} />

    </div>
  );
};

export default AnalysisResults;
