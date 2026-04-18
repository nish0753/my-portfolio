import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  hover = false,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      className={`
        bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6
        ${hover ? "cursor-pointer transition-all duration-300 hover:border-[hsl(var(--primary)/0.5)]" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
