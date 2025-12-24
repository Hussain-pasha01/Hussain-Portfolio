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
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-10 w-20 h-20 bg-secondary/10 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-1/4 w-32 h-32 bg-accent/5 rounded-full blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Me</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-400 max-w-3xl mx-auto">
            I am a motivated Computer Science Engineering graduate with strong problem-solving abilities 
            and an eagerness to contribute to scalable applications. My passion lies in both frontend 
            and backend development, specifically utilizing PHP, Laravel, and modern JavaScript frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Education Column */}
          <div>
            <h3 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">
              <span className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20"><GraduationCap size={24} /></span>
              Education
            </h3>
            <div className="space-y-8 relative border-l border-slate-800 ml-3 pl-8">
              {educationData.map((edu, index) => (
                <div key={index} className="relative group">
                  <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-slate-950 bg-slate-700 group-hover:bg-primary transition-colors duration-300"></span>
                  <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                    <p className="text-primary font-medium mt-1">{edu.institution}</p>
                    <div className="flex items-center gap-2 mt-3 text-sm text-slate-400">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {edu.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div>
            <h3 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">
              <span className="p-2 bg-secondary/10 rounded-lg text-secondary border border-secondary/20"><Award size={24} /></span>
              Certifications
            </h3>
            <div className="grid gap-4">
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 bg-slate-800/40 p-5 rounded-xl border border-slate-700/50 hover:border-secondary/50 transition-all duration-300 hover:translate-x-2 hover:bg-slate-800/60 backdrop-blur-sm"
                >
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors">
                      {cert.name}
                    </h4>
                    <p className="text-sm text-slate-500 mt-0.5">Issued by {cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;