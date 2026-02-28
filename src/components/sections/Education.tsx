import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { educationData } from '../../data/portfolioData';
import { Section } from '../shared';

// Education section component
const Education: React.FC = () => {
  return (
    <Section id="education" subtitle="Academic Journey" title="Education">
      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {educationData.map((edu, i) => (
          <motion.div 
            key={edu.degree}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-dark text-white/60 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <GraduationCap size={16} />
            </div>
            <div className="w-[calc(100%-2.5rem)] md:w-[45%] p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0 mb-2">
                <h3 className="text-lg md:text-xl font-serif group-hover:text-white transition-colors">{edu.degree}</h3>
                <time className="font-mono text-xs text-white/20">{edu.year}</time>
              </div>
              <div className="text-white/40 text-sm mb-4">{edu.institution}</div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <span className="text-white font-mono text-xs">{edu.result}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Education;
