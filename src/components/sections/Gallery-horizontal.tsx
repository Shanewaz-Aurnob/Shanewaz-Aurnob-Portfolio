import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
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
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const filteredData = galleryData.filter(item => galleryFilter === "All" || item.category === galleryFilter);

  const categories = ["All", "Education", "Health", "Charity", "Community"];

  const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
    Education: { text: "text-blue-400", bg: "from-blue-500/20 to-blue-400/10", border: "border-blue-400/30" },
    Health: { text: "text-red-400", bg: "from-red-500/20 to-red-400/10", border: "border-red-400/30" },
    Charity: { text: "text-pink-400", bg: "from-pink-500/20 to-pink-400/10", border: "border-pink-400/30" },
    Community: { text: "text-green-400", bg: "from-green-500/20 to-green-400/10", border: "border-green-400/30" }
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
        <div className="space-y-12">
          {/* Premium Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap gap-3 justify-center md:justify-start"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setGalleryFilter(category)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-500 ${
                  galleryFilter === category
                    ? "bg-gradient-to-r from-accent to-accent/80 text-dark shadow-lg shadow-accent/30 border border-accent"
                    : "bg-white/5 border border-white/10 text-white/70 hover:border-accent/50 hover:bg-white/10"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Premium Horizontal Scroll Gallery */}
          <div className="relative group">
            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              className="flex gap-6 sm:gap-7 md:gap-8 overflow-x-auto scroll-smooth scrollbar-hide pt-2 pb-6 px-2 cursor-grab active:cursor-grabbing select-none"
              style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <AnimatePresence mode="wait">
                {filteredData.map((item, idx) => {
                  const colors = categoryColors[item.category] || categoryColors.Community;
                  
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      onClick={() => setGalleryLightbox({ isOpen: true, index: idx, items: filteredData })}
                      className="group flex-shrink-0 w-72 sm:w-80 md:w-96 cursor-pointer"
                    >
                      {/* Premium Card */}
                      <div className="relative overflow-hidden rounded-3xl h-full">
                        {/* Gradient Border Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/0 rounded-3xl pointer-events-none z-10" />

                        {/* Image Container */}
                        <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden flex-shrink-0">
                          {/* Premium Image with Zoom */}
                          <motion.img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.12 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                          />

                          {/* Premium Overlay */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col items-center justify-center gap-3"
                          >
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: 1 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-8 py-3 bg-accent text-dark font-bold rounded-full text-sm uppercase tracking-wider shadow-lg shadow-accent/40 hover:bg-white transition-all duration-300"
                            >
                              View Full Story
                            </motion.button>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              whileHover={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="text-white/80 text-[11px] uppercase tracking-widest font-medium"
                            >
                              Click to explore
                            </motion.div>
                          </motion.div>

                          {/* Category Badge */}
                          <motion.div
                            className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider backdrop-blur-md border ${colors.border} bg-gradient-to-r ${colors.bg} ${colors.text}`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {item.category}
                          </motion.div>

                          {/* Date Badge */}
                          <motion.div
                            className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider backdrop-blur-md border border-white/20 bg-black/40 text-white/70"
                            whileHover={{ scale: 1.1 }}
                          >
                            {item.date}
                          </motion.div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 sm:p-7 md:p-8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl border border-white/10 group-hover:border-accent/30 transition-all duration-500 flex flex-col h-auto">
                          {/* Title */}
                          <h3 className="text-lg sm:text-xl font-serif text-white group-hover:text-accent transition-colors duration-300 mb-3 leading-tight line-clamp-2">
                            {item.title}
                          </h3>

                          {/* Divider */}
                          <div className="w-12 h-[2px] bg-gradient-to-r from-accent/60 to-transparent mb-4 group-hover:w-20 transition-all duration-500" />

                          {/* Description */}
                          <p className="text-white/50 text-sm font-light leading-relaxed mb-5 line-clamp-2 flex-grow">
                            {item.description}
                          </p>

                          {/* Footer Info */}
                          <div className="space-y-2 pt-4 border-t border-white/10">
                            {/* Location */}
                            <motion.div
                              className="flex items-center gap-2 text-[11px] text-white/50"
                              whileHover={{ x: 5 }}
                            >
                              <MapPin size={14} className="text-accent/60 flex-shrink-0" />
                              <span className="truncate">{item.location}</span>
                            </motion.div>

                            {/* Date */}
                            <motion.div
                              className="flex items-center gap-2 text-[11px] text-white/50"
                              whileHover={{ x: 5 }}
                            >
                              <Calendar size={14} className="text-accent/60 flex-shrink-0" />
                              <span>{item.date}</span>
                            </motion.div>
                          </div>

                          {/* Hover Indicator */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 text-accent text-[10px] uppercase tracking-wider font-medium"
                          >
                            → Tap to view story
                          </motion.div>
                        </div>

                        {/* Card Glow */}
                        <motion.div
                          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            boxShadow: "inset 0 0 30px rgba(16, 185, 129, 0.1)"
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Scroll Gradient Overlays */}
            <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-dark to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
            <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-dark to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

            {/* Left Scroll Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: canScrollLeft ? 1 : 0.3, x: 0 }}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark/80 border border-white/20 text-white hover:text-accent hover:border-accent/50 transition-all duration-300 z-30 backdrop-blur-sm disabled:cursor-not-allowed"
              title="Scroll left"
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Right Scroll Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: canScrollRight ? 1 : 0.3, x: 0 }}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark/80 border border-white/20 text-white hover:text-accent hover:border-accent/50 transition-all duration-300 z-30 backdrop-blur-sm disabled:cursor-not-allowed"
              title="Scroll right"
            >
              <ChevronRight size={20} />
            </motion.button>

            {/* No Results State */}
            {filteredData.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <p className="text-white/50 text-lg">No projects found in this category.</p>
              </motion.div>
            )}
          </div>

          {/* Gallery Info Text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-white/40 text-sm"
          >
            <p>Drag to scroll • Click any card to view the full story</p>
          </motion.div>
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
            className="fixed inset-0 bg-black/95 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-8 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto"
            >
              {galleryLightbox.items[galleryLightbox.index] && (
                <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setGalleryLightbox({ ...galleryLightbox, isOpen: false })}
                    className="absolute top-4 right-4 p-3 rounded-full bg-black/50 border border-white/20 text-white/70 hover:text-accent hover:border-accent/50 z-20 transition-all duration-300"
                  >
                    <X size={20} />
                  </motion.button>

                  {/* Modal Content */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 sm:p-8 md:p-10">
                    {/* Image Section */}
                    <div className="md:col-span-3">
                      <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-square">
                        <motion.img
                          src={galleryLightbox.items[galleryLightbox.index].image}
                          alt={galleryLightbox.items[galleryLightbox.index].title}
                          className="w-full h-full object-cover"
                          layoutId={`gallery-image-${galleryLightbox.items[galleryLightbox.index].id}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="md:col-span-2 flex flex-col justify-between">
                      <div className="space-y-6">
                        {/* Category & Date */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="space-y-3"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] uppercase font-bold text-accent bg-accent/10 px-4 py-1.5 rounded-full border border-accent/30">
                              {galleryLightbox.items[galleryLightbox.index].category}
                            </span>
                            <span className="text-[11px] text-white/40">{galleryLightbox.items[galleryLightbox.index].date}</span>
                          </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                          className="text-2xl sm:text-3xl md:text-4xl font-serif text-white leading-tight"
                        >
                          {galleryLightbox.items[galleryLightbox.index].title}
                        </motion.h2>

                        {/* Divider */}
                        <div className="w-12 h-[2px] bg-gradient-to-r from-accent to-transparent" />

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-white/60 text-sm sm:text-base font-light leading-relaxed"
                        >
                          {galleryLightbox.items[galleryLightbox.index].fullDesc}
                        </motion.p>

                        {/* Location */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                          className="flex items-center gap-2 text-white/50 text-sm"
                        >
                          <MapPin size={16} className="text-accent/70 flex-shrink-0" />
                          <span>{galleryLightbox.items[galleryLightbox.index].location}</span>
                        </motion.div>
                      </div>

                      {/* Close Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setGalleryLightbox({ ...galleryLightbox, isOpen: false })}
                        className="w-full py-3 bg-gradient-to-r from-accent to-accent/80 text-dark font-bold rounded-xl text-sm uppercase tracking-wider hover:from-white hover:to-white/90 transition-all duration-300 shadow-lg shadow-accent/30 mt-6"
                      >
                        Close Story
                      </motion.button>
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
