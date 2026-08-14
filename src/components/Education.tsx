import React from 'react';
import { useEducation } from '../hooks/useEducation';
import { Award, GraduationCap, BookOpen, ExternalLink } from 'lucide-react';

export default function Education() {
  const { items } = useEducation();

  return (
    <section className="py-24 md:py-32 px-6" id="education" style={{ background: 'var(--bg-elev-2)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <div className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
            // academic background
          </div>
          <h2 className="font-display font-black text-5xl md:text-7xl" style={{ letterSpacing: '-0.035em', lineHeight: 1 }}>
            Education & <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Certifications</span>
          </h2>
          <p className="text-base mt-6 max-w-xl" style={{ color: 'var(--muted)' }}>
            Degrees, courses, and certifications that built my technical foundation.
          </p>
        </div>

        <div>
          {items.map((edu) => (
            <div key={edu.id} className="archive-item">
              <div className="font-mono text-xs w-28 flex-shrink-0" style={{ color: 'var(--muted)' }}>
                {edu.year}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-xl md:text-2xl archive-title mb-1 flex items-center gap-3" style={{ fontWeight: 700 }}>
                  <span>{edu.degree} · {edu.school}</span>
                  {edu.certificateUrl && (
                    <a
                      href={edu.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-link"
                      style={{ color: 'var(--accent)' }}
                      title="View Certificate"
                    >
                      <ExternalLink className="w-4 h-4 inline" />
                    </a>
                  )}
                </div>
                <div className="text-sm font-mono mb-1" style={{ color: 'var(--accent-2)' }}>
                  {edu.field}
                </div>
                <div className="text-sm" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                  {edu.description}
                </div>
              </div>
              <div className="tag hidden md:inline-block">
                {edu.icon === 'GraduationCap' ? 'Degree' : 'Certificate'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
