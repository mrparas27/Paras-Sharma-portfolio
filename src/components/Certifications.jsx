import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const CERT_DATA = [
  {
    title: "Decode DSA with Python",
    provider: "Physicswallah (PW Skills)",
    description: "Deep training on algorithmic design, advanced data structures (Trees, Graphs, HashMaps), recursion models, dynamic programming, and computational complexity analysis.",
    badgeColor: "cyber-cyan",
    borderGlow: "rgba(6, 182, 212, 0.3)"
  },
  {
    title: "Data Science Certification",
    provider: "Qspiders Training Institute",
    description: "Industrial training covering statistics, exploratory data analysis (EDA), predictive machine learning modeling, relational database design with SQL, and python automation scripting.",
    badgeColor: "cyber-purple",
    borderGlow: "rgba(139, 92, 246, 0.3)"
  }
];

export default function Certifications() {
  const triggerCelebration = (e, provider) => {
    // Generate a celebratory confetti burst at the click location
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x, y },
      colors: ['#06b6d4', '#8b5cf6', '#d946ef'],
      ticks: 200
    });
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-cyber-dark/40">
      
      {/* Glow rings */}
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-cyber-pink/5 blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-4">
            CERTIFICATIONS
          </h2>
          <div className="h-1 w-20 bg-cyber-cyan mx-auto rounded-full" />
          <p className="text-gray-400 font-mono text-xs tracking-widest uppercase mt-3">
            Click certificates to verify credential signatures
          </p>
        </motion.div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {CERT_DATA.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={(e) => triggerCelebration(e, cert.provider)}
              className={`cursor-pointer rounded-2xl p-8 bg-cyber-card border border-white/5 hover:border-${cert.badgeColor} transition-all duration-500 hover:-translate-y-2 select-none relative group overflow-hidden`}
              style={{
                boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.4)`
              }}
            >
              {/* Background badge pattern */}
              <div className="absolute right-4 bottom-4 opacity-5 text-white scale-[2.5] pointer-events-none">
                <Award size={64} />
              </div>

              {/* Glowing hover light */}
              <div 
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                style={{
                  background: `radial-gradient(400px circle at 50% 50%, ${cert.borderGlow}, transparent 45%)`
                }}
              />

              <div className="relative z-10 flex flex-col justify-between h-full">
                
                <div>
                  {/* Header Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl bg-${cert.badgeColor}/10 border border-${cert.badgeColor}/30 text-${cert.badgeColor}`}>
                      <ShieldCheck size={24} className="animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-gray-500 tracking-wider">
                      <Sparkles size={10} className={`text-${cert.badgeColor}`} />
                      <span>SECURE_DIGITAL_RECORD</span>
                    </div>
                  </div>

                  {/* Title & Provider */}
                  <h3 className="font-heading font-black text-xl text-white tracking-wide group-hover:text-cyber-cyan transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-400 mt-1 mb-4">
                    Issued by: <span className={`text-${cert.badgeColor} font-semibold`}>{cert.provider}</span>
                  </p>

                  {/* Details description */}
                  <p className="text-xs text-gray-300 leading-relaxed text-left">
                    {cert.description}
                  </p>
                </div>

                {/* Footer validation check */}
                <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-gray-500">
                  <span>VALID_LICENSE: TRUE</span>
                  <span className="text-cyber-emerald">● ACTIVE_SIGNATURE</span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
