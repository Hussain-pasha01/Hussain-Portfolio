import React from 'react';
import SectionWrapper from './SectionWrapper';
import { Skill } from '../types';
import { motion } from 'framer-motion';

// Helper component for standardizing icon styles across the grid
const TechIcon = ({ src, alt, padding = "p-3", className = "" }: { src: string; alt: string; padding?: string; className?: string }) => (
  <img 
    src={src} 
    alt={alt} 
    className={`w-full h-full object-contain drop-shadow-md ${padding} ${className}`} 
    loading="lazy"
  />
);

const skills: Skill[] = [
  { name: 'HTML5', category: 'Frontend', icon: () => <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" /> },
  { name: 'CSS3', category: 'Frontend', icon: () => <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" /> },
  { name: 'JavaScript', category: 'Frontend', icon: () => <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" /> },
  { name: 'Bootstrap', category: 'Frontend', icon: () => <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" /> },
  { name: 'Tailwind CSS', category: 'Frontend', icon: () => <TechIcon src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" /> },
  { name: 'PHP', category: 'Backend', icon: () => <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" /> },
  { name: 'Laravel', category: 'Backend', icon: () => <TechIcon src="https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg" alt="Laravel" /> },
  { name: 'MySQL', category: 'Database', icon: () => <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" alt="MySQL" padding="p-0.5" /> },
  { name: 'Python', category: 'Languages', icon: () => <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" /> },
  { 
    name: 'WordPress', 
    category: 'Tools', 
    icon: () => <TechIcon src="https://upload.wikimedia.org/wikipedia/commons/2/20/WordPress_logo.svg" alt="WordPress" padding="p-0" className="scale-[1.2] md:scale-[1.35] drop-shadow-xl" /> 
  },
];

const Skills: React.FC = () => {
  return (
    <SectionWrapper id="skills" className="bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden transform-gpu">
      {/* Background Aesthetic Glows */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-secondary/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Stack</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-400 text-lg font-medium opacity-80">My essential tools for modern software development</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-10 max-w-5xl mx-auto">
          {skills.map((skill, index) => {
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: (index % 5) * 0.05 }}
                className="group relative flex flex-col items-center justify-center aspect-square will-change-transform transform-gpu"
              >
                {/* Enhanced Card Backlight Shadow Layers */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-secondary/20 to-accent/30 blur-[40px] opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-full scale-90 -z-10"></div>
                <div className="absolute inset-0 bg-primary/10 blur-[20px] opacity-0 group-hover:opacity-60 transition-all duration-500 rounded-full -z-10"></div>
                
                {/* Skill Icon Container - Larger icons for mobile view */}
                <div className="w-full h-full bg-slate-900/60 backdrop-blur-md rounded-[2rem] border border-slate-800/60 transition-all duration-500 group-hover:bg-slate-950 group-hover:border-primary/40 group-hover:-translate-y-2 flex items-center justify-center shadow-2xl relative overflow-hidden z-10">
                  {/* Internal card glow */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 md:w-24 md:h-24 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center will-change-transform">
                    {skill.icon && <skill.icon />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;