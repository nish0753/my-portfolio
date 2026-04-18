import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-3 bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-slate-800/50' 
        : 'py-4 bg-slate-950/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onDoubleClick={toggleTheme}
            className="font-display text-xl sm:text-2xl font-bold text-slate-50 hover:text-[hsl(var(--primary))] transition-colors select-none"
          >
            Nishant
          </button>
          
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-slate-400 hover:text-slate-50 transition-colors text-sm font-medium"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('top-skills')}
              className="text-slate-400 hover:text-slate-50 transition-colors text-sm font-medium"
            >
              Skills
            </button>
            <Button 
              className="bg-primary text-primary-foreground text-sm px-5 py-2 h-auto hover:bg-[hsl(var(--primary)/0.9)]"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </Button>
          </div>
          
          <button 
            className="md:hidden text-slate-400 hover:text-slate-50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/98 backdrop-blur-lg border-t border-slate-800/50 py-4 px-4">
          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-slate-400 hover:text-slate-50 transition-colors py-2 text-left text-sm font-medium"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('top-skills')}
              className="text-slate-400 hover:text-slate-50 transition-colors py-2 text-left text-sm font-medium"
            >
              Skills
            </button>
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
