import React, { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useProfile } from '@/hooks/useProfile';
import { useVisitors } from '@/hooks/useVisitors';
import { Moon, Sun, Terminal, Menu, X, Briefcase } from 'lucide-react';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { profile } = useProfile();
  const { stats } = useVisitors();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-opacity-20 border-b transition-all duration-300"
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(var(--accent-rgb), 0.02)',
        borderColor: 'var(--border)',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="font-mono font-bold text-lg flex items-center"
          style={{ color: 'var(--fg)', textDecoration: 'none' }}
        >
          <span style={{ color: 'var(--accent)' }}>/</span>
          {profile?.name ? profile.name.toLowerCase().replace(/\s+/g, '-') : 'nishant-kumar'}
          <span className="logo-cursor"></span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm">
          <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="hover-link">
            projects
          </a>
          <a href="#snippets" onClick={(e) => handleNavClick(e, '#snippets')} className="hover-link">
            code
          </a>
          <a href="#experience" onClick={(e) => handleNavClick(e, '#experience')} className="hover-link">
            experience
          </a>
          <a href="#education" onClick={(e) => handleNavClick(e, '#education')} className="hover-link">
            academics
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover-link">
            contact
          </a>
        </div>

        <div className="flex items-center gap-3">
          {/* Visitor count or availability badge */}
          {stats.totalVisitors > 0 ? (
            <div className="stat-pill hidden lg:inline-flex" title="Total visitors">
              <span className="stat-dot"></span>
              <span>{stats.totalVisitors} visits</span>
            </div>
          ) : profile?.availableForWork ? (
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="stat-pill hidden sm:inline-flex" title="Available for Work">
              <span className="stat-dot"></span>
              <span className="text-xs" style={{ color: 'var(--accent-2)' }}>●</span>
              <span>open to work</span>
            </a>
          ) : null}

          {/* Theme Selector Toggle */}
          <div className="theme-toggle" role="group" aria-label="Theme selector">
            <button
              className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => setTheme('dark')}
              title="Dark Theme"
              aria-label="Dark theme"
            >
              <Moon size={13} />
            </button>
            <button
              className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => setTheme('light')}
              title="Light Theme"
              aria-label="Light theme"
            >
              <Sun size={13} />
            </button>
            <button
              className={`theme-btn ${theme === 'cyber' ? 'active' : ''}`}
              onClick={() => setTheme('cyber')}
              title="Cyber Theme"
              aria-label="Cyber theme"
            >
              <Terminal size={13} />
            </button>
          </div>

          {/* Hire Me CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-primary text-xs py-1.5 px-3 hidden sm:inline-flex items-center gap-1.5 font-mono shadow-sm"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>hire me</span>
          </a>

          {/* Mobile menu toggle button */}
          <button
            className="md:hidden p-1.5 text-muted hover:text-fg transition-colors border rounded border-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            style={{ borderColor: 'var(--border)' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden py-6 px-6 border-b font-mono text-sm space-y-4"
          style={{ background: 'var(--bg-elev)', borderColor: 'var(--border)', color: 'var(--fg)' }}
        >
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-primary text-xs py-2 px-4 flex items-center justify-center gap-2 w-full mb-3"
          >
            <Briefcase className="w-4 h-4" />
            <span>hire me</span>
          </a>
          <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="block hover-link">
            // projects
          </a>
          <a href="#snippets" onClick={(e) => handleNavClick(e, '#snippets')} className="block hover-link">
            // code snippets
          </a>
          <a href="#experience" onClick={(e) => handleNavClick(e, '#experience')} className="block hover-link">
            // experience
          </a>
          <a href="#education" onClick={(e) => handleNavClick(e, '#education')} className="block hover-link">
            // academics
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="block hover-link">
            // contact
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
