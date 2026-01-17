import { motion } from "framer-motion";
import { Settings, User, FileText, Briefcase, Palette } from "lucide-react";
import GlassCard from "../components/ui/GlassCard";
import { Link } from "react-router-dom";

const editorSections = [
  {
    icon: User,
    title: "Hero Section",
    description: "Edit your name, title, and introduction",
    file: "src/components/Hero.tsx",
    color: "text-purple-400",
  },
  {
    icon: Briefcase,
    title: "Projects",
    description: "Add, edit, or remove your portfolio projects",
    file: "Admin Panel → Project Management",
    color: "text-blue-400",
  },
  {
    icon: FileText,
    title: "Resume",
    description: "Upload and manage your resume PDF",
    file: "Admin Panel → Resume Upload",
    color: "text-green-400",
  },
  {
    icon: Palette,
    title: "Styling",
    description: "Customize colors and design tokens",
    file: "src/styles/globals.css",
    color: "text-pink-400",
  },
];

export default function EditorGuide() {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
            <Settings className="text-purple-400" size={20} />
            <span className="text-sm">Customization Guide</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              What You Can Edit
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Here's everything you can customize in your portfolio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {editorSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full hover:bg-white/5 transition-colors">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg bg-black/50 ${section.color}`}
                  >
                    <section.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                    <p className="text-gray-400 mb-3">{section.description}</p>
                    <code className="text-sm text-purple-400 bg-black/50 px-2 py-1 rounded">
                      {section.file}
                    </code>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard>
            <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-2">
                  1. Update Your Info
                </h3>
                <p className="text-sm">
                  Open{" "}
                  <code className="text-purple-400 bg-black/50 px-2 py-1 rounded">
                    src/components/Hero.tsx
                  </code>{" "}
                  and replace "Your Name" with your actual name.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">
                  2. Add Your Projects
                </h3>
                <p className="text-sm">
                  Go to the{" "}
                  <Link to="/admin" className="text-purple-400 hover:underline">
                    Admin Panel
                  </Link>{" "}
                  to add your portfolio projects with images, descriptions, and
                  links.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">
                  3. Upload Resume
                </h3>
                <p className="text-sm">
                  In the Admin Panel, upload your resume PDF. It will appear as
                  a download button on your homepage.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">
                  4. Customize Colors
                </h3>
                <p className="text-sm">
                  Edit{" "}
                  <code className="text-purple-400 bg-black/50 px-2 py-1 rounded">
                    src/styles/globals.css
                  </code>{" "}
                  to change the background gradient, glass effects, and color
                  scheme.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">
                  5. Connect Firebase
                </h3>
                <p className="text-sm">
                  Add your Firebase credentials to the{" "}
                  <code className="text-purple-400 bg-black/50 px-2 py-1 rounded">
                    .env
                  </code>{" "}
                  file to enable data persistence and authentication.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
