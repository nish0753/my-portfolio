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
                <span className="text-gradient">Get In Touch</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Let's connect and explore opportunities to create something
                amazing together.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={`mailto:${profile.email}`}
                  className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                >
                  Email
                </a>
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-xl glass-effect hover:bg-white/10 transition-colors font-semibold"
                  >
                    LinkedIn
                  </a>
                )}
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-xl glass-effect hover:bg-white/10 transition-colors font-semibold"
                  >
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
