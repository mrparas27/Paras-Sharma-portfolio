import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Download, Mail } from 'lucide-react';

const TYPING_TITLES = [
  "AI/ML Engineer",
  "Data Scientist",
  "Data Analyst",
  "Computer Vision Specialist",
  "Deep Learning Enthusiast"
];

export default function Hero() {
  const [text, setText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(120);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, isDeleting]);

  const tick = () => {
    let i = loopNum % TYPING_TITLES.length;
    let fullText = TYPING_TITLES[i];
    let updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1) 
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(50);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(1500); // Wait at complete word
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(120); // Typing speed
    }
  };

  const handleDownloadResume = () => {
    // Generate a sleek printable window for resume
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Paras Sharma Resume</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; line-height: 1.6; padding: 40px; }
            h1 { font-size: 32px; margin-bottom: 5px; color: #111; }
            .subtitle { font-size: 16px; color: #666; font-style: italic; margin-bottom: 25px; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 20px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 15px; }
            .job { margin-bottom: 15px; }
            .job-title { font-weight: bold; }
            .job-date { float: right; color: #666; }
            ul { margin-top: 5px; padding-left: 20px; }
            .contact-info { margin-bottom: 20px; font-size: 14px; }
          </style>
        </head>
        <body>
          <h1>Paras Sharma</h1>
          <div class="contact-info">
            Phone: 9899946943 | Email: mr.paras.gautam@gmail.com<br>
            GitHub: github.com/mrparas27 | LinkedIn: linkedin.com/in/parassharma27/
          </div>
          <div class="subtitle">AI/ML Engineer | Data Analyst | Data Scientist</div>
          
          <div class="section">
            <div class="section-title">Education</div>
            <div class="job-title">B.Tech in Computer Science Engineering (Graduating 2026)</div>
            <div>AI/ML & Data Science Specialist</div>
          </div>
          
          <div class="section">
            <div class="section-title">Experience</div>
            <div class="job">
              <span class="job-date">June 2024 - August 2024 (Internship)</span>
              <div class="job-title">Data Analyst Intern - Maruti Suzuki India Limited</div>
              <ul>
                <li>Analyzed manufacturing and vehicular sales logs, scrubbing datasets and resolving discrepancies using Python.</li>
                <li>Created interactive Power BI dashboards, decreasing diagnostic pipeline duration.</li>
                <li>Trained machine learning models to detect anomalies and forecast parts failure.</li>
              </ul>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Skills</div>
            <div><strong>Languages:</strong> Python, SQL</div>
            <div><strong>Libraries & Frameworks:</strong> Pandas, NumPy, PyTorch, TensorFlow, OpenCV, YOLO, Scikit-Learn, React</div>
            <div><strong>Databases:</strong> MySQL, MongoDB, PostgreSQL</div>
            <div><strong>Tools:</strong> Git, Power BI, VS Code, Colab</div>
          </div>

          <div class="section">
            <div class="section-title">Key Projects</div>
            <ul>
              <li><strong>AI-Powered Role-Based Candidate Screening System:</strong> Automatically parses CVs/Resumes and scores candidates against role requirements using custom LLM and NLP logic.</li>
              <li><strong>Medical AI Professional Assistant:</strong> Fine-tuned model answering clinical diagnostics, patient inquiries, and providing reference notes.</li>
              <li><strong>AI-Powered Multi-Domain Recommendation System:</strong> Dynamic content recommender utilizing collaborative filtering and semantic analysis.</li>
            </ul>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Cyber Grid Overlays */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-cyber-dark pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-dark via-transparent to-cyber-dark pointer-events-none" />
      
      {/* Glowing Neon Lights */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyber-purple/10 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-cyber-cyan/10 blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

      <div className="max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center">
        
        {/* Futuristic Terminal Chip */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyber-purple/20 bg-cyber-purple/5 backdrop-blur-md text-xs font-mono text-cyber-purple tracking-widest uppercase mb-8 shadow-lg shadow-cyber-purple/5"
        >
          <Terminal size={14} className="text-cyber-cyan animate-pulse" />
          <span>AETHER SYSTEM ACTIVE</span>
        </motion.div>

        {/* Glitchy Main Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading text-5xl md:text-8xl font-black tracking-tight text-white mb-4 leading-none"
        >
          Paras Sharma
        </motion.h1>

        {/* Dynamic Typed Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-12 flex items-center justify-center mb-6"
        >
          <h2 className="font-heading text-xl md:text-3xl font-semibold bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink bg-clip-text text-transparent tracking-wide">
            {text}
            <span className="inline-block w-[3px] h-6 md:h-8 ml-1 bg-cyber-pink animate-pulse" />
          </h2>
        </motion.div>

        {/* Professional summary description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-gray-400 text-sm md:text-lg leading-relaxed mb-10 text-center"
        >
          AI/ML Engineer, Data Scientist, and Data Analyst Intern from Maruti Suzuki. 
          Architecting robust machine learning pipelines, deep computer vision systems, and automated data engines to translate complex vectors into intelligent decisions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white text-sm font-semibold shadow-lg hover:shadow-cyan-500/20 hover:scale-102 transition-all cursor-pointer border border-white/10 group"
          >
            <span>View Projects</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            onClick={handleDownloadResume}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glassmorphism text-white text-sm font-semibold hover:bg-white/10 hover:border-cyber-purple/40 hover:scale-102 transition-all"
          >
            <Download size={16} className="text-cyber-cyan" />
            <span>Print / Save Resume</span>
          </button>

          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/10 hover:border-cyber-pink/40 text-gray-300 hover:text-white text-sm font-semibold hover:scale-102 transition-all"
          >
            <Mail size={16} className="text-cyber-pink" />
            <span>Contact Me</span>
          </a>
        </motion.div>

      </div>

      {/* Floating Mouse Prompt */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Scroll to explore</span>
        <div className="w-5 h-9 rounded-full border-2 border-gray-600 p-1 flex justify-center">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full bg-cyber-cyan"
          />
        </div>
      </div>
    </section>
  );
}
