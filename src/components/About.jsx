import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Heart, Brain, Award, Calendar } from 'lucide-react';

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const BENTO_CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-cyber-dark/40">
      
      {/* Background Neon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyber-purple/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={FADE_IN_VARIANTS}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-4">
            SYSTEM_PROFILE
          </h2>
          <div className="h-1 w-20 bg-cyber-cyan mx-auto rounded-full" />
          <p className="text-gray-400 font-mono text-xs tracking-widest uppercase mt-3">
            Exploration / Experience / Academic Path
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={BENTO_CONTAINER_VARIANTS}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {/* Card 1: Main Introduction (Large) */}
          <motion.div 
            variants={FADE_IN_VARIANTS}
            className="md:col-span-2 rounded-2xl glassmorphism p-8 flex flex-col justify-between group"
            style={{ borderWidth: '1px' }}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-cyber-purple/15 text-cyber-purple flex items-center justify-center border border-cyber-purple/30">
                  <Brain size={20} />
                </div>
                <h3 className="font-heading text-xl font-bold text-white tracking-wide">
                  The Core Vector
                </h3>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                I am Paras Sharma, a computer science graduate student specializing in Artificial Intelligence and Machine Learning. 
                My focus lies in building architectures that make sense of structured and unstructured vectors. I specialize in 
                training deep convolutional neural networks for computer vision, programming neural sequence models, and building scalable data pipelines.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Whether it is conducting data normalization, developing predictive regression algorithms, or creating interactive frontend shells 
                like this portfolio, I strive to write optimized, high-performance clean code.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-3">
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                #AI_ML_Enthusiast
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                #Data_Architect
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                #Systems_Learner
              </span>
            </div>
          </motion.div>

          {/* Card 2: Academic Capsule */}
          <motion.div 
            variants={FADE_IN_VARIANTS}
            className="rounded-2xl glassmorphism p-8 flex flex-col justify-between group"
            style={{ borderWidth: '1px' }}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-cyber-cyan/15 text-cyber-cyan flex items-center justify-center border border-cyber-cyan/30">
                  <GraduationCap size={20} />
                </div>
                <h3 className="font-heading text-xl font-bold text-white tracking-wide">
                  Academic Path
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-white">B.Tech - Computer Science Engineering</h4>
                  <p className="text-xs text-cyber-cyan font-mono mt-0.5">2022 - 2026 (Graduate)</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Focusing on Advanced Algorithms, Machine Learning Theory, Deep Learning, Database Management Systems (DBMS), and Computer Vision.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-xs text-gray-400 font-mono flex items-center gap-2">
              <Calendar size={14} className="text-cyber-cyan" />
              <span>Graduation Target: 2026</span>
            </div>
          </motion.div>

          {/* Card 3: Experience Snapshot */}
          <motion.div 
            variants={FADE_IN_VARIANTS}
            className="rounded-2xl glassmorphism p-8 flex flex-col justify-between group"
            style={{ borderWidth: '1px' }}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-cyber-emerald/15 text-cyber-emerald flex items-center justify-center border border-cyber-emerald/30">
                  <Briefcase size={20} />
                </div>
                <h3 className="font-heading text-xl font-bold text-white tracking-wide">
                  Internship
                </h3>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white">Maruti Suzuki India Limited</h4>
                <p className="text-xs text-cyber-emerald font-mono">Data Analyst Intern</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Developed dashboards tracking factory line output, optimized data ingestion pipelines using Python/SQL, and trained forecasting models for predictive maintenance logs.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-xs text-cyber-emerald font-mono flex items-center gap-1.5">
              <Award size={14} />
              <span>Industrial Impact</span>
            </div>
          </motion.div>

          {/* Card 4: Interests & Ideology (Large) */}
          <motion.div 
            variants={FADE_IN_VARIANTS}
            className="md:col-span-2 rounded-2xl glassmorphism p-8 flex flex-col justify-between group"
            style={{ borderWidth: '1px' }}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-cyber-pink/15 text-cyber-pink flex items-center justify-center border border-cyber-pink/30">
                  <Heart size={20} />
                </div>
                <h3 className="font-heading text-xl font-bold text-white tracking-wide">
                  Design & Data Ideology
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan" />
                    Cognitive Automation
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Believer in automating heavy workflows. Building candidate screening tools or medical helpers that act as reasoning structures to assist humans.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyber-pink" />
                    Visual Precision
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Even as a data specialist, I appreciate sleek aesthetics. A premium glassmorphic UI elevates data clarity, presenting indicators elegantly.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 text-[11px] font-mono text-gray-400 leading-none">
              LOC: Delhi / Gurugram, India // Timezone: UTC+5.30
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
