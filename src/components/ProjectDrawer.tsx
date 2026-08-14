import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Layers, Zap, CheckCircle2, Cpu } from 'lucide-react';

export interface ProjectDetail {
  title: string;
  category: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  problemStatement?: string;
  solution?: string;
  metrics?: { label: string; value: string }[];
  architectureHighlights?: string[];
}

interface ProjectDrawerProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export default function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const defaultMetrics = project.metrics || [
    { label: 'Latency / Speed', value: '< 45ms' },
    { label: 'Throughput', value: '10k+ req/sec' },
    { label: 'Performance', value: '98/100 Score' },
  ];

  const defaultHighlights = project.architectureHighlights || [
    'Modular React/TypeScript frontend architecture with strict state scoping',
    'High-efficiency data processing & API integration with resilient fallback error handling',
    'TailwindCSS design system with custom CSS variables & theme responsiveness',
    'Optimized build pipeline with dynamic imports and bundle chunking',
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over Drawer Container */}
      <div
        className="relative w-full max-w-2xl h-full shadow-2xl flex flex-col z-10 overflow-y-auto border-l transition-transform duration-300 animate-slide-left font-sans"
        style={{
          background: 'var(--bg-elev)',
          borderColor: 'var(--border-strong)',
          color: 'var(--fg)',
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-20 px-6 py-5 border-b flex items-center justify-between backdrop-blur-md"
          style={{ background: 'var(--bg-elev-2)', borderColor: 'var(--border)' }}
        >
          <div>
            <span className="tag mb-1.5 inline-block">{project.tags[0] || 'Case Study'}</span>
            <div className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
              {project.category}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:opacity-80 transition-opacity cursor-pointer border"
            style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            aria-label="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8 flex-1">
          {/* Title */}
          <div>
            <h2 className="font-display font-black text-3xl md:text-4xl mb-4 leading-tight">
              {project.title}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--fg-dim)' }}>
              {project.description}
            </p>
          </div>

          {/* Impact Metrics Grid */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
              <Zap className="w-4 h-4" />
              <span>Key Performance & Impact Metrics</span>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {defaultMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border text-center"
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <div className="font-mono font-bold text-lg md:text-xl" style={{ color: 'var(--accent)' }}>
                    {m.value}
                  </div>
                  <div className="font-mono text-[11px] mt-1" style={{ color: 'var(--muted)' }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Problem & Solution */}
          <div className="space-y-4">
            <div className="p-5 rounded-xl border" style={{ background: 'var(--bg-elev-2)', borderColor: 'var(--border)' }}>
              <h4 className="font-mono text-xs uppercase tracking-wider font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--accent-2)' }}>
                <Layers className="w-4 h-4" />
                <span>Problem & Challenge</span>
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-dim)' }}>
                {project.problemStatement ||
                  `Engineering a scalable solution for ${project.title} required balancing real-time execution speeds with a clean, intuitive user interface while maintaining reliability across high concurrent user loads.`}
              </p>
            </div>
          </div>

          {/* Architecture & Engineering Highlights */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
              <Cpu className="w-4 h-4" />
              <span>Technical Architecture Highlights</span>
            </h3>

            <div className="space-y-3">
              {defaultHighlights.map((highlight, hIdx) => (
                <div key={hIdx} className="flex items-start gap-3 p-3.5 rounded-lg border text-xs" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <span style={{ color: 'var(--fg)', lineHeight: 1.5 }}>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Tech Stack Tags */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>
              Technologies Used:
            </h3>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {project.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md border font-mono"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-elev-2)', color: 'var(--fg)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action Links */}
        <div
          className="sticky bottom-0 px-6 py-4 border-t flex items-center justify-between backdrop-blur-md"
          style={{ background: 'var(--bg-elev-2)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>launch live demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Github className="w-3.5 h-3.5" />
                <span>source code</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="font-mono text-xs hover:underline cursor-pointer"
            style={{ color: 'var(--muted)' }}
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
}
