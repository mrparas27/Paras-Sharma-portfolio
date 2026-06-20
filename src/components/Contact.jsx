import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Send, ShieldCheck, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitOpportunity } from '@/app/actions/hire-me';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    recruiterName: '',
    roleOffered: '',
    email: '',
    phone: '',
    linkedinProfile: '',
    companyWebsite: '',
    opportunityType: 'Full-Time',
    joiningDate: '',
    salaryRange: '',
    workMode: 'Remote',
    location: '',
    message: '',
    fax_number: '', // Honeypot field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, sending, success
  const [statusLog, setStatusLog] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('sending');
    setStatusLog("ESTABLISHING_SECURE_TUNNEL...");

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      data.append(key, val);
    });

    try {
      setTimeout(() => setStatusLog("ENCRYPTING_PAYLOAD: AES_256..."), 400);
      setTimeout(() => setStatusLog("TRANSMITTING_VECTOR_STREAM..."), 800);
      
      const result = await submitOpportunity(null, data);
      
      if (result.success) {
        setTimeout(() => {
          setSubmitStatus('success');
          setIsSubmitting(false);
          setFormData({
            fullName: '',
            companyName: '',
            recruiterName: '',
            roleOffered: '',
            email: '',
            phone: '',
            linkedinProfile: '',
            companyWebsite: '',
            opportunityType: 'Full-Time',
            joiningDate: '',
            salaryRange: '',
            workMode: 'Remote',
            location: '',
            message: '',
            fax_number: '',
          });
          setErrors({});
          
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }, 1200);
      } else {
        setTimeout(() => {
          setSubmitStatus('idle');
          setIsSubmitting(false);
          setErrors(result.errors || {});
          setStatusLog("");
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setSubmitStatus('idle');
        setIsSubmitting(false);
        setStatusLog("");
      }, 1200);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-cyber-dark/30">
      
      {/* Background glow overlay */}
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-cyber-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
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
            Opportunity Gateway & Recruitment Inquiries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct channels (Col 4) */}
          <div className="lg:col-span-4 space-y-6 text-left">
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

          {/* Right Column: recruiter contact form (Col 8) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 rounded-2xl glassmorphism p-8 border border-white/5 text-left relative overflow-hidden"
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
                  <p className="text-xs text-gray-400 leading-relaxed border-b border-white/5 pb-4">
                    Recruiters, hiring managers, and founders: fill out this opportunity briefing form. It will instantly connect with my notification servers and database leads.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    
                    {/* Honeypot field (hidden from users, bot trap) */}
                    <div className="hidden">
                      <input
                        type="text"
                        name="fax_number"
                        value={formData.fax_number}
                        onChange={handleInputChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* SECTION 1: RECRUITER & COMPANY INFO */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono font-bold tracking-widest text-cyber-cyan uppercase">
                        [01_RECRUITER_BRIEF]
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Recruiter Name */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Recruiter Name *</label>
                          <input
                            type="text"
                            name="recruiterName"
                            value={formData.recruiterName}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            className={`w-full bg-white/5 border rounded-xl text-sm px-4 py-3 focus:outline-none transition-colors text-white ${
                              errors.recruiterName ? 'border-red-500 focus:border-red-500' : 'border-white/5 focus:border-cyber-cyan/40'
                            }`}
                          />
                          {errors.recruiterName && <p className="text-[10px] text-red-400 font-mono mt-0.5">{errors.recruiterName[0]}</p>}
                        </div>

                        {/* Company Name */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Company Name *</label>
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="Enter company name"
                            className={`w-full bg-white/5 border rounded-xl text-sm px-4 py-3 focus:outline-none transition-colors text-white ${
                              errors.companyName ? 'border-red-500 focus:border-red-500' : 'border-white/5 focus:border-cyber-cyan/40'
                            }`}
                          />
                          {errors.companyName && <p className="text-[10px] text-red-400 font-mono mt-0.5">{errors.companyName[0]}</p>}
                        </div>

                        {/* Full Name */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Your Full Name *</label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter full name"
                            className={`w-full bg-white/5 border rounded-xl text-sm px-4 py-3 focus:outline-none transition-colors text-white ${
                              errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-white/5 focus:border-cyber-cyan/40'
                            }`}
                          />
                          {errors.fullName && <p className="text-[10px] text-red-400 font-mono mt-0.5">{errors.fullName[0]}</p>}
                        </div>

                        {/* Work Email */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Work Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="recruiter@company.com"
                            className={`w-full bg-white/5 border rounded-xl text-sm px-4 py-3 focus:outline-none transition-colors text-white ${
                              errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/5 focus:border-cyber-cyan/40'
                            }`}
                          />
                          {errors.email && <p className="text-[10px] text-red-400 font-mono mt-0.5">{errors.email[0]}</p>}
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Phone Number</label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +91 98999 46943"
                            className="w-full bg-white/5 border border-white/5 rounded-xl text-sm px-4 py-3 focus:outline-none focus:border-cyber-cyan/40 transition-colors text-white"
                          />
                        </div>

                        {/* Company Website */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Company Website</label>
                          <input
                            type="url"
                            name="companyWebsite"
                            value={formData.companyWebsite}
                            onChange={handleInputChange}
                            placeholder="https://company.com"
                            className="w-full bg-white/5 border border-white/5 rounded-xl text-sm px-4 py-3 focus:outline-none focus:border-cyber-cyan/40 transition-colors text-white"
                          />
                        </div>

                        {/* LinkedIn Profile */}
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Your LinkedIn Profile URL</label>
                          <input
                            type="url"
                            name="linkedinProfile"
                            value={formData.linkedinProfile}
                            onChange={handleInputChange}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full bg-white/5 border border-white/5 rounded-xl text-sm px-4 py-3 focus:outline-none focus:border-cyber-cyan/40 transition-colors text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: OPPORTUNITY SPECIFICS */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono font-bold tracking-widest text-cyber-purple uppercase">
                        [02_OPPORTUNITY_METRIC]
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Role Offered */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Role Offered *</label>
                          <input
                            type="text"
                            name="roleOffered"
                            value={formData.roleOffered}
                            onChange={handleInputChange}
                            placeholder="e.g. AI Engineer / Data Analyst"
                            className={`w-full bg-white/5 border rounded-xl text-sm px-4 py-3 focus:outline-none transition-colors text-white ${
                              errors.roleOffered ? 'border-red-500 focus:border-red-500' : 'border-white/5 focus:border-cyber-cyan/40'
                            }`}
                          />
                          {errors.roleOffered && <p className="text-[10px] text-red-400 font-mono mt-0.5">{errors.roleOffered[0]}</p>}
                        </div>

                        {/* Opportunity Type */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Opportunity Type *</label>
                          <select
                            name="opportunityType"
                            value={formData.opportunityType}
                            onChange={handleInputChange}
                            className="w-full bg-cyber-dark border border-white/5 rounded-xl text-sm px-4 py-3 focus:outline-none focus:border-cyber-cyan/40 transition-colors text-white cursor-pointer"
                          >
                            <option value="Internship">Internship</option>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Consulting">Consulting</option>
                          </select>
                        </div>

                        {/* Expected Joining Date */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Expected Joining Date</label>
                          <input
                            type="date"
                            name="joiningDate"
                            value={formData.joiningDate}
                            onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/5 rounded-xl text-sm px-4 py-3 focus:outline-none focus:border-cyber-cyan/40 transition-colors text-white cursor-pointer"
                          />
                        </div>

                        {/* Salary Range */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Salary/Budget Range</label>
                          <input
                            type="text"
                            name="salaryRange"
                            value={formData.salaryRange}
                            onChange={handleInputChange}
                            placeholder="e.g. $80k - $100k or 15-20 LPA"
                            className="w-full bg-white/5 border border-white/5 rounded-xl text-sm px-4 py-3 focus:outline-none focus:border-cyber-cyan/40 transition-colors text-white"
                          />
                        </div>

                        {/* Work Mode */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Work Mode *</label>
                          <select
                            name="workMode"
                            value={formData.workMode}
                            onChange={handleInputChange}
                            className="w-full bg-cyber-dark border border-white/5 rounded-xl text-sm px-4 py-3 focus:outline-none focus:border-cyber-cyan/40 transition-colors text-white cursor-pointer"
                          >
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Onsite">Onsite</option>
                          </select>
                        </div>

                        {/* Location */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Location</label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="e.g. Gurugram, India or Remote"
                            className="w-full bg-white/5 border border-white/5 rounded-xl text-sm px-4 py-3 focus:outline-none focus:border-cyber-cyan/40 transition-colors text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: MESSAGE DETAILS */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono font-bold tracking-widest text-cyber-pink uppercase">
                        [03_STATEMENT_DATA]
                      </h4>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Role Message Details *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Tell me about the team structure, expectations, tech stacks, or project scopes..."
                          className={`w-full bg-white/5 border rounded-xl text-sm px-4 py-3 focus:outline-none transition-colors text-white resize-none ${
                            errors.message ? 'border-red-500 focus:border-red-500' : 'border-white/5 focus:border-cyber-cyan/40'
                          }`}
                        />
                        {errors.message && <p className="text-[10px] text-red-400 font-mono mt-0.5">{errors.message[0]}</p>}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 mt-2 rounded-xl bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink text-white text-sm font-semibold hover:shadow-cyan-500/25 hover:shadow-lg transition-all active:scale-98 cursor-pointer border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Submit Opportunity Details</span>
                      <Send size={14} />
                    </button>
                  </form>
                </motion.div>
              )}

              {submitStatus === 'sending' && (
                <motion.div
                  key="sending"
                  className="h-[500px] flex flex-col items-center justify-center text-center space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Cpu className="text-cyber-purple animate-spin" size={48} />
                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-white text-base">Processing Opportunity Brief</h4>
                    <p className="text-xs text-cyber-purple font-mono bg-cyber-purple/5 border border-cyber-purple/10 px-4 py-1.5 rounded-lg select-none min-w-[250px]">
                      {statusLog}
                    </p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'success' && (
                <motion.div
                  key="success"
                  className="h-[500px] flex flex-col items-center justify-center text-center space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="h-16 w-16 rounded-full bg-cyber-emerald/15 text-cyber-emerald flex items-center justify-center border border-cyber-emerald/30 animate-bounce">
                    <ShieldCheck size={28} />
                  </div>
                  <div className="space-y-3 px-4">
                    <h4 className="font-heading font-black text-cyber-emerald text-xl uppercase">✅ Opportunity Submitted Successfully</h4>
                    <p className="text-sm text-gray-200 font-semibold mt-4">Thank you for reaching out.</p>
                    <p className="text-xs text-gray-400 max-w-md leading-relaxed mx-auto">
                      Your message has been delivered to Paras Sharma and a confirmation email has been sent to your inbox. I look forward to reviewing it and connecting with you!
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="px-5 py-2.5 rounded-xl border border-white/10 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-all font-mono"
                  >
                    SUBMIT_NEW_OPPORTUNITY
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
