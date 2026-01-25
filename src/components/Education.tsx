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
    <section id="education" className="relative py-24 px-6 overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute inset-0" />
      <div className="absolute top-16 right-12 w-52 h-52 bg-white/3 dark:bg-white/4 rounded-full blur-3xl" />
      <div className="absolute bottom-16 left-12 w-52 h-52 bg-white/2 dark:bg-white/3 rounded-full blur-3xl" />

      <div className="container relative z-10 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6 text-sm font-semibold uppercase tracking-widest text-gray-400">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span>Education & Credentials</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-gradient">My Learning Journey</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
                <div className="relative bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-xl border border-white/8 rounded-xl p-6 md:p-8 hover:border-white/15 transition-all duration-300">
                  <div className="flex gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center shadow-inner shadow-black/20">
                        <Icon size={28} className="text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {edu.degree}
                        </h3>
                        <span className="text-sm font-semibold text-gray-300 mt-2 md:mt-0">
                          {edu.year}
                        </span>
                      </div>

                      <div className="mb-3">
                        <p className="text-gray-300 font-medium">
                          {edu.school}
                        </p>
                        <p className="text-sm text-gray-400">{edu.field}</p>
                      </div>

                      <p className="text-gray-400 leading-relaxed">
                        {edu.description}
                      </p>
                      {edu.certificateUrl && (
                        <div className="mt-4">
                          <a
                            href={edu.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-gray-200 hover:border-white/30 hover:bg-white/5 transition-all duration-200"
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
