import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Calendar, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { galleryData } from '../../data/portfolioData';
import { Section } from '../shared';

// Premium Horizontal Scroll Gallery Component
const Gallery: React.FC = () => {
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [galleryLightbox, setGalleryLightbox] = useState<{ isOpen: boolean; index: number; items: any[] }>({
    isOpen: false,
    index: 0,
    items: []
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const filteredData = galleryData.filter(item => galleryFilter === "All" || item.category === galleryFilter);

  const categories = ["All", "Education", "Health", "Charity", "Community"];

  const categoryColors: Record<string, { text: string; bg: string; border: string; shadow: string }> = {
    Education: { 
      text: "text-emerald-300", 
      bg: "from-emerald-600/30 to-emerald-500/10", 
      border: "border-emerald-500/50",
      shadow: "shadow-emerald-500/20"
    },
    Health: { 
      text: "text-cyan-300", 
      bg: "from-cyan-600/30 to-cyan-500/10", 
      border: "border-cyan-500/50",
      shadow: "shadow-cyan-500/20"
    },
    Charity: { 
      text: "text-orange-300", 
      bg: "from-orange-600/30 to-orange-500/10", 
      border: "border-orange-500/50",
      shadow: "shadow-orange-500/20"
    },
    Community: { 
      text: "text-emerald-300", 
      bg: "from-emerald-600/30 to-emerald-500/10", 
      border: "border-emerald-500/50",
      shadow: "shadow-emerald-500/20"
    }
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const { index, items } = galleryLightbox;
    if (direction === 'next') {
      setGalleryLightbox({
        ...galleryLightbox,
        index: (index + 1) % items.length
      });
    } else {
      setGalleryLightbox({
        ...galleryLightbox,
        index: (index - 1 + items.length) % items.length
      });
    }
  };

  // Check scroll position and update button states
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [filteredData]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if modal is open
      if (!galleryLightbox.isOpen) return;

      // ESC to close modal
      if (e.key === 'Escape') {
        e.preventDefault();
        setGalleryLightbox({ ...galleryLightbox, isOpen: false });
      }
      // Arrow Right to next image
      else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateLightbox('next');
      }
      // Arrow Left to previous image
      else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateLightbox('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryLightbox]);

  // Smooth scroll by amount
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const target = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: target,
        behavior: 'smooth'
      });
    }
  };

  // Mouse drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    if (scrollContainerRef.current) {
      setScrollStart(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    const distance = e.clientX - dragStart;
    scrollContainerRef.current.scrollLeft = scrollStart - distance;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handling for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientX);
    if (scrollContainerRef.current) {
      setScrollStart(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    const distance = e.touches[0].clientX - dragStart;
    scrollContainerRef.current.scrollLeft = scrollStart - distance;
  };

  return (
    <>
      <Section id="gallery" subtitle="Community Impact" title="Social Work & Welfare">
        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {/* Category Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setGalleryFilter(category)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`interactive px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3 rounded-full text-xs sm:text-sm md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                  galleryFilter === category
                    ? "bg-gradient-to-r from-accent to-accent/80 text-dark shadow-lg shadow-accent/30 border border-accent"
                    : "bg-white/5 border border-white/10 text-white/70 hover:border-accent/50 hover:bg-white/10"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Horizontal Scroll Gallery */}
          <div className="relative group">
            <div className="overflow-x-auto scrollbar-hide pt-4 sm:pt-6 md:pt-8 pb-4 -mx-4 sm:-mx-6 md:-mx-12 lg:-mx-24 px-4 sm:px-6 md:px-12 lg:px-24">
              <div className="flex gap-5 sm:gap-6 md:gap-8 min-w-min">
                <AnimatePresence mode="wait">
                  {filteredData.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      onClick={() => setGalleryLightbox({ isOpen: true, index: idx, items: filteredData })}
                      className="group cursor-pointer flex-shrink-0 w-72 sm:w-80 md:w-96"
                    >
                      <motion.div 
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.4 }}
                        className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 transition-all h-full flex flex-col bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 group/card"
                      >
                        {/* Image Section */}
                        <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden bg-gradient-to-br from-white/5 to-transparent group/image">
                          <motion.img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.8 }}
                          />
                          
                          {/* Overlay */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 flex flex-col items-center justify-end p-4 sm:p-6 md:p-8 z-30 group-hover/card:opacity-100"
                          >
                            <motion.button
                              initial={{ opacity: 0, y: 50 }}
                              whileHover={{ scale: 1.15, y: -8 }}
                              whileTap={{ scale: 0.9 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.05 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setGalleryLightbox({ isOpen: true, index: idx, items: filteredData });
                              }}
                              className="interactive px-7 sm:px-9 py-3 sm:py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-emerald-500/80 border-2 border-white/90 hover:border-white hover:shadow-emerald-500 transition-all duration-300"
                            >
                              View Details
                            </motion.button>
                          </motion.div>

                          {/* Category Badge */}
                          <motion.span 
                            className={`absolute top-4 left-4 text-[10px] sm:text-[11px] md:text-xs uppercase font-bold px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full backdrop-blur-lg border-2 group-hover/card:border-emerald-300 group-hover/card:shadow-lg group-hover/card:shadow-emerald-500/40 ${categoryColors[item.category]?.border || "border-emerald-500/50"} bg-gradient-to-r ${categoryColors[item.category]?.bg || "from-emerald-600/30 to-emerald-500/10"} ${categoryColors[item.category]?.text || "text-emerald-300"} z-20 transition-all duration-500`}
                            whileHover={{ scale: 1.15 }}
                          >
                            {item.category}
                          </motion.span>

                          {/* Favorite Button */}
                          <motion.button
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.85 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(String(item.id));
                            }}
                            className="interactive absolute top-4 right-4 p-2.5 sm:p-3 md:p-3.5 rounded-full bg-white/20 backdrop-blur-lg border-2 border-white/40 hover:bg-white/30 hover:border-white/60 transition-all z-20 shadow-lg"
                          >
                            <Heart
                              size={16}
                              className={`sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px] ${favorites.has(String(item.id)) ? "fill-red-500 text-red-500 animate-pulse" : "text-white/80 hover:text-white"}`}
                            />
                          </motion.button>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 p-4 sm:p-5 md:p-6 flex flex-col bg-white/[0.01] group-hover/card:bg-emerald-500/5 transition-all duration-500">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <span className="text-[9px] sm:text-[10px] md:text-[11px] uppercase font-bold text-white/60 bg-white/5 group-hover/card:bg-emerald-500/20 group-hover/card:text-emerald-300 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full transition-all duration-500">
                              {item.date}
                            </span>
                          </div>
                          
                          <h3 className="text-sm sm:text-base md:text-lg font-serif font-bold text-white group-hover/card:text-emerald-300 mb-2 sm:mb-2.5 transition-colors duration-500 line-clamp-2">
                            {item.title}
                          </h3>
                          
                          <div className="h-0.5 sm:h-1 bg-gradient-to-r from-purple-400/60 via-pink-400/40 to-transparent mb-2.5 sm:mb-3 md:mb-3.5 group-hover/card:from-emerald-400 group-hover/card:via-emerald-300 group-hover/card:to-emerald-300/50 transition-all duration-700" />
                          
                          <p className="text-white/60 text-[10px] sm:text-xs md:text-xs font-light mb-3 sm:mb-4 flex-grow line-clamp-2 group-hover/card:text-emerald-200 transition-colors duration-500">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] text-white/50 group-hover/card:text-emerald-300 transition-colors duration-500">
                            <MapPin size={12} className="sm:w-[14px] sm:h-[14px] md:w-4 md:h-4 flex-shrink-0" />
                            <span className="truncate">{item.location}</span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Premium Lightbox Modal */}
      <AnimatePresence>
        {galleryLightbox.isOpen && galleryLightbox.items.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGalleryLightbox({ ...galleryLightbox, isOpen: false })}
            className="fixed inset-0 bg-black/95 z-[150] flex items-center justify-center p-3 sm:p-4 md:p-6 backdrop-blur-xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery item details"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl lg:max-w-6xl my-auto"
            >
              {galleryLightbox.items[galleryLightbox.index] && (
                <div className="relative rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden"
                     style={{ 
                       background: 'linear-gradient(135deg, rgba(15,15,25,0.95) 0%, rgba(10,10,20,0.97) 50%, rgba(5,5,15,0.99) 100%)',
                       backdropFilter: 'blur(20px)',
                       border: '1px solid rgba(255,255,255,0.1)',
                       boxShadow: '0 25px 60px -12px rgba(0,0,0,0.6), 0 15px 40px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.08)'
                     }}>
                  
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.15, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setGalleryLightbox({ ...galleryLightbox, isOpen: false })}
                    className="interactive absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/15 backdrop-blur-lg border border-white/40 text-white hover:bg-white/25 hover:border-white/60 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black/50 shadow-lg"
                    aria-label="Close modal (Press ESC)"
                    title="Close (ESC)"
                  >
                    <X size={20} className="sm:w-6 sm:h-6" />
                  </motion.button>

                  {/* Main Grid Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-1">
                    {/* Image Section - Takes 3 columns on large screens */}
                    <div className="lg:col-span-3 relative overflow-hidden">
                      <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] bg-gradient-to-br from-black/60 via-black/70 to-black/80 flex items-center justify-center group/image">
                        <motion.img
                          key={galleryLightbox.items[galleryLightbox.index].id}
                          src={galleryLightbox.items[galleryLightbox.index].image}
                          alt={galleryLightbox.items[galleryLightbox.index].title}
                          className="w-auto h-auto max-w-full max-h-full object-contain px-4 sm:px-6"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Navigation Buttons - Always Visible on Desktop */}
                        <div className="absolute inset-0 flex items-center justify-between px-3 sm:px-6 opacity-0 lg:opacity-100 group-hover/image:opacity-100 transition-opacity">
                          <motion.button
                            whileHover={{ scale: 1.12, x: -3 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateLightbox('prev');
                            }}
                            className="interactive p-2.5 sm:p-3.5 rounded-full bg-gradient-to-br from-purple-600/70 to-purple-700/70 backdrop-blur-lg border border-white/40 text-white hover:from-purple-500/80 hover:to-purple-600/80 hover:border-white/60 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-2xl"
                            aria-label="Previous image (Press ←)"
                            title="Previous (←)"
                          >
                            <ChevronLeft size={22} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.12, x: 3 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateLightbox('next');
                            }}
                            className="interactive p-2.5 sm:p-3.5 rounded-full bg-gradient-to-br from-purple-600/70 to-purple-700/70 backdrop-blur-lg border border-white/40 text-white hover:from-purple-500/80 hover:to-purple-600/80 hover:border-white/60 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-2xl"
                            aria-label="Next image (Press →)"
                            title="Next (→)"
                          >
                            <ChevronRight size={22} />
                          </motion.button>
                        </div>

                        {/* Progress Indicator Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-transparent"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${((galleryLightbox.index + 1) / galleryLightbox.items.length) * 100}%`
                            }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content Section - Takes 2 columns on large screens */}
                    <div className="lg:col-span-2 flex flex-col p-5 sm:p-7 md:p-8 lg:p-8 bg-gradient-to-b from-white/5 via-white/2 to-transparent border-t lg:border-t-0 lg:border-l border-white/8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-6">
                      
                      {/* Badge Section */}
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className={`inline-block text-[10px] sm:text-xs uppercase font-bold px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-lg border-1.5 ${categoryColors[galleryLightbox.items[galleryLightbox.index].category]?.border || "border-emerald-500/50"} bg-gradient-to-r ${categoryColors[galleryLightbox.items[galleryLightbox.index].category]?.bg || "from-emerald-600/30"} ${categoryColors[galleryLightbox.items[galleryLightbox.index].category]?.text || "text-emerald-300"} shadow-lg shadow-purple-500/10`}
                        >
                          {galleryLightbox.items[galleryLightbox.index].category}
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                          className="text-xs sm:text-sm text-white/60 bg-white/10 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-lg border border-white/20 font-medium"
                        >
                          {galleryLightbox.items[galleryLightbox.index].date}
                        </motion.span>
                      </div>

                      {/* Title */}
                      <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-serif font-bold bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent leading-tight pr-6"
                      >
                        {galleryLightbox.items[galleryLightbox.index].title}
                      </motion.h2>

                      {/* Decorative Divider */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent rounded-full shadow-lg shadow-purple-500/50"
                      />

                      {/* Description */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="flex-grow"
                      >
                        <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed tracking-wide">
                          {galleryLightbox.items[galleryLightbox.index].fullDesc}
                        </p>
                      </motion.div>

                      {/* Location */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 text-white/80 text-sm sm:text-base"
                      >
                        <div className="p-2 sm:p-2.5 rounded-full bg-gradient-to-br from-purple-600/40 to-pink-600/30 border border-purple-500/60 flex-shrink-0 shadow-lg shadow-purple-500/20">
                          <MapPin size={16} className="text-purple-300 sm:w-5 sm:h-5" />
                        </div>
                        <span className="font-medium">{galleryLightbox.items[galleryLightbox.index].location}</span>
                      </motion.div>

                      {/* Action Buttons Group */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="flex gap-2.5 sm:gap-3 pt-3 sm:pt-4 mt-2"
                      >
                        {/* Close Button */}
                        <motion.button
                          whileHover={{ scale: 1.06, y: -2 }}
                          whileTap={{ scale: 0.94 }}
                          onClick={() => setGalleryLightbox({ ...galleryLightbox, isOpen: false })}
                          className="interactive w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-600 hover:from-emerald-500 hover:via-emerald-500 hover:to-emerald-500 text-white font-semibold rounded-lg sm:rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-emerald-700/50 backdrop-blur-lg border border-emerald-400/60 hover:border-emerald-300/70 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black/70"
                          aria-label="Close modal"
                        >
                          Close
                        </motion.button>
                      </motion.div>

                      {/* Counter Info */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center text-xs text-white/50 pt-2 border-t border-white/10"
                      >
                        {galleryLightbox.index + 1} of {galleryLightbox.items.length}
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
