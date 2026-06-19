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
            PROFILE
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
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                I am Paras Sharma, a Computer Science Engineering student graduating in 2026 with a strong interest in Artificial Intelligence, Machine Learning, Data Science, and Computer Vision. I have gained industry experience as a Data Analyst Intern at Maruti Suzuki India Limited, where I worked on data-driven solutions and business analytics.
              </p>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                My expertise includes Python, SQL, Machine Learning, Deep Learning, Data Analysis, Data Visualization, and Computer Vision. I enjoy building predictive models, analyzing complex datasets, developing intelligent systems, and creating scalable applications that transform data into actionable insights.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Through projects in recommendation systems, predictive analytics, and computer vision, I have developed a solid foundation in designing end-to-end data workflows, model development, and problem-solving. I am continuously exploring new technologies and best practices to build efficient, reliable, and impactful AI solutions.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-3">
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                #AI_ML_Enthusiast
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                #DataScience
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                #ComputerVision
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                #DataAnalytics
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                #SystemsLearner
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
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                <div className="border-l-2 border-cyber-cyan/30 pl-3 space-y-1">
                  <h4 className="text-sm font-bold text-white leading-tight">Guru Nanak Dev University</h4>
                  <p className="text-[11px] text-gray-300">B.Tech - Computer Science Engineering</p>
                  <p className="text-[10px] text-cyber-cyan font-mono">2022 - 2026</p>
                </div>
                <div className="border-l-2 border-cyber-cyan/30 pl-3 space-y-1">
                  <h4 className="text-sm font-bold text-white leading-tight">SCR Public School, CBSE</h4>
                  <p className="text-[11px] text-gray-300">Senior Secondary Education (PCM)</p>
                  <p className="text-[10px] text-cyber-cyan font-mono">2021 - 2022</p>
                </div>
                <div className="border-l-2 border-cyber-cyan/30 pl-3 space-y-1">
                  <h4 className="text-sm font-bold text-white leading-tight">SCR Public School, CBSE</h4>
                  <p className="text-[11px] text-gray-300">Secondary Education (Science)</p>
                  <p className="text-[10px] text-cyber-cyan font-mono">2019 - 2020</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/5 text-[10px] font-mono text-gray-500 flex items-center gap-1.5">
              <Calendar size={12} className="text-cyber-cyan" />
              <span>RECORD_VALIDATED</span>
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

          {/* Card 4: Data & AI Approach (Large) */}
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
                  Data & AI Approach
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider text-cyber-cyan">
                    Data-Driven Decisions
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Passionate about leveraging data, machine learning, and analytics to solve real-world problems. Experienced in transforming raw data into insights.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider text-cyber-purple">
                    ML & Computer Vision
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Interested in building intelligent systems using ML, Deep Learning, and Computer Vision to automate business logic and decision structures.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider text-cyber-pink">
                    Clean Development
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Committed to writing efficient, maintainable, and scalable code for data pipelines, machine learning models, or web architectures.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] font-mono text-gray-400 leading-tight">
              <div>
                <strong>LOCATION:</strong> Gurugram, Haryana, India | UTC +5:30
              </div>
              <div>
                <strong>OPEN TO:</strong> AI/ML Engineer • Data Scientist • Data Analyst • Computer Vision Engineer
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
