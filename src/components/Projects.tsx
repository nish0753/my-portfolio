import React, { useState, useMemo } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { ExternalLink, Github, Sparkles, FileText } from 'lucide-react';
import ProjectDrawer, { ProjectDetail } from '@/components/ProjectDrawer';

const DEFAULT_PROJECTS: ProjectDetail[] = [
  {
    title: 'Analytics Dashboard Pro',
    description: 'A real-time analytics platform handling 10k+ events per second. Built with React, WebSockets, and D3.js for rich data visualization.',
    tags: ['React', 'WebSockets', 'D3.js', 'Python'],
    category: '2024 — SaaS Platform',
    liveUrl: 'https://github.com/yourusername',
    githubUrl: 'https://github.com/yourusername',
    problemStatement: 'Monitoring high-volume real-time event streams without client browser lag or server memory leaks.',
    metrics: [
      { label: 'Event Rate', value: '10k+/sec' },
      { label: 'Latencies', value: '< 18ms' },
      { label: 'Lighthouse', value: '99/100' },
    ],
    architectureHighlights: [
      'WebSocket connection pooling with automatic reconnection backoff',
      'Virtual windowing rendering 100,000 data points smoothly with Canvas/D3',
      'Modular dashboard widget system with customizable layout state',
    ],
  },
  {
    title: 'LLM Document Search (RAG)',
    description: 'Generative AI pipeline indexing multi-page PDFs into vector embeddings. Built with Python, LangChain, FAISS, and Streamlit.',
    tags: ['Python', 'RAG', 'LangChain', 'FAISS'],
    category: '2024 — AI & Data',
    liveUrl: 'https://github.com/yourusername',
    githubUrl: 'https://github.com/yourusername',
    problemStatement: 'Extracting and searching unstructured documents with contextual precision and low retrieval hallucination.',
    metrics: [
      { label: 'Accuracy', value: '94.8%' },
      { label: 'Retrieval Speed', value: '120ms' },
      { label: 'Docs Processed', value: '50k+ pages' },
    ],
    architectureHighlights: [
      'FAISS vector store with semantic chunk overlap optimization',
      'LangChain conversational retrieval chain with source attribution',
      'Streamlit web UI for interactive chat & document preview',
    ],
  },
  {
    title: 'Niche Store Frontend',
    description: 'A high-performance e-commerce experience with a 98+ Lighthouse score. Implemented server-side rendering and optimized Core Web Vitals.',
    tags: ['Next.js', 'Tailwind', 'Stripe'],
    category: '2024 — E-commerce',
    liveUrl: 'https://github.com/yourusername',
    githubUrl: 'https://github.com/yourusername',
    problemStatement: 'Creating an ultra-fast checkout flow with instant page transitions and server-side rendering.',
    metrics: [
      { label: 'Lighthouse Score', value: '98/100' },
      { label: 'First Contentful Paint', value: '0.4s' },
      { label: 'Conversion Boost', value: '+32%' },
    ],
    architectureHighlights: [
      'Next.js App Router with ISR (Incremental Static Regeneration)',
      'Stripe Elements payment integration with webhook validation',
      'Zero layout shift image loading with Blurhash placeholders',
    ],
  },
  {
    title: 'Interactive 3D Portfolio',
    description: 'An award-winning interactive 3D website using Three.js and GLSL shaders. Pushed the boundaries of what a portfolio can be.',
    tags: ['WebGL', 'Three.js', 'GLSL'],
    category: '2023 — Creative Coding',
    liveUrl: 'https://github.com/yourusername',
    githubUrl: 'https://github.com/yourusername',
    problemStatement: 'Rendering complex 3D scenes on mobile devices while maintaining 60 FPS frame rates.',
    metrics: [
      { label: 'Target Frame Rate', value: '60 FPS' },
      { label: 'Asset Weight', value: '< 2.4 MB' },
      { label: 'Mobile Compatibility', value: '100%' },
    ],
    architectureHighlights: [
      'Custom GLSL fragment shaders for procedural particle fields',
      'Instanced mesh geometry reduction for optimized GPU draw calls',
      'Responsive canvas resizing with device pixel ratio scaling',
    ],
  },
];

const Projects = () => {
  const { projects: firebaseProjects } = useProjects();
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);

  const rawProjects: ProjectDetail[] = firebaseProjects.length > 0
    ? firebaseProjects.map((p) => ({
        title: p.title,
        description: p.description,
        tags: p.technologies || [],
        category: p.category || 'Featured Project',
        liveUrl: p.liveUrl || p.githubUrl || '#',
        githubUrl: p.githubUrl,
      }))
    : DEFAULT_PROJECTS;

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    tagsSet.add('All');
    rawProjects.forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet).slice(0, 7);
  }, [rawProjects]);

  const filteredProjects = useMemo(() => {
    if (selectedTag === 'All') return rawProjects;
    return rawProjects.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
    );
  }, [rawProjects, selectedTag]);

  return (
    <section className="py-24 md:py-32 px-6" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>// featured work</span>
            </div>
            <h2 className="font-display font-black text-5xl md:text-7xl" style={{ letterSpacing: '-0.035em', lineHeight: 1 }}>
              Selected <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Projects</span>
            </h2>
          </div>
          <a
            href="https://github.com/endurance21"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            view all
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12 font-mono text-xs">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className="px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer"
              style={{
                borderColor: selectedTag === tag ? 'var(--accent)' : 'var(--border)',
                background: selectedTag === tag ? 'var(--accent)' : 'var(--bg-elev)',
                color: selectedTag === tag ? 'var(--bg)' : 'var(--fg-dim)',
                fontWeight: selectedTag === tag ? 600 : 400,
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const numStr = (idx + 1).toString().padStart(2, '0');
            const primaryTag = project.tags[0] || 'Web';

            return (
              <div
                key={idx}
                className="article-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="card-num">{numStr}</div>
                    <span className="tag">{primaryTag}</span>
                  </div>
                  <div className="font-mono text-xs mb-4" style={{ color: 'var(--muted)' }}>
                    {project.category}
                  </div>
                  <h3
                    onClick={() => setActiveProject(project)}
                    className="font-display font-bold text-2xl mb-4 leading-tight hover:underline cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--muted)', lineHeight: 1.65 }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded border"
                        style={{ borderColor: 'var(--border)', color: 'var(--fg-dim)', background: 'var(--bg-elev-2)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-xs pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <button
                    onClick={() => setActiveProject(project)}
                    className="flex items-center gap-2 uppercase tracking-widest hover-link cursor-pointer border-none bg-transparent"
                    style={{ color: 'var(--accent)' }}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>case study</span>
                    <span className="arrow">→</span>
                  </button>

                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-link"
                        style={{ color: 'var(--muted)' }}
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-link"
                        style={{ color: 'var(--muted)' }}
                        title="GitHub Source"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide-over Case Study Drawer */}
      <ProjectDrawer
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};

export default Projects;
