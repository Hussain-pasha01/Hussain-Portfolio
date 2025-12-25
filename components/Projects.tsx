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

const Projects: React.FC = () => {
  return (
    <SectionWrapper id="projects" className="relative overflow-hidden bg-slate-950">
      {/* Dynamic background lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10 opacity-30"></div>

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
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium opacity-80">
              Showcasing my technical implementations and professional engineering solutions.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="group relative h-full"
            >
              {/* Outer Glow Effect on Hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

              {/* Card Container */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-primary/40 group-hover:bg-slate-900/60 shadow-2xl shadow-black/50">
                
                {/* Visual Header / Card Top */}
                <div className={`h-2 w-full bg-gradient-to-r ${index % 2 === 0 ? 'from-primary via-secondary to-accent' : 'from-accent via-primary to-secondary'} opacity-30 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon and Title Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'} border border-white/5 transition-transform duration-500 group-hover:scale-110 shadow-inner`}>
                        {index === 0 && <Cpu size={22} strokeWidth={1.5} />}
                        {index === 1 && <Globe size={22} strokeWidth={1.5} />}
                        {index === 2 && <Layout size={22} strokeWidth={1.5} />}
                        {index === 3 && <Search size={22} strokeWidth={1.5} />}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300 tracking-tight">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-800">
                            {project.role}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a href="https://github.com/Runhussain" className="p-2 text-slate-500 hover:text-white transition-all bg-slate-800/30 rounded-lg hover:bg-slate-800">
                        <Github size={18} />
                      </a>
                      {project.link && (
                        <a href={project.link} className="p-2 text-slate-500 hover:text-white transition-all bg-slate-800/30 rounded-lg hover:bg-slate-800">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Body Text */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium line-clamp-4">
                    {project.description}
                  </p>

                  {/* Refined Feature Badges */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.features && project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/40 rounded-lg border border-slate-800/50 text-slate-300 text-[11px] font-bold group-hover:border-primary/20 transition-colors">
                        <Sparkles size={11} className="text-secondary" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack - Bottom Aligned */}
                  <div className="mt-auto pt-6 border-t border-slate-800/40 flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-2.5 py-1 bg-slate-950/60 text-[10px] font-black text-slate-500 rounded-lg border border-slate-800 group-hover:text-slate-300 group-hover:border-slate-700 transition-all duration-300 uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <a 
            href="https://github.com/Runhussain" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white font-bold transition-all duration-300 hover:border-primary/50 hover:bg-slate-800"
          >
            <Code2 size={20} className="text-primary group-hover:scale-110 transition-transform" />
            <span>Explore All Projects on GitHub</span>
            <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;