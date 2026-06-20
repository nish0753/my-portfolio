import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { MailIcon, Github, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/useProfile';

export default function CallToAction() {
  const { profile } = useProfile();

  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors]   = useState<{ name?: string; email?: string; message?: string }>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [sendError, setSendError] = useState('');

  const validate = () => {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = 'Please enter your name.';
    const e = email.trim();
    if (!e) errs.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) errs.email = "That email doesn't look right.";
    if (!message.trim()) errs.message = 'Please enter a message.';
    return errs;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSendError('');
    setSending(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: name, from_email: email, message, to_name: 'Nishant' },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setSent(true);
    } catch {
      setSendError('Something went wrong — please email me directly.');
    } finally {
      setSending(false);
    }
  };

  const onReset = () => {
    setSent(false); setSendError('');
    setName(''); setEmail(''); setMessage(''); setErrors({});
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[hsl(var(--primary)/0.04)] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.25)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_8px_hsl(var(--primary))]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[hsl(var(--primary))]">05 · Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight">
            <span className="text-slate-50">Let's </span>
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-emerald-300 bg-clip-text text-transparent">Talk</span>
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent" />
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl">
            I'm open to full-stack and data science roles, as well as selective freelance work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="professional-card p-8 sm:p-10"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(var(--primary)/0.12)] border border-[hsl(var(--primary)/0.25)] mb-6">
              <MailIcon className="h-7 w-7 text-[hsl(var(--primary))]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-50 mb-4">
              Let's Build Something Great
            </h3>
            <p className="text-slate-400 leading-relaxed mb-8">
              Tell me about your project and I'll reply within two days.
            </p>

            <div className="space-y-4 mb-8">
              {profile.email && (
                <a href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-slate-300 hover:text-[hsl(var(--primary))] transition-colors text-sm">
                  <MailIcon className="h-4 w-4 shrink-0 text-[hsl(var(--primary)/0.7)]" />
                  {profile.email}
                </a>
              )}
            </div>

            <div className="flex gap-4 pt-6 border-t border-slate-800">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer"
                  className="text-slate-500 hover:text-[hsl(var(--primary))] transition-colors" aria-label="GitHub">
                  <Github className="h-6 w-6" />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-slate-500 hover:text-[hsl(var(--primary))] transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {sent ? (
              <div className="professional-card p-10 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(var(--primary)/0.12)] border border-[hsl(var(--primary)/0.25)] mb-5">
                  <Send className="h-6 w-6 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-50 mb-3">Message Sent!</h3>
                <p className="text-slate-400 mb-6">I'll get back to you within two days.</p>
                <button
                  onClick={onReset}
                  className="px-6 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all text-sm font-medium cursor-pointer bg-transparent"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="professional-card p-8 sm:p-10 flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-name" className="text-xs font-semibold tracking-widest uppercase text-slate-500">
                    Name
                  </label>
                  <input
                    id="cf-name"
                    type="text"
                    placeholder="Ada Lovelace"
                    value={name}
                    onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-800/60 border text-slate-200 text-sm placeholder:text-slate-600 outline-none transition-all focus:border-[hsl(var(--primary)/0.5)] ${errors.name ? 'border-red-500/60' : 'border-slate-700/60'}`}
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-email" className="text-xs font-semibold tracking-widest uppercase text-slate-500">
                    Email
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    placeholder="ada@example.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-800/60 border text-slate-200 text-sm placeholder:text-slate-600 outline-none transition-all focus:border-[hsl(var(--primary)/0.5)] ${errors.email ? 'border-red-500/60' : 'border-slate-700/60'}`}
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-message" className="text-xs font-semibold tracking-widest uppercase text-slate-500">
                    Message
                  </label>
                  <textarea
                    id="cf-message"
                    rows={5}
                    placeholder="Tell me about your project…"
                    value={message}
                    onChange={e => { setMessage(e.target.value); setErrors(p => ({ ...p, message: undefined })); }}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-800/60 border text-slate-200 text-sm placeholder:text-slate-600 outline-none resize-vertical transition-all focus:border-[hsl(var(--primary)/0.5)] ${errors.message ? 'border-red-500/60' : 'border-slate-700/60'}`}
                  />
                  {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
                </div>

                {sendError && <p className="text-sm text-red-400">{sendError}</p>}

                <Button
                  type="submit"
                  disabled={sending}
                  className="bg-primary text-primary-foreground h-12 text-sm font-semibold hover:bg-[hsl(var(--primary)/0.9)] disabled:opacity-60"
                >
                  {sending ? 'Sending…' : 'Send Message'}
                  {!sending && <Send className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
