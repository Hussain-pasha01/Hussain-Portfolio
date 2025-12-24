import React from 'react';
import SectionWrapper from './SectionWrapper';
import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { Experience as ExperienceType } from '../types';

const experiences: ExperienceType[] = [
  {
    role: "Web Developer (Full-time)",
    company: "Aeologic Technologies",
    duration: "July 2025 – Present",
    description: [
      "Promoted to full-time role following a successful internship period.",
      "Developing and maintaining large-scale web applications using Laravel and modern PHP.",
      "Collaborating with cross-functional teams to deliver high-quality software solutions.",
      "Optimizing database performance and ensuring code scalability."
    ]
  },
  {
    role: "Web Developer Intern",
    company: "Aeologic Technologies",
    duration: "April 2025 – July 2025 (3 Months)",
    description: [
      "Worked on full-stack web development projects using both custom code and frameworks.",
      "Developed responsive user interfaces using HTML, CSS, JavaScript, and Bootstrap.",
      "Built dynamic backend functionalities using PHP and Laravel framework.",
      "Gained hands-on experience in WordPress theme customization and plugin integration.",
      "Implemented and managed MySQL databases for data storage and retrieval.",
      "Used Git and GitHub for version control and collaborative development."
    ]
  }
];

const Experience: React.FC = () => {
  return (
    <SectionWrapper id="experience" className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Animated Vertical Lines */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.div 
          animate={{ height: ['0%', '100%'], opacity: [0, 0.5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 0 }}
          className="absolute left-[10%] top-0 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent"
        />
        <motion.div 
          animate={{ height: ['0%', '100%'], opacity: [0, 0.5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 4 }}
          className="absolute left-[90%] top-0 w-[1px] bg-gradient-to-b from-transparent via-secondary/20 to-transparent"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Experience</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline Container */}
          <div className="relative border-l-2 border-slate-800 pl-8 ml-4 md:ml-0 space-y-12">
            
            {experiences.map((exp, index) => (
              <div key={index} className="relative group">
                <div className={`absolute -left-[41px] top-0 h-6 w-6 rounded-full border-4 border-slate-950 ${index === 0 ? 'bg-primary shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'bg-secondary shadow-[0_0_15px_rgba(217,70,239,0.5)]'}`}></div>
                
                <div className="bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-slate-700/50 hover:border-primary/50 transition-all duration-300 shadow-xl relative overflow-hidden backdrop-blur-sm">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${index === 0 ? 'bg-primary/10' : 'bg-secondary/10'} rounded-full blur-[50px] pointer-events-none`}></div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2 relative z-10">
                    <div>
                      <h3 className={`text-xl md:text-2xl font-bold text-white ${index === 0 ? 'group-hover:text-primary' : 'group-hover:text-secondary'} transition-colors`}>{exp.role}</h3>
                      <div className="flex items-center gap-2 text-slate-400 mt-1">
                        <Briefcase size={16} className="text-accent" />
                        <span className="font-medium text-base md:text-lg">{exp.company}</span>
                      </div>
                    </div>
                    <div className={`px-4 py-1.5 ${index === 0 ? 'bg-primary/10 text-primary border-primary/20' : 'bg-secondary/10 text-secondary border-secondary/20'} border rounded-full text-sm font-semibold w-fit mt-2 md:mt-0`}>
                      {exp.duration}
                    </div>
                  </div>

                  <ul className="space-y-4 relative z-10">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300">
                        <span className={`mt-2 h-1.5 w-1.5 rounded-full ${index === 0 ? 'bg-primary' : 'bg-secondary'} shrink-0`}></span>
                        <span className="leading-relaxed text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Experience;