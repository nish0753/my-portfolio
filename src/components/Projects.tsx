import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectProps {
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  link?: string;
  githubLink?: string;
  index: number;
}

const ProjectCard = ({ title, description, imageUrl, tags, link, githubLink, index }: ProjectProps) => {
  const [imageError, setImageError] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  
  const displayedTags = showAllTags ? tags : tags.slice(0, 3);
  const remainingCount = tags.length - 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col h-full bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-2xl overflow-hidden hover:border-[hsl(var(--primary)/0.5)] transition-all duration-300 hover:shadow-2xl hover:shadow-[hsl(var(--primary)/0.1)]"
    >
      {/* Image Container - Reduced Height */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-800">
        {imageUrl && !imageError ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
            <span className="text-4xl font-bold text-slate-700 opacity-50">{title.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 sm:p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {displayedTags.map((tag, idx) => (
            <Badge 
              key={idx} 
              className="bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.2)] text-[10px] sm:text-xs font-medium px-2 py-0.5"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && !showAllTags && (
            <Badge 
              onClick={(e) => {
                e.preventDefault();
                setShowAllTags(true);
              }}
              className="bg-slate-800/50 text-slate-400 border border-slate-700/50 text-[10px] sm:text-xs font-medium px-2 py-0.5 cursor-pointer hover:bg-slate-700/50 transition-all"
            >
              +{remainingCount}
            </Badge>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-3 group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-1">
          {title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">
          {description}
        </p>
        
        {/* Links */}
        <div className="flex items-center gap-4 mt-auto">
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--primary)/0.8)] transition-colors group/link"
            >
              Live Demo
              <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
            </a>
          )}
          {githubLink && (
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <Github className="h-4 w-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Automated Bill Extraction System",
      description: "A high-precision AI-powered system that extracts structured line-item data from complex medical bills using a hybrid pipeline combining Google Gemini 2.0 Flash and Tesseract OCR. Features self-healing JSON parsing and FastAPI deployment.",
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
      description: "An end-to-end ML pipeline predicting student exam performance using demographic and socioeconomic factors. Includes automated data processing, model training, and a Flask web app for real-time predictions.",
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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-50 mb-4">Projects</h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            A selection of my recent work in machine learning, data science, and full-stack development.
          </p>
        </div>
        
        {/* Projects Grid - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
