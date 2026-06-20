import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  Send, MessageSquare, X, Bot, User, Sparkles, Download, 
  UserCheck, Code, Briefcase, FileText, BarChart, Calendar, Heart, MessageCircle 
} from 'lucide-react';
import AIAvatar from '../ThreeJS/AIAvatar';

const PARAS_DATA = {
  summary: "Paras Sharma is a highly skilled AI/ML and Data Science graduate (B.Tech CSE 2026). He combines strong mathematical foundations in machine learning algorithms with hands-on development in Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and data engineering. He has industry experience as a Data Analyst Intern at Maruti Suzuki, where he designed process analytics pipelines.",
  skills: `Paras has a strong technical competencies matrix:
• Programming Languages: Python, SQL
• Data Science & ML: Pandas, NumPy, Scikit-learn, Statistics, Data Analysis, Data Visualization (Power BI, Tableau)
• Generative AI & LLMs: OpenAI API, LangChain, RAG, Prompt Engineering, Pinecone vector databases, Embeddings, FastAPI, Streamlit
• Cloud & Tools: AWS EC2, Git, GitHub, REST APIs
• Core Concepts: Regression, Clustering, Decision Trees, CNNs, Data Cleaning & Ingestion, Relational Schema optimizations`,
  projects: `Paras's top portfolio projects include:
1. Book Recommendation System
   - Tech: Python, Streamlit, Scikit-learn, AWS EC2
   - Details: Personalized recommender using collaborative filtering algorithms.
2. Medical AI Professional Assistant
   - Tech: React, FastAPI, OpenAI API, RAG, Pinecone, Embeddings
   - Details: Semantic document parser and RAG clinical symptom assistant.
3. Road Accident Analysis Dashboard
   - Tech: Power BI, SQL, Tableau
   - Details: Data cleaning and interactive analytics reports identifying accident hotspots.`,
  experience: `Professional Milestones:
• Data Analyst Intern | Maruti Suzuki India Limited (Jul 2024)
  - Engineered Perpetual Inventory Systems to audit stock metrics.
  - Analyzed warehouse assets to reduce operations latency.
  - Built dashboards to aid supply chain reporting.
• AI/ML Systems Specialist | B.Tech Labs (2022 - Present)
  - Designed NLP parsing scripts to analyze CV features.
  - Implemented database index optimizations for SQL servers.`,
  resume: `Paras Sharma Resume Snapshot:
• Degree: B.Tech in Computer Science and Engineering (2022 - 2026) | Guru Nanak Dev University
• GPA / Grade: Validated CS Engineering student
• Achievements: Winner of Rangla Punjab Marathon, Placements assistant.
• Original Document: Serves the original, uploaded resume PDF directly.`,
  personality: `Beyond the resume, Paras is:
• An avid problem solver who loves breaking down complex data challenges.
• A continuous learner exploring deep learning architectures, RAG systems, and AI scaling.
• An adventure enthusiast, mountain lover, and trekker who brings high resilience and collaboration from team expeditions into engineering sprints.`
};

export default function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: 'ai', 
      text: `👋 Welcome to Paras Sharma's AI Career Assistant

I'm here to help you evaluate Paras's technical expertise, project experience, internship background, and career potential.

Whether you're a recruiter, founder, hiring manager, or collaborator, I can provide instant insights about his qualifications and achievements.

What would you like to explore?` 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  
  // Custom interaction states
  const [chatMode, setChatMode] = useState('normal'); // normal, jd_match, recruiter_intake
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [intakeStep, setIntakeStep] = useState(0);
  const [intakeData, setIntakeData] = useState({ role: '', exp: '', stack: '', loc: '', comp: '' });
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Recruiter mode intake process triggers
  const handleRecruiterIntake = (text) => {
    const nextMessages = [...messages, { sender: 'user', text }];
    
    if (intakeStep === 0) {
      setIntakeData(prev => ({ ...prev, role: text }));
      setMessages([...nextMessages, { sender: 'ai', text: "Got it. What experience level are you looking for?" }]);
      setIntakeStep(1);
    } else if (intakeStep === 1) {
      setIntakeData(prev => ({ ...prev, exp: text }));
      setMessages([...nextMessages, { sender: 'ai', text: "Understood. What is the required core tech stack?" }]);
      setIntakeStep(2);
    } else if (intakeStep === 2) {
      setIntakeData(prev => ({ ...prev, stack: text }));
      setMessages([...nextMessages, { sender: 'ai', text: "What is the job location (Remote, Onsite, or Hybrid)?" }]);
      setIntakeStep(3);
    } else if (intakeStep === 3) {
      setIntakeData(prev => ({ ...prev, loc: text }));
      setMessages([...nextMessages, { sender: 'ai', text: "And finally, what is the expected compensation/salary range?" }]);
      setIntakeStep(4);
    } else if (intakeStep === 4) {
      const finalData = { ...intakeData, comp: text };
      setIntakeData(finalData);
      setIsThinking(true);
      setMessages(nextMessages);
      setInputValue('');

      setTimeout(() => {
        setIsThinking(false);
        setIsTalking(true);

        // Perform mock fit analysis based on details provided
        const score = matchJobDescription(
          `Role: ${finalData.role}, Experience: ${finalData.exp}, Stack: ${finalData.stack}, Location: ${finalData.loc}`
        );

        const reply = `Thank you for sharing the role details! Here is the AI Job Fit Analysis for the **${finalData.role}** opportunity:

📈 **Overall Match Score: ${score.percentage}%**

✅ **Strength Areas:**
• Skill overlaps: ${score.strengths.join(', ')}
• Solid academic foundation in B.Tech CSE (graduating 2026)
• Industrial data experience from Maruti Suzuki India Limited

💡 **Hiring Recommendation:**
${score.recommendation}

Would you like to connect with Paras directly to discuss this role? Click "Connect with Paras" to open the Hire Me gateway!`;

        simulateTypewriter(reply, false, true);
        setChatMode('normal');
        setIntakeStep(0);
      }, 1200);
    }
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    if (chatMode === 'recruiter_intake') {
      handleRecruiterIntake(text);
      setInputValue('');
      return;
    }

    if (chatMode === 'jd_match') {
      const newMessages = [...messages, { sender: 'user', text }];
      setMessages(newMessages);
      setInputValue('');
      setIsThinking(true);

      setTimeout(() => {
        setIsThinking(false);
        setIsTalking(true);

        const score = matchJobDescription(text);
        
        const reply = `🔍 **AI Job Fit Match Evaluation**

• **Overall Match Score: ${score.percentage}%**
• **Strength Areas:** ${score.strengths.join(', ')}
• **Missing/Enhancible Skills:** ${score.missing.join(', ') || 'None identified (strong overlap)'}

💡 **Hiring Recommendation:**
${score.recommendation}

Click the '/hire_me' action to connect with Paras regarding this opportunity!`;

        simulateTypewriter(reply, false, true);
        setChatMode('normal');
      }, 1500);
      return;
    }

    // Normal mode response matching (mock RAG)
    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    setInputValue('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      setIsTalking(true);

      const query = text.toLowerCase();
      let reply = "I'm not quite sure about that. Try selecting one of the advanced quick actions or ask about Paras's 'skills', 'experience', 'projects', or 'resume'.";
      let showResume = false;
      let showHireMe = false;

      // Semantic matching checks
      if (query.includes('hiring') || query.includes('we are hiring') || query.includes('recruit') || query.includes('job opening')) {
        reply = "Excellent! Let's analyze your opening. What is the role title you are hiring for?";
        setChatMode('recruiter_intake');
        setIntakeStep(0);
        simulateTypewriter(reply);
        return;
      }

      if (query.includes('resume') || query.includes('cv') || query.includes('download') || query.includes('print') || query.includes('save')) {
        reply = PARAS_DATA.resume;
        showResume = true;
      } else if (query.includes('about') || query.includes('who') || query.includes('paras') || query.includes('education') || query.includes('summary')) {
        reply = PARAS_DATA.summary;
      } else if (query.includes('experience') || query.includes('intern') || query.includes('maruti') || query.includes('suzuki') || query.includes('work')) {
        reply = PARAS_DATA.experience;
      } else if (query.includes('project') || query.includes('portfolio') || query.includes('github') || query.includes('repo')) {
        reply = PARAS_DATA.projects;
      } else if (query.includes('skill') || query.includes('python') || query.includes('ml') || query.includes('sql') || query.includes('technical')) {
        reply = PARAS_DATA.skills;
      } else if (query.includes('contact') || query.includes('hire') || query.includes('connect') || query.includes('email') || query.includes('discussion')) {
        reply = "Interested in discussing an opportunity? Click the link below to open the Hire Me gateway form:";
        showHireMe = true;
      } else if (query.includes('beyond') || query.includes('trek') || query.includes('mountain') || query.includes('personality')) {
        reply = PARAS_DATA.personality;
      } else if (query.includes('hi') || query.includes('hello') || query.includes('hey')) {
        reply = "Hello! I'm Paras's AI career concierge. I can evaluate his match percentage against your job description, display his skills matrix, show projects, or open the contact form. What can I do for you?";
      }

      simulateTypewriter(reply, showResume, showHireMe);
    }, 1000);
  };

  const simulateTypewriter = (text, showResumeButton = false, showHireMeButton = false) => {
    const words = text.split(' ');
    let currentText = '';
    let index = 0;
    
    setMessages(prev => [...prev, { sender: 'ai', text: '', showResumeButton, showHireMeButton }]);

    const interval = setInterval(() => {
      if (index < words.length) {
        currentText += (index === 0 ? '' : ' ') + words[index];
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { 
            sender: 'ai', 
            text: currentText, 
            showResumeButton, 
            showHireMeButton 
          };
          return updated;
        });
        index++;
      } else {
        clearInterval(interval);
        setIsTalking(false);
      }
    }, 45); // Typing speed
  };

  const triggerQuickAction = (actionKey) => {
    setIsTalking(true);
    setIsThinking(true);
    
    setTimeout(() => {
      setIsThinking(false);
      
      let reply = "";
      let showResume = false;
      let showHireMe = false;

      switch(actionKey) {
        case 'overview':
          reply = `📋 **Executive Candidate Summary**\n\n${PARAS_DATA.summary}`;
          break;
        case 'skills':
          reply = PARAS_DATA.skills;
          break;
        case 'projects':
          reply = PARAS_DATA.projects;
          break;
        case 'experience':
          reply = PARAS_DATA.experience;
          break;
        case 'resume':
          reply = PARAS_DATA.resume;
          showResume = true;
          break;
        case 'match':
          reply = "Please paste the job description (responsibilities, required stack, experience) into the input box below. I will evaluate the skill fit % and generate a summary.";
          setChatMode('jd_match');
          break;
        case 'connect':
          reply = "Interested in discussing an opportunity? Click the link below to open the Hire Me gateway form:";
          showHireMe = true;
          break;
        case 'personality':
          reply = PARAS_DATA.personality;
          break;
        default:
          reply = "Exploring credentials...";
      }

      simulateTypewriter(reply, showResume, showHireMe);
    }, 600);
  };

  // Simulated Semantic Job Description Matcher
  const matchJobDescription = (jdText) => {
    const jdLower = jdText.toLowerCase();
    let score = 55; // Base score
    const strengths = [];
    const missing = [];

    // Check skills
    if (jdLower.includes('python')) { score += 10; strengths.push('Python'); } else { missing.push('Python'); }
    if (jdLower.includes('sql') || jdLower.includes('database')) { score += 10; strengths.push('SQL'); } else { missing.push('SQL'); }
    if (jdLower.includes('ml') || jdLower.includes('machine learning')) { score += 10; strengths.push('Machine Learning'); }
    if (jdLower.includes('data science') || jdLower.includes('pandas') || jdLower.includes('numpy')) { score += 10; strengths.push('Data Science/Pandas'); }
    if (jdLower.includes('rag') || jdLower.includes('llm') || jdLower.includes('generative ai')) { score += 10; strengths.push('Generative AI/RAG'); }
    if (jdLower.includes('fastapi') || jdLower.includes('api') || jdLower.includes('rest')) { score += 10; strengths.push('FastAPI/REST'); }
    if (jdLower.includes('aws') || jdLower.includes('ec2') || jdLower.includes('cloud')) { score += 5; strengths.push('AWS Cloud'); }

    // Upper limit check
    if (score > 100) score = 100;

    let recommendation = "Highly Recommended. Paras has strong overlapping foundations in " + strengths.join(', ') + " and is a solid choice for B.Tech CSE graduates.";
    if (score < 75) {
      recommendation = "Consider with training. Strong general engineering capabilities, but may need upskilling on specific niche stacks.";
    }

    return {
      percentage: score,
      strengths,
      missing,
      recommendation
    };
  };

  const handleOpenFormScroll = () => {
    setIsOpen(false);
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Chat Trigger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full glassmorphism text-cyber-cyan hover:text-white transition-all duration-300 shadow-2xl hover:shadow-cyan-500/20 group scale-105 active:scale-95 cursor-pointer"
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
        <div className="fixed bottom-24 right-6 z-50 w-96 md:w-[420px] h-[600px] rounded-2xl glassmorphism-premium flex flex-col overflow-hidden transition-all duration-500 shadow-2xl border border-cyber-purple/30 animate-fade-in-up">
          
          {/* Top Panel Header (with 3D Canvas) */}
          <div className="relative h-36 bg-gradient-to-b from-cyber-purple/10 to-transparent border-b border-white/5 flex items-center justify-between px-4">
            
            {/* 3D Canvas Area */}
            <div className="absolute left-4 top-2 bottom-2 w-28 h-28 pointer-events-auto">
              {mounted && (
                <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
                  <ambientLight intensity={1.5} />
                  <directionalLight position={[2, 2, 2]} intensity={2} />
                  <AIAvatar isTalking={isTalking} isThinking={isThinking} />
                </Canvas>
              )}
            </div>

            {/* Header Text */}
            <div className="pl-32 flex flex-col justify-center flex-grow text-left">
              <div className="flex items-center gap-1.5">
                <h4 className="font-heading font-semibold text-white tracking-wide text-sm">PARAS_CAREER_BOT</h4>
                <Sparkles size={12} className="text-cyber-cyan animate-pulse" />
              </div>
              <p className="text-[10px] text-cyber-cyan font-mono mt-0.5 uppercase tracking-widest">
                {isThinking ? 'Thinking...' : isTalking ? 'Synthesizing response...' : 'RAG Gateway Active'}
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/25 flex flex-col scrollbar-thin">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 max-w-[88%] ${
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
                  className={`p-3 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-cyber-cyan/10 text-cyan-50 rounded-tr-none border border-cyber-cyan/20'
                      : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5'
                  }`}
                >
                  {msg.text}
                  
                  {/* Inline Action Buttons */}
                  {msg.showResumeButton && (
                    <div className="mt-3">
                      <a
                        href="/Paras_Sharma_Resume.pdf"
                        download="Paras_Sharma_Resume.pdf"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-purple/20 border border-cyber-purple/40 text-cyber-cyan text-xs font-semibold hover:bg-cyber-purple/35 transition-all cursor-pointer"
                      >
                        <Download size={12} />
                        <span>Download Resume PDF</span>
                      </a>
                    </div>
                  )}

                  {msg.showHireMeButton && (
                    <div className="mt-3">
                      <button
                        onClick={handleOpenFormScroll}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
                      >
                        <MessageCircle size={12} />
                        <span>Open Hire Me Form</span>
                      </button>
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

          {/* ADVANCED QUICK ACTIONS GRID */}
          <div className="p-3 border-t border-white/5 bg-black/10">
            <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-2 text-left">
              Advanced Recruiter Actions
            </div>
            
            <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1 scrollbar-thin">
              {/* Card 1: Overview */}
              <button
                onClick={() => triggerQuickAction('overview')}
                className="p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyber-purple/40 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-cyber-purple font-semibold text-xs">
                  <UserCheck size={12} />
                  <span>Why Consider Paras?</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 leading-tight">Executive candidate summary</p>
              </button>

              {/* Card 2: Tech Matrix */}
              <button
                onClick={() => triggerQuickAction('skills')}
                className="p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyber-cyan/40 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-cyber-cyan font-semibold text-xs">
                  <Code size={12} />
                  <span>Technical Expertise</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 leading-tight">Categorized skill matrix</p>
              </button>

              {/* Card 3: Portfolio */}
              <button
                onClick={() => triggerQuickAction('projects')}
                className="p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyber-pink/40 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-cyber-pink font-semibold text-xs">
                  <BarChart size={12} />
                  <span>Projects Portfolio</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 leading-tight">AI/ML project showcases</p>
              </button>

              {/* Card 4: Experience */}
              <button
                onClick={() => triggerQuickAction('experience')}
                className="p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyber-emerald/40 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-cyber-emerald font-semibold text-xs">
                  <Briefcase size={12} />
                  <span>Internship Experience</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 leading-tight">Maruti Suzuki details</p>
              </button>

              {/* Card 5: Resume Snapshot */}
              <button
                onClick={() => triggerQuickAction('resume')}
                className="p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-gray-300 font-semibold text-xs">
                  <FileText size={12} />
                  <span>Resume Overview</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 leading-tight">Credentials & direct PDF download</p>
              </button>

              {/* Card 6: Job Fit Analysis */}
              <button
                onClick={() => triggerQuickAction('match')}
                className="p-2.5 rounded-xl border border-cyber-cyan/30 bg-cyber-cyan/5 hover:bg-cyber-cyan/10 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-cyber-cyan font-bold text-xs">
                  <Sparkles size={12} />
                  <span>Job Fit Evaluation</span>
                </div>
                <p className="text-[10px] text-cyan-200 mt-1 leading-tight">Paste JD for skill matching score</p>
              </button>

              {/* Card 7: Schedule Connect */}
              <button
                onClick={() => triggerQuickAction('connect')}
                className="p-2.5 rounded-xl border border-cyber-purple/30 bg-cyber-purple/5 hover:bg-cyber-purple/10 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-cyber-purple font-bold text-xs">
                  <Calendar size={12} />
                  <span>Connect with Paras</span>
                </div>
                <p className="text-[10px] text-purple-200 mt-1 leading-tight">Open Hire Me gateway form</p>
              </button>

              {/* Card 8: Beyond the Resume */}
              <button
                onClick={() => triggerQuickAction('personality')}
                className="p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyber-pink/40 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-cyber-pink font-semibold text-xs">
                  <Heart size={12} />
                  <span>Beyond the Resume</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 leading-tight">Resilience, trekking & collaboration</p>
              </button>
            </div>
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
              placeholder={
                chatMode === 'jd_match' 
                  ? 'Paste Job Description text here...' 
                  : chatMode === 'recruiter_intake' 
                  ? 'Enter requested detail...' 
                  : 'Type a query (or select a card)...'
              }
              className="flex-1 bg-white/5 rounded-xl border border-white/5 text-xs md:text-sm text-white px-4 py-2.5 focus:outline-none focus:border-cyber-cyan/40 disabled:opacity-50 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isThinking || isTalking}
              className="p-2.5 rounded-xl bg-cyber-purple/20 text-cyber-purple hover:bg-cyber-purple hover:text-white disabled:opacity-50 disabled:bg-white/5 disabled:text-gray-500 transition-all active:scale-95 cursor-pointer"
            >
              <Send size={18} />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
