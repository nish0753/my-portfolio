import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

export default function WhatsAppFloatingButton() {
  const { profile } = useProfile();
  
  // Format phone number (remove non-digit characters for wa.me URL)
  const rawPhone = profile?.whatsappPhone || '+918709808019';
  const cleanPhone = rawPhone.replace(/\D/g, '');
  
  const firstName = profile.name ? profile.name.split(' ')[0] : 'Nishant';
  const defaultMsg = `Hi ${firstName}! I visited your portfolio and would like to connect.`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <div className="fixed bottom-6 left-[150px] z-40 hidden sm:block">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full border shadow-xl transition-all duration-300 hover:scale-105"
        style={{
          background: 'var(--bg-elev)',
          borderColor: 'var(--border-strong)',
          color: 'var(--fg)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        }}
        aria-label="Chat on WhatsApp"
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-12"
          style={{ background: '#25d366' }} // Official WhatsApp Green
        >
          <MessageCircle className="w-4 h-4 fill-current text-white" />
        </div>
        <span className="font-mono text-xs font-bold uppercase tracking-wider">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
