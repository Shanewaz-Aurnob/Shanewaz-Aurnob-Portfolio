import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const bdTime = time.toLocaleTimeString('en-US', { 
    timeZone: 'Asia/Dhaka', 
    hour12: true, 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const navItems = ['About', 'Skills', 'Research', 'Projects', 'Education', 'Awards', 'Social Work', 'Contact'];

  // Map nav items to their actual section IDs
  const getHref = (item: string) => {
    const idMap: Record<string, string> = {
      'Social Work': 'gallery',
    };
    return `#${idMap[item] || item.toLowerCase()}`;
  };

  const handleMenuToggle = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] px-4 md:px-8 py-3 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-dark/90 backdrop-blur-xl py-2 border-b border-white/5' : 'bg-transparent'}`}>
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[101]"
          style={{ scaleX }}
        />
        
        <div className="flex items-center gap-6 md:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: 5 }}
            className="text-base md:text-lg font-serif tracking-tighter cursor-pointer group"
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
        <div className="hidden lg:flex gap-8 items-center">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={getHref(item)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-accent transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
          
          {/* Download Resume Button */}
          <motion.a
            href="/resume/Shanewaz-Aurnob-Resume.pdf"
            download="Shanewaz_Aurnob_Resume.pdf"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navItems.length * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 text-accent text-[9px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-accent hover:text-dark transition-all duration-300 group"
            aria-label="Download Resume PDF"
          >
            <Download size={14} className="group-hover:animate-bounce" />
            <span>Resume</span>
          </motion.a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          type="button"
          className="lg:hidden p-3 text-white hover:text-accent transition-colors touch-manipulation"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay - Outside nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-dark z-[99] flex flex-col items-center justify-center pt-16"
          >
            {/* Background decorations */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
            <div className="absolute top-1/4 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            
            {/* Menu Items */}
            <nav className="relative z-10 flex flex-col items-center gap-6 py-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={getHref(item)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  onClick={handleNavClick}
                  className="text-xl sm:text-2xl font-serif text-white/70 hover:text-accent transition-all duration-300 italic relative group"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
              
              {/* Mobile Download Resume Button */}
              <motion.a
                href="/resume/Shanewaz-Aurnob-Resume.pdf"
                download="Shanewaz_Aurnob_Resume.pdf"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
                onClick={handleNavClick}
                className="flex items-center gap-3 mt-4 px-6 py-3 bg-accent text-dark text-sm uppercase tracking-wider font-bold rounded-full hover:bg-white transition-all duration-300 shadow-lg shadow-accent/20"
                aria-label="Download Resume PDF"
              >
                <Download size={18} />
                <span>Download Resume</span>
              </motion.a>
            </nav>
            
            {/* Mobile Footer Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Available for Work</span>
              </div>
              <span className="text-xs font-mono text-white/40">{bdTime} (BD)</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
