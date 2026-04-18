
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import TopSkills from '@/components/TopSkills';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen relative bg-slate-950">
      <Navbar />
      <HeroSection />
      <Education />
      <Projects />
      <TopSkills />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
