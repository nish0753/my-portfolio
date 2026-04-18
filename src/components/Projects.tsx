import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

interface ProjectProps {
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  link?: string;
  githubLink?: string;
}

// Mobile Card - Compact and minimal
const ProjectCardMobile = ({ title, description, imageUrl, tags, link, githubLink }: ProjectProps) => {
  const [showAllTags, setShowAllTags] = useState(false);
  const displayedTags = showAllTags ? tags : tags.slice(0, 2);
  const remainingCount = tags.length - 2;

  return (
    <div className="group relative overflow-hidden rounded-none md:rounded-xl bg-slate-900/50 border-x-0 md:border-x border-y border-slate-800/50 hover:border-[hsl(var(--primary)/0.5)] transition-all mb-6 w-full">
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">
          {title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">
          {description}
        </p>
        
        {/* Tags - Minimal */}
        <div className="flex flex-wrap gap-2 mb-4">
          {displayedTags.map((tag, idx) => (
            <Badge 
              key={idx} 
              className="bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.3)] text-xs font-medium px-2.5 py-1"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && !showAllTags && (
            <Badge 
              onClick={() => setShowAllTags(true)}
              className="bg-slate-800/50 text-slate-400 border border-slate-700/50 text-xs font-medium px-2.5 py-1 cursor-pointer hover:bg-slate-700/50 transition-all"
            >
              +{remainingCount}
            </Badge>
          )}
          {showAllTags && tags.length > 2 && (
            <Badge 
              onClick={() => setShowAllTags(false)}
              className="bg-slate-800/50 text-slate-400 border border-slate-700/50 text-xs font-medium px-2.5 py-1 cursor-pointer hover:bg-slate-700/50 transition-all"
            >
              Less
            </Badge>
          )}
        </div>
        
        {/* Links */}
        <div className="flex items-center gap-3">
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[hsl(var(--primary))] text-white rounded-lg text-sm font-medium hover:bg-[hsl(var(--primary)/0.9)] transition-all active:scale-95"
              aria-label={`Visit ${title} website`}
            >
              View
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          )}
          {githubLink && (
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-500 hover:text-[hsl(var(--primary))] transition-colors"
              aria-label={`View ${title} on GitHub`}
            >
              <Github className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Desktop Showcase - Full width with alternating layouts
const ProjectShowcaseDesktop = ({ title, description, imageUrl, tags, link, githubLink, index = 0 }: ProjectProps & { index?: number }) => {
  const [imageError, setImageError] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const isEven = index % 2 === 0;
  const displayedTags = showAllTags ? tags : tags.slice(0, 3);
  const remainingCount = tags.length - 3;

  return (
    <div className="group relative overflow-hidden rounded-xl md:rounded-2xl mb-10 sm:mb-12 md:mb-12">
      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch min-h-[450px] sm:min-h-[500px] md:min-h-[600px]`}>
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 min-h-[300px] sm:min-h-[350px] md:min-h-full">
          {imageUrl && !imageError ? (
            <>
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
              {isEven ? (
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent hidden md:block" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-transparent hidden md:block" />
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-700 opacity-50">{title.charAt(0)}</div>
              </div>
            </div>
          )}
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
            <div className={`absolute ${isEven ? 'top-4 right-4' : 'top-4 left-4'} w-24 h-24 md:w-32 md:h-32 bg-[hsl(var(--primary)/0.1)] rounded-full blur-3xl group-hover:bg-[hsl(var(--primary)/0.2)] transition-all`} />
          </div>
        </div>

        {/* Content Section */}
        <div className={`relative w-full md:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 sm:p-12 md:p-12 lg:p-16 flex flex-col justify-center ${isEven ? 'md:border-l-2 border-slate-800' : 'md:border-r-2 border-slate-800'}`}>
          <div className="max-w-xl w-full">
            {/* Tags */}
            <div className="flex flex-wrap gap-3 sm:gap-3 mb-5 sm:mb-6">
              {displayedTags.map((tag, idx) => (
                <Badge 
                  key={idx} 
                  className="bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.3)] text-xs sm:text-sm font-medium px-3.5 py-2 sm:px-4 sm:py-2 hover:bg-[hsl(var(--primary)/0.25)] transition-colors"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && !showAllTags && (
                <Badge 
                  onClick={() => setShowAllTags(true)}
                  className="bg-slate-800/50 text-slate-400 border border-slate-700/50 text-xs sm:text-sm font-medium px-3.5 py-2 sm:px-4 sm:py-2 cursor-pointer hover:bg-slate-700/50 hover:text-slate-300 hover:border-[hsl(var(--primary)/0.5)] transition-all"
                >
                  +{remainingCount} more
                </Badge>
              )}
              {showAllTags && tags.length > 3 && (
                <Badge 
                  onClick={() => setShowAllTags(false)}
                  className="bg-slate-800/50 text-slate-400 border border-slate-700/50 text-xs sm:text-sm font-medium px-3.5 py-2 sm:px-4 sm:py-2 cursor-pointer hover:bg-slate-700/50 hover:text-slate-300 hover:border-[hsl(var(--primary)/0.5)] transition-all"
                >
                  Show less
                </Badge>
              )}
            </div>
            
            {/* Title */}
            <h3 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white mb-5 sm:mb-6 md:mb-6 group-hover:text-[hsl(var(--primary))] transition-colors leading-tight">
              {title}
            </h3>
            
            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg md:text-xl lg:text-xl mb-8 sm:mb-10 md:mb-10 leading-relaxed">
              {description}
            </p>
            
            {/* Links */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-4">
              {link && (
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-6 sm:py-3 bg-[hsl(var(--primary))] text-white rounded-lg text-base sm:text-base font-medium hover:bg-[hsl(var(--primary)/0.9)] transition-all active:scale-95 sm:hover:scale-105 shadow-lg hover:shadow-xl group/link"
                  aria-label={`Visit ${title} website`}
                >
                  View Live
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              )}
              {githubLink && (
                <a 
                  href={githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-6 sm:py-3 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-lg text-base sm:text-base font-medium hover:bg-slate-800 hover:text-white hover:border-[hsl(var(--primary)/0.5)] transition-all active:scale-95"
                  aria-label={`View ${title} on GitHub`}
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
              )}
            </div>
          </div>

          {/* Decorative corner accent */}
          <div className={`absolute ${isEven ? 'top-0 right-0' : 'top-0 left-0'} w-20 h-20 md:w-32 md:h-32 bg-[hsl(var(--primary)/0.05)] rounded-bl-full md:rounded-none ${isEven ? 'md:rounded-tl-full' : 'md:rounded-tr-full'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block`} />
        </div>
      </div>

      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-[hsl(var(--primary)/0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Automated Bill Extraction System",
      description: "A high-precision AI-powered system that extracts structured line-item data from complex medical bills using a hybrid pipeline combining Google Gemini 2.0 Flash (visual understanding) and Tesseract OCR (textual precision). Features self-healing JSON parsing, smart PDF batching, and production-ready Docker deployment with FastAPI.",
      imageUrl: "https://www.xevensolutions.com/blog/future-of-medical-billing-with-ai/",
      tags: [
        "Python",
        "FastAPI",
        "Google Gemini 2.0",
        "Tesseract OCR",
        "Docker"
      ],
      link: "https://nishant-nit-patna.onrender.com/",
      githubLink: "https://github.com/nish0753/Nishant_NIT_PATNA"
    },
    {
      title: "Student Performance Predictor",
      description: "An end-to-end ML pipeline predicting student exam performance using demographic and socioeconomic factors. Includes automated data processing, model training with hyperparameter tuning, and a Flask web app for real-time predictions.",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80",
      tags: [
        "Python",
        "scikit-learn",
        "Pandas",
        "NumPy",
        "Flask"
      ],
      link: "https://example.com",
      githubLink: "https://github.com/nish0753/mlproject"
    }
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 lg:py-28 px-0 sm:px-4 md:px-6 lg:px-8 bg-slate-950">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-50 mb-4 sm:mb-5">Projects</h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            Each project represents a journey into solving real-world problems with technical excellence and attention to detail.
          </p>
        </div>
        
        {/* Mobile: Compact Cards */}
        <div className="md:hidden space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProjectCardMobile {...project} />
            </div>
          ))}
        </div>
        
        {/* Desktop: Full Width Showcase */}
        <div className="hidden md:block space-y-0">
          {projects.map((project, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProjectShowcaseDesktop {...project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
