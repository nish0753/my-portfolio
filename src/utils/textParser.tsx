import React from 'react';

/**
 * Parses markdown-like **bold** markers inside a string and returns React nodes
 * with the bolded text wrapped in a styled <strong> tag.
 */
export function parseBoldText(text: string): React.ReactNode {
  if (!text) return '';
  const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          return (
            <strong key={i} className="font-semibold text-[hsl(var(--primary))]" style={{ fontWeight: 600 }}>
              {part}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
}
