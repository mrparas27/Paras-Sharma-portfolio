import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, ExternalLink, Sparkles, FolderCode } from 'lucide-react';
import ProjectsCarousel from '../ThreeJS/ProjectsCarousel';

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Candidate Screening System",
    description: "An automated candidate screening platform utilizing Natural Language Processing (NLP) to parse resumes/CVs, extract features (skills, experiences, education), and rank candidates against job descriptions.",
    tags: ["Python", "PyTorch", "Transformers", "NLP", "React"],
    github: "https://github.com/mrparas27/AI-powered-role-based-candidate-screening-system",
    demo: "https://github.com/mrparas27/AI-powered-role-based-candidate-screening-system",
    details: "Built using transformer embedding layers to semantically assess resume relevance beyond keyword matches. Includes an intuitive dashboard for HR managers."
  },
  {
    id: 2,
    title: "Medical AI Assistant",
    description: "A specialized clinical assistant designed to answer diagnostic queries, summarize patient notes, and provide symptom analysis references using fine-tuned transformer heuristics.",
    tags: ["Python", "PyTorch", "Transformers", "Bio-NLP", "APIs"],
    github: "https://github.com/mrparas27/Medical-AI-Professional-Assistant",
    demo: "https://github.com/mrparas27/Medical-AI-Professional-Assistant",
    details: "Incorporates query verification algorithms to ensure clinical summaries cite biomedical references. Trained on curated open diagnostic dialogue datasets."
  },
  {
    id: 3,
    title: "Recommendation System",
    description: "An AI-powered multi-domain engine recommending items (books, movies, retail products) by combining collaborative filtering, neural embeddings, and content filtering models.",
    tags: ["Python", "Scikit-Learn", "Pandas", "PyTorch", "Flask"],
    github: "https://github.com/mrparas27/AI-Powered-Multi-Domain-Recommendation-System",
    demo: "https://ai-powered-multi-domain-recommendation-wofc.onrender.com/music/",
    details: "Utilizes matrix factorization techniques combined with semantic sentence similarities of items to suggest highly accurate recommendations."
  },
  {
    id: 4,
    title: "Data Analyst Portfolio",
    description: "An operations analysis repository featuring vehicle manufacturing efficiency reviews, inventory audits, and sales forecasting dashboards built using Python, SQL, and Power BI.",
    tags: ["Python", "SQL", "Pandas", "Power BI", "Data Mining"],
    github: "https://github.com/mrparas27/Data-Analyst-Portfolio-Project",
    demo: "https://github.com/mrparas27/Data-Analyst-Portfolio-Project",
    details: "Translates industrial assembly logs into actionable capacity optimizations. Developed using the same principles applied during the Maruti Suzuki internship."
  },
  {
    id: 5,
    title: "AI FAQ Assistant",
    description: "An automated document retrieval bot capability. Parses document PDFs and answers customer inquiries with semantic correctness using sentence embeddings and database matches.",
    tags: ["Python", "ChromaDB", "FastAPI", "Embeddings", "SQL"],
    github: "https://github.com/mrparas27/AI-Powered-FAQ-Assistant-",
    demo: "https://github.com/mrparas27/AI-Powered-FAQ-Assistant-",
    details: "Uses vector databases (ChromaDB) to cache document segments, minimizing token processing costs while ensuring zero-latency response retrieval."
  }
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? PROJECTS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === PROJECTS_DATA.length - 1 ? 0 : prev + 1));
  };

  const currentProject = PROJECTS_DATA[activeIndex];

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-cyber-dark/30">
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-cyber-dots opacity-5 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-cyber-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-4">
            PROJECT_REGISTRY
          </h2>
          <div className="h-1 w-20 bg-cyber-cyan mx-auto rounded-full" />
          <p className="text-gray-400 font-mono text-xs tracking-widest uppercase mt-3">
            3D Immersive Showcase / Core Repositories
          </p>
        </motion.div>

        {/* 3D Showcase Panel */}
        <div className="relative rounded-3xl border border-white/5 bg-black/15 overflow-hidden p-6 mb-20 flex flex-col items-center">
          
          <div className="absolute top-6 left-6 font-mono text-[10px] text-gray-500 tracking-wider">
            MODULE: Immersive_3D_Carousel.exe
          </div>

          {/* R3F Canvas Container */}
          <div className="h-[360px] md:h-[420px] w-full flex items-center justify-center relative">
            <Canvas 
              camera={{ position: [0, 0, 7.5], fov: 48 }}
              className="canvas-interactive"
            >
              <ambientLight intensity={1.8} />
              <pointLight position={[5, 10, 5]} intensity={1.5} />
              <ProjectsCarousel 
                projects={PROJECTS_DATA} 
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex} 
              />
            </Canvas>

            {/* Left/Right Arrow Navigators */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-6 p-3 rounded-xl glassmorphism border border-white/10 text-cyber-cyan hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-6 p-3 rounded-xl glassmorphism border border-white/10 text-cyber-cyan hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Active Card Expanded Meta Card */}
          <div className="w-full max-w-2xl mt-4 p-6 rounded-2xl glassmorphism border border-cyber-cyan/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="text-left"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl text-white tracking-wide">
                      {currentProject.title}
                    </h3>
                    <p className="text-xs font-mono text-cyber-cyan mt-1">
                      {currentProject.tags.join(' // ')}
                    </p>
                  </div>
                  
                  {/* Repo Links */}
                  <div className="flex gap-2">
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-cyber-purple/50 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={currentProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-cyber-cyan/50 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-4 leading-relaxed font-mono">
                  {currentProject.details}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Static Bento Grid Layout */}
        <h3 className="font-heading text-xl font-bold text-white text-left mb-8 flex items-center gap-2">
          <FolderCode size={20} className="text-cyber-purple" />
          <span>ALL_REPOSITORIES ({PROJECTS_DATA.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl glassmorphism-card p-6 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-cyber-purple tracking-widest uppercase">
                  REPO_0{project.id}
                </span>
                <h4 className="font-heading font-black text-lg text-white mt-1 group-hover:text-cyber-cyan transition-colors">
                  {project.title}
                </h4>
                <p className="text-xs text-gray-400 mt-3.5 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
                  >
                    <Github size={14} />
                    <span className="font-mono text-[11px]">Repository</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-cyber-cyan hover:underline transition-colors"
                  >
                    <span className="font-mono text-[11px]">Live Demo</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
