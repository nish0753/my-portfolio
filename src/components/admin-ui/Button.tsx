import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  const baseClasses = [
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
    "transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
    "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.4)] focus:ring-offset-0",
  ].join(" ");

  const variants = {
    primary:
      "bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/0.9)] shadow-lg",
    secondary:
      "bg-slate-800/50 border border-slate-700/50 text-white/90 hover:border-slate-600 hover:bg-slate-700/50",
    ghost: "text-white/75 hover:text-white hover:bg-slate-800/50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-7 py-3.5 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.98, y: 0 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
}
