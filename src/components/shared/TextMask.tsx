import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TextMaskProps {
  children?: React.ReactNode;
  delay?: number;
}

export const TextMask: React.FC<TextMaskProps> = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Don't disconnect - keep observing in case of viewport changes
        }
      },
      { threshold: 0.01, rootMargin: '-50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className="overflow-hidden block pb-[0.15em]">
      <motion.span
        className="block"
        initial={{ y: "100%", opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
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

