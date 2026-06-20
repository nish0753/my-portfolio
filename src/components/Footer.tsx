import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

const navLinks = [
  { id: 'experience', label: 'Experience' },
  { id: 'education',  label: 'Education' },
  { id: 'projects',   label: 'Projects' },
  { id: 'top-skills', label: 'Skills' },
  { id: 'contact',    label: 'Contact' },
];

const Footer = () => {
  const { profile } = useProfile();
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Brand */}
          <div className="max-w-sm text-center md:text-left">
            <button
              onClick={toTop}
              className="font-display text-xl sm:text-2xl font-bold text-slate-50 hover:text-[hsl(var(--primary))] transition-colors select-none"
            >
              {profile.name || 'Nishant Kumar'}
            </button>
            <p className="text-sm text-slate-500 mt-1">{profile.title}</p>
            {profile.footerTagline && (
              <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                {profile.footerTagline}
              </p>
            )}

            {/* Socials */}
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.5)] transition-all"
                  aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.5)] transition-all"
                  aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`}
                  className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.5)] transition-all"
                  aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Nav */}
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-4">Explore</p>
            <ul className="space-y-2.5">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-sm text-slate-400 hover:text-slate-50 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600 text-center sm:text-left">
            © {year} {profile.name || 'Nishant Kumar'}. All rights reserved.
          </p>
          <button
            onClick={toTop}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[hsl(var(--primary))] transition-colors group"
            aria-label="Back to top"
          >
            Back to top
            <span className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-slate-800 group-hover:border-[hsl(var(--primary)/0.5)] transition-all">
              <ArrowUp className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
