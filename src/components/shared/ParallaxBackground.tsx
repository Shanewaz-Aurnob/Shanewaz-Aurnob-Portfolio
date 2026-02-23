import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export const ParallaxBackground: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const x1 = useTransform(mouseX, [0, 2000], [50, -50]);
  const y1 = useTransform(mouseY, [0, 1000], [50, -50]);
  const x2 = useTransform(mouseX, [0, 2000], [-30, 30]);
  const y2 = useTransform(mouseY, [0, 1000], [-30, 30]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div 
        style={{ x: x1, y: y1 }}
        className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px]"
      />
      <motion.div 
        style={{ x: x2, y: y2 }}
        className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-accent/5 rounded-full blur-[100px]"
      />
      <div className="absolute inset-0 noise-bg opacity-[0.03] mix-blend-overlay"></div>
    </div>
  );
};
