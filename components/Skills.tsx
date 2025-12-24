import React, { ComponentProps } from 'react';
import SectionWrapper from './SectionWrapper';
import { Skill } from '../types';
import { motion, Variants } from 'framer-motion';

// Custom Tech Icons
const HtmlIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M1.5 0h21l-1.91 21.563L12 24 3.41 21.563 1.5 0zm17.123 6.643H6.857l.504 5.643h9.636l-.375 4.14-4.622 1.252-4.636-1.26-.263-2.924h-3.95l.466 6.32L12 21.606l8.384-2.323.957-12.64z"/>
  </svg>
);

const CssIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M1.5 0h21l-1.91 21.563L12 24 3.41 21.563 1.5 0zm7.36 17.618L12 18.42l3.125-.8 1.055-5.26H8.384l-.32-3.562H17l.313-3.562H4.073l.97 10.875 6.957 1.936 6.957-1.936.438-5.316h-3.95l-.125 1.765-2.327.632-2.327-.632-.158-1.94z"/>
  </svg>
);

const JsIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M3 3h18v18H3V3zm12.375 6.28c-1.125 0-1.895.66-2.14 1.73l1.55.22c.11-.475.4-.76.92-.76.545 0 .84.325.84.775 0 .39-.17.65-.79 1.03l-.755.45c-.85.51-1.175.98-1.175 1.83v.135h1.79v-.115c0-.46.16-.72.825-1.12l.715-.425c.895-.535 1.265-1.07 1.265-2.025 0-1.42-1.09-2.22-2.375-2.22zm-4.5 0c-1.125 0-1.895.66-2.14 1.73l1.55.22c.11-.475.4-.76.92-.76.545 0 .84.325.84.775 0 .39-.17.65-.79 1.03l-.755.45c-.85.51-1.175.98-1.175 1.83v.135h1.79v-.115c0-.46.16-.72.825-1.12l.715-.425c.895-.535 1.265-1.07 1.265-2.025 0-1.42-1.09-2.22-2.375-2.22z"/>
  </svg>
);

const BootstrapIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4.5 0C2.015 0 0 2.015 0 4.5v15C0 21.985 2.015 24 4.5 24h15c2.485 0 4.5-2.015 4.5-4.5v-15C24 2.015 21.985 0 19.5 0h-15zm4.8 6.9h5.1c1.95 0 3.3 1.2 3.3 3.15 0 1.05-.45 1.8-1.2 2.25.9.45 1.5 1.35 1.5 2.4 0 2.1-1.5 3.3-3.6 3.3H9.3V6.9zm2.4 2.1v2.7h2.25c.75 0 1.2-.45 1.2-1.35 0-.9-.45-1.35-1.2-1.35h-2.25zm0 4.8v3h2.55c.9 0 1.35-.45 1.35-1.5 0-1.05-.45-1.5-1.35-1.5h-2.55z"/>
  </svg>
);

const TailwindIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89-2.288-1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
  </svg>
);

const PhpIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.8 5.6h2.7c1.8 0 2.9 1 2.9 2.7v.5c0 1.1-.5 1.9-1.3 2.4.9.4 1.4 1.2 1.4 2.3v.8c0 1.7-1.1 2.7-2.9 2.7H12.8V5.6zm1.9 6.2h1.1c.7 0 1.1-.4 1.1-1.1v-.5c0-.7-.4-1.1-1.1-1.1h-1.1v2.7zm0 5.2h1.2c.7 0 1.1-.4 1.1-1.1v-.8c0-.7-.4-1.1-1.1-1.1h-1.2V17zm-10.3-4.1h1.7v4.1h1.9v-4.1h1.7v6.6H2.5v-6.6zm-1-7.3H5v4.1h2.5c1.4 0 2.2-.8 2.2-2.1v-.1c0-1.2-.8-1.9-2.2-1.9H1.5zm1.7 1.5h1.5c.5 0 .8.2.8.6v.1c0 .4-.3.6-.8.6H3.2V7.1z"/>
  </svg>
);

const LaravelIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M8.3 4l-4.2 1.5 1.6 15.3L19.5 24l4.2-1.5L20 4 8.3 4zm3.6 14.3l-1.2-8.9 1.9-.3.7 5.9h6l-.4 2.9-7 .4zM10.8 7.9l1.2-.2.3 2.2-1.2.2-.3-2.2zm5.4-.8l1.2-.2.3 2.2-1.2.2-.3-2.2z"/>
  </svg>
);

const MysqlIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.373 0 0 4.3 0 9.6c0 3.8 2.8 7.1 6.8 8.7-.3 2.1-1.9 3.2-1.9 3.2s4.8 0 7.7-4.1c4.5.4 9-2.2 9-7.8C21.6 4.3 17.373 0 12 0z"/>
  </svg>
);

const CIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm-2.25-17.25c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6z"/>
    <text x="12" y="16" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="bold">C</text>
  </svg>
);

const PythonIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14.25.75l-.65 2h-3.2l-.65-2h4.5zM12 24c6.6 0 12-5.4 12-12h-4c0 4.4-3.6 8-8 8s-8-3.6-8-8H0c0 6.6 5.4 12 12 12zM12 0c-6.6 0-12 5.4-12 12h4c0-4.4 3.6-8 8-8s8 3.6 8 8h4c0-6.6-5.4-12-12-12z"/>
    <circle cx="9" cy="9" r="1.5" />
    <circle cx="15" cy="15" r="1.5" />
  </svg>
);

const JavaIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 23c5 0 9-4 9-9s-4-9-9-9-9 4-9 9 4 9 9 9zm-2-5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm-4-9v-2h12v2H6z"/>
  </svg>
);

const WordpressIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12,0C5.373,0,0,5.373,0,12c0,5.088,3.193,9.458,7.746,11.205c-0.108-0.965-0.203-2.454,0.04-3.513 c0.222-0.959,1.444-6.115,1.444-6.115s-0.359-0.718-0.359-1.782c0-1.67,0.967-2.915,2.172-2.915c1.025,0,1.52,0.769,1.52,1.691 c0,1.031-0.655,2.573-0.993,4.002c-0.282,1.196,0.6,2.172,1.777,2.172c2.133,0,3.772-2.249,3.772-5.492 c0-2.87-2.063-4.876-5.009-4.876c-3.649,0-5.791,2.736-5.791,5.568c0,1.102,0.424,2.284,0.953,2.925c0.104,0.126,0.119,0.237,0.088,0.365 c-0.096,0.403-0.311,1.266-0.352,1.442c-0.056,0.235-0.187,0.284-0.43,0.171c-1.603-0.746-2.605-3.085-2.605-4.965 c0-4.043,2.939-7.755,8.471-7.755c4.448,0,7.906,3.169,7.906,7.327c0,4.372-2.756,7.892-6.58,7.892c-1.284,0-2.492-0.669-2.906-1.458 l-0.791,3.007c-0.286,1.087-1.062,2.448-1.583,3.279C10.596,23.834,11.288,24,12,24c6.627,0,12-5.373,12-12S18.627,0,12,0z"/>
  </svg>
);

const GitIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.652 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.54-.539-.69-1.314-.412-1.986L7.49 3.613l-6.9 7.02c-.6.6-.6 1.6 0 2.2l10.4 10.5c.6.6 1.6.6 2.2 0l10.4-10.4c.6-.6.6-1.5-.044-2.003z"/>
  </svg>
);

const AwsIcon = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 16.5c-3.5 0-6.6-1.3-9-3.5.8-.8 1.5-1.5 1.5-1.5C6.5 13.2 9 14.2 12 14.2c2.5 0 4.8-.8 6.5-2 .5.8 1 1.6 1 1.6C17.2 15.4 14.8 16.5 12 16.5z"/>
    <path d="M18.8 14.7l1.5 2.2c-1 .8-2.3 1.5-3.8 2l.3 2.1c2.1-.8 4-1.9 5.2-3.3L18.8 14.7z"/>
  </svg>
);

const skills: Skill[] = [
  { name: 'HTML5', category: 'Frontend', icon: HtmlIcon },
  { name: 'CSS3', category: 'Frontend', icon: CssIcon },
  { name: 'JavaScript', category: 'Frontend', icon: JsIcon },
  { name: 'Bootstrap 5', category: 'Frontend', icon: BootstrapIcon },
  { name: 'Tailwind CSS', category: 'Frontend', icon: TailwindIcon },
  { name: 'PHP', category: 'Backend', icon: PhpIcon },
  { name: 'Laravel', category: 'Backend', icon: LaravelIcon },
  { name: 'MySQL', category: 'Database', icon: MysqlIcon },
  { name: 'C Language', category: 'Languages', icon: CIcon },
  { name: 'Python (Basic)', category: 'Languages', icon: PythonIcon },
  { name: 'Java (Basic)', category: 'Languages', icon: JavaIcon },
  { name: 'WordPress', category: 'Tools', icon: WordpressIcon },
  { name: 'Git & GitHub', category: 'Tools', icon: GitIcon },
  { name: 'AWS Cloud (Basic)', category: 'Tools', icon: AwsIcon },
];

const Skills: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <SectionWrapper id="skills" className="bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-secondary/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Stack</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-400 text-lg">Hover to discover my digital toolbox</p>
        </div>

        <motion.div 
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              aria-label={skill.name}
              className="group relative flex flex-col items-center justify-center aspect-square"
            >
              {/* TRUE BACKLIGHT: Outside/Behind the card */}
              <div className="absolute inset-0 bg-primary/40 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full scale-75 group-hover:scale-125 -z-10 pointer-events-none"></div>
              
              {/* Card Surface */}
              <div className="w-full h-full bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 transition-all duration-300 group-hover:bg-slate-800/80 group-hover:border-primary/50 group-hover:-translate-y-2 flex items-center justify-center shadow-2xl relative overflow-hidden">
                {/* Subtle internal gradient to give card depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                
                {/* Icon */}
                <div className="relative z-10 p-4 transition-all duration-300 group-hover:scale-110">
                  {skill.icon && (
                    <skill.icon className="w-12 h-12 text-slate-500 group-hover:text-white transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
                  )}
                </div>
              </div>
              
              {/* Tooltip name (only visible on large screens or specific hover) */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 border border-slate-700 rounded-md text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 pointer-events-none shadow-xl">
                {skill.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;