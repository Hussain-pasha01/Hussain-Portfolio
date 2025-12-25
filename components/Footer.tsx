import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-slate-900 py-12 relative overflow-hidden">
      {/* Top Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Shaik RunHussain</h2>
            <p className="text-slate-500 text-sm">
              Building digital experiences with passion and code.
            </p>
          </div>

          <div className="flex gap-6">
            {/* <a 
              href="https://github.com/Runhussain" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors hover:-translate-y-1 transform duration-300 hover:text-primary"
            >
              <Github size={24} />
            </a> */}
            <a 
              href="https://www.linkedin.com/in/runhussain-pasha-shaik" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors hover:-translate-y-1 transform duration-300 hover:text-secondary"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="#contact" 
              className="text-slate-400 hover:text-white transition-colors hover:-translate-y-1 transform duration-300 hover:text-accent"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-slate-500 text-sm flex flex-col items-center gap-2">
          <p>&copy; {new Date().getFullYear()} Shaik RunHussain Pasha. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className="text-secondary fill-secondary" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;