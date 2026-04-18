import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDownCircle, ExternalLink, Mail, FileText, Code2 } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useResume } from '@/hooks/useResume';

const SkillPill = ({ skill }: { skill: string }) => {
  const [imgError, setImgError] = useState(false);
  
  // Custom simpleicons mapping for common variants
  const slug = skill.toLowerCase()
    .replace('node.js', 'nodedotjs')
    .replace('c++', 'cplusplus')
    .replace('c#', 'csharp')
    .replace(/[^a-z0-9]/g, '');

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm hover:border-[hsl(var(--primary)/0.5)] hover:bg-slate-800 transition-all">
      <div className="w-5 h-5 flex items-center justify-center">
        {!imgError ? (
          <img 
            src={`https://cdn.simpleicons.org/${slug}`}
            alt={skill}
            className="w-full h-full object-contain filter drop-shadow-sm"
            onError={() => setImgError(true)}
          />
        ) : (
          <Code2 className="w-4 h-4 text-slate-400" />
        )}
      </div>
      <span className="text-sm font-medium text-slate-300">{skill}</span>
    </div>
  );
};

const HeroSection = () => {
  const { profile } = useProfile();
  const { resume } = useResume();

  useEffect(() => {
    document.title = `${profile.name} - ${profile.title}`;
  }, [profile.name, profile.title]);

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
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
      {/* Subtle background pattern - theme aware */}
      <div className="absolute inset-0 opacity-[0.5] pointer-events-none">
        <div className="absolute top-[-6rem] right-[-4rem] w-80 h-80 rounded-full blur-3xl hero-orb-1" />
        <div className="absolute bottom-[-6rem] left-[-4rem] w-80 h-80 rounded-full blur-3xl hero-orb-2" />
      </div>
      
      {/* Mobile: Blurred background image behind text */}
      <div className="absolute inset-0 lg:hidden pointer-events-none z-0">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <img 
            src="/hero_illustration.svg" 
            alt="" 
            className="w-full h-full object-cover blur-3xl scale-150"
            aria-hidden="true"
          />
        </div>
      </div>
      
      <div className="container max-w-6xl mx-auto z-10 w-full relative">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left animate-fade-in relative z-20">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-[hsl(var(--primary)/0.12)] border border-[hsl(var(--primary)/0.25)]">
              <span className="text-sm font-medium text-[hsl(var(--primary))]">{profile.title}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 text-slate-50">
              Hi, I'm <span className="text-[hsl(var(--primary))]">Nishant</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {profile.bio}
            </p>

            {/* Tech Stack Icons */ }
            <div className="flex flex-wrap items-center gap-3 mb-8 justify-center lg:justify-start">
              {profile.heroSkills && profile.heroSkills.length > 0 ? (
                profile.heroSkills.map((skill, index) => (
                  <SkillPill key={`${skill}-${index}`} skill={skill} />
                ))
              ) : null}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => scrollToSection('projects')}
                className="bg-primary text-primary-foreground border-0 shadow-lg hover:shadow-xl transition-all h-12 px-6 text-base font-medium hover:bg-[hsl(var(--primary)/0.9)]"
              >
                View Projects
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              
              {resume?.url && (
                <a
                  href={resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-50 hover:border-slate-600 h-12 px-6 text-base font-medium w-full"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Resume
                  </Button>
                </a>
              )}
              
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline" 
                className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-50 hover:border-slate-600 h-12 px-6 text-base font-medium"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
            </div>
          </div>
          
          {/* Image - Desktop only */}
          <div className="hidden lg:flex w-full lg:w-1/2 justify-center order-first lg:order-last">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 rounded-2xl blur-2xl transform scale-90 hero-image-glow"></div>
              <img 
                src="/hero_illustration.svg" 
                alt="Developer illustration" 
                className="relative z-10 w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection('education')}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-30 group touch-manipulation"
        aria-label="Scroll to education section"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-md sm:blur-lg transition-all hero-scroll-glow scale-75 sm:scale-100"></div>
          <ArrowDownCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-slate-400 group-hover:text-[hsl(var(--primary))] transition-colors relative z-10" strokeWidth={1.5} />
        </div>
      </button>
    </div>
  );
};

export default HeroSection;
