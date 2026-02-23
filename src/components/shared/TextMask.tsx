import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextMaskProps {
  children?: React.ReactNode;
  delay?: number;
}

export const TextMask: React.FC<TextMaskProps> = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  return (
    <div ref={ref} className="text-mask">
      <motion.span
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.span>
    </div>
  );
};
