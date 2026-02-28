import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { skillsData } from '../../data/portfolioData';
import { Section, Counter } from '../shared';

// Skills section component
const Skills: React.FC = () => {
  return (
    <Section id="skills" subtitle="Technical Universe" title="Expertise">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
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
            className="relative rounded-3xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.01] rounded-3xl border border-white/10 group-hover:border-accent/40 transition-all duration-500" />
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/25 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl" />
            
            <div className="relative p-10 flex flex-col items-center justify-center text-center">
              <span className="text-6xl font-serif font-bold text-white mb-3 group-hover:text-accent transition-colors">
                <Counter value={stat.value} />
              </span>
              <span className="text-xs uppercase tracking-[0.4em] text-white/40 font-bold group-hover:text-accent/60 transition-colors">{stat.label}</span>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-b-3xl" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillsData.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative rounded-3xl overflow-hidden group min-h-[320px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.01] rounded-3xl border border-white/10 group-hover:border-accent/40 transition-all duration-500" />
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-accent/25 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl" />
            
            <div className="relative z-10 p-8 h-full flex flex-col">
              {/* Icon Container */}
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-accent/30 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center text-accent group-hover:from-accent group-hover:to-accent/80 group-hover:text-dark group-hover:border-accent/50 group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-500">
                  <skill.icon className="w-7 h-7" />
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-serif mb- 2 group-hover:text-accent transition-colors">
                {skill.category}
              </h3>
              
              {/* Subtitle */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent text-[10px] uppercase tracking-[0.2em] font-bold">Skills</span>
              </div>
              
              {/* Divider */}
              <div className="w-16 h-[2px] bg-gradient-to-r from-accent/60 to-transparent mb-5 group-hover:w-full transition-all duration-500" />
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 flex-grow content-start">
                {skill.skills.map(item => (
                  <span key={item} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] uppercase tracking-wider text-white/50 group-hover:border-accent/30 group-hover:text-accent/70 group-hover:bg-accent/10 transition-all duration-500 h-fit">
                    {item}
                  </span>
                ))}
              </div>
              
              {/* Arrow */}
              <div className="flex justify-end mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                  <ChevronRight size={14} className="text-accent" />
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-b-3xl" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
