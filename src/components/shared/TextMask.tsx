import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextMaskProps {
  children?: React.ReactNode;
  delay?: number;
}

export const TextMask: React.FC<TextMaskProps> = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="overflow-hidden block pb-[0.15em]">
      <motion.span
        className="block"
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{ 
          duration: 0.6, 
          delay, 
          ease: [0.22, 1, 0.36, 1],
          opacity: { duration: 0.3, delay }
        }}
      >
        {children}
      </motion.span>
    </div>
  );
};
