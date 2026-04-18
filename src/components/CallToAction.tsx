import React from 'react';
import { Button } from "@/components/ui/button";
import { MailIcon, Github, Linkedin } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

const CallToAction = () => {
  const { profile } = useProfile();

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="professional-card p-8 sm:p-10 md:p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(var(--primary)/0.12)] border border-[hsl(var(--primary)/0.25)] mb-6">
            <MailIcon className="h-8 w-8 text-[hsl(var(--primary))]" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 text-slate-50">
            Let's Build Something Great Together
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you have a detailed plan or just a seed of an idea, I'm here to help bring it to life. Let's discuss how we can turn your vision into reality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {profile.email && (
              <a 
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl hover:bg-[hsl(var(--primary)/0.9)]"
              >
                <MailIcon className="h-5 w-5" />
                Email Me
              </a>
            )}
            {profile.linkedin && (
              <a 
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-50 hover:border-slate-600 px-6 py-3 rounded-lg font-medium transition-all"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
            )}
          </div>
          
          <div className="pt-8 border-t border-slate-800">
            <p className="text-sm text-slate-500 mb-4">Or find me on</p>
            <div className="flex gap-6 justify-center">
              {profile.github && (
                <a 
                  href={profile.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-[hsl(var(--primary))] transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
              )}
              {profile.linkedin && (
                <a 
                  href={profile.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-[hsl(var(--primary))] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
