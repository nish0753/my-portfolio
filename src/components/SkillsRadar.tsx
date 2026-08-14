import React, { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Radar as RadarIcon, BarChart2, Cpu, Database, Layout, Server, Cloud, Brain } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface SkillMetric {
  category: string;
  score: number;
  fullMark: number;
  description: string;
  subSkills: string[];
  icon: React.ReactNode;
}

const SKILL_METRICS: SkillMetric[] = [
  {
    category: 'Machine Learning',
    score: 95,
    fullMark: 100,
    description: 'PyTorch, Scikit-Learn, RAG & LLMs, Feature Engineering, Model Optimization',
    subSkills: ['PyTorch', 'Scikit-Learn', 'RAG / Vector DBs', 'Fine-Tuning', 'Prompt Engineering'],
    icon: <Brain className="w-4 h-4 text-amber-500" />,
  },
  {
    category: 'Python & Data',
    score: 95,
    fullMark: 100,
    description: 'Pandas, NumPy, EDA, Statistical Analysis, Data Ingestion Pipelines',
    subSkills: ['Pandas & NumPy', 'Data Cleaning', 'Exploratory Analysis', 'SQL & BigQuery', 'ETL Pipelines'],
    icon: <Database className="w-4 h-4 text-cyan-500" />,
  },
  {
    category: 'Backend & APIs',
    score: 88,
    fullMark: 100,
    description: 'FastAPI, Node.js, REST APIs, Microservices, Authentication',
    subSkills: ['FastAPI', 'Node.js & Express', 'RESTful Services', 'Firebase / Firestore', 'PostgreSQL'],
    icon: <Server className="w-4 h-4 text-emerald-500" />,
  },
  {
    category: 'Frontend & UI',
    score: 90,
    fullMark: 100,
    description: 'React, TypeScript, Next.js, TailwindCSS, State Management',
    subSkills: ['React & Next.js', 'TypeScript', 'TailwindCSS', 'Custom Hooks', 'UI Animations'],
    icon: <Layout className="w-4 h-4 text-purple-500" />,
  },
  {
    category: 'DevOps & Cloud',
    score: 82,
    fullMark: 100,
    description: 'Docker, AWS, CI/CD Pipelines, Model Serving & Deployment',
    subSkills: ['Docker', 'AWS Services', 'Git / GitHub Actions', 'Deployment', 'Vercel / Cloud Run'],
    icon: <Cloud className="w-4 h-4 text-blue-500" />,
  },
  {
    category: 'Architecture',
    score: 86,
    fullMark: 100,
    description: 'System Design, Code Performance, Modular Component Architecture',
    subSkills: ['System Design', 'API Integration', 'Data Modeling', 'Performance Optimization', 'Clean Code'],
    icon: <Cpu className="w-4 h-4 text-rose-500" />,
  },
];

export default function SkillsRadar() {
  const { theme } = useTheme();
  const [activeView, setActiveView] = useState<'chart' | 'grid'>('chart');
  const [selectedMetric, setSelectedMetric] = useState<SkillMetric | null>(SKILL_METRICS[0]);

  // Color tokens based on current theme
  const getRadarColor = () => {
    if (theme === 'light') return '#c2410c'; // Terracotta
    if (theme === 'cyber') return '#4eff96'; // Neon Green
    return '#f59e0b'; // Amber
  };

  const getGridColor = () => {
    if (theme === 'cyber') return 'rgba(78, 255, 150, 0.2)';
    if (theme === 'light') return 'rgba(26, 22, 16, 0.15)';
    return 'rgba(240, 234, 214, 0.15)';
  };

  return (
    <section className="py-24 md:py-32 px-6" id="skills-radar" style={{ background: 'var(--bg-elev-2)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
              // technical proficiency matrix
            </div>
            <h2 className="font-display font-black text-5xl md:text-7xl" style={{ letterSpacing: '-0.035em', lineHeight: 1 }}>
              Skills <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Radar</span>
            </h2>
            <p className="text-base mt-4 max-w-xl" style={{ color: 'var(--muted)' }}>
              An interactive visual analysis of my core competencies across Data Science, ML Engineering, Backend, and Frontend.
            </p>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex items-center gap-2 p-1.5 rounded-full border font-mono text-xs" style={{ background: 'var(--bg-elev)', borderColor: 'var(--border)' }}>
            <button
              onClick={() => setActiveView('chart')}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all cursor-pointer ${
                activeView === 'chart' ? 'font-bold shadow-md' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                background: activeView === 'chart' ? 'var(--accent)' : 'transparent',
                color: activeView === 'chart' ? 'var(--bg)' : 'var(--fg)',
              }}
            >
              <RadarIcon className="w-3.5 h-3.5" />
              <span>Radar Chart</span>
            </button>
            <button
              onClick={() => setActiveView('grid')}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all cursor-pointer ${
                activeView === 'grid' ? 'font-bold shadow-md' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                background: activeView === 'grid' ? 'var(--accent)' : 'transparent',
                color: activeView === 'grid' ? 'var(--bg)' : 'var(--fg)',
              }}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Matrix Grid</span>
            </button>
          </div>
        </div>

        {activeView === 'chart' ? (
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left — Radar Chart View */}
            <div className="lg:col-span-7 h-[420px] w-full p-4 rounded-2xl border flex items-center justify-center" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={SKILL_METRICS}>
                  <PolarGrid stroke={getGridColor()} />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: 'var(--fg)', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={getGridColor()} />
                  <Radar
                    name="Proficiency Level"
                    dataKey="score"
                    stroke={getRadarColor()}
                    fill={getRadarColor()}
                    fillOpacity={0.35}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--bg-elev)',
                      borderColor: 'var(--border-strong)',
                      color: 'var(--fg)',
                      borderRadius: '8px',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '12px',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Right — Interactive Category Breakdown */}
            <div className="lg:col-span-5 space-y-4">
              {SKILL_METRICS.map((metric) => (
                <div
                  key={metric.category}
                  onClick={() => setSelectedMetric(metric)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    selectedMetric?.category === metric.category ? 'shadow-lg border-l-4' : 'hover:border-slate-500/50'
                  }`}
                  style={{
                    background: 'var(--card)',
                    borderColor: selectedMetric?.category === metric.category ? 'var(--accent)' : 'var(--border)',
                    borderLeftColor: selectedMetric?.category === metric.category ? 'var(--accent)' : 'var(--border)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3 font-mono text-sm font-bold" style={{ color: 'var(--fg)' }}>
                      {metric.icon}
                      <span>{metric.category}</span>
                    </div>
                    <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent)' }}>
                      {metric.score}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 rounded-full overflow-hidden mb-3" style={{ background: 'var(--border)' }}>
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{ width: `${metric.score}%`, background: 'var(--accent)' }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {metric.subSkills.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded border"
                        style={{ borderColor: 'var(--border)', color: 'var(--fg-dim)', background: 'var(--bg-elev-2)' }}
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_METRICS.map((metric) => (
              <div
                key={metric.category}
                className="article-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 font-mono text-base font-bold" style={{ color: 'var(--fg)' }}>
                      {metric.icon}
                      <span>{metric.category}</span>
                    </div>
                    <span className="font-mono text-sm font-bold" style={{ color: 'var(--accent)' }}>
                      {metric.score}%
                    </span>
                  </div>

                  <p className="text-xs mb-6" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                    {metric.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="font-mono text-[10px] uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
                    Core Stack:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {metric.subSkills.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded border"
                        style={{ borderColor: 'var(--border)', color: 'var(--fg)', background: 'var(--bg-elev-2)' }}
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
