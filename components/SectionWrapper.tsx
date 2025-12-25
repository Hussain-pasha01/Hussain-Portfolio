import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

/**
 * SectionWrapper adds a smooth slide-and-fade animation with GPU optimization.
 * This version is tuned for performance to ensure glitch-free scrolling on mobile and tablet.
 */
const SectionWrapper: React.FC<Props> = ({ children, id, className = "", delay = 0 }) => {
  return (
    <section id={id} className={`py-12 md:py-24 transform-gpu ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ 
          duration: 0.5, 
          delay: delay, 
          ease: [0.25, 1, 0.5, 1] 
        }}
        className="will-change-transform transform-gpu"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;