import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useBentoGrid } from "../hooks/useBentoGrid";

const ICON_MAP: Record<string, any> = {
  Code2: Icons.Code2,
  Palette: Icons.Palette,
  Zap: Icons.Zap,
  Globe: Icons.Globe,
  Layers: Icons.Layers,
  Sparkles: Icons.Sparkles,
  Star: Icons.Star,
  Rocket: Icons.Rocket,
  Lightbulb: Icons.Lightbulb,
};

export const BentoGrid = () => {
  const { items } = useBentoGrid();
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern bg-[size:20px_20px] opacity-20" />

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-gradient">What I Do</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Crafting digital experiences with modern technologies and creative
            solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {items.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon] || Icons.Code2;
            const isMainItem = item.category === "main";
            const isStatItem = item.category === "stat";

            if (isMainItem) {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bento-item md:col-span-2 lg:col-span-2 row-span-2 flex flex-col justify-between min-h-[400px]"
                >
                  <div>
                    <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center mb-6">
                      <IconComponent className="w-7 h-7 text-foreground" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-8">
                    {(
                      item.technologies || [
                        "Python",
                        "SQL",
                        "Pandas",
                        "Scikit-learn",
                        "Streamlit",
                      ]
                    ).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm glass rounded-lg text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            } else if (isStatItem) {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bento-item md:col-span-2 lg:col-span-1"
                >
                  <h4 className="text-lg font-semibold mb-6">{item.title}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-3xl font-bold text-gradient-accent">
                        5+
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Years Coding
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gradient-accent">
                        50+
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Projects
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            } else {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bento-item"
                >
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-foreground" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
