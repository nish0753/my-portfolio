import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownCircle } from 'lucide-react';
import { useExperience, type ExperienceItem } from '../hooks/useExperience';
import { parseBoldText } from '@/utils/textParser';

export default function Experience() {
  const { items } = useExperience();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[hsl(var(--primary)/0.03)] via-transparent to-transparent pointer-events-none" />

      <div className="container relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 ml-4 md:ml-6 pl-8 md:pl-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.25)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_8px_hsl(var(--primary))]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[hsl(var(--primary))]">01 · Career</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight">
            <span className="text-slate-50">Where I've </span>
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-emerald-300 bg-clip-text text-transparent">Been</span>
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-transparent" />
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl">Professional journey and career highlights</p>
        </motion.div>

        <div className="relative border-l-2 border-[hsl(var(--primary)/0.2)] ml-4 md:ml-6 space-y-12 pb-8">
          {items.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Glowing dot */}
              <div className="absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_15px_hsl(var(--primary))] ring-4 ring-[#020617] group-hover:scale-125 transition-transform duration-300" />

              <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-6 md:p-8 rounded-2xl hover:bg-slate-800/50 hover:border-slate-700/80 transition-all duration-300 group-hover:-translate-y-1 shadow-lg shadow-black/20">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-slate-50 group-hover:text-[hsl(var(--primary))] transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-[hsl(var(--primary))] font-medium text-lg mt-1">
                      {exp.company}
                    </p>
                  </div>
                  <span className="inline-block mt-3 md:mt-0 px-4 py-1.5 rounded-full bg-slate-800/80 text-sm font-semibold text-slate-300 border border-slate-700/50 self-start md:self-auto">
                    {exp.year}
                  </span>
                </div>

                <div className="text-slate-300 leading-relaxed text-base pt-2 border-t border-slate-800/50">
                  {exp.description.includes('\n') || exp.description.startsWith('-') ? (
                    <ul className="list-disc pl-5 space-y-1.5">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i}>{parseBoldText(line.replace(/^-\s*/, ''))}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{parseBoldText(exp.description)}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator into the next section */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => scrollTo('education')}
            className="animate-bounce cursor-pointer group"
            aria-label="Scroll to education section"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-md hero-scroll-glow scale-75" />
              <ArrowDownCircle
                className="h-9 w-9 sm:h-10 sm:w-10 text-slate-400 group-hover:text-[hsl(var(--primary))] transition-colors relative z-10"
                strokeWidth={1.5}
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
