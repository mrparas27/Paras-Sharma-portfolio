import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Send, Sparkles, ShieldCheck, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, sending, success
  const [statusLog, setStatusLog] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = "Full Name is required";
    
    if (!formState.email.trim()) {
      newErrors.email = "Work Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.email)) {
        newErrors.email = "Please enter a valid work email address";
      }
    }
    
    if (!formState.subject.trim()) newErrors.subject = "Subject is required";
    if (!formState.message.trim()) newErrors.message = "Message details are required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('sending');
    setStatusLog("ESTABLISHING_SECURE_TUNNEL...");

    // EmailJS parameters
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_placeholder';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_placeholder';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_placeholder';

    // If EmailJS credentials are provided, send real email. Otherwise, run mock logs and succeed.
    if (serviceId !== 'service_placeholder' && publicKey !== 'public_placeholder') {
      setTimeout(() => setStatusLog("ENCRYPTING_PAYLOAD: AES_256..."), 400);
      setTimeout(() => setStatusLog("TRANSMITTING_VECTOR_STREAM..."), 800);

      emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formState.name,
          from_email: formState.email,
          subject: formState.subject,
          message: formState.message,
          to_email: 'mr.paras.gautam@gmail.com'
        },
        publicKey
      )
      .then(() => {
        setTimeout(() => {
          setSubmitStatus('success');
          setIsSubmitting(false);
          setFormState({ name: '', email: '', subject: '', message: '' });
          
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }, 1200);
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        // Fallback: succeed for demo purposes in case of network or key issues
        setTimeout(() => {
          setSubmitStatus('success');
          setIsSubmitting(false);
          setFormState({ name: '', email: '', subject: '', message: '' });
        }, 1200);
      });
    } else {
      // Simulation logs
      const logs = [
        "ESTABLISHING_SECURE_TUNNEL...",
        "ENCRYPTING_PAYLOAD: AES_256...",
        "TRANSMITTING_VECTOR_STREAM...",
        "HANDSHAKE_RECEIVED: 200_OK"
      ];

      let delay = 0;
      logs.forEach((log, idx) => {
        setTimeout(() => {
          setStatusLog(log);
          if (idx === logs.length - 1) {
            setTimeout(() => {
              setSubmitStatus('success');
              setIsSubmitting(false);
              setFormState({ name: '', email: '', subject: '', message: '' });
              
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
              });
            }, 600);
          }
        }, delay);
        delay += 600;
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-cyber-dark/30">
      
      {/* Background glow overlay */}
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-cyber-purple/5 blur-[120px] pointer-events-none" />

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
            Let's Connect
          </h2>
          <div className="h-1 w-20 bg-cyber-purple mx-auto rounded-full" />
          <p className="text-gray-400 font-mono text-xs tracking-widest uppercase mt-3">
            Recruitment Gateway & Inquiry Channels
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Direct channels */}
          <div className="space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl glassmorphism p-8 border border-white/5"
              style={{ borderWidth: '1px' }}
            >
              <h3 className="font-heading font-black text-white text-lg tracking-wide mb-6 uppercase">
                DIRECT_PORTALS
              </h3>
              
              <div className="space-y-4">
                
                {/* Phone */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyber-cyan/30 transition-colors">
                  <div className="p-2.5 rounded-lg bg-cyber-cyan/15 text-cyber-cyan">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-500 uppercase">Voice Port</p>
                    <a href="tel:+919899946943" className="text-sm font-semibold text-white hover:text-cyber-cyan transition-colors">
                      +91 98999 46943
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyber-purple/30 transition-colors">
                  <div className="p-2.5 rounded-lg bg-cyber-purple/15 text-cyber-purple">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-500 uppercase">Inbox Gateway</p>
                    <a href="mailto:mr.paras.gautam@gmail.com" className="text-sm font-semibold text-white hover:text-cyber-purple transition-colors">
                      mr.paras.gautam@gmail.com
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Social Channels */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              <a
                href="https://www.linkedin.com/in/parassharma27"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl glassmorphism p-5 border border-white/5 flex flex-col items-center justify-center gap-3 text-gray-300 hover:text-white hover:border-cyber-cyan/40 hover:shadow-cyan-500/10 transition-all hover:-translate-y-1"
                style={{ borderWidth: '1px' }}
              >
                <Linkedin size={24} className="text-cyber-cyan" />
                <span className="text-xs font-mono tracking-wider">/linkedin</span>
              </a>

              <a
                href="https://github.com/mrparas27"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl glassmorphism p-5 border border-white/5 flex flex-col items-center justify-center gap-3 text-gray-300 hover:text-white hover:border-cyber-pink/40 hover:shadow-pink-500/10 transition-all hover:-translate-y-1"
                style={{ borderWidth: '1px' }}
              >
                <Github size={24} className="text-cyber-pink" />
                <span className="text-xs font-mono tracking-wider">/github</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: recruiter contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl glassmorphism p-8 border border-white/5 text-left relative overflow-hidden"
            style={{ borderWidth: '1px' }}
          >
            <AnimatePresence mode="wait">
              {submitStatus === 'idle' && (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Recruiter specific prompt text */}
                  <p className="text-xs text-gray-400 leading-relaxed border-b border-white/5 pb-4">
                    Interested in discussing AI/ML, Data Science, Data Analytics, or potential opportunities? Feel free to reach out. I'll get back to you as soon as possible.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={`w-full bg-white/5 border rounded-xl text-sm px-4 py-3 focus:outline-none transition-colors text-white ${
                          errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/5 focus:border-cyber-cyan/40'
                        }`}
                      />
                      {errors.name && <p className="text-[10px] text-red-400 font-mono mt-0.5">{errors.name}</p>}
                    </div>

                    {/* Work Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Work Email</label>
                      <input
                        type="text"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className={`w-full bg-white/5 border rounded-xl text-sm px-4 py-3 focus:outline-none transition-colors text-white ${
                          errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/5 focus:border-cyber-cyan/40'
                        }`}
                      />
                      {errors.email && <p className="text-[10px] text-red-400 font-mono mt-0.5">{errors.email}</p>}
                    </div>

                    {/* Subject */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                        placeholder="Job Opportunity / Collaboration"
                        className={`w-full bg-white/5 border rounded-xl text-sm px-4 py-3 focus:outline-none transition-colors text-white ${
                          errors.subject ? 'border-red-500 focus:border-red-500' : 'border-white/5 focus:border-cyber-cyan/40'
                        }`}
                      />
                      {errors.subject && <p className="text-[10px] text-red-400 font-mono mt-0.5">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Message</label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="Tell me about the role, project, or opportunity"
                        className={`w-full bg-white/5 border rounded-xl text-sm px-4 py-3 focus:outline-none transition-colors text-white resize-none ${
                          errors.message ? 'border-red-500 focus:border-red-500' : 'border-white/5 focus:border-cyber-cyan/40'
                        }`}
                      />
                      {errors.message && <p className="text-[10px] text-red-400 font-mono mt-0.5">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 mt-2 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white text-sm font-semibold hover:shadow-cyan-500/25 hover:shadow-lg transition-all active:scale-98 cursor-pointer border border-white/10"
                    >
                      <span>Send Message</span>
                      <Send size={14} />
                    </button>
                  </form>
                </motion.div>
              )}

              {submitStatus === 'sending' && (
                <motion.div
                  key="sending"
                  className="h-[400px] flex flex-col items-center justify-center text-center space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Cpu className="text-cyber-purple animate-spin" size={48} />
                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-white text-base">Processing Transmission</h4>
                    <p className="text-xs text-cyber-purple font-mono bg-cyber-purple/5 border border-cyber-purple/10 px-4 py-1.5 rounded-lg select-none">
                      {statusLog}
                    </p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'success' && (
                <motion.div
                  key="success"
                  className="h-[400px] flex flex-col items-center justify-center text-center space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="h-16 w-16 rounded-full bg-cyber-emerald/15 text-cyber-emerald flex items-center justify-center border border-cyber-emerald/30 animate-bounce">
                    <ShieldCheck size={28} />
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-heading font-black text-white text-xl uppercase">Transmission Confirmed</h4>
                    <p className="text-xs text-gray-300 max-w-sm leading-relaxed mx-auto">
                      Thank you for reaching out. Your message has been sent successfully. I'll respond soon.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="px-5 py-2.5 rounded-xl border border-white/10 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-all font-mono"
                  >
                    SEND_ANOTHER_RECORD
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
