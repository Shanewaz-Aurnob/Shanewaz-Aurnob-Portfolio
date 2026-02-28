import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Award, Sparkles, ExternalLink, X } from 'lucide-react';
import { contactData } from '../../data/portfolioData';
import { Section } from '../shared';

// About section component
const About: React.FC = () => {
  const [showProfessionalSkills, setShowProfessionalSkills] = useState(false);

  const allProfessionalSkills = [
    "Project Management", "Leadership", "Teamwork", "Time Management",
    "Public Relation", "Analytical & Problem-Solving Skills", "Decision Making",
    "Effective Communication", "Customer Relationship Management", "Report Writing",
    "Attention to Detail", "Professional Integrity"
  ];

  return (
    <>
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
              
              <div className="relative z-10 p-10 lg:p-12 flex flex-col justify-between h-full">
                {/* Quote Section */}
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-accent text-[10px] uppercase tracking-[0.2em] font-bold">My Vision</span>
                  </div>
                  <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-serif leading-snug text-white/90 mb-8 italic group-hover:text-white transition-colors duration-300">
                    "To contribute to organizational growth through analytical skills and professional expertise."
                  </blockquote>
                  <p className="text-white/50 font-light leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl group-hover:text-white/60 transition-colors duration-300">
                    As a CSE graduate, I bridge gaps between data analysis and functional web ecosystems with integrity, learning, and dedication.
                  </p>
                </div>
                
                {/* Divider */}
                <div className="w-24 h-[2px] bg-gradient-to-r from-accent/60 to-transparent mb-8 group-hover:w-40 transition-all duration-500" />
                
                {/* Contact Info */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-accent/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <MapPin size={14} className="text-accent" />
                    </div>
                    <span className="text-sm font-light text-white/70">{contactData.location}</span>
                  </div>
                  
                  <motion.a 
                    href={`tel:${contactData.phone}`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Phone size={14} className="text-accent" />
                    </div>
                    <span className="text-sm font-light text-white/70 hover:text-accent transition-colors">{contactData.phone}</span>
                  </motion.a>
                  
                  <motion.a 
                    href={`mailto:${contactData.email}`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Mail size={14} className="text-accent" />
                    </div>
                    <span className="text-sm font-light text-white/70 hover:text-accent transition-colors truncate max-w-[140px]">{contactData.email}</span>
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
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.01] rounded-3xl border border-white/10 group-hover:border-accent/40 transition-all duration-500" />
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/25 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl" />
              
              <div className="relative z-10 p-8 flex flex-col justify-center items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-accent/30 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center text-accent group-hover:from-accent group-hover:to-accent/80 group-hover:text-dark group-hover:border-accent/50 transition-all duration-500">
                    <Sparkles className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif mb-3 italic group-hover:text-accent transition-colors duration-300">Tech Enthusiast</h3>
                <p className="text-white/40 font-light text-sm group-hover:text-white/60 transition-colors">Always exploring AI, ML, and Web innovations.</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-b-3xl" />
            </motion.div>
            
            {/* Professional Skills Card */}
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setShowProfessionalSkills(true)}
              className="relative rounded-3xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-white/[0.03] to-white/[0.01] rounded-3xl border border-white/10 group-hover:border-primary/40 transition-all duration-500" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary/25 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl" />
              
              <div className="relative z-10 p-8 flex flex-col justify-center items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-dark group-hover:border-primary/50 transition-all duration-500">
                    <Award className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif mb-3 italic group-hover:text-primary transition-colors duration-300">Professional Skills</h3>
                <p className="text-white/40 font-light text-sm group-hover:text-white/60 transition-colors mb-4">Leadership, Communication, Problem Solving</p>
                <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-wider font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span>View All</span>
                  <ExternalLink size={12} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-b-3xl" />
            </motion.div>
          </motion.div>
        </div>
      </Section>

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
    </>
  );
};

export default About;
