import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

/**
 * SectionWrapper adds a smooth slide-and-fade animation.
 * viewport={{ once: false }} ensures the animation triggers every time 
 * the section enters the view (scrolling top to bottom or bottom to top).
 */
const SectionWrapper: React.FC<Props> = ({ children, id, className = "", delay = 0 }) => {
  return (
    <section id={id} className={`py-12 md:py-24 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ 
          duration: 0.8, 
          delay: delay, 
          ease: [0.22, 1, 0.36, 1] 
        }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;