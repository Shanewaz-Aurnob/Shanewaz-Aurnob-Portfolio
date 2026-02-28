import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';
import { mediaData } from '../../data/portfolioData';
import { Section } from '../shared';

// Media section component
const Media: React.FC = () => {
  return (
    <Section id="media" subtitle="Featured In" title="In The Media">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mediaData.map((item, i) => (
          <motion.a
            key={i}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="interactive group relative block"
          >
            {/* Premium Card */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.05] group-hover:from-white/[0.08] to-white/[0.02] group-hover:to-emerald-500/[0.03] border border-white/10 hover:border-emerald-400/40 transition-all duration-500 h-full shadow-lg hover:shadow-emerald-500/20">
              
              {/* Glow Effects */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 group-hover:bg-emerald-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 group-hover:bg-primary/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              
              {/* Headline Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.headline}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://picsum.photos/seed/${item.pub.replace(/\s/g, '')}/800/500`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"></div>
                
                {/* Newspaper Logo Badge */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-white/95 group-hover:bg-emerald-400 backdrop-blur-sm rounded-xl shadow-xl transition-all duration-500">
                  <span className="text-[10px] font-bold text-dark group-hover:text-white uppercase tracking-wider">{item.pub}</span>
                </div>
                
                {/* Featured Badge */}
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/40 backdrop-blur-md border border-emerald-400/30 group-hover:border-emerald-300/60 flex items-center justify-center transition-all duration-500">
                    <FileText size={14} className="text-emerald-400 group-hover:text-emerald-200 transition-colors duration-500" />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="relative p-6 bg-white/[0.01] group-hover:bg-emerald-500/5 transition-all duration-500">
                {/* Headline */}
                <h4 className="text-lg md:text-xl font-serif text-white group-hover:text-emerald-300 leading-snug mb-4 transition-colors duration-500 line-clamp-2">
                  {item.headline}
                </h4>
                
                {/* Divider */}
                <div className="w-12 h-[2px] bg-gradient-to-r from-emerald-400 to-emerald-300 mb-4 group-hover:w-full transition-all duration-500"></div>
                
                {/* Read More */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-emerald-300 transition-colors duration-500 font-medium">Read Article</span>
                  <div className="flex items-center gap-2">
                    <span className="interactive w-8 h-8 rounded-full bg-white/5 group-hover:bg-emerald-500/30 flex items-center justify-center transition-all duration-300">
                      <ExternalLink size={12} className="text-white/50 group-hover:text-emerald-300 group-hover:rotate-12 transition-all duration-300" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
};

export default Media;
