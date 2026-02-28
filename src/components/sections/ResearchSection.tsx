import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, FileText, Award } from 'lucide-react';
import { Section } from '../../components/shared';
import { researchData } from '../../data/portfolioData';

interface ResearchSectionProps {}

type PublicationType = 'All' | 'Journal Article' | 'Thesis';

export const ResearchSection: React.FC<ResearchSectionProps> = () => {
  const [activeFilter, setActiveFilter] = useState<PublicationType>('All');
  
  // Filter research data
  const filteredResearch = activeFilter === 'All' 
    ? researchData 
    : researchData.filter(r => r.type === activeFilter);

  // Calculate stats
  const journalArticles = researchData.filter(r => r.type === 'Journal Article').length;
  const theses = researchData.filter(r => r.type === 'Thesis').length;
  const totalCitations = researchData.reduce((sum, r) => sum + r.citations, 0);

  const filterOptions: PublicationType[] = ['All', 'Journal Article', 'Thesis'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <Section id="research" subtitle="Academic Contributions" title="Research & Publications">
      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10"
      >
        {[
          { label: 'Publications', value: researchData.length, icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
          { label: 'Journal Articles', value: journalArticles, icon: FileText, color: 'from-emerald-500 to-teal-500' },
          { label: 'Citations', value: totalCitations, icon: Award, color: 'from-amber-500 to-orange-500' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-slate-900/50 to-slate-900/20 border border-white/10 hover:border-white/20 transition-all duration-300"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${stat.color}`} />
              
              {/* Content */}
              <div className="relative z-10 flex items-center gap-3">
                <div className={`p-2.5 sm:p-3 rounded-lg bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="text-2xl sm:text-3xl font-bold text-white"
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-xs sm:text-sm text-white/60 font-medium">{stat.label}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10 justify-center sm:justify-start"
      >
        {filterOptions.map((option) => (
          <motion.button
            key={option}
            onClick={() => setActiveFilter(option)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 border backdrop-blur-md ${
              activeFilter === option
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-400/50 text-white shadow-lg shadow-blue-500/30'
                : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/10'
            }`}
          >
            {option}
            {option !== 'All' && (
              <span className="ml-2 text-[10px] sm:text-xs font-mono text-white/60">
                ({option === 'Journal Article' ? journalArticles : theses})
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Research Cards Grid */}
      <motion.div 
        className="grid gap-4 sm:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {filteredResearch.length > 0 ? (
          filteredResearch.map((research, i) => (
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
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="col-span-full text-center py-12"
          >
            <p className="text-white/60 text-sm">No publications found in this category.</p>
          </motion.div>
        )}
      </motion.div>

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
          className="interactive inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-white/5 border border-white/10 text-silver hover:border-accent/30 hover:text-accent transition-all text-xs sm:text-sm"
        >
          <BookOpen size={14} />
          View on Google Scholar
          <ExternalLink size={12} />
        </a>
      </motion.div>
    </Section>
  );
};

export default ResearchSection;
