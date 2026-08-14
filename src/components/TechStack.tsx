import React from 'react';
import { useProfile } from '@/hooks/useProfile';

const DEFAULT_SKILLS = [
  'Python', 'Machine Learning', 'PyTorch', 'Scikit-Learn', 'RAG & LLMs',
  'TypeScript', 'React', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS', 'TailwindCSS',
];

const TechStack = () => {
  const { profile } = useProfile();
  const skillsList = profile?.heroSkills && profile.heroSkills.length > 0 ? profile.heroSkills : DEFAULT_SKILLS;
  const displayItems = [...skillsList, ...skillsList, ...skillsList];

  return (
    <div className="py-5 border-y marquee-wrap" style={{ borderColor: 'var(--border)', background: 'var(--bg-elev)' }}>
      <div className="marquee font-mono text-sm uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
        {displayItems.map((skill, index) => (
          <React.Fragment key={index}>
            <span>{skill}</span>
            <span>·</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
