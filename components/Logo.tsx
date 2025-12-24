import React from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover="hover"
      initial="initial"
    >
      {/* Background Glow */}
      <motion.div 
        variants={{
          initial: { scale: 0.8, opacity: 0.5 },
          hover: { scale: 1.2, opacity: 0.8 }
        }}
        className="absolute inset-0 bg-primary/20 blur-xl rounded-full"
      />
      
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-[0_0_8px_rgba(var(--color-primary),0.5)]"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(var(--color-primary))" />
            <stop offset="100%" stopColor="rgb(var(--color-secondary))" />
          </linearGradient>
        </defs>

        {/* Abstract R-H Monogram */}
        {/* The 'R' backbone and curve */}
        <motion.path
          d="M30 25V75"
          stroke="url(#logoGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          variants={{
            initial: { pathLength: 0, opacity: 0 },
            animate: { pathLength: 1, opacity: 1 }
          }}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.path
          d="M30 25H50C60 25 65 32 65 40C65 48 60 55 50 55H30"
          stroke="url(#logoGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            initial: { pathLength: 0, opacity: 0 },
            animate: { pathLength: 1, opacity: 1 }
          }}
          initial="initial"
          animate="animate"
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.path
          d="M45 55L65 75"
          stroke="url(#logoGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          variants={{
            initial: { pathLength: 0, opacity: 0 },
            animate: { pathLength: 1, opacity: 1 }
          }}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.8 }}
        />

        {/* The 'H' connection and second leg */}
        <motion.path
          d="M75 25V75"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="8"
          strokeLinecap="round"
          className="group-hover:stroke-accent"
          variants={{
            initial: { pathLength: 0, opacity: 0 },
            animate: { pathLength: 1, opacity: 0.4 },
            hover: { opacity: 1, stroke: "rgb(var(--color-accent))" }
          }}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.path
          d="M50 45H75"
          stroke="white"
          strokeOpacity="0.1"
          strokeWidth="6"
          strokeLinecap="round"
          variants={{
            initial: { pathLength: 0, opacity: 0 },
            animate: { pathLength: 1, opacity: 0.2 },
            hover: { opacity: 0.8, stroke: "rgb(var(--color-accent))" }
          }}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
        />

        {/* Decorative dots */}
        <motion.circle
          cx="85"
          cy="15"
          r="4"
          fill="rgb(var(--color-accent))"
          variants={{
            initial: { scale: 0, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            hover: { y: -5, transition: { repeat: Infinity, repeatType: "reverse", duration: 0.5 } }
          }}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.2 }}
        />
      </svg>
    </motion.div>
  );
};

export default Logo;