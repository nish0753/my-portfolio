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
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-50 mb-4 sm:mb-5">
            Education & Credentials
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            Continuous education and professional development
          </p>
        </motion.div>

        <div className="space-y-6">
          {items.map((edu, index) => {
            const Icon = ICON_MAP[edu.icon] || Icons.GraduationCap;
            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 md:p-8 hover:border-[hsl(var(--primary)/0.5)] transition-all duration-300">
                  <div className="flex gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center group-hover:border-[hsl(var(--primary)/0.5)] transition-colors">
                        <Icon size={28} className="text-[hsl(var(--primary))]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="text-xl md:text-2xl font-display font-bold text-slate-50 group-hover:text-[hsl(var(--primary))] transition-colors">
                          {edu.degree}
                        </h3>
                        <span className="text-sm font-semibold text-slate-400 mt-2 md:mt-0">
                          {edu.year}
                        </span>
                      </div>

                      <div className="mb-3">
                        <p className="text-slate-300 font-medium">
                          {edu.school}
                        </p>
                        <p className="text-sm text-slate-400">{edu.field}</p>
                      </div>

                      <p className="text-slate-400 leading-relaxed">
                        {edu.description}
                      </p>
                      {edu.certificateUrl && (
                        <div className="mt-4">
                          <a
                            href={edu.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700/50 text-slate-300 hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))] hover:bg-slate-800/50 transition-all duration-200"
                          >
                            <FileText size={18} />
                            View Certificate
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
