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
    "shadow-[0_10px_40px_-12px_rgba(124,58,237,0.45)]",
    "focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:ring-offset-0",
  ].join(" ");

  const variants = {
    primary:
      "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white hover:brightness-[1.03]",
    secondary:
      "glass-effect border border-white/15 text-white/90 hover:border-white/25 hover:bg-white/4",
    ghost: "text-white/75 hover:text-white hover:bg-white/5",
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
