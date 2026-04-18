import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({
  label,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-400 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3 rounded-xl
          bg-slate-800/80 border border-slate-700/50
          text-white placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.4)] focus:border-[hsl(var(--primary)/0.5)]
          transition-all duration-200
          resize-vertical min-h-[100px]
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
