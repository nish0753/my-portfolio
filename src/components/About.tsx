import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '@/hooks/useProfile';
import { parseBoldText } from '@/utils/textParser';
import { MapPin, Briefcase } from 'lucide-react';

export default function About() {
  const { profile } = useProfile();

  const paragraphs = (profile.bio || '').split('\n\n').filter(p => p.trim());

  return (
    <section
      id="about"
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, hsl(160 84% 39%) 0%, transparent 70%)' }} />
      </div>

      <div className="container max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-[hsl(var(--primary))] text-sm font-semibold tracking-widest uppercase mb-4">
            About Me
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-50 leading-tight mb-4">
            {profile.aboutHeadline || 'A builder across the whole stack.'}
          </h2>
          {profile.availableForWork && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(var(--primary)/0.12)] border border-[hsl(var(--primary)/0.3)] text-[hsl(var(--primary))] text-xs font-semibold mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
              Available for work
            </span>
          )}
        </motion.div>

        {/* Two-column layout: bio left, quick-facts right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bio — takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            {paragraphs.map((p, i) => (
              <p key={i} className="text-slate-300 leading-relaxed text-base sm:text-lg">
                {parseBoldText(p)}
              </p>
            ))}
          </motion.div>

          {/* Quick-fact sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <div className="professional-card p-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
                Quick Info
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Briefcase className="w-4 h-4 text-[hsl(var(--primary))] mt-0.5 shrink-0" />
                  <span className="text-slate-300 text-sm leading-snug">{profile.title}</span>
                </li>
                {profile.email && (
                  <li className="flex items-start gap-3">
                    <span className="w-4 h-4 shrink-0 mt-0.5 text-center text-[hsl(var(--primary))] text-xs">@</span>
                    <a href={`mailto:${profile.email}`} className="text-slate-300 text-sm hover:text-[hsl(var(--primary))] transition-colors truncate">
                      {profile.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Hero skills as chips */}
            {profile.heroSkills && profile.heroSkills.length > 0 && (
              <div className="professional-card p-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
                  Core Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.heroSkills.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 text-xs font-medium hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))] transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
