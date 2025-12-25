import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

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

          <div className="flex gap-4 sm:gap-6">
            {/* GitHub Link */}
            <motion.a 
              href="https://github.com/Runhussain" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-3 text-slate-400 hover:text-primary transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Github size={24} className="relative z-10" />
            </motion.a>

            {/* LinkedIn Link */}
            <motion.a 
              href="https://www.linkedin.com/in/runhussain-pasha-shaik" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-3 text-slate-400 hover:text-secondary transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-secondary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Linkedin size={24} className="relative z-10" />
            </motion.a>

            {/* Mail Link */}
            <motion.a 
              href="mailto:skrhp01@gmail.com" 
              whileHover={{ y: -5, scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-3 text-slate-400 hover:text-accent transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-accent/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Mail size={24} className="relative z-10" />
            </motion.a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-slate-500 text-sm flex flex-col items-center gap-2">
          <p>&copy; {new Date().getFullYear()} Shaik RunHussain Pasha. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <Heart size={14} className="text-secondary fill-secondary" />
            </motion.span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;