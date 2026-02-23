import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children?: React.ReactNode;
  className?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    const xPct = mX / width - 0.5;
    const yPct = mY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    mouseX.set(mX);
    mouseY.set(mY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glowX = useSpring(mouseX);
  const glowY = useSpring(mouseY);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group ${className}`}
    >
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([mX, mY]) => `radial-gradient(400px circle at ${mX}px ${mY}px, rgba(16,185,129,0.1), transparent 80%)`
          )
        }}
      />
      <div style={{ transform: "translateZ(50px)" }} className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
};
