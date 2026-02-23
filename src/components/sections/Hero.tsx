import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Terminal, Database } from 'lucide-react';
import { TextMask, ParallaxBackground, Magnetic } from '../shared';
import { Marquee } from '../shared';
import { techStackData } from '../../data/portfolioData';

export const Hero: React.FC = () => {
  return (
    <>
      <section id="home" className="min-h-[75vh] flex flex-col justify-center px-4 md:px-8 lg:px-16 max-w-7xl mx-auto relative z-10 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <TextMask>
              <span className="text-accent text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold">
                Computer Science Graduate
              </span>
            </TextMask>
            <h1 className="mb-6">
              <div className="flex flex-col gap-0 leading-[0.9]">
                <div className="text-[9vw] lg:text-[4.5vw] font-serif tracking-tighter text-white">
                  <TextMask delay={0.2}>Shanewaz</TextMask>
                </div>
                <div className="text-[9vw] lg:text-[4.5vw] font-serif tracking-tighter italic text-white/70 ml-4 leading-[1] pt-1">
                  <TextMask delay={0.4}>Aurnob</TextMask>
                </div>
              </div>
            </h1>
            <div className="space-y-6">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-lg text-balance"
              >
                Specializing in <span className="text-white font-medium">Machine Learning</span> and <span className="text-white font-medium">Full-Stack Development</span>. 
                Committed to organizational growth through analytical precision.
              </motion.p>
              <div className="flex gap-4 items-center flex-wrap">
                <Magnetic>
                  <motion.a 
                    href="#projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-dark text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-accent transition-all duration-500 shadow-2xl shadow-white/10"
                  >
                    View Work
                  </motion.a>
                </Magnetic>
                <Magnetic>
                  <motion.a 
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border border-white/10 text-white text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-white hover:text-dark transition-all duration-500"
                  >
                    Get in Touch
                  </motion.a>
                </Magnetic>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-32 h-32 md:w-44 md:h-44 lg:w-56 lg:h-56 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-[60px] lg:blur-[80px] animate-pulse"></div>
              <div className="relative h-full flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44"
                >
                  <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center mx-auto mb-1 lg:mb-2 animate-pulse">
                        <Code2 className="text-accent w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                      </div>
                      <p className="text-[8px] md:text-[9px] lg:text-[10px] font-mono text-accent tracking-wider">TECH_STACK</p>
                    </div>
                  </div>

                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }}>
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                        <Terminal className="text-primary/60 w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                      </div>
                    </div>
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
                      <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                        <Database className="text-accent/60 w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                      </div>
                    </div>
                    <div className="absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2">
                      <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                        <Globe className="text-primary/60 w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-accent/50 to-transparent"></div>
        </motion.div>
      </section>

      <Marquee items={techStackData} />
    </>
  );
};
