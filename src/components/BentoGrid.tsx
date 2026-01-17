import { motion } from "framer-motion";
import { Code2, Palette, Rocket, Zap } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const skills = [
  {
    icon: <Code2 size={32} />,
    title: "Frontend Development",
    description: "React, TypeScript, Next.js, Tailwind CSS",
    span: "md:col-span-2",
  },
  {
    icon: <Palette size={32} />,
    title: "UI/UX Design",
    description: "Figma, Adobe XD, Responsive Design",
    span: "md:col-span-1",
  },
  {
    icon: <Rocket size={32} />,
    title: "Performance",
    description: "Optimization, Core Web Vitals, Lighthouse",
    span: "md:col-span-1",
  },
  {
    icon: <Zap size={32} />,
    title: "Modern Stack",
    description: "Firebase, Supabase, Framer Motion, Three.js",
    span: "md:col-span-2",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function BentoGrid() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center"
        >
          <span className="text-gradient">Technical Expertise</span>
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {skills.map((skill, index) => (
            <GlassCard
              key={index}
              className={`${skill.span} group hover:bg-white/5 transition-colors duration-300`}
              hover
            >
              <div className="mb-4 text-white/80 group-hover:text-white transition-colors">
                {skill.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{skill.title}</h3>
              <p className="text-gray-400">{skill.description}</p>
            </GlassCard>
          ))}
        </motion.div>

        {/* About Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <GlassCard className="md:col-span-3">
            <h3 className="text-3xl font-bold mb-4">About Me</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              I'm a passionate frontend engineer with a keen eye for design and
              a love for creating seamless user experiences. With expertise in
              modern web technologies, I transform ideas into beautiful,
              performant, and accessible web applications. I believe in writing
              clean, maintainable code and staying up-to-date with the latest
              industry trends.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
