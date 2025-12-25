import React from 'react';
import SectionWrapper from './SectionWrapper';
import { ExternalLink, Code2, Sparkles, Globe, Cpu, Github, Layout, Search } from 'lucide-react';
import { Project } from '../types';
import { motion } from 'framer-motion';

const projectsData: Project[] = [
  {
    title: 'Event Management System',
    description: 'A sophisticated Full Stack ecosystem for orchestrating complex events. Features real-time participant tracking and robust security architectures.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Tailwind'],
    role: 'Full Stack Developer',
    features: [
      'Role-based access',
      'Real-time tracking',
      'Analytics dashboards'
    ]
  },
  {
    title: 'Digital Portfolio V2',
    description: 'A performance-optimized digital showcase designed for maximum conversion. Leverages high-fidelity animations and SEO-first architecture.',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind'],
    role: 'Frontend Developer',
    features: [
      'Smooth animations',
      'SEO optimized',
      'Responsive design'
    ]
  },
  {
    title: 'Aeologic Company Website',
    description: 'Orchestrated the development and scaling of the primary corporate platform using Laravel. Implemented advanced SEO keyword strategies, optimized page load speeds, and engineered high-fidelity UI components for cross-device excellence.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    role: 'Web Developer',
    features: [
      'Blade Template Engine',
      'SEO Architecture',
      'UI/UX Optimization'
    ]
  },
  {
    title: 'Track and Trace Website',
    description: 'Architected a dynamic logistics monitoring interface powered by the Laravel ecosystem. Focused on real-time data flow, optimized search ranking through structured keyword data, and automated communication pipelines.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
    role: 'Web Developer',
    features: [
      'Eloquent Relations',
      'Dynamic Tracking Flow',
      'Functional Testing'
    ]
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ 
        y: -12, 
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] }
      }}
      className="group relative h-full w-full"
    >
      {/* Subtle Shadow on Hover - No Blur on Section, Just Card Shadow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Main Card Container - Solid Background, No Blur */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-primary/50 group-hover:bg-slate-950 shadow-xl relative z-10">
        
        {/* Visual Top Highlight */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${index % 2 === 0 ? 'from-primary via-secondary' : 'from-accent via-primary'} opacity-40 group-hover:opacity-100 transition-opacity duration-300`}></div>

        <div className="p-8 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'} border border-white/5 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/5`}>
                {index === 0 && <Cpu size={24} />}
                {index === 1 && <Globe size={24} />}
                {index === 2 && <Layout size={24} />}
                {index === 3 && <Search size={24} />}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mt-1">
                  {project.role}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <a 
                href="https://github.com/Runhussain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-white transition-all bg-slate-800/20 rounded-lg hover:bg-slate-800"
              >
                <Github size={18} />
              </a>
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-slate-500 hover:text-white transition-all bg-slate-800/20 rounded-lg hover:bg-slate-800"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-8 group-hover:text-white transition-colors duration-300 font-medium">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.features && project.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-[11px] font-bold group-hover:border-primary/30">
                <Sparkles size={11} className="text-secondary" />
                {feature}
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-slate-800/40 flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span 
                key={i} 
                className="px-2 py-0.5 bg-slate-950 text-[10px] font-black text-slate-500 rounded-md border border-slate-800 group-hover:text-slate-300 group-hover:border-slate-700 transition-all uppercase tracking-tight"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <SectionWrapper id="projects" className="relative overflow-hidden bg-slate-950">
      {/* Background Lighting Decorations Removed for non-blurry solid look */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Projects</span>
            </h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6"></div>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
              Technical implementations and scalable professional engineering solutions.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a 
            href="https://github.com/Runhussain" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white font-bold transition-all duration-300 hover:border-primary/50 hover:bg-slate-800 shadow-xl"
          >
            <Code2 size={20} className="text-primary group-hover:scale-110 transition-transform" />
            <span>Explore Entire Portfolio</span>
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;