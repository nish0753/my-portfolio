import { motion } from "framer-motion";
import { useSkills } from "../hooks/useSkills";
import GlassCard from "./ui/GlassCard";

export default function Skills() {
  const { skills, loading } = useSkills();

  if (loading) {
    return null;
  }

  if (skills.length === 0) {
    return null;
  }

  // Group skills by category
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>,
  );

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center"
        >
          <span className="text-gradient">Technical Skills</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedSkills).map(
            ([category, categorySkills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <GlassCard className="h-full">
                  <h3 className="text-xl font-bold mb-4 text-purple-400">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
