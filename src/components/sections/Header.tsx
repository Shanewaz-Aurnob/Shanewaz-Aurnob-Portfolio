import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const bdTime = time.toLocaleTimeString('en-US', { 
    timeZone: 'Asia/Dhaka', 
    hour12: true, 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const navItems = ['About', 'Skills', 'Research', 'Projects', 'Education', 'Resume', 'Awards', 'Contact'];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-3 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-dark/90 backdrop-blur-xl py-2 border-b border-white/5' : 'bg-transparent'}`}>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-50"
        style={{ scaleX }}
      />
      
      <div className="flex items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: 5 }}
          className="text-lg font-serif tracking-tighter cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          S.<span className="text-accent group-hover:text-white transition-colors">A.</span>
        </motion.div>

        <div className="hidden lg:flex items-center gap-6 pl-8 border-l border-white/10">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-white/20 font-bold">Current Time (BD)</span>
            <span className="text-xs font-mono text-white/60">{bdTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-accent font-bold">Available for Work</span>
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        {navItems.map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-accent transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
          </motion.a>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden relative z-[60] p-2 text-white/60 hover:text-white transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-dark z-[55] flex flex-col items-center justify-center gap-8 p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none"></div>
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-serif text-white/60 hover:text-accent transition-colors italic"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
