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
          glass-effect
          text-white placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-white/20
          transition-all duration-200
          resize-vertical min-h-[100px]
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
