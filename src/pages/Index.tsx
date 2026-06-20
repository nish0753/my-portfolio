import React, { useEffect, useState } from 'react';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import TopSkills from '@/components/TopSkills';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { useProfile } from '@/hooks/useProfile';

const Index = () => {
  const { loading } = useProfile();
  const [visible, setVisible] = useState(false);

  // Reveal the page only after the profile data has arrived, so the
  // built-in placeholder content never flashes before the real data.
  useEffect(() => {
    if (!loading) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
  }, [loading]);

  return (
    <div className="min-h-screen relative bg-slate-950">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <Experience />
      <Education />
      <Projects />
      <TopSkills />
      <CallToAction />
      <Footer />

      {/* Loading overlay — fades out once Firebase profile data arrives */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: '#020617',
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
            border: '3px solid hsl(160 84% 39% / 0.25)',
            borderTopColor: 'hsl(160 84% 39%)',
          }}
        />
      </div>
    </div>
  );
};

export default Index;
