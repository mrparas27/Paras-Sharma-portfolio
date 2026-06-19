import React from 'react';
import { Github, Linkedin, ArrowUp, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-cyber-dark/85 py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand logo */}
        <div className="flex items-center">
          <span className="font-heading font-black text-white text-sm tracking-widest">
            PARAS <span className="text-cyber-cyan">SHARMA</span>
          </span>
        </div>

        {/* Center: copyright details */}
        <p className="text-xs text-gray-500 font-mono">
          &copy; {new Date().getFullYear()} PARAS SHARMA. ALL VECTORS CONSECUTED.
        </p>

        {/* Right side: Social icons and Scroll to top */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <a
              href="https://github.com/mrparas27"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyber-pink/50 transition-colors"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/parassharma27/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyber-cyan/50 transition-colors"
            >
              <Linkedin size={16} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-all hover:-translate-y-1 active:scale-95"
            title="Scroll to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
}
