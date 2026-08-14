import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowRight, Check } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

export default function CallToAction() {
  const { profile } = useProfile();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSending(true);
    setErrorMsg('');

    try {
      if (import.meta.env.VITE_EMAILJS_TEMPLATE_ID && import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service',
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          { from_email: email, message: `New contact request from portfolio from ${email}`, to_name: 'Nishant' },
          { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
        );
      }
      setSent(true);
      setEmail('');
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setSent(true);
      setEmail('');
      setTimeout(() => setSent(false), 5000);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-24 md:py-32 px-6" id="contact" style={{ background: 'var(--bg-elev)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
            // let's connect
          </div>
          <h2 className="font-display font-black text-5xl md:text-6xl mb-6" style={{ letterSpacing: '-0.035em', lineHeight: 1 }}>
            Let's build something <span style={{ fontStyle: 'italic', fontWeight: 400 }}>great.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
            I'm currently available for freelance work and full-time opportunities. If you have a project in mind or just want to say hi, drop me a line.
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" id="subForm">
          <input
            type="email"
            placeholder={sent ? 'talk soon!' : 'your@email.com'}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={sending}
            className="input-field flex-1"
            id="emailInput"
          />
          <button type="submit" disabled={sending} className="btn-primary justify-center">
            {sending ? 'sending...' : 'send message'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {sent && (
          <div className="font-mono text-sm mt-6 text-center transition-opacity duration-500 flex items-center justify-center gap-2" style={{ color: 'var(--accent)' }}>
            <Check className="w-4 h-4" />
            <span>thanks! I'll get back to you shortly.</span>
          </div>
        )}

        <div className="mt-16 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="font-mono font-bold text-2xl mb-2" style={{ color: 'var(--accent)' }}>Email</div>
            <div className="text-sm" style={{ color: 'var(--muted)' }}>
              {profile?.email || 'hello@yourname.dev'}
            </div>
          </div>
          <div className="text-center">
            <div className="font-mono font-bold text-2xl mb-2" style={{ color: 'var(--accent)' }}>Location</div>
            <div className="text-sm" style={{ color: 'var(--muted)' }}>Remote / India</div>
          </div>
          <div className="text-center">
            <div className="font-mono font-bold text-2xl mb-2" style={{ color: 'var(--accent)' }}>Availability</div>
            <div className="text-sm" style={{ color: 'var(--muted)' }}>
              {profile?.availableForWork ? 'Open to new projects' : 'Currently busy'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
