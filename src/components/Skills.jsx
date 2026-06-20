import React from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Code2, Database, BarChart3, Binary, Settings } from 'lucide-react';
import SkillsGlobe from '../ThreeJS/SkillsGlobe';

const SKILLS_CATEGORIES = [
  {
    title: "Programming Languages",
    icon: <Code2 size={18} className="text-cyber-cyan" />,
    items: [
      { name: "Python", level: 95 },
      { name: "SQL", level: 85 }
    ]
  },
  {
    title: "AI & Machine Learning",
    icon: <Binary size={18} className="text-cyber-purple" />,
    items: [
      { name: "PyTorch & Deep Learning", level: 88 },
      { name: "TensorFlow & Keras", level: 75 },
      { name: "Computer Vision & OpenCV / YOLO", level: 85 },
      { name: "Classical ML (Scikit-Learn)", level: 90 }
    ]
  },
  {
    title: "Data Operations Stack",
    icon: <BarChart3 size={18} className="text-cyber-pink" />,
    items: [
      { name: "Pandas & NumPy", level: 92 },
      { name: "Exploratory Data Analysis", level: 90 }
    ]
  },
  {
    title: "Databases & Infrastructure",
    icon: <Database size={18} className="text-cyber-emerald" />,
    items: [
      { name: "MySQL & Relational Databases", level: 85 },
      { name: "MongoDB & NoSQL", level: 75 },
      { name: "Git & Version Control", level: 88 }
    ]
  }
];

const CARD_VARIANTS = {
  hidden: { opacity: 0, x: 30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  })
};

export default function Skills() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-cyber-dark/30">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-cyber-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-4">
            SKILLS_INVENTORY
          </h2>
          <div className="h-1 w-20 bg-cyber-purple mx-auto rounded-full" />
          <p className="text-gray-400 font-mono text-xs tracking-widest uppercase mt-3">
            Interact with the 3D cloud sphere / Core Competencies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: 3D Globe Canvas */}
          <div className="h-[450px] md:h-[500px] w-full rounded-2xl border border-white/5 bg-black/10 flex items-center justify-center relative group overflow-hidden">
            
            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-cyber-dots opacity-15 pointer-events-none" />
            <div className="absolute top-4 left-4 font-mono text-[10px] text-gray-500 tracking-wider">
              ROTATING_VECTOR_SPHERE.bin
            </div>
            
            {mounted && (
              <Canvas 
                camera={{ position: [0, 0, 7.5], fov: 60 }} 
                className="canvas-interactive"
              >
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <SkillsGlobe />
              </Canvas>
            )}

            {/* Instruction badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[10px] font-mono text-gray-400 tracking-wider">
              MOVE CURSOR TO ADJUST VECTOR ACCELERATION
            </div>
          </div>

          {/* Right Column: Skills Progress Bars */}
          <div className="space-y-6">
            {SKILLS_CATEGORIES.map((category, idx) => (
              <motion.div
                key={category.title}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={CARD_VARIANTS}
                className="rounded-xl glassmorphism p-6 border border-white/5 hover:border-cyber-purple/20 transition-all duration-300"
                style={{ borderWidth: '1px' }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {category.icon}
                  </div>
                  <h3 className="font-heading font-bold text-white text-base tracking-wide">
                    {category.title}
                  </h3>
                </div>

                {/* Progress bars list */}
                <div className="space-y-4">
                  {category.items.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-cyber-cyan">{skill.level}%</span>
                      </div>
                      
                      {/* Bar Container */}
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
