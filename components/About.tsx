import React from 'react';
import SectionWrapper from './SectionWrapper';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { Education, Certification } from '../types';
import { motion } from 'framer-motion';

const educationData: Education[] = [
  {
    degree: 'B.Tech - Computer Science Engineering',
    institution: 'Raghu Engineering College',
    year: '2021 - 2025'
  },
  {
    degree: 'Intermediate',
    institution: 'Deeksha Junior College',
    year: '2019 - 2021'
  },
  {
    degree: 'SSC',
    institution: 'Sree Vidya Public School',
    year: '2018 - 2019'
  }
];

const certifications: Certification[] = [
  { name: 'Data Base Management System', issuer: 'NPTEL' },
  { name: 'Introduction to Internet of Things', issuer: 'NPTEL' },
  { name: 'Web Development / Java Script', issuer: 'EXCELR' },
  { name: 'Python (Basic)', issuer: 'HackerRank' },
];

const About: React.FC = () => {
  return (
    <SectionWrapper id="about" className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-10 w-20 h-20 bg-secondary/10 rounded-full blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Me</span>
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
              I am a motivated Computer Science Engineering graduate with strong problem-solving abilities and an eagerness to contribute to scalable applications. My passion lies in both frontend and backend development, specifically utilizing PHP, Laravel, and modern JavaScript frameworks.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Education Column */}
          <div>
            <h3 className="flex items-center gap-4 text-2xl font-bold text-white mb-10">
              <span className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20 shadow-inner"><GraduationCap size={28} /></span>
              Education
            </h3>
            <div className="space-y-10 relative border-l-2 border-slate-800 ml-4 pl-8">
              {educationData.map((edu, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ x: 8 }}
                  className="relative group"
                >
                  <span className="absolute -left-[41px] top-1.5 h-6 w-6 rounded-full border-4 border-slate-950 bg-slate-800 group-hover:bg-primary transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(var(--color-primary),0.5)]"></span>
                  
                  {/* Subtle Backlight Shadow */}
                  <div className="absolute -inset-2 bg-primary/5 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  
                  <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800/60 group-hover:border-primary/40 transition-all duration-300 shadow-xl backdrop-blur-md relative z-10 overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform"></div>
                    <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{edu.degree}</h4>
                    <p className="text-slate-300 font-bold mt-1 text-lg">{edu.institution}</p>
                    <div className="flex items-center gap-2 mt-4 text-xs font-black text-slate-500 uppercase tracking-widest">
                      <Calendar size={14} className="text-primary" /> {edu.year}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div>
            <h3 className="flex items-center gap-4 text-2xl font-bold text-white mb-10">
              <span className="p-3 bg-secondary/10 rounded-xl text-secondary border border-secondary/20 shadow-inner"><Award size={28} /></span>
              Certifications
            </h3>
            <div className="grid gap-6">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ x: 10 }}
                  className="group relative"
                >
                  {/* Subtle Backlight Shadow */}
                  <div className="absolute -inset-2 bg-secondary/5 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  
                  <div className="flex items-center gap-6 bg-slate-900/60 p-6 rounded-xl border border-slate-800/60 group-hover:border-secondary/40 transition-all duration-300 shadow-xl backdrop-blur-md relative z-10 overflow-hidden">
                    <div className="h-14 w-14 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 group-hover:scale-110 group-hover:bg-secondary/20 transition-all">
                      <Award size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-secondary transition-colors">
                        {cert.name}
                      </h4>
                      <p className="text-xs font-black text-slate-500 uppercase tracking-wider mt-1.5 opacity-70">Issued by {cert.issuer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;