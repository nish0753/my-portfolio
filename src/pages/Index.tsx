import React, { useEffect, useState } from 'react';
import ConstellationBackground from '@/components/ConstellationBackground';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import SkillsRadar from '@/components/SkillsRadar';
import CodeSnippetShowcase from '@/components/CodeSnippetShowcase';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import LinkedInFloatingButton from '@/components/LinkedInFloatingButton';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import { useProfile } from '@/hooks/useProfile';

const Index = () => {
  const { loading } = useProfile();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!loading) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
  }, [loading]);

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <ConstellationBackground />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <TechStack />
      <Projects />
      <SkillsRadar />
      <CodeSnippetShowcase />
      <Experience />
      <Education />
      <CallToAction />
      <Footer />
      <Chatbot />
      <LinkedInFloatingButton />
      <WhatsAppFloatingButton />

      {/* Loading overlay — fades out once Firebase profile data arrives */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'var(--bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: visible ? 0 : 1,
          pointerEvents: visible ? 'none' : 'all',
          transition: visible ? 'opacity 0.4s ease' : 'none',
        }}
      >
        <div
          className="animate-spin"
          style={{
            width: 40,
            height: 40,
            borderRadius: '9999px',
            border: '3px solid rgba(var(--accent-rgb), 0.25)',
            borderTopColor: 'var(--accent)',
          }}
        />
      </div>
    </div>
  );
};

export default Index;
