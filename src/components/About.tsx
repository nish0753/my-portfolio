import { motion } from "framer-motion";
import { useProfile } from "../hooks/useProfile";
import { Heart, Sparkles } from "lucide-react";

export default function About() {
  const { profile } = useProfile();

  const aboutText =
    profile?.bio ||
    "I'm a full-stack developer passionate about creating beautiful and functional web experiences. With expertise in modern technologies and a keen eye for design, I transform ideas into elegant digital solutions.";

  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5" />

      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container relative z-10 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-500" />
            <span className="text-sm font-semibold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              About Me
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            <span className="text-gradient">Who I Am</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Main Bio Card */}
          <div className="md:col-span-2">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
                <p className="text-lg leading-relaxed text-gray-300 mb-6">
                  {aboutText}
                </p>
                <div className="flex flex-wrap gap-3">
                  {["React", "TypeScript", "Node.js", "Design"].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/10 text-sm font-medium text-gray-300 hover:border-white/20 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
            <div className="relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full flex flex-col justify-between hover:border-white/20 transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gradient-accent">
                      5+
                    </div>
                    <div className="text-sm text-gray-400">
                      Years Experience
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Heart size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gradient-accent">
                      50+
                    </div>
                    <div className="text-sm text-gray-400">
                      Projects Completed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
