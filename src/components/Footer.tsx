import React from 'react';
import { useProfile } from '@/hooks/useProfile';

const Footer = () => {
  const { profile } = useProfile();

  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-slate-950">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-50 mb-1 select-none">
              Nishant
            </h3>
            <p className="text-sm text-slate-500">
              {profile.title}
            </p>
          </div>
          
          <div className="flex gap-6 sm:gap-8">
            <button 
              onClick={() => {
                const element = document.getElementById('projects');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-slate-500 hover:text-slate-50 transition-colors text-sm font-medium"
            >
              Projects
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-slate-500 hover:text-slate-50 transition-colors text-sm font-medium"
            >
              Contact
            </button>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-sm text-slate-600">
          <p>© {new Date().getFullYear()} Nishant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
