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
          className="text-5xl md:text-6xl font-bold mb-4 text-center"
        >
          <span className="bg-gradient-to-r from-white via-sky-100 to-sky-200 bg-clip-text text-transparent">
            Technical Skills
          </span>
        </motion.h2>
        <p className="text-center text-sm text-gray-400 mb-12">
          Tools and languages I use every day
        </p>

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
                <GlassCard className="h-full border border-white/8 bg-white/2">
                  <h3 className="text-xl font-semibold mb-4 text-sky-200">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1.5 rounded-full bg-white/4 border border-white/10 text-sm text-gray-100 hover:bg-white/8 hover:border-white/16 transition-colors"
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
