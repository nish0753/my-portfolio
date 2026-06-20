import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Code2 } from 'lucide-react';
import { useSkills } from '@/hooks/useSkills';

/* Subtle colour tints rotated across the grid so the cards stay lively
   like the deployed site, without overpowering the brand logos. */
const TINTS = [
  'bg-blue-500/10 border-blue-500/20',
  'bg-purple-500/10 border-purple-500/20',
  'bg-emerald-500/10 border-emerald-500/20',
  'bg-orange-500/10 border-orange-500/20',
  'bg-cyan-500/10 border-cyan-500/20',
  'bg-pink-500/10 border-pink-500/20',
];

/* Single skill card — tries a real brand logo, falls back to a code glyph. */
const SkillCard = ({ name, tint }: { name: string; tint: string }) => {
  const [imgError, setImgError] = useState(false);

  const slug = name
    .toLowerCase()
    .replace('node.js', 'nodedotjs')
    .replace('c++', 'cplusplus')
    .replace('c#', 'csharp')
    .replace(/[^a-z0-9]/g, '');

  return (
    <Card className={`${tint} border p-6 hover:scale-105 transition-all duration-300 group cursor-pointer`}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {!imgError ? (
            <img
              src={`https://cdn.simpleicons.org/${slug}`}
              alt={name}
              className="w-8 h-8 object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <Code2 className="w-7 h-7 text-[hsl(var(--primary))]" />
          )}
        </div>
        <h4 className="font-medium text-sm sm:text-base text-slate-50 text-center leading-snug">
          {name}
        </h4>
      </div>
    </Card>
  );
};

const TopSkills = () => {
  const { skills } = useSkills();

  const categories = Array.from(new Set(skills.map(s => s.category)));
  const groups = categories.map(cat => ({
    label: cat,
    skills: skills.filter(s => s.category === cat).map(s => s.name),
  }));

  let tintIdx = 0;

  return (
    <section id="top-skills" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.25)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_8px_hsl(var(--primary))]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[hsl(var(--primary))]">04 · Toolkit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight">
            <span className="text-slate-50">What I Work </span>
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-emerald-300 bg-clip-text text-transparent">With</span>
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent" />
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl">Tools and technologies I work with</p>
        </motion.div>

        <div className="space-y-10 sm:space-y-12">
          {groups.map((group, gIdx) => (
            <motion.div
              key={gIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gIdx * 0.1 }}
              className="professional-card p-6 sm:p-8 md:p-10"
            >
              <div className="text-center mb-8">
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-slate-50">
                  {group.label}
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {group.skills.map((skill, i) => (
                  <SkillCard key={i} name={skill} tint={TINTS[tintIdx++ % TINTS.length]} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSkills;
