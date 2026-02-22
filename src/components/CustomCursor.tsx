import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [hoverData, setHoverData] = useState<{ isHovering: boolean, rect: DOMRect | null }>({ isHovering: false, rect: null });
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, .interactive');
      if (interactive) {
        setHoverData({ isHovering: true, rect: interactive.getBoundingClientRect() });
      } else {
        setHoverData({ isHovering: false, rect: null });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  const { isHovering, rect } = hoverData;

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={{
          width: isHovering && rect ? rect.width + 20 : 20,
          height: isHovering && rect ? rect.height + 20 : 20,
          borderRadius: isHovering ? "12px" : "50%",
          opacity: isHovering ? 0.15 : 0.3,
        }}
        style={{
          left: isHovering && rect ? rect.left + rect.width / 2 : cursorXSpring,
          top: isHovering && rect ? rect.top + rect.height / 2 : cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="custom-cursor-dot"
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 1,
        }}
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
