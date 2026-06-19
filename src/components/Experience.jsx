import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap, Award, Compass } from 'lucide-react';

const TIMELINE_DATA = [
  {
    date: "June 2024 - August 2024",
    title: "Data Analyst Intern",
    company: "Maruti Suzuki India Limited",
    type: "internship",
    icon: <Briefcase size={18} />,
    color: "cyber-cyan",
    bullets: [
      "Extracted and normalized automotive assembly logs, scrubbing datasets and resolving discrepancies using Python.",
      "Designed and deployed interactive Power BI dashboards with custom SQL adapters, providing plant managers with real-time operational diagnostics.",
      "Trained statistical anomaly detection algorithms and regression models to predict vehicle component failures and streamline supply logistics."
    ]
  },
  {
    date: "January 2025 - Present",
    title: "Advanced AI Project Development",
    company: "Academic & Open-Source Research",
    type: "research",
    icon: <Compass size={18} />,
    color: "cyber-pink",
    bullets: [
      "Engineered an automated role-based candidate screening system using NLP and custom LLM heuristics to parse and grade CVs.",
      "Fine-tuned a transformer model for clinical diagnostics assistance ('Medical AI Professional Assistant') to classify pathology symptoms.",
      "Optimized real-time computer vision models utilizing YOLO and OpenCV for spatial object tracking."
    ]
  },
  {
    date: "August 2023 - May 2024",
    title: "AI/ML Specialization Deep Dive",
    company: "B.Tech CSE Core Labs",
    type: "academic",
    icon: <GraduationCap size={18} />,
    color: "cyber-purple",
    bullets: [
      "Mastered deep learning frameworks: PyTorch and TensorFlow, conducting convolutional neural network (CNN) image classification labs.",
      "Conducted extensive regression, clustering, and decision tree modeling experiments using Scikit-Learn.",
      "Authored custom data pipeline scripts in Pandas/NumPy to optimize statistical ingestion times."
    ]
  },
  {
    date: "August 2022 - June 2023",
    title: "B.Tech Foundation & Database Systems",
    company: "Computer Science Engineering",
    type: "academic",
    icon: <Award size={18} />,
    color: "cyber-emerald",
    bullets: [
      "Learned fundamental Object-Oriented programming architectures and Data Structures using Python.",
      "Built relational schemas using SQL, optimizing queries, indexing, and normal forms (1NF-3NF).",
      "Participated in algorithmic puzzle contests, building speed in computational heuristics."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-cyber-dark/40">
      
      {/* Background neon strip */}
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] rounded-full bg-cyber-purple/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] rounded-full bg-cyber-cyan/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-4">
            HISTORY_LOG
          </h2>
          <div className="h-1 w-20 bg-cyber-pink mx-auto rounded-full" />
          <p className="text-gray-400 font-mono text-xs tracking-widest uppercase mt-3">
            Academic milestones, internships, and research vectors
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical central bar (visible on desktop) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-emerald hidden md:block opacity-30" />

          <div className="space-y-12 md:space-y-16">
            {TIMELINE_DATA.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={idx}
                  className={`flex flex-col md:flex-row items-center w-full relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Circle Indicator (desktop central pin) */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-4 h-10 w-10 rounded-full border-2 bg-cyber-dark z-20 hidden md:flex items-center justify-center border-cyber-purple shadow-lg shadow-cyber-purple/20">
                    <span className="text-white scale-90">
                      {item.icon}
                    </span>
                  </div>

                  {/* Left Space / Right Card Layout */}
                  <div className="w-full md:w-1/2 md:px-8">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="rounded-2xl glassmorphism p-6 border border-white/5 hover:border-cyber-cyan/30 transition-all duration-300 relative group"
                      style={{ borderWidth: '1px' }}
                    >
                      {/* Date Badge */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-gray-400 tracking-wider mb-4">
                        <Calendar size={12} className="text-cyber-cyan" />
                        {item.date}
                      </span>

                      {/* Header */}
                      <h3 className="font-heading font-extrabold text-white text-lg tracking-wide group-hover:text-cyber-cyan transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-cyber-cyan mt-1 mb-4">
                        {item.company}
                      </p>

                      {/* Description Bullet Lists */}
                      <ul className="space-y-2.5 text-xs text-gray-300">
                        {item.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex gap-2.5 leading-relaxed text-left">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shrink-0 mt-1.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Blank space counterpart placeholder */}
                  <div className="w-1/2 hidden md:block" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
