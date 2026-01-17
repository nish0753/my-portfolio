import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import GlassCard from "./ui/GlassCard";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <GlassCard hover className="group h-full overflow-hidden">
        {/* Project Image */}
        <div className="relative h-64 -m-6 mb-6 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              <span className="text-6xl">🚀</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* Project Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold group-hover:text-gradient transition-all">
            {project.title}
          </h3>

          <p className="text-gray-400 line-clamp-3">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full glass-effect text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect hover:bg-white/10 transition-colors"
              >
                <ExternalLink size={16} />
                <span className="text-sm">Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect hover:bg-white/10 transition-colors"
              >
                <Github size={16} />
                <span className="text-sm">Code</span>
              </a>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
