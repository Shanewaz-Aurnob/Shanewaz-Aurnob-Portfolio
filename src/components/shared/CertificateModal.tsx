import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Award, ExternalLink } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image?: string;
  description?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  image, 
  description 
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 cursor-zoom-out overflow-y-auto"
      >
        {/* Premium Multi-layer Background */}
        <div className="absolute inset-0 bg-dark/95 backdrop-blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.1),transparent_50%)]" />
        
        {/* Animated Floating Orbs */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-20 left-20 w-72 h-72 bg-accent/20 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-primary/15 rounded-full blur-[120px] pointer-events-none"
        />
        
        {/* Main Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 60 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 60 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden cursor-default my-auto"
        >
          {/* Glass Card Container */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Card Border Glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-accent/50 via-white/20 to-primary/50 rounded-3xl" />
            
            {/* Card Inner */}
            <div className="relative bg-gradient-to-br from-gunmetal via-dark to-gunmetal rounded-3xl overflow-hidden">
              {/* Inner Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
              
              {/* Close Button - Floating */}
              <motion.button 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                onClick={onClose} 
                className="absolute top-4 right-4 z-50 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full hover:bg-accent/20 hover:border-accent/50 transition-all duration-300 group"
              >
                <X size={20} className="text-white/70 group-hover:text-accent group-hover:rotate-90 transition-all duration-500" />
              </motion.button>
              
              {/* Header */}
              <div className="relative p-6 md:p-8 border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5" />
                <div className="relative flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
                    <Award size={24} className="text-accent" />
                  </div>
                  <div>
                    <motion.h3 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl md:text-2xl font-serif text-white tracking-tight"
                    >
                      {title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-[10px] uppercase tracking-[0.3em] text-accent/80 mt-1"
                    >
                      Certificate Preview
                    </motion.p>
                  </div>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="relative p-6 md:p-8 overflow-y-auto max-h-[60vh] custom-scrollbar">
                {image ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative group"
                  >
                    {/* Image Container with Effects */}
                    <div className="relative rounded-2xl overflow-hidden">
                      {/* Image Glow */}
                      <div className="absolute -inset-4 bg-gradient-to-br from-accent/30 to-primary/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                      
                      {/* Border Frame */}
                      <div className="absolute -inset-[1px] bg-gradient-to-br from-accent/40 via-white/10 to-primary/40 rounded-2xl" />
                      
                      {/* Image */}
                      <img 
                        src={image} 
                        alt={title} 
                        className="relative w-full h-auto max-h-[50vh] object-contain rounded-2xl bg-dark/50" 
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl flex items-end justify-center pb-6">
                        <motion.a
                          href={image}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-accent/90 backdrop-blur-sm text-dark text-xs uppercase tracking-wider font-bold rounded-full flex items-center gap-2 shadow-xl"
                        >
                          <ExternalLink size={14} />
                          View Full Size
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                ) : description ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {description.split('\n').map((line, i) => (
                      <motion.p 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-white/80 font-light leading-relaxed text-sm md:text-base"
                      >
                        {line.trim()}
                      </motion.p>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center justify-center text-center"
                  >
                    {/* Placeholder Design */}
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl animate-pulse" />
                      <div className="relative p-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                        <FileText size={56} className="text-accent/50" />
                      </div>
                    </div>
                    <p className="font-serif italic text-xl text-white/50 mb-2">Certificate Coming Soon</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Image will be added shortly</p>
                  </motion.div>
                )}
              </div>
              
              {/* Footer */}
              <div className="relative p-6 md:p-8 border-t border-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
                <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Press ESC or click outside to close</p>
                  <div className="flex items-center gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="px-8 py-3 bg-gradient-to-r from-accent to-accent/80 text-dark text-xs uppercase tracking-wider font-bold rounded-full hover:from-white hover:to-white/90 transition-all duration-500 shadow-lg shadow-accent/20"
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
