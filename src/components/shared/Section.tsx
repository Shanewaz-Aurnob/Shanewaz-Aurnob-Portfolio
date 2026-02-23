import React, { useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface SectionProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
}

import { TextMask } from './TextMask';

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = "", 
  id = "", 
  title = "", 
  subtitle = "" 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
      className={`py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            {subtitle && (
              <TextMask delay={0.1}>
                <span className="text-accent text-[10px] md:text-xs uppercase tracking-[0.5em] mb-4 block font-bold">
                  {subtitle}
                </span>
              </TextMask>
            )}
            {title && (
              <TextMask delay={0.2}>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tighter leading-relaxed">
                  {title}
                </h2>
              </TextMask>
            )}
          </div>
          <div className="hidden md:block w-32 h-[1px] bg-white/10 mb-4"></div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};
