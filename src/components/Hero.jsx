import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Download, Mail } from 'lucide-react';

const TYPING_TITLES = [
  "AI/ML Engineer",
  "Data Science Enthusiast",
  "Data Analyst Intern at Maruti Suzuki"
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
            body { font-family: 'Segoe UI', Arial, sans-serif; color: #222; line-height: 1.5; padding: 30px; margin: 0; background: #fff; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 20px; }
            h1 { font-size: 28px; margin: 0 0 5px 0; color: #111; text-transform: uppercase; letter-spacing: 1px; }
            .contact-info { font-size: 13px; color: #444; margin-bottom: 5px; }
            .contact-info a { color: #0284c7; text-decoration: none; }
            .section { margin-bottom: 22px; }
            .section-title { font-size: 16px; font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 3px; margin-bottom: 10px; color: #111; text-transform: uppercase; letter-spacing: 0.5px; }
            .item { margin-bottom: 12px; }
            .item-header { display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; color: #111; }
            .item-sub { font-style: italic; font-size: 13px; color: #555; margin-top: 1px; }
            ul { margin: 5px 0 0 0; padding-left: 18px; font-size: 13px; color: #333; }
            li { margin-bottom: 4px; }
            .skills-grid { font-size: 13px; color: #333; }
            .skills-grid div { margin-bottom: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Paras Sharma</h1>
            <div class="contact-info">
              Phone: +91 9899946943 | Email: <a href="mailto:mr.paras.gautam@gmail.com">mr.paras.gautam@gmail.com</a> | Location: Gurugram, Haryana 122001
            </div>
            <div class="contact-info">
              LinkedIn: <a href="https://www.linkedin.com/in/parassharma27" target="_blank">linkedin.com/in/parassharma27</a> | GitHub: <a href="https://github.com/mrparas27" target="_blank">github.com/mrparas27</a>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Professional Summary</div>
            <div style="font-size: 13px; text-align: justify; color: #333;">
              Computer Science undergraduate skilled in Python, Machine Learning, SQL, Generative AI, and LLM-based application development. Experienced in building AI-powered systems using RAG, LangChain, FastAPI, Pinecone, and OpenAI APIs. Hands-on experience with data analysis, model integration, cloud deployment, and scalable AI solutions. Passionate about applying AI to solve real-world problems and continuously learning modern AI technologies.
            </div>
          </div>

          <div class="section">
            <div class="section-title">Education</div>
            <div class="item">
              <div class="item-header">
                <span>Guru Nanak Dev University, Amritsar</span>
                <span>2022 - 2026</span>
              </div>
              <div class="item-sub">Bachelor of Technology in Computer Science and Engineering</div>
            </div>
            <div class="item">
              <div class="item-header">
                <span>SCR Public School, CBSE</span>
                <span>2021 - 2022</span>
              </div>
              <div class="item-sub">Senior Secondary Education (PCM)</div>
            </div>
            <div class="item">
              <div class="item-header">
                <span>SCR Public School, CBSE</span>
                <span>2019 - 2020</span>
              </div>
              <div class="item-sub">Secondary Education (Science)</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Skills</div>
            <div class="skills-grid">
              <div><strong>Programming Languages:</strong> Python, SQL</div>
              <div><strong>Data Science & ML:</strong> Pandas, Numpy, Scikit-learn, ML, Data Analysis, Data Visualization, PowerBI</div>
              <div><strong>Generative AI & LLMs:</strong> OpenAI API, LangChain, RAG, Prompt Engineering, Pinecone, Vector Databases, Embeddings, FastAPI, Streamlit</div>
              <div><strong>Cloud & Tools:</strong> AWS EC2, Git, Github, RestAPI</div>
              <div><strong>Soft Skills:</strong> Problem Solving, Teamwork, Quick Adaptability</div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Experience</div>
            <div class="item">
              <div class="item-header">
                <span>Intern At Maruti Suzuki India Limited</span>
                <span>July 2024</span>
              </div>
              <ul>
                <li>Worked on Perpetual Inventory System to track stock movements and enhance inventory accuracy.</li>
                <li>Gained hands-on experience in real-time projects involving inventory management solutions.</li>
                <li>Developed analytical skills to optimize warehouse and supply chain operation.</li>
              </ul>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Projects</div>
            
            <div class="item">
              <div class="item-header">
                <span>Book Recommendation System - <a href="http://13.60.49.214:8051/" target="_blank">Live Demo</a></span>
              </div>
              <div class="item-sub">Tech Used: Python, Numpy, Pandas, Scikit-learn, Machine learning, AWS EC2, Streamlit</div>
              <ul>
                <li><strong>Problem Statement:</strong> Users often struggle to find relevant books from a large collection based on their interests and preferences.</li>
                <li><strong>Solution:</strong> Developed a Book Recommendation System using similarity-based algorithms to suggest personalized books with accurate results. Deployed the application on AWS EC2 using Streamlit for public access.</li>
              </ul>
            </div>

            <div class="item">
              <div class="item-header">
                <span>Road Accident Analysis Dashboard</span>
              </div>
              <div class="item-sub">Tech Used: Power BI, Tableau, SQL</div>
              <ul>
                <li><strong>Problem Statement:</strong> Road accident data was scattered and difficult to analyze, making it challenging to identify trends, hotspots, and major causes.</li>
                <li><strong>Solution:</strong> Designed an interactive dashboard to visualize accident patterns across regions and timeframes for better decision-making. Used SQL for data cleaning and transformation to generate accurate insights for road safety improvements.</li>
              </ul>
            </div>

            <div class="item">
              <div class="item-header">
                <span>Medical AI Professional Assistant - <a href="https://ai-professional.netlify.app/" target="_blank">Live Demo</a></span>
              </div>
              <div class="item-sub">Tech Used: Python, FastAPI, React/Streamlit, OpenAI API, LLM Integration, RAG, Pinecone Vector Database, Embeddings, HTML, CSS, JavaScript, Git, Netlify</div>
              <ul>
                <li><strong>Problem Statement:</strong> AI chatbots sometimes give wrong, fake, or general medical answers (hallucinations). They may not use trusted medical data, which can confuse users and create health risks.</li>
                <li><strong>Solution:</strong> Built Medical AI Professional Assistant using RAG, where medical documents are uploaded, divided into chunks, converted into embeddings, and searched to provide accurate answers from trusted data sources.</li>
              </ul>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Extracurricular Activities</div>
            <ul>
              <li>Won Rangla Punjab Marathon</li>
              <li>Assisted in Placements drives For Accenture and mock interview sessions.</li>
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
          Building intelligent machine learning solutions, computer vision systems, and data-driven applications that transform complex data into meaningful insights. Open to opportunities in AI/ML, Data Science, and Data Analytics.
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
