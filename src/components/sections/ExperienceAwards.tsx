import React from 'react';
import { motion } from 'framer-motion';
import { Award, FileText, ChevronRight } from 'lucide-react';
import { experienceData, certificatesData } from '../../data/portfolioData';
import { Section } from '../shared';

interface ExperienceAwardsProps {
  onOpenModal: (title: string, image?: string, description?: string) => void;
}

// Experience & Awards section component
const ExperienceAwards: React.FC<ExperienceAwardsProps> = ({ onOpenModal }) => {
  return (
    <Section id="awards" subtitle="Career & Honors" title="Experience & Awards">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center text-accent border border-accent/20">
              <Award size={20} />
            </div>
            <h3 className="text-3xl font-serif italic bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Professional & Co-Curricular</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experienceData.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onOpenModal(exp.title, exp.image, exp.desc)}
                className="relative rounded-3xl cursor-pointer group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.01] rounded-3xl border border-white/10 group-hover:border-accent/40 transition-all duration-500" />
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-accent/25 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl" />
                
                <div className="relative z-10 p-8">
                  <div className="flex justify-between items-start gap-2 mb-5">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg md:text-xl font-serif text-white group-hover:text-accent transition-colors duration-300 mb-2 line-clamp-2">{exp.title}</h4>
                      <div className="inline-flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-accent text-[10px] uppercase tracking-[0.2em] font-bold">{exp.role}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-white/30 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 group-hover:border-accent/30 group-hover:text-accent/60 transition-all shrink-0">{exp.year}</span>
                  </div>
                  
                  <div className="w-16 h-[2px] bg-gradient-to-r from-accent/60 to-transparent mb-5 group-hover:w-full transition-all duration-500" />
                  
                  <p className="text-white/50 text-sm font-light leading-relaxed mb-6 line-clamp-3">{exp.desc}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                        <FileText size={12} className="text-accent" />
                      </div>
                      <span className="text-[10px] font-medium text-accent uppercase tracking-wider">View Certificate</span>
                    </div>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                        <ChevronRight size={16} className="text-accent" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-b-3xl" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center text-primary border border-primary/20">
              <Award size={20} />
            </div>
            <h3 className="text-3xl font-serif italic bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Recognition</h3>
          </div>
          <div className="space-y-5">
            {certificatesData.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => onOpenModal(cert.title, cert.image, cert.desc)}
                className="relative p-5 rounded-2xl cursor-pointer group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent rounded-2xl border border-white/10 group-hover:border-primary/40 transition-all duration-500" />
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                
                <div className="relative z-10">
                  <div className="flex gap-4 items-start">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative p-3.5 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-dark group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500 shrink-0">
                        <cert.icon size={16} />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-base mb-1.5 group-hover:text-primary transition-colors duration-300">{cert.title}</h4>
                      <p className="text-white/40 text-xs font-light leading-relaxed line-clamp-2 mb-3">{cert.desc}</p>
                      
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                          <FileText size={10} className="text-primary" />
                        </div>
                        <span className="text-[10px] font-medium text-primary uppercase tracking-wider">View Certificate</span>
                      </div>
                    </div>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 self-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20">
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ExperienceAwards;
