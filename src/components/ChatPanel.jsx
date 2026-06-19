import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Send, MessageSquare, X, Bot, User, Sparkles, Download } from 'lucide-react';
import AIAvatar from '../ThreeJS/AIAvatar';

const PARAS_DATA = {
  about: "Paras Sharma is an AI/ML Engineer, Data Scientist, and Data Analyst graduate (B.Tech CSE 2026). He is highly passionate about building intelligent systems, training deep learning models, and extracting business insights from complex datasets.",
  experience: "Paras worked as a Data Analyst Intern at Maruti Suzuki. During his time there, he worked on automotive data pipelines, conducted predictive analytics for process optimization, and designed dynamic dashboards using Python, SQL, and Excel.",
  projects: "Paras has built several key AI projects:\n1. AI-powered Candidate Screening: A system that parses resumes and screens candidates based on roles.\n2. Medical AI Professional Assistant: An AI assistant supporting clinical diagnostic queries.\n3. AI-Powered Recommendation System: Multi-domain recommendation using collaborative filtering.\n4. Data Analyst Portfolio: Exploratory analysis on vehicle sales and retail datasets.",
  skills: "His core technical stack includes:\n- Languages: Python, SQL\n- ML/DL: PyTorch, TensorFlow, OpenCV, YOLO, Scikit-Learn\n- Data: Pandas, NumPy, MySQL, MongoDB\n- Tools: Git, React, Power BI, Artificial Intelligence pipelines",
  contact: "You can reach Paras at:\n- Phone: 9899946943\n- Email: mr.paras.gautam@gmail.com\n- LinkedIn: linkedin.com/in/parassharma27/\n- GitHub: github.com/mrparas27",
  certifications: "Paras holds two major certifications:\n1. Decode DSA with Python from Physicswallah\n2. Data Science Certification from Qspiders",
  greetings: "Hi there! I am Paras's AI assistant. Ask me anything about his projects, skills, Maruti Suzuki internship, or credentials! You can also click the quick chips below."
};

export default function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: PARAS_DATA.greetings }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    setInputValue('');
    setIsThinking(true);

    // AI thinking state simulation (800ms)
    setTimeout(() => {
      setIsThinking(false);
      setIsTalking(true);

      const query = text.toLowerCase();
      let reply = "I'm not quite sure about that. Try asking about Paras's 'skills', 'experience' at Maruti Suzuki, 'projects', or how to 'contact' him!";
      let showResume = false;

      if (query.includes('resume') || query.includes('cv') || query.includes('download') || query.includes('print') || query.includes('save')) {
        reply = "You can download, save, or print my original, uploaded resume PDF directly. Here is the link to download the PDF:";
        showResume = true;
      } else if (query.includes('about') || query.includes('who') || query.includes('paras') || query.includes('education') || query.includes('college')) {
        reply = PARAS_DATA.about;
      } else if (query.includes('experience') || query.includes('intern') || query.includes('maruti') || query.includes('suzuki') || query.includes('work')) {
        reply = PARAS_DATA.experience;
      } else if (query.includes('project') || query.includes('portfolio') || query.includes('github') || query.includes('repo')) {
        reply = PARAS_DATA.projects;
      } else if (query.includes('skill') || query.includes('python') || query.includes('pytorch') || query.includes('ml') || query.includes('sql')) {
        reply = PARAS_DATA.skills;
      } else if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('number') || query.includes('linkedin')) {
        reply = PARAS_DATA.contact;
      } else if (query.includes('cert') || query.includes('certification') || query.includes('credential') || query.includes('dsa') || query.includes('pw') || query.includes('qspider')) {
        reply = PARAS_DATA.certifications;
      } else if (query.includes('hi') || query.includes('hello') || query.includes('hey') || query.includes('greet')) {
        reply = "Hello! Feel free to ask me questions about Paras's background, education, Maruti Suzuki internship, projects, or certifications!";
      }

      // Typewriter simulation: update messages and stop talking when done
      simulateTypewriter(reply, showResume);
    }, 1000);
  };

  const simulateTypewriter = (text, showResumeButton = false) => {
    const words = text.split(' ');
    let currentText = '';
    let index = 0;
    
    // Create placeholders
    setMessages(prev => [...prev, { sender: 'ai', text: '', showResumeButton }]);

    const interval = setInterval(() => {
      if (index < words.length) {
        currentText += (index === 0 ? '' : ' ') + words[index];
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { sender: 'ai', text: currentText, showResumeButton };
          return updated;
        });
        index++;
      } else {
        clearInterval(interval);
        setIsTalking(false);
      }
    }, 80); // Speed of word typing
  };

  return (
    <>
      {/* Floating Chat Toggle Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full glassmorphism text-cyber-cyan hover:text-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 group scale-105 active:scale-95"
        style={{ borderWidth: '1px' }}
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-pink opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-pink"></span>
        </span>
        {isOpen ? <X size={24} className="rotate-90 transition-transform duration-300" /> : <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />}
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] rounded-2xl glassmorphism-premium flex flex-column overflow-hidden transition-all duration-500 shadow-2xl border border-cyber-purple/30 animate-fade-in-up">
          
          {/* Top Panel Header (with 3D Canvas) */}
          <div className="relative h-32 bg-gradient-to-b from-cyber-purple/10 to-transparent border-b border-white/5 flex items-center justify-between px-4">
            
            {/* 3D Canvas Area */}
            <div className="absolute left-4 top-2 bottom-2 w-28 h-28 pointer-events-auto">
              <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[2, 2, 2]} intensity={2} />
                <AIAvatar isTalking={isTalking} isThinking={isThinking} />
              </Canvas>
            </div>

            {/* Header Text */}
            <div className="pl-32 flex flex-col justify-center flex-grow text-left">
              <div className="flex items-center gap-1.5">
                <h4 className="font-heading font-semibold text-white tracking-wide">AETHER CORE</h4>
                <Sparkles size={12} className="text-cyber-cyan animate-pulse" />
              </div>
              <p className="text-xs text-cyber-cyan font-mono mt-0.5">
                {isThinking ? 'Processing...' : isTalking ? 'Synthesizing speech...' : 'Online & ready'}
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20 flex flex-col">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === 'user' ? 'self-end flex-row-reverse text-right' : 'self-start text-left'
                }`}
              >
                <div
                  className={`p-2 rounded-lg flex items-center justify-center shrink-0 h-8 w-8 ${
                    msg.sender === 'user' ? 'bg-cyber-cyan/15 text-cyber-cyan' : 'bg-cyber-purple/15 text-cyber-purple'
                  }`}
                >
                  {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-cyber-cyan/10 text-cyan-50 rounded-tr-none border border-cyber-cyan/20'
                      : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5'
                  }`}
                >
                  {msg.text}
                  {msg.showResumeButton && (
                    <div className="mt-3">
                      <a
                        href="/Paras_Sharma_Resume.pdf"
                        download="Paras_Sharma_Resume.pdf"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-purple/20 border border-cyber-purple/40 text-cyber-cyan text-xs font-semibold hover:bg-cyber-purple/35 transition-all cursor-pointer"
                      >
                        <Download size={12} />
                        <span>Download Resume PDF</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex gap-2.5 self-start text-left max-w-[85%]">
                <div className="p-2 rounded-lg bg-cyber-purple/15 text-cyber-purple shrink-0 h-8 w-8 flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="p-3 rounded-2xl rounded-tl-none bg-white/5 border border-white/5 text-sm text-gray-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 bg-cyber-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 bg-cyber-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 bg-cyber-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Interaction Prompts Chips */}
          <div className="px-4 py-2 border-t border-white/5 bg-black/10 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
            <button
              onClick={() => handleSendMessage("Tell me about Paras")}
              disabled={isThinking || isTalking}
              className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/15 hover:text-white transition-all disabled:opacity-50"
            >
              /about
            </button>
            <button
              onClick={() => handleSendMessage("Download Paras's Resume PDF")}
              disabled={isThinking || isTalking}
              className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-cyber-pink/30 text-cyber-pink hover:bg-cyber-pink/15 hover:text-white transition-all disabled:opacity-50"
            >
              /resume
            </button>
            <button
              onClick={() => handleSendMessage("What is his Maruti Suzuki internship experience?")}
              disabled={isThinking || isTalking}
              className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/15 hover:text-white transition-all disabled:opacity-50"
            >
              /maruti_intern
            </button>
            <button
              onClick={() => handleSendMessage("Show me his top projects")}
              disabled={isThinking || isTalking}
              className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-cyber-pink/30 text-cyber-pink hover:bg-cyber-pink/15 hover:text-white transition-all disabled:opacity-50"
            >
              /projects
            </button>
            <button
              onClick={() => handleSendMessage("What are his skills?")}
              disabled={isThinking || isTalking}
              className="text-[11px] font-mono px-2.5 py-1 rounded-full border-white/10 border text-gray-300 hover:bg-white/5 hover:text-white transition-all disabled:opacity-50"
            >
              /skills
            </button>
            <button
              onClick={() => handleSendMessage("How can I contact Paras?")}
              disabled={isThinking || isTalking}
              className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-cyber-emerald/30 text-cyber-emerald hover:bg-cyber-emerald/15 hover:text-white transition-all disabled:opacity-50"
            >
              /contact
            </button>
          </div>

          {/* Text Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 border-t border-white/5 bg-black/35 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isThinking || isTalking}
              placeholder={isThinking || isTalking ? 'Awaiting response...' : 'Type a query...'}
              className="flex-1 bg-white/5 rounded-xl border border-white/5 text-sm text-white px-4 py-2.5 focus:outline-none focus:border-cyber-cyan/40 disabled:opacity-50 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isThinking || isTalking}
              className="p-2.5 rounded-xl bg-cyber-purple/20 text-cyber-purple hover:bg-cyber-purple hover:text-white disabled:opacity-50 disabled:bg-white/5 disabled:text-gray-500 transition-all active:scale-95"
            >
              <Send size={18} />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
