import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useExperience } from "../hooks/useExperience";

const ICON_MAP: Record<string, any> = {
  Briefcase: Icons.Briefcase,
  Star: Icons.Star,
  Building: Icons.Building,
  Monitor: Icons.Monitor,
  Code: Icons.Code,
  Zap: Icons.Zap,
};

export default function Experience() {
  const { items } = useExperience();
  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[hsl(var(--primary)/0.03)] via-transparent to-transparent pointer-events-none" />

      <div className="container relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-50 mb-4 sm:mb-5">
            Experience
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            Professional journey and career highlights
          </p>
        </motion.div>

        <div className="relative border-l-2 border-[hsl(var(--primary)/0.2)] ml-4 md:ml-6 space-y-12 pb-8">
          {items.map((exp, index) => {
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Glowing Node */}
                <div className="absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_15px_hsl(var(--primary))] ring-4 ring-slate-950 group-hover:scale-125 transition-transform duration-300" />
                
                {/* Content Card */}
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

                  <p className="text-slate-300 leading-relaxed text-base pt-2 border-t border-slate-800/50">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
