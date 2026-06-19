import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Send, Sparkles, ShieldAlert, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, sending, success
  const [statusLog, setStatusLog] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setSubmitStatus('sending');
    
    // Simulate terminal-like processing logs
    const logs = [
      "ESTABLISHING_SECURE_TUNNEL...",
      "PACKET_INSPECTION: MATCHED",
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
            setFormState({ name: '', email: '', message: '' });
            
            // Success Confetti
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          }, 600);
        }
      }, delay);
      delay += 800;
    });
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
            CONNECT_PORT
          </h2>
          <div className="h-1 w-20 bg-cyber-purple mx-auto rounded-full" />
          <p className="text-gray-400 font-mono text-xs tracking-widest uppercase mt-3">
            Open a secure channel to Paras Sharma
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Contact details & cards */}
          <div className="space-y-6">
            
            {/* Direct Channels Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl glassmorphism p-6 border border-white/5"
              style={{ borderWidth: '1px' }}
            >
              <h3 className="font-heading font-black text-white text-lg tracking-wide mb-6">
                DIRECT_HANDSHAKES
              </h3>
              
              <div className="space-y-4">
                
                {/* Phone */}
                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyber-cyan/30 transition-colors">
                  <div className="p-2.5 rounded-lg bg-cyber-cyan/15 text-cyber-cyan">
                    <Phone size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-mono text-gray-500 uppercase">Phone Voice Port</p>
                    <a href="tel:+919899946943" className="text-sm font-semibold text-white hover:text-cyber-cyan transition-colors">
                      +91 98999 46943
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyber-purple/30 transition-colors">
                  <div className="p-2.5 rounded-lg bg-cyber-purple/15 text-cyber-purple">
                    <Mail size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-mono text-gray-500 uppercase">Mail Ingestion</p>
                    <a href="mailto:mr.paras.gautam@gmail.com" className="text-sm font-semibold text-white hover:text-cyber-purple transition-colors">
                      mr.paras.gautam@gmail.com
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Social Grid Channels */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/parassharma27/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl glassmorphism p-5 border border-white/5 flex flex-col items-center justify-center gap-3 text-gray-300 hover:text-white hover:border-cyber-cyan/40 hover:shadow-cyan-500/10 transition-all hover:-translate-y-1"
                style={{ borderWidth: '1px' }}
              >
                <Linkedin size={24} className="text-cyber-cyan" />
                <span className="text-xs font-mono tracking-wider">/linkedin</span>
              </a>

              {/* GitHub */}
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

          {/* Right Column: Custom Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl glassmorphism p-8 border border-white/5 text-left relative overflow-hidden"
            style={{ borderWidth: '1px' }}
          >
            {/* Submission Terminal States */}
            <AnimatePresence mode="wait">
              {submitStatus === 'idle' && (
                <motion.form
                  key="form"
                  onSubmit={handleFormSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="font-heading font-black text-white text-lg tracking-wide mb-6">
                    DISPATCH_MESSAGE
                  </h3>

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Ident Name"
                      className="w-full bg-white/5 border border-white/5 rounded-xl text-sm px-4 py-3 focus:outline-none focus:border-cyber-cyan/40 transition-colors text-white"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      placeholder="vector@domain.com"
                      className="w-full bg-white/5 border border-white/5 rounded-xl text-sm px-4 py-3 focus:outline-none focus:border-cyber-cyan/40 transition-colors text-white"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Message Payload</label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      placeholder="Write your transmission details..."
                      className="w-full bg-white/5 border border-white/5 rounded-xl text-sm px-4 py-3 focus:outline-none focus:border-cyber-cyan/40 transition-colors text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 mt-2 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white text-sm font-semibold hover:shadow-cyan-500/25 hover:shadow-lg transition-all active:scale-98 cursor-pointer border border-white/10"
                  >
                    <span>Transmit Packet</span>
                    <Send size={15} />
                  </button>
                </motion.form>
              )}

              {submitStatus === 'sending' && (
                <motion.div
                  key="sending"
                  className="h-96 flex flex-col items-center justify-center text-center space-y-6"
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
                  className="h-96 flex flex-col items-center justify-center text-center space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="h-16 w-16 rounded-full bg-cyber-emerald/15 text-cyber-emerald flex items-center justify-center border border-cyber-emerald/30 animate-bounce">
                    <Sparkles size={28} />
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-heading font-black text-white text-xl">HANDSHAKE_COMPLETE</h4>
                    <p className="text-xs text-gray-400 max-w-sm leading-relaxed mx-auto">
                      Your encrypted communication payload has been successfully dispatched to Paras's active gateway inbox. Expect a response soon!
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="px-5 py-2.5 rounded-xl border border-white/10 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Send Another Packet
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
