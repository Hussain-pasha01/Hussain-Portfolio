import React from 'react';
import SectionWrapper from './SectionWrapper';
import { Skill } from '../types';
import { motion } from 'framer-motion';

// Helper component for standardizing icon styles across the grid
const TechIcon = ({ src, alt, padding = "p-4", className = "" }: { src: string; alt: string; padding?: string; className?: string }) => (
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
  { name: 'Bootstrap 5', category: 'Frontend', icon: () => <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" /> },
  { name: 'Tailwind CSS', category: 'Frontend', icon: () => <TechIcon src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" /> },
  { name: 'PHP', category: 'Backend', icon: () => <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" /> },
  { name: 'Laravel', category: 'Backend', icon: () => <TechIcon src="https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg" alt="Laravel" /> },
  { name: 'MySQL', category: 'Database', icon: () => <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" alt="MySQL" padding="p-0.5" /> },
  { name: 'Python', category: 'Languages', icon: () => <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" /> },
  { 
    name: 'WordPress', 
    category: 'Tools', 
    // Increased size for WordPress icon by removing padding and adding a significant scale
    icon: () => <TechIcon src="https://upload.wikimedia.org/wikipedia/commons/2/20/WordPress_logo.svg" alt="WordPress" padding="p-0" className="scale-[1.35] drop-shadow-xl" /> 
  },
];

const Skills: React.FC = () => {
  return (
    <SectionWrapper id="skills" className="bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Aesthetic Glows */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-secondary/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Stack</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-400 text-lg">My essential tools for modern software development</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => {
            // Determine if the item is in the bottom row for tooltip positioning.
            // On LG (5 cols), items with index 5-9 are bottom row.
            // We ensure it defaults to bottom positioning for the second half of the list.
            const isBottomRow = index >= 5;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: (index % 5) * 0.1 }}
                className="group relative flex flex-col items-center justify-center aspect-square"
              >
                {/* Card Glow Background */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full scale-75 -z-10"></div>
                
                {/* Skill Icon Container */}
                <div className="w-full h-full bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 transition-all duration-500 group-hover:bg-slate-800/90 group-hover:border-primary/40 group-hover:-translate-y-2 flex items-center justify-center shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                    {skill.icon && <skill.icon />}
                  </div>
                </div>
                
                {/* Tooltip Label - Positioned at top for upper row, bottom for bottom row */}
                <div className={`absolute left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 ${isBottomRow ? '-bottom-12' : '-top-12'}`}>
                  {skill.name}
                  {/* Tooltip Arrow */}
                  <div className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-r border-b border-slate-700 rotate-45 ${isBottomRow ? '-top-1 border-r-0 border-b-0 border-l border-t' : '-bottom-1'}`}></div>
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