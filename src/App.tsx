import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Mail, Linkedin, ExternalLink, Award, GraduationCap, Download, Users, User, Phone, MapPin, FileText, ChevronRight, Facebook, X, Copy, Check, BookOpen, Sparkles } from 'lucide-react';

// Shared Components
import { Toast, TiltCard, Magnetic, CertificateModal, ParallaxBackground, Counter, TextMask, Section, Marquee } from './components/shared';

// Section Components
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';

// Data
import { educationData, experienceData, certificatesData, contactData, socialLinks, galleryData, expertiseData, projectsData, mediaData, researchData } from './data/portfolioData';

// Custom Components
import CustomCursor from './components/CustomCursor';

// Utility function for copy to clipboard
const copyToClipboard = (text: string, setCopied: (val: boolean) => void, setShowToast: (val: boolean) => void) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setShowToast(true);
      setTimeout(() => { setCopied(false); setShowToast(false); }, 2000);
    }).catch(() => {
      fallbackCopy(text, setCopied, setShowToast);
    });
  } else {
    fallbackCopy(text, setCopied, setShowToast);
  }
};

const fallbackCopy = (text: string, setCopied: (val: boolean) => void, setShowToast: (val: boolean) => void) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    setCopied(true);
    setShowToast(true);
    setTimeout(() => { setCopied(false); setShowToast(false); }, 2000);
  } catch (e) {
    console.error('Copy failed', e);
  }
  document.body.removeChild(textarea);
};

// Floating Socials Component
const FloatingSocials: React.FC = () => (
  <div className="fixed left-8 bottom-0 z-40 hidden xl:flex flex-col items-center gap-8 after:w-[1px] after:h-32 after:bg-white/10">
    {[
      { icon: Github, href: "https://github.com/Shanewaz-Aurnob" },
      { icon: Linkedin, href: "https://linkedin.com/in/shanewaz-aurnob" },
      { icon: Facebook, href: "https://www.facebook.com/s.aurnob" },
      { icon: X, href: "https://x.com/ShanewazAurnob" },
      { icon: BookOpen, href: "https://scholar.google.com/citations?user=umBalUIAAAAJ&hl=en" }
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
);

// Visitor Counter Component with real API tracking
const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        // Check if we've already counted this session
        const hasVisited = sessionStorage.getItem('portfolio_visited');
        
        // Use CountAPI for persistent visitor tracking
        const namespace = 'shanewaz-aurnob-portfolio';
        const key = 'visits';
        
        let response;
        if (!hasVisited) {
          // Increment count for new visitors
          response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
          sessionStorage.setItem('portfolio_visited', 'true');
        } else {
          // Just get current count for returning visitors in same session
          response = await fetch(`https://api.countapi.xyz/get/${namespace}/${key}`);
        }
        
        if (response.ok) {
          const data = await response.json();
          setCount(data.value);
          // Also store in localStorage as backup
          localStorage.setItem('portfolio_total_views', data.value.toString());
        } else {
          throw new Error('API failed');
        }
      } catch (error) {
        // Fallback to localStorage if API fails
        const storedCount = localStorage.getItem('portfolio_total_views');
        const fallbackCount = parseInt(storedCount || '1500', 10);
        
        // Increment locally if not visited this session
        const hasVisited = sessionStorage.getItem('portfolio_visited');
        if (!hasVisited) {
          const newCount = fallbackCount + 1;
          localStorage.setItem('portfolio_total_views', newCount.toString());
          sessionStorage.setItem('portfolio_visited', 'true');
          setCount(newCount);
        } else {
          setCount(fallbackCount);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-3 opacity-40"
      >
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] font-mono text-accent">
          <Users size={14} className="animate-pulse" />
          <span>Total Visitors</span>
        </div>
        <div className="flex gap-1.5">
          {[...Array(6)].map((_, i) => (
            <span 
              key={i}
              className="w-8 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center font-mono text-lg text-white/30 animate-pulse"
            >
              -
            </span>
          ))}
        </div>
      </motion.div>
    );
  }

  if (count === null) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-700 group"
    >
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] font-mono text-accent">
        <Users size={14} className="group-hover:animate-bounce" />
        <span>Total Visitors</span>
      </div>
      <div className="flex gap-1.5">
        {count.toString().padStart(6, '0').split('').map((digit, i) => (
          <motion.span 
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
            className="w-8 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center font-mono text-lg text-white shadow-inner group-hover:border-accent/30 group-hover:bg-accent/5 transition-colors"
          >
            {digit}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

// In The Media Component
const InTheMedia: React.FC = () => (
  <Section id="media" subtitle="Featured In" title="In The Media">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {mediaData.map((item, i) => (
        <motion.a
          key={i}
          href={item.link}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group relative block"
        >
          {/* Premium Card */}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-accent/30 transition-all duration-500 h-full">
            
            {/* Glow Effects */}
            <div className="absolute -top-12 sm:-top-20 -right-12 sm:-right-20 w-24 sm:w-40 h-24 sm:h-40 bg-accent/10 rounded-full blur-2xl sm:blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute -bottom-12 sm:-bottom-20 -left-12 sm:-left-20 w-24 sm:w-40 h-24 sm:h-40 bg-primary/10 rounded-full blur-2xl sm:blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Headline Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img 
                src={item.image} 
                alt={item.headline}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://picsum.photos/seed/${item.pub.replace(/\s/g, '')}/800/500`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"></div>
              
              {/* Newspaper Logo Badge */}
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-4 py-1 sm:py-2 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-xl">
                <span className="text-[8px] sm:text-[10px] md:text-xs font-bold text-dark uppercase tracking-wider">{item.pub}</span>
              </div>
              
              {/* Featured Badge */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                <div className="w-7 h-7 sm:w-8 md:w-10 sm:h-8 md:h-10 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 flex items-center justify-center">
                  <FileText size={14} className="sm:w-4 md:w-[18px] sm:h-4 md:h-[18px] text-accent" />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="relative p-4 sm:p-5 md:p-6">
              {/* Headline */}
              <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-serif text-white leading-snug mb-2 sm:mb-3 md:mb-4 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                {item.headline}
              </h4>
              
              {/* Divider */}
              <div className="w-10 sm:w-12 h-[2px] bg-gradient-to-r from-accent to-primary mb-2 sm:mb-3 md:mb-4 group-hover:w-full transition-all duration-500"></div>
              
              {/* Read More */}
              <div className="flex items-center justify-between">
                <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wide sm:tracking-widest text-white/40 group-hover:text-accent transition-colors font-medium">Read Article</span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-6 h-6 sm:w-7 md:w-8 sm:h-7 md:h-8 rounded-full bg-white/5 group-hover:bg-accent/20 flex items-center justify-center transition-all duration-300">
                    <ExternalLink size={12} className="sm:w-3.5 md:w-[14px] sm:h-3.5 md:h-[14px] text-white/50 group-hover:text-accent group-hover:rotate-12 transition-all duration-300" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  </Section>
);

export default function App() {
  const [modalContent, setModalContent] = useState<{ isOpen: boolean, title: string, image?: string, description?: string }>({
    isOpen: false,
    title: "",
    image: undefined,
    description: undefined
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [showProfessionalSkills, setShowProfessionalSkills] = useState(false);

  // Full list of professional skills for popup
  const allProfessionalSkills = [
    "Project Management", "Leadership", "Teamwork", "Time Management",
    "Public Relation", "Analytical & Problem-Solving Skills", "Decision Making",
    "Effective Communication", "Customer Relationship Management", "Report Writing",
    "Attention to Detail", "Professional Integrity"
  ];
  const [galleryLightbox, setGalleryLightbox] = useState<{ isOpen: boolean, currentIndex: number, items: any[] }>({
    isOpen: false,
    currentIndex: 0,
    items: []
  });

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/resume/Shanewaz-Aurnob-Resume.pdf';
    link.download = 'Shanewaz-Aurnob-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && pdfModalOpen) {
        setPdfModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pdfModalOpen]);

  return (
    <div className="bg-dark min-h-screen selection:bg-white selection:text-black overflow-x-hidden relative">
      <div className="fixed inset-0 bg-grid z-0 pointer-events-none opacity-40"></div>
      <CustomCursor />
      <ParallaxBackground />
      <Header />
      
      <FloatingSocials />

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
      </div>

      {/* Hero Section - Imported Component */}
      <Hero onViewResume={() => setPdfModalOpen(true)} />

      {/* About Section */}
      <Section id="about" subtitle="Career Objective" title="About Me">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <div className="relative rounded-3xl overflow-hidden group h-full">
              {/* Premium Glass Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.01] rounded-3xl border border-white/10 group-hover:border-accent/40 transition-all duration-500" />
              
              {/* Animated Corner Glows */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              {/* Shine Sweep Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl" />
              
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                <Sparkles size={180} />
              </div>
              
              <div className="relative z-10 p-5 sm:p-6 md:p-10 lg:p-12 flex flex-col justify-between h-full">
                {/* Quote Section */}
                <div className="mb-6 sm:mb-8 md:mb-10">
                  <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-accent text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">My Vision</span>
                  </div>
                  <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-serif leading-snug text-white/90 mb-4 sm:mb-6 md:mb-8 italic group-hover:text-white transition-colors duration-300">
                    "To contribute to organizational growth through analytical skills and professional expertise."
                  </blockquote>
                  <p className="text-white/50 font-light leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl group-hover:text-white/60 transition-colors duration-300">
                    As a CSE graduate, I bridge gaps between data analysis and functional web ecosystems with integrity, learning, and dedication.
                  </p>
                </div>
                
                {/* Divider */}
                <div className="w-24 h-[2px] bg-gradient-to-r from-accent/60 to-transparent mb-8 group-hover:w-40 transition-all duration-500" />
                
                {/* Contact Info */}
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-accent/30 transition-all duration-300">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center">
                      <MapPin size={14} className="text-accent sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                    </div>
                    <span className="text-xs sm:text-sm font-light text-white/70">{contactData.location}</span>
                  </div>
                  
                  <motion.a 
                    href={`tel:${contactData.phone}`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center">
                      <Phone size={14} className="text-accent sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                    </div>
                    <span className="text-xs sm:text-sm font-light text-white/70 hover:text-accent transition-colors">{contactData.phone}</span>
                  </motion.a>
                  
                  <motion.a 
                    href={`mailto:${contactData.email}`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center">
                      <Mail size={14} className="text-accent sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                    </div>
                    <span className="text-xs sm:text-sm font-light text-white/70 hover:text-accent transition-colors truncate max-w-[140px] sm:max-w-none">{contactData.email}</span>
                  </motion.a>
                </div>
              </div>
              
              {/* Bottom Accent Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-b-3xl" />
            </div>
          </motion.div>
          
          {/* Side Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 grid grid-cols-1 gap-6"
          >
            {/* Tech Enthusiast Card */}
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative rounded-3xl overflow-hidden group"
            >
              {/* Premium Glass Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.01] rounded-3xl border border-white/10 group-hover:border-accent/40 transition-all duration-500" />
              
              {/* Animated Glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/25 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl" />
              
              <div className="relative z-10 p-5 sm:p-6 md:p-8 flex flex-col justify-center items-center text-center">
                <div className="relative mb-4 sm:mb-6">
                  <div className="absolute inset-0 bg-accent/30 rounded-xl sm:rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center text-accent group-hover:from-accent group-hover:to-accent/80 group-hover:text-dark group-hover:border-accent/50 transition-all duration-500">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif mb-2 sm:mb-3 italic group-hover:text-accent transition-colors duration-300">Tech Enthusiast</h3>
                <p className="text-white/40 font-light text-xs sm:text-sm group-hover:text-white/60 transition-colors">Always exploring AI, ML, and Web innovations.</p>
              </div>
              
              {/* Bottom Accent Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-b-3xl" />
            </motion.div>
            
            {/* Professional Skills Card */}
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setShowProfessionalSkills(true)}
              className="relative rounded-3xl overflow-hidden group cursor-pointer"
            >
              {/* Premium Glass Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-white/[0.03] to-white/[0.01] rounded-3xl border border-white/10 group-hover:border-primary/40 transition-all duration-500" />
              
              {/* Animated Glow */}
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary/25 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl" />
              
              <div className="relative z-10 p-5 sm:p-6 md:p-8 flex flex-col justify-center items-center text-center">
                <div className="relative mb-4 sm:mb-6">
                  <div className="absolute inset-0 bg-primary/30 rounded-xl sm:rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-dark group-hover:border-primary/50 transition-all duration-500">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif mb-2 sm:mb-3 italic group-hover:text-primary transition-colors duration-300">Professional Skills</h3>
                <p className="text-white/40 font-light text-xs sm:text-sm group-hover:text-white/60 transition-colors mb-3 sm:mb-4">Leadership, Communication, Problem Solving</p>
                <div className="flex items-center gap-2 text-primary text-[10px] sm:text-xs uppercase tracking-wider font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span>View All</span>
                  <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5" />
                </div>
              </div>
              
              {/* Bottom Accent Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-b-3xl" />
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" subtitle="Technical Universe" title="Expertise">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12 md:mb-16">
          {[
            { label: "Languages", value: "5+" },
            { label: "Frameworks", value: "8+" },
            { label: "Databases", value: "3+" },
            { label: "Projects", value: "10+" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden group"
            >
              {/* Premium Glass Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.01] rounded-2xl sm:rounded-3xl border border-white/10 group-hover:border-accent/40 transition-all duration-500" />
              
              {/* Animated Glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/25 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-2xl sm:rounded-3xl" />
              
              <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-1 sm:mb-2 md:mb-3 group-hover:text-accent transition-colors">
                  <Counter value={stat.value} />
                </span>
                <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-white/40 font-bold group-hover:text-accent/60 transition-colors">{stat.label}</span>
              </div>
              
              {/* Bottom Accent Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-accent via-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-b-2xl sm:rounded-b-3xl" />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {expertiseData.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => skill.title === 'Professional' && setShowProfessionalSkills(true)}
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden group min-h-[240px] sm:min-h-[280px] md:min-h-[320px] ${skill.title === 'Professional' ? 'cursor-pointer' : ''}`}
            >
              {/* Premium Glass Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.01] rounded-2xl sm:rounded-3xl border border-white/10 group-hover:border-accent/40 transition-all duration-500" />
              
              {/* Animated Corner Glow */}
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-accent/25 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              {/* Shine Sweep Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-2xl sm:rounded-3xl" />
              
              <div className="relative z-10 p-4 sm:p-6 md:p-8 h-full flex flex-col">
                {/* Premium Icon Container */}
                <div className="relative inline-block mb-4 sm:mb-6">
                  <div className="absolute inset-0 bg-accent/30 rounded-xl sm:rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center text-accent group-hover:from-accent group-hover:to-accent/80 group-hover:text-dark group-hover:border-accent/50 group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-500">
                    <skill.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif mb-1 sm:mb-2 group-hover:text-accent transition-colors">
                  {skill.title}
                </h3>
                
                {/* Subtitle */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">
                    {skill.title === 'Professional' ? 'Click to see all' : 'Skills'}
                  </span>
                </div>
                
                {/* Divider */}
                <div className="w-12 sm:w-16 h-[1px] sm:h-[2px] bg-gradient-to-r from-accent/60 to-transparent mb-3 sm:mb-5 group-hover:w-full transition-all duration-500" />
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 flex-grow content-start">
                  {skill.items.map(item => (
                    <span key={item} className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/5 text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wider text-white/50 group-hover:border-accent/30 group-hover:text-accent/70 group-hover:bg-accent/10 transition-all duration-500 h-fit">
                      {item}
                    </span>
                  ))}
                </div>
                
                {/* Arrow - Appears on Hover */}
                <div className="flex justify-end mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                    <ChevronRight size={14} className="text-accent sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                  </div>
                </div>
              </div>
              
              {/* Bottom Accent Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-accent via-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-b-2xl sm:rounded-b-3xl" />
            </motion.div>
          ))}
        </div>

        {/* Professional Skills Popup */}
        <AnimatePresence>
          {showProfessionalSkills && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowProfessionalSkills(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-dark border border-white/10 rounded-3xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-serif text-white">Professional Skills</h3>
                  <button
                    onClick={() => setShowProfessionalSkills(false)}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {allProfessionalSkills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-4 py-2 rounded-xl border border-accent/30 bg-accent/10 text-sm text-accent"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      {/* Research Section */}
      <Section id="research" subtitle="Academic Contributions" title="Research & Publications">
        <div className="grid gap-4 sm:gap-6">
          {researchData.map((research, i) => (
            <motion.div
              key={research.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent/20 hover:bg-white/[0.03] transition-all duration-300"
            >
              {/* Header Row */}
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 text-[10px] sm:text-xs font-medium rounded-md ${
                    research.type === 'Journal Article' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-accent/10 text-accent border border-accent/20'
                  }`}>
                    {research.type}
                  </span>
                  <span className="text-xs text-silver/50">{research.year}</span>
                </div>
                {research.citations > 0 && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
                    <Award size={12} className="text-amber-400" />
                    <span className="text-xs font-medium text-amber-400">{research.citations} Cited</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2 leading-snug group-hover:text-accent/90 transition-colors">
                {research.title}
              </h3>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-x-2 text-xs text-silver/60 mb-3">
                <span>{research.authors.join(', ')}</span>
                <span className="text-white/20">|</span>
                <span className="text-accent/70">{research.journal}</span>
              </div>

              {/* Abstract */}
              <p className="text-xs sm:text-sm text-silver/50 leading-relaxed mb-4 line-clamp-2">
                {research.abstract}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {research.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[10px] sm:text-xs rounded bg-white/5 text-silver/60 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action */}
              {research.doi && (
                <a
                  href={research.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-accent hover:text-accent/80 transition-colors"
                >
                  Read Full Paper <ExternalLink size={12} />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Google Scholar Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-6 sm:mt-8 text-center"
        >
          <a
            href="https://scholar.google.com/citations?user=umBalUIAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-white/5 border border-white/10 text-silver hover:border-accent/30 hover:text-accent transition-all text-xs sm:text-sm"
          >
            <BookOpen size={14} />
            View on Google Scholar
            <ExternalLink size={12} />
          </a>
        </motion.div>
      </Section>

      {/* Projects Section - Imported Component */}
      <Projects onOpenModal={(title, desc) => setModalContent({ isOpen: true, title, description: desc })} />

      {/* Education Section */}
      <Section id="education" subtitle="Academic Journey" title="Education">
        <div className="relative space-y-6 sm:space-y-8 md:space-y-12 before:absolute before:inset-0 before:ml-4 sm:before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {educationData.map((edu, i) => (
            <motion.div 
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 bg-dark text-silver shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <GraduationCap size={16} className="sm:w-[18px] sm:h-[18px]" />
              </div>
              <div className="w-[calc(100%-3rem)] sm:w-[calc(100%-4rem)] md:w-[45%] p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-serif group-hover:text-silver transition-colors">{edu.degree}</h3>
                  <time className="font-mono text-[10px] sm:text-xs text-white/20">{edu.year}</time>
                </div>
                <div className="text-white/40 text-xs sm:text-sm mb-3 sm:mb-4">{edu.institution}</div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                  <span className="text-silver font-mono text-[10px] sm:text-xs">{edu.result}</span>
                  {edu.details && <span className="text-white/20 text-[10px] sm:text-xs italic">{edu.details}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Resume Section */}
      <Section id="resume" subtitle="Professional Summary" title="Resume">
        <div className="p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 sm:p-8 md:p-12 opacity-5 group-hover:opacity-10 transition-opacity">
            <FileText className="w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif mb-4 sm:mb-6">Ready for the next challenge.</h3>
            <p className="text-white/50 font-light text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 md:mb-10">
              My full resume details my academic background, technical proficiency, and leadership experiences.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-6">
              <Magnetic>
                <motion.button
                  onClick={handleDownloadPDF}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white text-dark text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold rounded-full flex items-center justify-center gap-2 sm:gap-3 shadow-xl shadow-white/5 hover:bg-accent transition-all duration-500 w-full sm:w-auto"
                >
                  Download PDF <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                </motion.button>
              </Magnetic>
              <Magnetic>
                <motion.button 
                  onClick={() => setPdfModalOpen(true)}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 border border-white/10 text-white text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold rounded-full hover:bg-white/5 hover:border-accent transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto"
                >
                  View PDF <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
                </motion.button>
              </Magnetic>
            </div>
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="awards" subtitle="Career & Honors" title="Experience & Awards">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12">
          <div className="lg:col-span-8 space-y-6 sm:space-y-8 md:space-y-12">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center text-accent border border-accent/20">
                <Award size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif italic bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Professional & Co-Curricular</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {experienceData.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setModalContent({ isOpen: true, title: exp.title, image: exp.image, description: exp.desc })}
                  className="relative rounded-3xl cursor-pointer group overflow-hidden"
                >
                  {/* Premium Glass Card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.01] rounded-2xl sm:rounded-3xl border border-white/10 group-hover:border-accent/40 transition-all duration-500" />
                  
                  {/* Animated Corner Glow */}
                  <div className="absolute -top-8 sm:-top-16 -right-8 sm:-right-16 w-24 sm:w-40 h-24 sm:h-40 bg-accent/25 rounded-full blur-2xl sm:blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute -bottom-8 sm:-bottom-16 -left-8 sm:-left-16 w-24 sm:w-40 h-24 sm:h-40 bg-primary/20 rounded-full blur-2xl sm:blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  
                  {/* Shine Sweep Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-2xl sm:rounded-3xl" />
                  
                  <div className="relative z-10 p-5 sm:p-6 md:p-8">
                    {/* Header with Year Badge */}
                    <div className="flex justify-between items-start gap-2 mb-3 sm:mb-5">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base sm:text-lg md:text-xl font-serif text-white group-hover:text-accent transition-colors duration-300 mb-1 sm:mb-2 line-clamp-2">{exp.title}</h4>
                        <div className="inline-flex items-center gap-1.5 sm:gap-2">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent animate-pulse" />
                          <span className="text-accent text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">{exp.role}</span>
                        </div>
                      </div>
                      <span className="text-[8px] sm:text-[10px] font-mono text-white/30 bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 group-hover:border-accent/30 group-hover:text-accent/60 transition-all shrink-0">{exp.year}</span>
                    </div>
                    
                    {/* Divider */}
                    <div className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-accent/60 to-transparent mb-3 sm:mb-5 group-hover:w-full transition-all duration-500" />
                    
                    {/* Description */}
                    <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed mb-4 sm:mb-6 line-clamp-3">{exp.desc}</p>
                    
                    {/* View Certificate Button - Appears on Hover */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                          <FileText size={12} className="sm:w-[14px] sm:h-[14px] text-accent" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-medium text-accent uppercase tracking-wider">View Certificate</span>
                      </div>
                      
                      {/* Arrow - Hidden by default, appears on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                          <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px] text-accent" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Accent Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-b-2xl sm:rounded-b-3xl" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6 sm:space-y-8 md:space-y-12">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center text-primary border border-primary/20">
                <Award size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif italic bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Recognition</h3>
            </div>
            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              {certificatesData.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onClick={() => setModalContent({ isOpen: true, title: cert.title, image: cert.image, description: cert.desc })}
                  className="relative p-4 sm:p-5 rounded-xl sm:rounded-2xl cursor-pointer group overflow-hidden"
                >
                  {/* Premium Glass Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent rounded-xl sm:rounded-2xl border border-white/10 group-hover:border-primary/40 transition-all duration-500" />
                  
                  {/* Animated Glow Effect */}
                  <div className="absolute -top-8 sm:-top-12 -right-8 sm:-right-12 w-20 sm:w-32 h-20 sm:h-32 bg-primary/20 rounded-full blur-2xl sm:blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute -bottom-6 sm:-bottom-8 -left-6 sm:-left-8 w-16 sm:w-24 h-16 sm:h-24 bg-accent/15 rounded-full blur-xl sm:blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  
                  <div className="relative z-10">
                    <div className="flex gap-3 sm:gap-4 items-start">
                      {/* Premium Icon Container */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/30 rounded-lg sm:rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-dark group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500 shrink-0">
                          <cert.icon size={16} className="sm:w-5 sm:h-5" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm sm:text-base mb-1 sm:mb-1.5 group-hover:text-primary transition-colors duration-300">{cert.title}</h4>
                        <p className="text-white/40 text-[10px] sm:text-xs font-light leading-relaxed line-clamp-2 mb-2 sm:mb-3">{cert.desc}</p>
                        
                        {/* View Certificate Button - Appears on Hover */}
                        <div className="flex items-center gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                            <FileText size={10} className="sm:w-3 sm:h-3 text-primary" />
                          </div>
                          <span className="text-[8px] sm:text-[10px] font-medium text-primary uppercase tracking-wider">View Certificate</span>
                        </div>
                      </div>
                      
                      {/* Arrow Indicator */}
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 self-center">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20">
                          <ChevronRight size={14} className="sm:w-4 sm:h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-4 sm:left-5 right-4 sm:right-5 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Gallery Section - Social Work */}
      <Section id="gallery" subtitle="Community Impact" title="Social Work & Welfare">
        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start"
          >
            {["All", "Education", "Health", "Charity", "Community"].map((category) => (
              <motion.button
                key={category}
                onClick={() => setGalleryFilter(category)}
                whileHover={{ scale: 1.05 }}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wide sm:tracking-wider transition-all ${
                  galleryFilter === category
                    ? "bg-accent text-dark shadow-lg"
                    : "bg-white/5 border border-white/10 text-white/70 hover:border-accent/50"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          <div className="overflow-x-auto scrollbar-hide pt-4 sm:pt-6 md:pt-8 pb-4 -mx-4 sm:-mx-6 md:-mx-12 lg:-mx-24 px-4 sm:px-6 md:px-12 lg:px-24">
            <div className="flex gap-4 sm:gap-6 md:gap-8 min-w-min">
              {galleryData
                .filter(item => galleryFilter === "All" || item.category === galleryFilter)
                .map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onClick={() => setGalleryLightbox({ isOpen: true, currentIndex: idx, items: [item] })}
                    className="group cursor-pointer flex-shrink-0 w-72 sm:w-80 md:w-96"
                  >
                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all h-full">
                      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                        <motion.img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-accent text-dark font-bold rounded-full text-xs sm:text-sm uppercase"
                          >
                            View Details
                          </motion.button>
                        </motion.div>
                      </div>

                      <div className="p-4 sm:p-6 md:p-8 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-b-2xl sm:rounded-b-3xl">
                        <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4 gap-2 sm:gap-4">
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase font-bold text-accent bg-accent/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                            {item.category}
                          </span>
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] text-white/40">{item.date}</span>
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-serif mb-2 sm:mb-3 group-hover:text-accent transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-white/50 text-xs sm:text-sm font-light mb-3 sm:mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-white/40">
                          <MapPin size={12} className="sm:w-[14px] sm:h-[14px] text-accent/60" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Media Section - In The Media */}
      <InTheMedia />

      {/* Gallery Lightbox Modal */}
      <AnimatePresence>
        {galleryLightbox.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGalleryLightbox({ ...galleryLightbox, isOpen: false })}
            className="fixed inset-0 bg-black/90 z-[150] flex items-center justify-center p-4 md:p-8 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl"
            >
              {galleryLightbox.items.length > 0 && (
                <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                  <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden flex-shrink-0">
                    <img
                      src={galleryLightbox.items[0].image}
                      alt={galleryLightbox.items[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setGalleryLightbox({ ...galleryLightbox, isOpen: false })}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/50 border border-white/20 text-white/70 hover:text-accent z-20"
                    >
                      <X size={16} />
                    </motion.button>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-accent bg-accent/15 px-3 py-1 rounded-full">
                          {galleryLightbox.items[0].category}
                        </span>
                        <span className="text-[10px] text-white/40">{galleryLightbox.items[0].date}</span>
                      </div>

                      <h2 className="text-xl font-serif text-white">
                        {galleryLightbox.items[0].title}
                      </h2>

                      <p className="text-sm text-white/60 font-light">
                        {galleryLightbox.items[0].fullDesc}
                      </p>

                      <div className="flex items-center gap-2 text-[10px] text-white/40">
                        <MapPin size={12} className="text-accent/60" />
                        <span>{galleryLightbox.items[0].location}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setGalleryLightbox({ ...galleryLightbox, isOpen: false })}
                      className="w-full py-3 bg-accent text-dark font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-white transition-all"
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Modal */}
      <AnimatePresence>
        {pdfModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPdfModalOpen(false)}
            className="fixed inset-0 bg-black/90 z-[150] flex items-center justify-center p-4 md:p-8 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPdfModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg"
              >
                <X size={24} />
              </motion.button>

              <div className="w-full h-full bg-white/[0.03] backdrop-blur-xl border border-white/10">
                <iframe
                  src="/resume/Shanewaz-Aurnob-Resume.pdf"
                  title="Resume PDF"
                  className="w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center gap-4">
                <span className="text-xs text-white/50 font-light">Press ESC or click X to close</span>
                <div className="flex items-center gap-3">
                  <motion.a
                    href="/resume/Shanewaz-Aurnob-Resume.pdf"
                    download="Shanewaz_Aurnob_Resume.pdf"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-6 py-2 bg-accent text-dark text-xs uppercase font-bold rounded-lg hover:bg-white transition-all"
                  >
                    <Download size={14} />
                    Download
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setPdfModalOpen(false)}
                    className="px-6 py-2 bg-red-600 text-white text-xs uppercase font-bold rounded-lg hover:bg-red-700 transition-all"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer id="contact" className="relative pt-10 sm:pt-12 md:pt-16 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 md:px-12 lg:px-24 border-t border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-accent/5 rounded-full blur-[100px] sm:blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-primary/5 rounded-full blur-[80px] sm:blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
            <div className="space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-[10vw] sm:text-[9vw] lg:text-[6vw] font-serif leading-[0.85] tracking-tighter mb-4 sm:mb-6">
                  Let's <br />
                  <span className="italic text-accent">Connect.</span>
                </h2>
                <p className="text-white/40 text-sm sm:text-base md:text-lg font-light max-w-md">
                  Have a project in mind or want to say hi? I'm open to discussing opportunities.
                </p>
              </motion.div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-5 group">
                  <div className="w-10 h-10 sm:w-12 md:w-14 sm:h-12 md:h-14 rounded-xl sm:rounded-2xl border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-dark transition-all">
                    <User size={18} className="sm:w-5 md:w-6 sm:h-5 md:h-6" />
                  </div>
                  <div>
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent font-bold mb-1 block">Name</span>
                    <span className="text-base sm:text-lg md:text-xl font-serif text-white/80">{contactData.name}</span>
                  </div>
                </div>

                <motion.a 
                  href={`mailto:${contactData.email}`}
                  whileHover={{ x: 10 }}
                  className="inline-flex items-center gap-3 sm:gap-5 group w-full"
                >
                  <div className="w-10 h-10 sm:w-12 md:w-14 sm:h-12 md:h-14 rounded-xl sm:rounded-2xl border border-white/20 bg-white/[0.05] flex items-center justify-center group-hover:bg-accent group-hover:text-dark transition-all">
                    <Mail size={18} className="sm:w-5 md:w-6 sm:h-5 md:h-6 text-white/70 group-hover:text-dark" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent font-bold block">Email Me</span>
                    <span className="text-sm sm:text-base md:text-lg font-serif text-white/80 group-hover:text-accent transition-colors truncate block">{contactData.email}</span>
                  </div>
                </motion.a>

                <div className="flex gap-3 sm:gap-4 md:gap-5 pt-2 sm:pt-4">
                  {socialLinks.map((social, i) => (
                    <motion.a 
                      key={i} 
                      href={social.href} 
                      target="_blank" 
                      rel="noreferrer"
                      whileHover={{ y: -8 }}
                      className="w-10 h-10 sm:w-12 md:w-14 sm:h-12 md:h-14 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center hover:bg-accent hover:text-dark hover:border-accent transition-all"
                      title={social.label}
                    >
                      {social.icon === 'Github' && <Github size={18} className="sm:w-5 md:w-6 sm:h-5 md:h-6" />}
                      {social.icon === 'Linkedin' && <Linkedin size={18} className="sm:w-5 md:w-6 sm:h-5 md:h-6" />}
                      {social.icon === 'Facebook' && <Facebook size={18} className="sm:w-5 md:w-6 sm:h-5 md:h-6" />}
                      {social.icon === 'X' && <X size={18} className="sm:w-5 md:w-6 sm:h-5 md:h-6" />}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative group"
            >
              <div className="absolute top-0 right-0 p-6 sm:p-8 md:p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                <Mail className="w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48" />
              </div>
              <form 
                action="https://formsubmit.co/aurnob.csecu@gmail.com" 
                method="POST"
                className="space-y-4 sm:space-y-5 md:space-y-6 relative z-10"
              >
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value="https://shanewaz-aurnob.github.io/Shanewaz-Aurnob-Portfolio/#contact" />
                
                <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent font-bold">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg sm:rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 focus:border-accent focus:bg-white/[0.05] outline-none transition-all font-light text-xs sm:text-sm" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent font-bold">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg sm:rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 focus:border-accent outline-none transition-all font-light text-xs sm:text-sm" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent font-bold">Message</label>
                  <textarea 
                    name="message"
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 focus:border-accent outline-none transition-all font-light text-xs sm:text-sm resize-none" 
                    rows={3} 
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <Magnetic>
                  <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 sm:py-3 bg-accent text-dark text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold rounded-lg sm:rounded-xl hover:bg-white transition-all duration-500 shadow-2xl shadow-accent/20"
                  >
                    Send Message
                  </motion.button>
                </Magnetic>
              </form>
            </motion.div>
          </div>
          
          <div className="mt-10 sm:mt-12 md:mt-16 pt-4 sm:pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex flex-col gap-1 sm:gap-2 text-center md:text-left">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-white/20">© 2026 Shanewaz Aurnob</p>
              <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-white/10">Built with Precision & Purpose</p>
            </div>
            
            <VisitorCounter />

            <div className="flex gap-4 sm:gap-6 md:gap-10 flex-wrap justify-center">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(item => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-white/30 hover:text-accent transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -5 }}
              className="p-3 sm:p-4 rounded-full border border-white/10 text-white/30 hover:text-white transition-all"
            >
              <ChevronRight size={18} className="sm:w-5 sm:h-5 -rotate-90" />
            </motion.button>
          </div>
        </div>
      </footer>
    </div>
  );
}
