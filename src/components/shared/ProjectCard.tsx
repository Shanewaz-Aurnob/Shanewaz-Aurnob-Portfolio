import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ChevronRight, Code } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
  github?: string;
  year?: string;
  onDetails?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  icon: Icon,
  github,
  year,
  onDetails
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative rounded-2xl sm:rounded-3xl cursor-pointer overflow-hidden h-full min-h-[260px] sm:min-h-[280px] md:min-h-[320px] flex flex-col"
    >
      {/* Premium Glass Card */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.01] rounded-2xl sm:rounded-3xl border border-white/10 group-hover:border-accent/40 transition-all duration-500" />
      
      {/* Animated Corner Glow */}
      <div className="absolute -top-8 sm:-top-16 -right-8 sm:-right-16 w-24 sm:w-40 h-24 sm:h-40 bg-accent/25 rounded-full blur-2xl sm:blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
      <div className="absolute -bottom-8 sm:-bottom-16 -left-8 sm:-left-16 w-24 sm:w-40 h-24 sm:h-40 bg-primary/20 rounded-full blur-2xl sm:blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
      
      {/* Shine Sweep Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-2xl sm:rounded-3xl" />
      
      {/* Background Icon */}
      <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500">
        <Icon className="w-12 h-12 sm:w-16 md:w-20 sm:h-16 md:h-20" />
      </div>
      
      <div className="relative z-10 p-4 sm:p-6 md:p-8 h-full flex flex-col">
        {/* Header with Year Badge */}
        <div className="flex justify-between items-start gap-2 mb-3 sm:mb-5">
          <div className="flex-1 min-w-0">
            {/* Premium Icon Container */}
            <div className="relative inline-block mb-2 sm:mb-4">
              <div className="absolute inset-0 bg-accent/30 rounded-lg sm:rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 text-accent group-hover:from-accent group-hover:to-accent/80 group-hover:text-dark group-hover:border-accent/50 group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-500">
                <Icon size={16} className="sm:w-5 sm:h-5" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-serif text-white group-hover:text-accent transition-colors duration-300 mb-1 sm:mb-2 line-clamp-1">{title}</h3>
            <div className="inline-flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">Project</span>
            </div>
          </div>
          {year && (
            <span className="text-[8px] sm:text-[10px] font-mono text-white/30 bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 group-hover:border-accent/30 group-hover:text-accent/60 transition-all shrink-0">{year}</span>
          )}
        </div>
        
        {/* Divider */}
        <div className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-accent/60 to-transparent mb-3 sm:mb-5 group-hover:w-full transition-all duration-500" />
        
        {/* Description */}
        <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed mb-3 sm:mb-5 line-clamp-2 flex-grow">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[8px] sm:text-[9px] uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 group-hover:border-accent/30 group-hover:text-accent/70 group-hover:bg-accent/10 transition-all duration-500">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-[8px] sm:text-[9px] uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/5 text-white/30">+{tags.length - 3}</span>
          )}
        </div>
        
        {/* Action Buttons - Appears on Hover */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
            {github && (
              <motion.a 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/20 text-white/70 hover:bg-accent/20 hover:border-accent/30 hover:text-accent transition-all duration-300"
              >
                <Github size={12} className="sm:w-[14px] sm:h-[14px]" />
                <span className="text-[8px] sm:text-[10px] uppercase tracking-wider font-medium">Code</span>
              </motion.a>
            )}
            {onDetails && (
              <motion.button 
                onClick={(e) => { e.stopPropagation(); onDetails(); }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/20 border border-accent/30 text-accent transition-all duration-300"
              >
                <Code size={12} className="sm:w-[14px] sm:h-[14px]" />
                <span className="text-[8px] sm:text-[10px] uppercase tracking-wider font-medium">Details</span>
              </motion.button>
            )}
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
  );
};
