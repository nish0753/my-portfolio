import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const links = [
  { id: 'experience', label: 'Experience' },
  { id: 'education',  label: 'Education' },
  { id: 'projects',   label: 'Projects' },
  { id: 'top-skills', label: 'Skills' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId]           = useState('');

  useEffect(() => {
    const sectionIds = [...links.map(l => l.id), 'contact'];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll-spy: pick the last section whose top has passed the header line
      const scrollPos = window.scrollY + 120;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.pageYOffset <= scrollPos) {
          current = id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-slate-800/50'
          : 'py-4 bg-slate-950/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-xl sm:text-2xl font-bold text-slate-50 hover:text-[hsl(var(--primary))] transition-colors select-none"
          >
            Nishant Kumar
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`transition-colors text-sm font-medium ${
                  activeId === id
                    ? 'text-[hsl(var(--primary))]'
                    : 'text-slate-400 hover:text-slate-50'
                }`}
              >
                {label}
              </button>
            ))}
            <Button
              className="bg-primary text-primary-foreground text-sm px-5 py-2 h-auto hover:bg-[hsl(var(--primary)/0.9)]"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-400 hover:text-slate-50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/98 backdrop-blur-lg border-t border-slate-800/50 py-4 px-4">
          <div className="flex flex-col space-y-3">
            {links.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`transition-colors py-2 text-left text-sm font-medium ${
                  activeId === id
                    ? 'text-[hsl(var(--primary))]'
                    : 'text-slate-400 hover:text-slate-50'
                }`}
              >
                {label}
              </button>
            ))}
            <Button
              className="bg-primary text-primary-foreground justify-center mt-2 hover:bg-[hsl(var(--primary)/0.9)]"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
