import React from 'react';
import { useExperience } from '../hooks/useExperience';
import { useResume } from '../hooks/useResume';
import { ArrowDown } from 'lucide-react';

const DEFAULT_EXPERIENCE = [
  {
    id: '1',
    year: '2022 - Now',
    role: 'Senior ML & Software Engineer',
    company: 'Tech Corp',
    description: 'Leading the AI & UI engineering team. Building RAG systems, LLM pipelines, and high-performance interfaces.',
    type: 'Full-time',
  },
  {
    id: '2',
    year: '2020 - 2022',
    role: 'Full Stack Engineer',
    company: 'Startup Studio',
    description: 'Built scalable web applications, REST APIs, and interactive dashboards for early-stage startups.',
    type: 'Full-time',
  },
  {
    id: '3',
    year: '2019 - 2020',
    role: 'Data Scientist & Developer',
    company: 'Freelance',
    description: 'Worked with global clients to deliver custom machine learning models, ETL pipelines, and web solutions.',
    type: 'Contract',
  },
];

export default function Experience() {
  const { items: firebaseItems } = useExperience();
  const { resume } = useResume();

  const displayItems = firebaseItems.length > 0
    ? firebaseItems.map((item) => ({
        id: item.id,
        year: item.year,
        role: item.role,
        company: item.company,
        description: item.description,
        type: 'Full-time',
      }))
    : DEFAULT_EXPERIENCE;

  return (
    <section className="py-24 md:py-32 px-6" id="experience">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <div className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
            // my journey
          </div>
          <h2 className="font-display font-black text-5xl md:text-7xl" style={{ letterSpacing: '-0.035em', lineHeight: 1 }}>
            Work <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Experience</span>
          </h2>
          <p className="text-base mt-6 max-w-xl" style={{ color: 'var(--muted)' }}>
            A timeline of the places I've worked and the roles I've held along the way.
          </p>
        </div>

        <div>
          {displayItems.map((exp) => (
            <div key={exp.id} className="archive-item">
              <div className="font-mono text-xs w-28 flex-shrink-0" style={{ color: 'var(--muted)' }}>
                {exp.year}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-xl md:text-2xl archive-title mb-1" style={{ fontWeight: 700 }}>
                  {exp.role} · {exp.company}
                </div>
                <div className="text-sm" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                  {exp.description}
                </div>
              </div>
              <div className="tag hidden md:inline-block">{exp.type}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          {resume?.url ? (
            <a href={resume.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              download resume
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          ) : (
            <a href="#contact" className="btn-secondary">
              get in touch
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
