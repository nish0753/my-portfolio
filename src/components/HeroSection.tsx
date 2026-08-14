import React, { useEffect, useState, useRef } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useResume } from '@/hooks/useResume';
import { ArrowRight, Paperclip, FileText, Briefcase } from 'lucide-react';

const HeroSection = () => {
  const { profile } = useProfile();
  const { resume } = useResume();
  const [typedText, setTypedText] = useState('');
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Typewriter logic
  useEffect(() => {
    const greetings = [
      `hello, I'm ${profile.name || 'Your Name'}.`,
      `${(profile.title || 'frontend developer').toLowerCase()}.`,
      "creative coder & engineer.",
      "building calm, dependable software.",
      "console.log('let\\'s build');",
    ];

    let gIdx = 0;
    let cIdx = 0;
    let deleting = false;
    let timer: NodeJS.Timeout;

    const tick = () => {
      const current = greetings[gIdx];
      if (deleting) {
        cIdx--;
        setTypedText(current.slice(0, cIdx));
        if (cIdx === 0) {
          deleting = false;
          gIdx = (gIdx + 1) % greetings.length;
          timer = setTimeout(tick, 400);
          return;
        }
        timer = setTimeout(tick, 35);
      } else {
        cIdx++;
        setTypedText(current.slice(0, cIdx));
        if (cIdx === current.length) {
          deleting = true;
          timer = setTimeout(tick, 2200);
          return;
        }
        timer = setTimeout(tick, 75 + Math.random() * 50);
      }
    };

    tick();
    return () => clearTimeout(timer);
  }, [profile.name, profile.title]);

  // Mouse glow tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (heroRef.current && mouseGlowRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      mouseGlowRef.current.style.left = `${e.clientX - rect.left}px`;
      mouseGlowRef.current.style.top = `${e.clientY - rect.top}px`;
      mouseGlowRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (mouseGlowRef.current) {
      mouseGlowRef.current.style.opacity = '0';
    }
  };

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center overflow-hidden bg-grid pt-24 pb-20"
      id="hero"
    >
      <div className="float-dot" style={{ width: '500px', height: '500px', top: '5%', left: '-150px', background: 'var(--accent)' }}></div>
      <div className="float-dot" style={{ width: '600px', height: '600px', bottom: '-200px', right: '-200px', background: 'var(--accent-2)', animationDelay: '-5s' }}></div>
      <div ref={mouseGlowRef} className="mouse-glow" id="mouseGlow"></div>

      <div className="relative max-w-7xl mx-auto px-6 w-full z-10">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-8 font-mono text-xs flex-wrap" style={{ color: 'var(--muted)' }}>
            <span className="tag">Portfolio</span>
            <span>·</span>
            <span>v2.0.0</span>
            <span>·</span>
            <span className="flex items-center gap-2">
              <span className="stat-dot"></span> available for new projects
            </span>
          </div>

          <h1 className="font-mono font-bold mb-8" style={{ fontSize: 'clamp(2.5rem, 7.5vw, 6.5rem)', lineHeight: 1.02, letterSpacing: '-0.045em' }}>
            <span style={{ color: 'var(--muted)' }}>$</span>{' '}
            <span id="typewriter" className="cursor">{typedText}</span>
          </h1>

          <p className="font-display text-2xl md:text-3xl mb-5" style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg)', lineHeight: 1.3 }}>
            {profile.heroHeadline || 'Crafting clean, performant, and memorable web experiences — one line of code at a time.'}
          </p>

          <p className="text-base md:text-lg mb-12 max-w-2xl" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
            I'm <span style={{ color: 'var(--fg)', fontWeight: 500 }}>{profile.name || 'Nishant Kumar'}</span> — a {profile.title || 'Data Scientist & ML Engineer'}. I specialize in turning complex problems into elegant, interactive interfaces. Always learning, always building.
          </p>

          <div className="flex flex-wrap gap-4 mb-20">
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn-primary flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>hire me</span>
            </a>

            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="btn-secondary flex items-center gap-2">
              <span>view my work</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {resume?.url ? (
              <a href={resume.url} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                <span>view resume</span>
              </a>
            ) : null}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl">
            {(profile.stats && profile.stats.length > 0 ? profile.stats : [
              { value: "6+", label: "years experience" },
              { value: "40+", label: "projects shipped" },
              { value: "15+", label: "happy clients" },
              { value: "∞", label: "cups of coffee" },
            ]).map((stat, idx) => (
              <div key={idx}>
                <div className="font-mono font-bold text-3xl md:text-4xl" style={{ color: 'var(--accent)' }}>
                  {stat.value}
                </div>
                <div className="font-mono text-xs uppercase tracking-widest mt-2" style={{ color: 'var(--muted)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs flex flex-col items-center gap-3" style={{ color: 'var(--muted)' }}>
        <span className="tracking-widest uppercase">scroll</span>
        <div style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }}></div>
      </div>
    </section>
  );
};

export default HeroSection;
