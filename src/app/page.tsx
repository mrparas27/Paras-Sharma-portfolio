"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatPanel from '@/components/ChatPanel';
import ParticlesBg from '@/ThreeJS/ParticlesBg';

export default function PortfolioPage() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-cyber-dark text-gray-100 overflow-x-hidden font-sans selection:bg-cyber-cyan/30 selection:text-white">
      
      {/* Unified 3D Background Particles Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
        {mounted && (
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
            <ambientLight intensity={1.2} />
            <pointLight position={[5, 5, 5]} intensity={1.0} />
            <ParticlesBg />
          </Canvas>
        )}
      </div>

      {/* Floating 3D AI Assistant Chat Panel */}
      <ChatPanel />

      {/* Main UI Layout Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Sticky Glassmorphic Navbar */}
        <Navbar />

        {/* Portfolio Sections */}
        <main className="flex-grow">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>

        {/* Sleek Copyright Footer */}
        <Footer />
        
      </div>
    </div>
  );
}
