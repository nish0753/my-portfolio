import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { FileText } from "lucide-react";
import { useEducation } from "../hooks/useEducation";

const ICON_MAP: Record<string, any> = {
  GraduationCap: Icons.GraduationCap,
  BookOpen: Icons.BookOpen,
  Award: Icons.Award,
  Briefcase: Icons.Briefcase,
  Star: Icons.Star,
  Zap: Icons.Zap,
};

export default function Education() {
  const { items } = useEducation();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="education" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-16 right-12 w-52 h-52 bg-[hsl(var(--primary)/0.05)] rounded-full blur-3xl" />
      <div className="absolute bottom-16 left-12 w-52 h-52 bg-[hsl(var(--primary)/0.03)] rounded-full blur-3xl" />

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
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[hsl(var(--primary))]">02 · Academics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight">
            <span className="text-slate-50">What I've </span>
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-emerald-300 bg-clip-text text-transparent">Studied</span>
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-transparent" />
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl">Continuous education and professional development</p>
        </motion.div>

        <div className="relative border-l-2 border-[hsl(var(--primary)/0.2)] ml-4 md:ml-6 space-y-12 pb-8">
          {items.map((edu, index) => {
            const Icon = ICON_MAP[edu.icon] || Icons.GraduationCap;
            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Glowing Node with User-selected Icon */}
                <div className="absolute left-[-18px] top-0 w-9 h-9 rounded-full bg-slate-900 border-2 border-[hsl(var(--primary))] shadow-[0_0_10px_hsl(var(--primary)/0.5)] flex items-center justify-center group-hover:scale-110 group-hover:bg-[hsl(var(--primary))] group-hover:text-slate-900 text-[hsl(var(--primary))] transition-all duration-300 z-10">
                  <Icon size={16} />
                </div>

                {/* Content Card */}
                <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-6 md:p-8 rounded-2xl hover:bg-slate-800/50 hover:border-slate-700/80 transition-all duration-300 group-hover:-translate-y-1 shadow-lg shadow-black/20">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-slate-50 group-hover:text-[hsl(var(--primary))] transition-colors">
                        {edu.degree}
                      </h3>
                      <p className="text-[hsl(var(--primary))] font-medium text-lg mt-1">
                        {edu.school}
                      </p>
                      <p className="text-sm text-slate-400 mt-1">{edu.field}</p>
                    </div>

                    <span className="inline-block mt-3 md:mt-0 px-4 py-1.5 rounded-full bg-slate-800/80 text-sm font-semibold text-slate-300 border border-slate-700/50 self-start md:self-auto">
                      {edu.year}
                    </span>
                  </div>

                  <p className="text-slate-300 leading-relaxed text-base pt-2 border-t border-slate-800/50">
                    {edu.description}
                  </p>

                  {edu.certificateUrl && (
                    <div className="mt-5">
                      <a
                        href={edu.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700/50 text-slate-300 hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))] hover:bg-slate-800/50 transition-all duration-200 text-sm font-medium"
                      >
                        <FileText size={16} />
                        View Certificate
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll indicator into the next section */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => scrollTo('projects')}
            className="animate-bounce cursor-pointer group"
            aria-label="Scroll to projects section"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-md hero-scroll-glow scale-75" />
              <Icons.ArrowDownCircle
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
