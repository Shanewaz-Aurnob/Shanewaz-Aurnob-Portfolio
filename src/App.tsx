import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, AnimatePresence, useScroll, useSpring, useInView, 
  useTransform, useMotionValue, useAnimationFrame 
} from 'framer-motion';
import { 
  Github, Mail, Linkedin, ExternalLink, Code2, Briefcase, Heart, 
  Award, GraduationCap, BookOpen, Download, Cpu, Globe, Database, 
  Terminal, Layers, Users, Phone, MapPin, FileText, ChevronRight,
  Facebook, Twitter, X, Menu, Copy, Check
} from 'lucide-react';
import CustomCursor from './components/CustomCursor';

const Counter = ({ value, duration = 2 }: { value: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const target = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{value.includes('+') ? '+' : ''}</span>;
};

const TextMask = ({ children, delay = 0 }: { children?: React.ReactNode, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

const ParallaxBackground = () => {
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

const Section = ({ children, className = "", id = "", title = "", subtitle = "" }: { children?: React.ReactNode, className?: string, id?: string, title?: string, subtitle?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tighter leading-[0.9]">
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

const TiltCard = ({ children, className = "" }: { children?: React.ReactNode, className?: string, key?: any }) => {
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
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([mX, mY]) => `radial-gradient(400px circle at ${mX}px ${mY}px, rgba(16,185,129,0.1), transparent 80%)`
          )
        }}
      />
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

const Toast = ({ message, isVisible }: { message: string, isVisible: boolean }) => (
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

const InTheMedia = () => {
  const media = [
    {
      pub: "The Daily Star",
      headline: "CU Student's Innovation in Machine Learning",
      link: "#",
      logo: "https://picsum.photos/seed/star/100/100"
    },
    {
      pub: "Prothom Alo",
      headline: "Young Entrepreneurs Expo 2.0 Highlights",
      link: "#",
      logo: "https://picsum.photos/seed/alo/100/100"
    },
    {
      pub: "TechCrunch BD",
      headline: "Top 10 Emerging Developers to Watch in 2026",
      link: "#",
      logo: "https://picsum.photos/seed/tech/100/100"
    }
  ];

  return (
    <Section id="media" subtitle="Recognition" title="In The Media">
      <div className="grid md:grid-cols-3 gap-8">
        {media.map((item, i) => (
          <TiltCard key={i} className="h-full">
            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 h-full flex flex-col justify-between glass-card">
              <div>
                <img src={item.logo} alt={item.pub} className="w-12 h-12 rounded-xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500" />
                <h4 className="text-xl font-serif mb-4 group-hover:text-accent transition-colors">{item.headline}</h4>
              </div>
              <a href={item.link} className="text-[10px] uppercase tracking-widest text-white/40 hover:text-accent flex items-center gap-2 mt-8 transition-colors">
                Read on {item.pub} <ExternalLink size={12} />
              </a>
            </div>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
};
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const ProjectCard = ({ title, description, tags, icon: Icon, github, year, onDetails }: { title: string, description: string, tags: string[], icon: any, github?: string, year?: string, onDetails?: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden glass-card"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-15 transition-opacity duration-500">
        <Icon size={100} />
      </div>
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all duration-500 border border-white/5">
            <Icon size={28} />
          </div>
          {year && <span className="text-xs md:text-sm text-accent font-mono font-bold tracking-wider">{year}</span>}
        </div>
        <h3 className="text-2xl md:text-3xl font-serif mb-4 text-white group-hover:text-primary transition-colors duration-500">{title}</h3>
        <p className="text-white/50 mb-8 leading-relaxed font-light text-base md:text-lg text-balance line-clamp-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-10 mt-auto">
          {tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-white/40 group-hover:border-primary/30 group-hover:text-primary/60 transition-all duration-500">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-8">
          {github && (
            <motion.a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white hover:text-accent transition-all duration-300 group/link"
            >
              Source <Github size={16} className="group-hover/link:rotate-12 transition-transform" />
            </motion.a>
          )}
          {onDetails && (
            <motion.button 
              onClick={onDetails}
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white hover:text-accent transition-all duration-300 group/details"
            >
              Details <ExternalLink size={16} className="group-hover/details:translate-x-1 group-hover/details:-translate-y-1 transition-transform" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Marquee = ({ items }: { items: string[] }) => (
  <div className="marquee py-12 border-y border-white/5 bg-white/[0.01]">
    <div className="marquee-content animate-marquee">
      {items.map((item, i) => (
        <span key={i} className="text-4xl md:text-6xl font-serif italic text-white/10 hover:text-silver/40 transition-colors cursor-default px-8">
          {item}
        </span>
      ))}
    </div>
    <div className="marquee-content animate-marquee" aria-hidden="true">
      {items.map((item, i) => (
        <span key={i} className="text-4xl md:text-6xl font-serif italic text-white/10 hover:text-silver/40 transition-colors cursor-default px-8">
          {item}
        </span>
      ))}
    </div>
  </div>
);

const CertificateModal = ({ isOpen, onClose, title, image, description }: { isOpen: boolean, onClose: () => void, title: string, image?: string, description?: string }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-dark/90 backdrop-blur-2xl cursor-zoom-out"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full bg-gunmetal border border-accent/30 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.15)] cursor-default"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 pointer-events-none"></div>
          <div className="p-8 md:p-10 border-b border-white/10 flex justify-between items-center bg-white/[0.05] relative z-10">
            <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight">{title}</h3>
            <button 
              onClick={onClose} 
              className="p-3 hover:bg-accent/20 rounded-full transition-all hover:rotate-90 duration-500 text-white/60 hover:text-accent"
            >
              <X size={28} />
            </button>
          </div>
          <div className="p-8 md:p-12 flex flex-col items-center justify-center bg-dark/60 max-h-[70vh] overflow-y-auto relative z-10 custom-scrollbar">
            {image ? (
              <motion.img 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={image} 
                alt={title} 
                className="max-h-[55vh] object-contain rounded-2xl shadow-2xl border border-white/10" 
              />
            ) : description ? (
              <div className="w-full text-left space-y-6">
                {description.split('\n').map((line, i) => (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-white/90 font-light leading-relaxed text-base md:text-xl"
                  >
                    {line.trim()}
                  </motion.p>
                ))}
              </div>
            ) : (
              <div className="h-[40vh] flex flex-col items-center justify-center text-white/20 space-y-6">
                <div className="p-8 rounded-full bg-white/5 border border-white/10 animate-pulse">
                  <FileText size={80} className="text-accent/30" />
                </div>
                <div className="text-center">
                  <p className="font-serif italic text-2xl text-white/40">Certificate Preview Placeholder</p>
                  <p className="text-xs uppercase tracking-[0.4em] mt-3 text-white/20">Add your certificate image URL in the code</p>
                </div>
              </div>
            )}
          </div>
          <div className="p-8 bg-white/[0.05] border-t border-white/10 flex justify-end relative z-10">
            <button 
              onClick={onClose}
              className="px-10 py-4 bg-accent text-dark text-xs uppercase tracking-widest font-bold rounded-full hover:bg-white transition-all duration-500 shadow-xl shadow-accent/20"
            >
              Close Preview
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Navbar = () => {
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

  const navItems = ['About', 'Skills', 'Research', 'Projects', 'Education', 'Resume', 'Contact'];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-dark/90 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent'}`}>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-50"
        style={{ scaleX }}
      />
      
      <div className="flex items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: 5 }}
          className="text-2xl font-serif tracking-tighter cursor-pointer group"
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

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Fallback to local storage for stability
    const storedCount = localStorage.getItem('portfolio_views');
    const newCount = (parseInt(storedCount || '0', 10) || 1240) + 1;
    localStorage.setItem('portfolio_views', newCount.toString());
    setCount(newCount);
  }, []);

  if (count === null) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-700 group"
    >
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] font-mono text-accent">
        <Users size={14} className="group-hover:animate-bounce" />
        <span>Live Visitors</span>
      </div>
      <div className="flex gap-1.5">
        {count.toString().padStart(6, '0').split('').map((digit, i) => (
          <motion.span 
            key={i}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="w-8 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center font-mono text-lg text-white shadow-inner"
          >
            {digit}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [modalContent, setModalContent] = useState<{ isOpen: boolean, title: string, image?: string, description?: string }>({
    isOpen: false,
    title: "",
    image: undefined,
    description: undefined
  });

  const openModal = (title: string, image?: string, description?: string) => {
    setModalContent({ isOpen: true, title, image, description });
  };

  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [galleryLightbox, setGalleryLightbox] = useState<{ isOpen: boolean, currentIndex: number, items: any[] }>({
    isOpen: false,
    currentIndex: 0,
    items: []
  });
  
  const copyEmail = () => {
    navigator.clipboard.writeText("aurnob.csecu@gmail.com");
    setCopied(true);
    setShowToast(true);
    setTimeout(() => {
      setCopied(false);
      setShowToast(false);
    }, 2000);
  };

  return (
    <div className="bg-dark min-h-screen selection:bg-white selection:text-black overflow-x-hidden relative">
      <div className="fixed inset-0 bg-grid z-0 pointer-events-none opacity-40"></div>
      <CustomCursor />
      <ParallaxBackground />
      <Navbar />
      
      {/* Floating Socials */}
      <div className="fixed left-8 bottom-0 z-40 hidden xl:flex flex-col items-center gap-8 after:w-[1px] after:h-32 after:bg-white/10">
        {[
          { icon: Github, href: "https://github.com/Shanewaz-Aurnob" },
          { icon: Linkedin, href: "https://linkedin.com/in/shanewaz-aurnob" },
          { icon: Facebook, href: "https://www.facebook.com/s.aurnob" },
          { icon: X, href: "https://x.com/ShanewazAurnob" }
        ].map((social, i) => (
          <motion.a
            key={i}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -5, color: "var(--color-accent)" }}
            className="text-white/20 hover:text-accent transition-all duration-300"
          >
            <social.icon size={20} />
          </motion.a>
        ))}
      </div>

      <Toast message="Copied to Clipboard!" isVisible={showToast} />
      <CertificateModal 
        isOpen={modalContent.isOpen} 
        onClose={() => setModalContent({ ...modalContent, isOpen: false })} 
        title={modalContent.title}
        image={modalContent.image}
        description={modalContent.description}
      />

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[150px]"
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-accent/10 rounded-full blur-[150px]"
        ></motion.div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <TextMask>
              <span className="text-accent text-xs md:text-sm uppercase tracking-[0.5em] mb-8 block font-bold">
                Computer Science Graduate
              </span>
            </TextMask>
            <h1 className="text-[12vw] lg:text-[7vw] leading-[0.85] font-serif mb-12 tracking-tighter">
              <TextMask delay={0.2}>Shanewaz</TextMask>
              <TextMask delay={0.4}><span className="italic text-white/80">Aurnob</span></TextMask>
            </h1>
            <div className="space-y-12">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-xl text-balance"
              >
                Specializing in <span className="text-white font-medium">Machine Learning</span> and <span className="text-white font-medium">Full-Stack Development</span>. 
                Committed to organizational growth through analytical precision.
              </motion.p>
              <div className="flex gap-8 items-center flex-wrap">
                <Magnetic>
                  <motion.a 
                    href="#projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-6 bg-white text-dark text-xs uppercase tracking-[0.3em] font-bold rounded-full hover:bg-accent transition-all duration-500 shadow-2xl shadow-white/10"
                  >
                    View Work
                  </motion.a>
                </Magnetic>
                <Magnetic>
                  <motion.a 
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-6 border border-white/10 text-white text-xs uppercase tracking-[0.3em] font-bold rounded-full hover:bg-white hover:text-dark transition-all duration-500"
                  >
                    Get in Touch
                  </motion.a>
                </Magnetic>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-accent/30 rounded-full blur-[120px] animate-pulse"></div>
              <div className="relative h-full flex items-center justify-center">
                {/* Floating Tech Blocks Animation */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-64 h-64"
                >
                  {/* Center block */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Code2 size={32} className="text-accent" />
                      </div>
                      <p className="text-xs font-mono text-accent tracking-wider">TECH_STACK</p>
                    </div>
                  </div>

                  {/* Orbiting blocks - Static positions with rotation animation */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }}>
                    {/* Top block */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-20 h-20 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                        <Terminal size={24} className="text-primary/60" />
                      </div>
                    </div>
                    {/* Right block */}
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
                      <div className="w-20 h-20 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                        <Database size={24} className="text-accent/60" />
                      </div>
                    </div>
                    {/* Bottom-left block */}
                    <div className="absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2">
                      <div className="w-20 h-20 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                        <Globe size={24} className="text-primary/60" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent/50 to-transparent"></div>
        </motion.div>
      </section>

      <Marquee items={["React.js", "Node.js", "TensorFlow", "Python", "Machine Learning", "Full-Stack", "NLP", "Express.js", "MySQL", "Firebase"]} />

      {/* About Section - Bento Style */}
      <Section id="about" subtitle="Career Objective" title="About Me">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <div className="p-8 md:p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 flex flex-col justify-between h-full glass-card relative overflow-hidden group hover:border-white/10 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div>
                <blockquote className="text-2xl md:text-4xl font-serif leading-snug text-white/80 mb-10 italic">
                  "To contribute to organizational growth through analytical skills and professional expertise, leveraging a strong foundation in Computer Science."
                </blockquote>
                <p className="text-white/50 font-light leading-relaxed text-lg md:text-xl max-w-3xl">
                  As a CSE graduate from the University of Chittagong, I bridge the gap between complex data analysis and functional web ecosystems. My journey is defined by a commitment to integrity, lifelong learning, and delivering value through dedication.
                </p>
              </div>
              <div className="mt-16 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 flex-wrap">
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-accent/60 flex-shrink-0" />
                    <span className="text-sm md:text-base font-light text-white/70">Kotchandpur, Jhenaidah</span>
                  </div>
                  <div className="hidden md:block w-[1px] h-6 bg-white/10"></div>
                  <a href="tel:+8801685530730" className="flex items-center gap-3 text-sm md:text-base font-light text-white/70 hover:text-accent transition-colors">
                    <Phone size={18} className="text-accent/60 flex-shrink-0" />
                    <span>+880 1685 530730</span>
                  </a>
                  <div className="hidden md:block w-[1px] h-6 bg-white/10"></div>
                  <div className="flex items-center gap-2">
                    <a href="mailto:aurnob.csecu@gmail.com" className="flex items-center gap-3 text-sm md:text-base font-light text-white/70 hover:text-accent transition-colors min-w-0">
                      <Mail size={18} className="text-accent/60 flex-shrink-0" />
                      <span className="truncate">aurnob.csecu@gmail.com</span>
                    </a>
                    <button 
                      onClick={copyEmail}
                      className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-accent hover:border-accent/30 transition-all flex-shrink-0"
                      title="Copy Email"
                    >
                      {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 grid grid-cols-1 gap-8"
          >
            <div>
              <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 flex flex-col justify-center items-center text-center h-full glass-card group relative overflow-hidden hover:border-white/10 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="w-20 h-20 rounded-3xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Cpu size={40} className="text-accent" />
                </div>
                <h3 className="text-3xl font-serif mb-4 italic">Tech Enthusiast</h3>
                <p className="text-white/40 font-light text-sm leading-relaxed">Always exploring the latest in AI, ML, and Web technologies.</p>
              </div>
            </div>
            <div>
              <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 flex flex-col justify-center items-center text-center h-full glass-card group relative overflow-hidden hover:border-white/10 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Globe size={40} className="text-primary" />
                </div>
                <h3 className="text-3xl font-serif mb-4 italic">Global Vision</h3>
                <p className="text-white/40 font-light text-sm leading-relaxed">Building solutions that transcend borders and impact lives.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Experience & Recognition Section */}
      <Section id="recognition" subtitle="Milestones" title="Recognition">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div 
            onClick={() => openModal("Awards & Recognition")}
            whileHover={{ x: 10 }}
            className="md:col-span-4 p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/[0.04] transition-all group relative overflow-hidden glass-card"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Award size={48} className="text-accent mb-4 opacity-20 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500" />
            <h3 className="text-lg font-serif mb-2 group-hover:text-accent transition-colors">2nd Runner-Up</h3>
            <p className="text-white/40 text-xs md:text-sm">Intra Department Database Project Showcasing</p>
            <p className="mt-4 text-[10px] uppercase tracking-widest text-accent/60 font-bold opacity-0 group-hover:opacity-100 transition-opacity">View Award</p>
          </motion.div>

          <div className="md:col-span-8 p-8 rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h3 className="text-xl font-serif mb-6 text-white/80">Professional Skills</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Project Management", "Leadership", "Teamwork", "Time Management", 
                "Public Relation", "Analytical Thinking", "Problem Solving", 
                "Decision Making", "Effective Communication", "CRM", 
                "Report Writing", "Attention to Detail", "Professional Integrity"
              ].map(skill => (
                <span key={skill} className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-[9px] uppercase tracking-widest text-white/50 hover:text-accent hover:border-accent/30 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" subtitle="Technical Universe" title="Expertise">
        {/* Stats Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Languages", value: "5+" },
            { label: "Frameworks", value: "8+" },
            { label: "Databases", value: "3+" },
            { label: "Projects", value: "10+" }
          ].map((stat, i) => (
            <TiltCard key={i}>
              <div className="p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center group hover:border-accent/30 transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.02)] relative overflow-hidden glass-card h-full">
                <div className="absolute inset-0 noise-bg opacity-[0.05] pointer-events-none"></div>
                <span className="text-4xl md:text-6xl font-serif font-bold text-white mb-3 group-hover:text-accent transition-colors relative z-10">
                  <Counter value={stat.value} />
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/40 relative z-10 font-bold">{stat.label}</span>
              </div>
            </TiltCard>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Programming", icon: Terminal, items: ["C", "C++", "Python", "Java", "JavaScript"] },
            { title: "Web Development", icon: Globe, items: ["HTML", "CSS", "React.js", "Node.js", "Express.js", "REST API", "GraphQL"] },
            { title: "Machine Learning", icon: Cpu, items: ["Scikit-learn", "TensorFlow", "Transformers", "NLTK", "Hugging Face"] },
            { title: "Databases", icon: Database, items: ["MySQL", "Firebase", "MongoDB"] },
            { title: "Tools & Tech", icon: Layers, items: ["Git", "GitHub", "GitLab", "VS Code", "Jupyter", "Android Studio"] },
            { title: "Professional", icon: Briefcase, items: ["Project Management", "Leadership", "Teamwork", "Public Relation"] }
          ].map((skill, i) => (
            <TiltCard key={i}>
              <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-500 group glass-card h-full">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-accent/20 group-hover:text-accent transition-all duration-500 border border-white/5">
                  <skill.icon size={32} />
                </div>
                <h3 className="text-2xl font-serif mb-6 group-hover:text-accent transition-colors">{skill.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {skill.items.map(item => (
                    <span key={item} className="px-4 py-2 rounded-xl border border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-white/40 group-hover:border-accent/30 group-hover:text-accent/60 transition-all duration-500">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* Research Section */}
      <Section id="research" subtitle="Academic Edge" title="Research">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <span className="text-silver/40 text-[11px] md:text-xs uppercase tracking-widest mb-4 block">Undergraduate Thesis (2025)</span>
              <h3 className="text-3xl font-serif mb-4 group-hover:text-silver transition-colors">Crisis Response through Social Cues Analysis</h3>
              <p className="text-white/50 leading-relaxed mb-6 font-light">
                Developed a Bengali social cue classification system using machine learning and transformer-based models for multiclass crisis-related text analysis.
              </p>
              <div className="flex gap-4">
                <span className="text-xs font-mono text-silver/60">#NLP</span>
                <span className="text-xs font-mono text-silver/60">#Transformers</span>
                <span className="text-xs font-mono text-silver/60">#CrisisResponse</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group pt-16 border-t border-white/5"
            >
              <span className="text-silver/40 text-[11px] md:text-xs uppercase tracking-widest mb-4 block">Published in Heliyon (2023)</span>
              <h3 className="text-3xl font-serif mb-4 group-hover:text-silver transition-colors">Exploring media consumption and mental health...</h3>
              <p className="text-white/50 leading-relaxed mb-6 font-light">
                A comprehensive study on the impact of digital media consumption patterns on mental well-being in the modern era.
              </p>
              <a 
                href="https://doi.org/10.1016/j.heliyon.2023.e20371" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-white/20 pb-1 hover:border-white transition-all"
              >
                Read Publication <ExternalLink size={12} />
              </a>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" subtitle="Selected Works" title="Projects">
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              title: "PetEmote",
              year: "2024",
              description: "AI-Based Pet Emotion Recognition Mobile App using React Native and TensorFlow Lite for real-time analysis.",
              tags: ['React Native', 'TensorFlow Lite', 'Firebase', 'GraphQL'],
              icon: Code2,
              github: "https://github.com/Shanewaz-Aurnob/PetEmote-React-Native-ML-App",
              details: `
                • Built a cross-platform mobile app using React Native and TensorFlow Lite to detect pet emotions in real time.
                • Integrated Firebase for real-time data handling and authentication.
                • Used GraphQL for efficient data fetching and state management.
                • Implemented on-device ML models for low-latency inference.
              `
            },
            {
              title: "CU ERP System",
              year: "2023",
              description: "Large-scale enterprise resource management API with role-based access control and MySQL integration.",
              tags: ['Node.js', 'Express.js', 'MySQL', 'TypeScript'],
              icon: Briefcase,
              github: "https://github.com/Shanewaz-Aurnob/ERP-API-Web-Engineering",
              details: `
                • Developed a robust backend API for enterprise resource management.
                • Implemented role-based access control (RBAC) for secure data access.
                • Integrated MySQL database with optimized queries for large-scale data.
                • Used TypeScript for type safety and better maintainability.
              `
            },
            {
              title: "Smart Attendance System",
              year: "2023",
              description: "QR-based classroom automation system with PDF reporting and role-based access for teachers/students.",
              tags: ['React', 'Tailwind CSS', 'Express.js', 'MySQL'],
              icon: Layers,
              github: "https://github.com/Shanewaz-Aurnob/Web-Engg",
              details: `
                • Implemented a QR-based attendance system for automated classroom tracking.
                • Developed role-based access control for teachers and students.
                • Generated PDF reports for attendance sessions using server-side logic.
                • Built with React and Tailwind CSS for a modern, responsive frontend.
              `
            },
            {
              title: "Tiles & Inventory Management",
              year: "2023",
              description: "Web solution for inventory tracking, supplier management, and order monitoring with real-time updates.",
              tags: ['React.js', 'Node.js', 'Firebase'],
              icon: Globe,
              github: "https://github.com/Shanewaz-Aurnob/Software-Engg",
              details: `
                • Created a web-based solution for managing inventory, suppliers, and orders.
                • Integrated Firebase for real-time database updates and synchronization.
                • Developed a user-friendly dashboard for monitoring stock levels and order status.
                • Built with React.js and Node.js for a scalable architecture.
              `
            },
            {
              title: "Heart Disease Expert System",
              year: "2024",
              description: "Prolog rule-based inference system for diagnosing heart diseases using structured reasoning.",
              tags: ['Prolog', 'AI', 'Expert Systems'],
              icon: Heart,
              github: "https://github.com/Shanewaz-Aurnob/Artificial-Intelligence-Lab",
              details: `
                • Built a rule-based expert system for diagnosing heart diseases.
                • Used Prolog for implementing backward chaining and logical inference.
                • Designed a structured symptom-based diagnostic flow.
                • Implemented IF-THEN reasoning for accurate disease identification.
              `
            },
            {
              title: "Intelligent Home Automation",
              year: "2024",
              description: "IoT system using ESP32 and ANN for predictive appliance control and energy-efficient automation.",
              tags: ['ESP32', 'Blynk', 'ANN', 'C++'],
              icon: Cpu,
              details: `
                • Developed an IoT-based smart home system with predictive control.
                • Used ESP32 microcontrollers and Blynk platform for remote monitoring.
                • Implemented on-device Artificial Neural Networks (ANN) for appliance control.
                • Focused on context-aware energy-efficient automation.
              `
            },
            {
              title: "Arduino Fire Alarm",
              year: "2022",
              description: "Real-time fire detection and alert system using Arduino UNO, flame sensors, and microcontroller programming.",
              tags: ['Arduino', 'C++', 'Sensors', 'IoT'],
              icon: Terminal,
              details: `
                • Built a real-time fire detection and alert system.
                • Used Arduino UNO and flame sensors for reliable detection.
                • Programmed microcontrollers for automated safety alerts.
                • Implemented a buzzer-based alarm system for immediate warning.
              `
            }
          ].map((project, i) => (
            <TiltCard key={i}>
              <ProjectCard 
                {...project} 
                onDetails={() => openModal(project.title, undefined, project.details)} 
              />
            </TiltCard>
          ))}
        </div>
      </Section>

      <InTheMedia />

      {/* Education Section */}
      <Section id="education" subtitle="Academic Journey" title="Education">
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {[
            { 
              degree: "B.Sc. in Engineering (CSE)", 
              institution: "University of Chittagong", 
              year: "2023", 
              result: "CGPA: 3.27",
              details: "Specialized in Machine Learning and Software Engineering."
            },
            { 
              degree: "Higher Secondary Certificate (HSC)", 
              institution: "Govt. K.M.H College, Kotchandpur", 
              year: "2019", 
              result: "GPA: 4.58" 
            },
            { 
              degree: "Secondary School Certificate (SSC)", 
              institution: "Kotchandpur Govt. Model Pilot Secondary School", 
              year: "2017", 
              result: "GPA: 4.73" 
            }
          ].map((edu, i) => (
            <motion.div 
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-dark text-silver shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <GraduationCap size={18} />
              </div>
              {/* Content */}
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500">
                <div className="flex items-center justify-between space-x-2 mb-2">
                  <h3 className="text-xl font-serif group-hover:text-silver transition-colors">{edu.degree}</h3>
                  <time className="font-mono text-[11px] md:text-xs text-white/20">{edu.year}</time>
                </div>
                <div className="text-white/40 text-sm mb-4">{edu.institution}</div>
                <div className="flex items-center justify-between">
                  <span className="text-silver font-mono text-xs">{edu.result}</span>
                  {edu.details && <span className="text-white/20 text-[11px] md:text-xs italic">{edu.details}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Resume Section */}
      <Section id="resume" subtitle="Professional Summary" title="Resume">
        <div className="p-12 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
            <FileText size={200} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl font-serif mb-6">Ready for the next challenge.</h3>
            <p className="text-white/50 font-light leading-relaxed mb-10">
              My full resume details my academic background, technical proficiency, and leadership experiences in a structured format suitable for ATS and professional review.
            </p>
            <div className="flex flex-wrap gap-6">
              <Magnetic>
                <motion.button
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white text-dark text-xs uppercase tracking-widest font-bold rounded-full flex items-center gap-3 shadow-xl shadow-white/5 hover:bg-accent transition-all duration-500"
                >
                  Download PDF <Download size={18} />
                </motion.button>
              </Magnetic>
              <Magnetic>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="px-10 py-5 border border-white/10 text-white text-xs uppercase tracking-widest font-bold rounded-full hover:bg-white/5 hover:border-accent transition-all duration-500 flex items-center gap-3"
                >
                  View PDF <ExternalLink size={18} />
                </motion.a>
              </Magnetic>
            </div>
          </div>
        </div>
      </Section>

      {/* Experience & Recognition Section */}
      <Section id="recognition" subtitle="Career & Honors" title="Experience & Awards">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Experience Column */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <Briefcase size={24} />
              </div>
              <h3 className="text-3xl font-serif italic">Professional & Co-Curricular</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Entrepreneurs Expo 2.0", role: "Organizer", year: "2026", desc: "Organized under Chittagong University Entrepreneur & Startup Society." },
                { title: "CU 5th Convocation", role: "Organizer", year: "2025", desc: "Managed logistics and coordinated the convocation event." },
                { title: "CUSS IT Fiesta", role: "Organizer", year: "2024", desc: "Led IT and technical activities under CU Scientific Society." },
                { title: "Futurenation Skills Hub", role: "Volunteer", year: "2024", desc: "Assisted UNDP Bangladesh in skill development programs." },
                { title: "Tarunner Alo", role: "Co-Founder", year: "2021-23", desc: "Established a non-political community helping organization." },
                { title: "Kotchandpur Blood Bank", role: "Joint Secretary", year: "2020-22", desc: "Coordinated blood donation drives and provided support for underprivileged people." }
              ].map((exp, i) => (
                <TiltCard key={i}>
                  <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group relative overflow-hidden glass-card flex flex-col justify-between h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <h4 className="text-2xl font-serif group-hover:text-accent transition-colors leading-tight">{exp.title}</h4>
                        <span className="text-[10px] font-mono text-white/20 bg-white/5 px-2 py-1 rounded-md">{exp.year}</span>
                      </div>
                      <div className="text-accent text-[10px] uppercase tracking-[0.3em] mb-6 font-bold">{exp.role}</div>
                      <p className="text-white/40 text-sm font-light mb-10 leading-relaxed">{exp.desc}</p>
                    </div>
                    <button 
                      onClick={() => openModal(exp.title)}
                      className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-all hover:text-white mt-auto font-bold group/btn"
                    >
                      View Certificate <ExternalLink size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Awards & Certs Column */}
          <div className="lg:col-span-4 space-y-12">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Award size={24} />
              </div>
              <h3 className="text-3xl font-serif italic">Recognition</h3>
            </div>
            <div className="grid gap-8">
              {[
                { title: "2nd Runner-Up", icon: Award, desc: "Intra Department Database Project Showcasing, CSE CU (2023)" },
                { title: "Full Stack Training", icon: BookOpen, desc: "EDGE Project, Bangladesh Computer Council (2025)" },
                { title: "Entrepreneurship", icon: GraduationCap, desc: "Vision to Venture Workshop, CUESS (2025)" },
                { title: "Leadership Workshop", icon: Users, desc: "Leadership & Organizational Excellence, CUCC (2025)" }
              ].map((cert, i) => (
                <TiltCard key={i}>
                  <div
                    onClick={() => openModal(cert.title)}
                    className="p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] flex gap-8 items-start cursor-pointer hover:bg-white/[0.04] transition-all group glass-card h-full relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="p-5 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-dark transition-all duration-500 shrink-0">
                      <cert.icon size={28} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-serif mb-3 group-hover:text-primary transition-colors leading-tight">{cert.title}</h4>
                      <p className="text-white/40 text-xs font-light leading-relaxed">{cert.desc}</p>
                      <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all font-bold">
                        View Details <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Social Work & Welfare Activities Gallery Section */}
      <Section id="gallery" subtitle="Community Impact" title="Social Work & Welfare">
        <div className="space-y-12">
          {/* Filter Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center md:justify-start"
          >
            {["All", "Education", "Health", "Charity", "Community"].map((category) => (
              <motion.button
                key={category}
                onClick={() => setGalleryFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                  galleryFilter === category
                    ? "bg-accent text-dark shadow-lg shadow-accent/30"
                    : "bg-white/5 border border-white/10 text-white/70 hover:border-accent/50 hover:text-accent"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {[
              {
                id: 1,
                title: "Community Education Drive",
                category: "Education",
                description: "Organizing free educational programs for underprivileged children",
                date: "March 2025",
                location: "Chittagong",
                image: "https://images.unsplash.com/photo-1427504494785-4a9e96120d69?w=400&h=300&fit=crop",
                fullDesc: "Supporting the future through quality education for all. We provide free learning resources and mentorship to students from low-income families."
              },
              {
                id: 2,
                title: "Health Awareness Camp",
                category: "Health",
                description: "Free medical checkups and health awareness sessions for rural communities",
                date: "February 2025",
                location: "Jhenaidah",
                image: "https://images.unsplash.com/photo-1551953414-e87c98b9ef14?w=400&h=300&fit=crop",
                fullDesc: "Bringing healthcare closer to underserved communities. Free medical screening and health education sessions."
              },
              {
                id: 3,
                title: "Disaster Relief Fund",
                category: "Charity",
                description: "Emergency relief supplies and financial aid for flood-affected families",
                date: "January 2025",
                location: "Multiple Districts",
                image: "https://images.unsplash.com/photo-1547452ec-d976c59268af?w=400&h=300&fit=crop",
                fullDesc: "Responding quickly to help communities in crisis. Providing essential supplies and support."
              },
              {
                id: 4,
                title: "Youth Skill Development",
                category: "Community",
                description: "Vocational training programs for unemployed youth in the district",
                date: "December 2024",
                location: "Kotchandpur",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
                fullDesc: "Empowering youth with practical skills for better employment prospects."
              },
              {
                id: 5,
                title: "School Renovation Project",
                category: "Education",
                description: "Renovating schools and providing modern learning infrastructure",
                date: "November 2024",
                location: "Rural Schools",
                image: "https://images.unsplash.com/photo-1427504494785-4a9e96120d69?w=400&h=300&fit=crop",
                fullDesc: "Building better learning environments. Infrastructure development for quality education."
              },
              {
                id: 6,
                title: "Nutrition & Wellness",
                category: "Health",
                description: "Meal distribution and nutritional support programs for children",
                date: "October 2024",
                location: "Urban Communities",
                image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop",
                fullDesc: "Ensuring no child goes hungry. Providing nutritious meals and wellness education."
              }
            ]
              .filter(item => galleryFilter === "All" || item.category === galleryFilter)
              .map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setGalleryLightbox({ isOpen: true, currentIndex: idx, items: [item] })}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-400/20 to-white/10">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      {/* Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center"
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="px-8 py-3 bg-accent text-dark font-bold rounded-full text-sm uppercase tracking-wider hover:bg-white transition-all"
                        >
                          View Details
                        </motion.button>
                      </motion.div>
                    </div>

                    {/* Card Content */}
                    <div className="p-8 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-b-3xl">
                      <div className="flex items-center justify-between mb-4 gap-4">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent bg-accent/10 px-3 py-1.5 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-white/40 font-light">{item.date}</span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-serif mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-white/50 text-sm font-light mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-2 text-[10px] text-white/40">
                        <MapPin size={14} className="text-accent/60" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </Section>

      {/* Gallery Lightbox Modal */}
      <AnimatePresence>
        {galleryLightbox.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGalleryLightbox({ ...galleryLightbox, isOpen: false })}
            className="fixed inset-0 bg-black/95 z-[150] flex items-center justify-center p-2 md:p-4 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setGalleryLightbox({ ...galleryLightbox, isOpen: false })}
                className="absolute -top-10 right-0 p-2.5 rounded-full bg-accent/20 border border-accent/40 text-accent hover:bg-accent hover:text-dark transition-all z-20 shadow-lg"
              >
                <X size={20} />
              </motion.button>

              {galleryLightbox.items.length > 0 && (
                <motion.div 
                  className="bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                >
                  {/* Image Section */}
                  <div className="relative w-full h-40 md:h-56 overflow-hidden bg-gradient-to-br from-accent/20 to-primary/10">
                    <motion.img
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                      src={galleryLightbox.items[0].image}
                      alt={galleryLightbox.items[0].title}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 md:p-8 space-y-4">
                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-2 items-center">
                      <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent bg-accent/15 px-3 py-1.5 rounded-full border border-accent/30"
                      >
                        {galleryLightbox.items[0].category}
                      </motion.span>
                      <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-[10px] text-white/50 font-light"
                      >
                        {galleryLightbox.items[0].date}
                      </motion.span>
                      <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[10px] text-white/50 font-light flex items-center gap-1 ml-auto"
                      >
                        <MapPin size={12} className="text-accent" /> {galleryLightbox.items[0].location}
                      </motion.span>
                    </div>

                    {/* Title */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h2 className="text-xl md:text-2xl font-serif text-white leading-tight">
                        {galleryLightbox.items[0].title}
                      </h2>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <p className="text-sm md:text-base text-white/70 leading-relaxed font-light line-clamp-3">
                        {galleryLightbox.items[0].fullDesc}
                      </p>
                    </motion.div>

                    {/* Action Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex pt-3"
                    >
                      <Magnetic>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setGalleryLightbox({ ...galleryLightbox, isOpen: false })}
                          className="w-full px-6 py-3 bg-accent text-dark font-bold rounded-full text-sm uppercase tracking-wider hover:bg-white transition-all shadow-lg shadow-accent/30"
                        >
                          Close
                        </motion.button>
                      </Magnetic>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer / Contact */}
      <footer id="contact" className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 border-t border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 lg:gap-40 items-start">
            {/* Left Column: CTA & Info */}
            <div className="space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-[14vw] lg:text-[8vw] font-serif leading-[0.85] tracking-tighter mb-10">
                  Let's <br />
                  <span className="italic text-accent">Connect.</span>
                </h2>
                <p className="text-white/40 text-xl font-light max-w-md leading-relaxed text-balance">
                  Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and creative ideas.
                </p>
              </motion.div>

              <div className="space-y-10">
                <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                  <motion.a 
                    href="mailto:aurnob.csecu@gmail.com"
                    whileHover={{ x: 10 }}
                    className="inline-flex items-center gap-6 group"
                  >
                    <div className="w-16 h-16 rounded-3xl border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-dark transition-all duration-500 shadow-xl shadow-accent/10">
                      <Mail size={28} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-1">Email Me</span>
                      <span className="text-2xl md:text-3xl font-serif text-white/80 group-hover:text-accent transition-colors">aurnob.csecu@gmail.com</span>
                    </div>
                  </motion.a>

                  <motion.button
                    onClick={copyEmail}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-accent hover:border-accent/30 transition-all flex items-center gap-3"
                    title="Copy Email"
                  >
                    {copied ? <Check size={20} className="text-accent" /> : <Copy size={20} />}
                    <span className="text-[10px] uppercase tracking-widest font-bold">{copied ? "Copied!" : "Copy"}</span>
                  </motion.button>
                </div>

                <div className="flex gap-6 pt-6">
                  {[
                    { icon: Github, href: "https://github.com/Shanewaz-Aurnob", label: "GitHub" },
                    { icon: Linkedin, href: "https://linkedin.com/in/shanewaz-aurnob", label: "LinkedIn" },
                    { icon: Facebook, href: "https://www.facebook.com/s.aurnob", label: "Facebook" },
                    { icon: X, href: "https://x.com/ShanewazAurnob", label: "X" }
                  ].map((social, i) => (
                    <motion.a 
                      key={i} 
                      href={social.href} 
                      target="_blank" 
                      rel="noreferrer"
                      whileHover={{ y: -8, backgroundColor: "var(--color-accent)", color: "var(--color-dark)", borderColor: "var(--color-accent)" }}
                      className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center transition-all duration-500 group shadow-lg"
                      title={social.label}
                    >
                      <social.icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 md:p-16 rounded-[4rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                <Mail size={200} />
              </div>
              <form className="space-y-10 relative z-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold ml-1">Your Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 focus:border-accent focus:bg-white/[0.05] outline-none transition-all font-light placeholder:text-white/10 shadow-inner" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold ml-1">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 focus:border-accent focus:bg-white/[0.05] outline-none transition-all font-light placeholder:text-white/10 shadow-inner" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold ml-1">Your Message</label>
                  <textarea 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-8 py-6 focus:border-accent focus:bg-white/[0.05] outline-none transition-all font-light resize-none placeholder:text-white/10 shadow-inner" 
                    rows={6} 
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <Magnetic>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-6 bg-accent text-dark text-xs uppercase tracking-[0.4em] font-bold rounded-2xl hover:bg-white transition-all duration-500 shadow-2xl shadow-accent/20"
                  >
                    Send Message
                  </motion.button>
                </Magnetic>
              </form>
            </motion.div>
          </div>
          
          {/* Bottom Bar */}
          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col gap-2 items-center md:items-start">
              <p className="text-[10px] uppercase tracking-[0.5em] text-white/20">© 2026 Shanewaz Aurnob</p>
              <p className="text-[9px] uppercase tracking-widest text-white/10">Built with Precision & Purpose</p>
            </div>
            
            <VisitorCounter />

            <div className="flex gap-10">
              {['Home', 'About', 'Research', 'Projects', 'Contact'].map(item => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-[10px] uppercase tracking-widest text-white/30 hover:text-accent transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -5 }}
              className="p-4 rounded-full border border-white/10 text-white/30 hover:text-white hover:border-white transition-all"
            >
              <ChevronRight size={20} className="-rotate-90" />
            </motion.button>
          </div>
        </div>
      </footer>
    </div>
  );
}

