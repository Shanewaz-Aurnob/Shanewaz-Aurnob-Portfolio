import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { Section, Magnetic } from '../shared';

interface ResumeProps {
  onViewPDF: () => void;
}

// Resume section component
const Resume: React.FC<ResumeProps> = ({ onViewPDF }) => {
  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/resume/Shanewaz-Aurnob-Resume.pdf';
    link.download = 'Shanewaz-Aurnob-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Section id="resume" subtitle="Professional Summary" title="Resume">
      <div className="p-6 md:p-8 lg:p-12 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 group-hover:opacity-10 transition-opacity">
          <FileText className="w-32 md:w-48 h-32 md:h-48" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 md:mb-6">Ready for the next challenge.</h3>
          <p className="text-white/50 font-light text-base md:text-lg leading-relaxed mb-8 md:mb-10">
            My full resume details my academic background, technical proficiency, and leadership experiences.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-6">
            <Magnetic>
              <motion.button
                onClick={handleDownloadPDF}
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-dark text-xs uppercase tracking-widest font-bold rounded-full flex items-center justify-center gap-3 shadow-xl shadow-white/5 hover:bg-accent transition-all duration-500 w-full sm:w-auto"
              >
                Download PDF <Download size={16} />
              </motion.button>
            </Magnetic>
            <Magnetic>
              <motion.button 
                onClick={onViewPDF}
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border border-white/10 text-white text-xs uppercase tracking-widest font-bold rounded-full hover:bg-white/5 hover:border-accent transition-all duration-500 flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                View PDF <ExternalLink size={16} />
              </motion.button>
            </Magnetic>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Resume;
