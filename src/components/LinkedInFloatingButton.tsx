import React from 'react';
import { Linkedin } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

export default function LinkedInFloatingButton() {
  const { profile } = useProfile();
  const linkedinUrl = profile?.linkedin || 'https://linkedin.com';

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full border shadow-xl transition-all duration-300 hover:scale-105"
        style={{
          background: 'var(--bg-elev)',
          borderColor: 'var(--border-strong)',
          color: 'var(--fg)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        }}
        aria-label="Connect on LinkedIn"
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-12"
          style={{ background: '#0a66c2' }} // Official LinkedIn Blue
        >
          <Linkedin className="w-4 h-4 fill-current text-white" />
        </div>
        <span className="font-mono text-xs font-bold uppercase tracking-wider hidden sm:inline-block">
          Connect
        </span>
      </a>
    </div>
  );
}
