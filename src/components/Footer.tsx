import React from 'react';
import { useProfile } from '@/hooks/useProfile';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const { profile } = useProfile();
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="font-mono text-sm" style={{ color: 'var(--muted)' }}>
            © {year} {profile.name || 'Nishant Kumar'} · built with care
          </div>
          <div className="flex items-center gap-5">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover-link text-lg" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover-link text-lg" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="hover-link text-lg" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
        <div className="text-center font-mono text-xs pt-8" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
          <span style={{ color: 'var(--accent)' }}>$</span> echo "thanks for visiting" | sudo tee /dev/stdout
        </div>
      </div>
    </footer>
  );
};

export default Footer;
