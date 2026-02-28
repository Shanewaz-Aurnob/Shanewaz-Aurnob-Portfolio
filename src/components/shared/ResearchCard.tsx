import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, BookOpen, FileText, Users, TrendingUp } from 'lucide-react';

interface ResearchCardProps {
  title: string;
  authors: string[];
  journal: string;
  year: string;
  type: 'Thesis' | 'Journal Article';
  abstract: string;
  tags: string[];
  doi?: string;
  citations: number;
  index?: number;
}

export const ResearchCard: React.FC<ResearchCardProps> = ({
  title,
  authors,
  journal,
  year,
  type,
  abstract,
  tags,
  doi,
  citations,
  index = 0
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const isJournal = type === 'Journal Article';

  const containerVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -12,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 perspective"
    >
      {/* Premium Gradient Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/20" />
      
      {/* Animated gradient border effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl"
        style={{
          background: isJournal 
            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 78, 59, 0.15))"
            : "linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(37, 99, 235, 0.15))",
          opacity: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Top-right accent glow */}
      <motion.div
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl"
        style={{
          background: isJournal
            ? "radial-gradient(circle, rgba(16, 185, 129, 0.35), transparent)"
            : "radial-gradient(circle, rgba(59, 130, 246, 0.35), transparent)",
        }}
        animate={isHovered ? { scale: 1.3, opacity: 0.7 } : { scale: 1, opacity: 0.35 }}
        transition={{ duration: 0.6, type: "spring" }}
      />

      {/* Bottom-left accent glow */}
      <motion.div
        className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl"
        style={{
          background: isJournal
            ? "radial-gradient(circle, rgba(5, 150, 105, 0.25), transparent)"
            : "radial-gradient(circle, rgba(34, 197, 94, 0.2), transparent)",
        }}
        animate={isHovered ? { scale: 1.2, opacity: 0.5 } : { scale: 1, opacity: 0.25 }}
        transition={{ duration: 0.6, type: "spring", delay: 0.1 }}
      />

      {/* Animated border */}
      <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none transition-all duration-500 ${
        isHovered
          ? isJournal
            ? 'border-2 border-emerald-400/70 shadow-2xl shadow-emerald-500/25'
            : 'border-2 border-blue-400/70 shadow-2xl shadow-blue-500/25'
          : 'border border-white/15 shadow-lg shadow-black/20'
      }`} />

      {/* Main Content Container */}
      <div className="relative z-10 p-5 sm:p-7 h-full flex flex-col">
        
        {/* Header Section with Rich Metadata */}
        <div className="mb-5 sm:mb-6 space-y-3 sm:space-y-4">
          
          {/* Type Badge & Year Row */}
          <div className="flex items-center justify-between gap-2 sm:gap-3 flex-nowrap">
            {/* Type Badge with Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: (index || 0) * 0.1 + 0.2 }}
              className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0"
            >
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all ${
                isJournal
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-500/10'
                  : 'bg-blue-500/15 border-blue-500/50 text-blue-300 shadow-lg shadow-blue-500/10'
              }`}>
                {isJournal ? (
                  <BookOpen size={14} className="flex-shrink-0" />
                ) : (
                  <FileText size={14} className="flex-shrink-0" />
                )}
                <span className="text-xs sm:text-sm font-bold whitespace-nowrap">{type}</span>
              </div>
            </motion.div>

            {/* Year Badge - Improved styling */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: (index || 0) * 0.1 + 0.25 }}
              className="text-xs sm:text-sm font-mono font-bold text-white/70 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm flex-shrink-0"
            >
              {year}
            </motion.div>
          </div>

          {/* Citation Badge - Enhanced with Icon */}
          {citations > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: (index || 0) * 0.1 + 0.35, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.08 }}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit backdrop-blur-md border transition-all ${
                isJournal
                  ? 'bg-emerald-500/15 border-emerald-500/40'
                  : 'bg-blue-500/15 border-blue-500/40'
              }`}
            >
              <motion.div
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
              >
                {citations > 10 ? (
                  <TrendingUp size={14} className={isJournal ? "text-emerald-400" : "text-blue-400"} />
                ) : (
                  <Award size={14} className={isJournal ? "text-emerald-400" : "text-blue-400"} />
                )}
              </motion.div>
              <span className={`text-xs sm:text-sm font-bold ${isJournal ? 'text-emerald-300' : 'text-blue-300'}`}>
                {citations} Citation{citations !== 1 ? 's' : ''}
              </span>
            </motion.div>
          )}
        </div>

        {/* Title - Premium Typography */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: (index || 0) * 0.1 + 0.15 }}
          className={`text-base sm:text-lg md:text-xl font-serif font-bold text-white mb-3 sm:mb-4 line-clamp-3 leading-tight transition-all duration-300 ${
            isHovered ? "drop-shadow-lg" : ""
          }`}
          style={isHovered ? {
            backgroundImage: isJournal
              ? 'linear-gradient(135deg, #10b981, #34d399)'
              : 'linear-gradient(135deg, #3b82f6, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          } : {}}
        >
          {title}
        </motion.h3>

        {/* Authors & Journal Info - Enhanced Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: (index || 0) * 0.1 + 0.25 }}
          className="space-y-2.5 mb-4 sm:mb-5"
        >
          {/* Authors with improved icon */}
          <div className="flex items-start gap-2.5">
            <Users size={16} className="text-white/25 flex-shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-white/70 line-clamp-2 leading-relaxed hover:text-white/80 transition-colors">
              {authors.length > 2 ? authors[0] + ' et al.' : authors.join(', ')}
            </span>
          </div>

          {/* Journal/Publication with improved styling */}
          <div className="flex items-start gap-2.5">
            <BookOpen size={16} className={`${isJournal ? 'text-emerald-400/50' : 'text-blue-400/50'} flex-shrink-0 mt-0.5`} />
            <span className={`text-xs sm:text-sm font-semibold italic line-clamp-2 leading-relaxed transition-colors ${
              isJournal ? 'text-emerald-300/85 hover:text-emerald-300' : 'text-blue-300/85 hover:text-blue-300'
            }`}>
              {journal}
            </span>
          </div>
        </motion.div>

        {/* Abstract - Better Readability */}
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: (index || 0) * 0.1 + 0.3 }}
          className="text-xs sm:text-sm text-white/65 leading-relaxed mb-4 sm:mb-5 line-clamp-3 flex-grow group-hover:text-white/75 transition-colors duration-300"
        >
          {abstract}
        </motion.p>

        {/* Technology Tags - Enhanced */}
        <motion.div
          className="flex flex-wrap gap-2 mb-5 sm:mb-6"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.06,
                delayChildren: (index || 0) * 0.1 + 0.35
              }
            }
          }}
        >
          {tags.map((tag, idx) => (
            <motion.span
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.7, y: 5 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              whileHover={{ scale: 1.12, y: -3 }}
              className={`px-2.5 py-1 text-[10px] sm:text-xs rounded-full font-medium border backdrop-blur-md cursor-default transition-all duration-300 ${
                isJournal
                  ? 'bg-emerald-500/12 text-emerald-300 border-emerald-500/35 hover:bg-emerald-500/25 hover:shadow-md hover:shadow-emerald-500/20'
                  : 'bg-blue-500/12 text-blue-300 border-blue-500/35 hover:bg-blue-500/25 hover:shadow-md hover:shadow-blue-500/20'
              }`}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Action Button - Enhanced CTA */}
        {doi && (
          <motion.a
            href={doi}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: (index || 0) * 0.1 + 0.4 }}
            whileHover={{ x: 4, y: -2 }}
            className={`relative group/btn py-2.5 sm:py-3 px-4 sm:px-5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all duration-300 overflow-hidden uppercase tracking-wide ${
              isJournal
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-emerald-500/60 text-white shadow-lg shadow-emerald-500/35 hover:shadow-xl hover:shadow-emerald-500/50'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 border-blue-500/60 text-white shadow-lg shadow-blue-500/35 hover:shadow-xl hover:shadow-blue-500/50'
            }`}
          >
            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)"
              }}
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.7 }}
            />

            <span className="relative z-10 flex items-center gap-2">
              <span>Read Paper</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex"
              >
                <ExternalLink size={16} strokeWidth={2.5} />
              </motion.span>
            </span>
          </motion.a>
        )}
      </div>

      {/* Animated bottom accent line - Enhanced */}
      <motion.div
        className={`absolute bottom-0 left-0 h-1.5 transition-all duration-500 ${
          isJournal ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600' : 'bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600'
        }`}
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
      />

      {/* Right side accent line on hover */}
      <motion.div
        className={`absolute top-0 right-0 w-1 transition-all duration-500 ${
          isJournal ? 'bg-gradient-to-b from-emerald-500/50 to-transparent' : 'bg-gradient-to-b from-blue-500/50 to-transparent'
        }`}
        style={{ height: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};
