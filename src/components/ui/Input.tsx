import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-400 mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-xl
          glass-effect
          text-white placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-white/20
          transition-all duration-200
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
