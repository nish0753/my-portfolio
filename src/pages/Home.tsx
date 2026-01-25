import { motion } from "framer-motion";
import Hero from "../components/Hero";
import BentoGrid from "../components/BentoGrid";
import Skills from "../components/Skills";
import Education from "../components/Education";
import ProjectCard from "../components/ProjectCard";
import { useProjects } from "../hooks/useProjects";
import { useProfile } from "../hooks/useProfile";
import { useVisitors } from "../hooks/useVisitors";
import GlassCard from "../components/ui/GlassCard";

export default function Home() {
  const { projects, loading } = useProjects();
  const { profile } = useProfile();
  useVisitors(); // Track visitor on page load

  return (
    <div className="min-h-screen">
      <Hero />

      <BentoGrid />

      <Skills />

      <Education />

      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-16 text-center"
          >
            <span className="text-gradient">Featured Projects</span>
          </motion.h2>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <GlassCard className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No projects available yet. Check back soon!
              </p>
            </GlassCard>
          )}
        </div>
      </section>

      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-sky-100 to-sky-200 bg-clip-text text-transparent">
                  Get In Touch
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Let's connect and explore opportunities to create something
                amazing together.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={`mailto:${profile.email}`}
                  className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" ry="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Email
                </a>
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-xl glass-effect hover:bg-white/10 transition-colors font-semibold inline-flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="currentColor"
                    >
                      <path d="M19 0H5C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM8.3 19.2H5.6V9h2.7v10.2zM7 7.7c-.9 0-1.6-.7-1.6-1.6S6.1 4.5 7 4.5s1.6.7 1.6 1.6S7.9 7.7 7 7.7zm13 11.5h-2.7v-5.5c0-1.3-.5-2.2-1.6-2.2-.9 0-1.4.6-1.6 1.2-.1.2-.1.5-.1.8v5.6h-2.7V9h2.7v1.4c.4-.6 1.1-1.6 2.7-1.6 2 0 3.4 1.3 3.4 4.1v6.9z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-xl glass-effect hover:bg-white/10 transition-colors font-semibold inline-flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="currentColor"
                    >
                      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.37-3.88-1.37-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.74 1.26 3.41.96.1-.75.41-1.26.75-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.19a11.2 11.2 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.5 3.2-1.19 3.2-1.19.63 1.59.23 2.76.11 3.05.74.81 1.19 1.85 1.19 3.11 0 4.43-2.69 5.4-5.26 5.69.42.37.8 1.1.8 2.22 0 1.6-.02 2.88-.02 3.27 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-glass-border">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
