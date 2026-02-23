import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 50, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        exit={{ opacity: 0, y: 50, x: "-50%" }}
        className="fixed bottom-10 left-1/2 z-[200] px-6 py-3 bg-accent text-dark font-bold rounded-full shadow-2xl flex items-center gap-3"
      >
        <Check size={18} /> {message}
      </motion.div>
    )}
  </AnimatePresence>
);
