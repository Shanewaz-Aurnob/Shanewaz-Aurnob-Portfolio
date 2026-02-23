import React from 'react';

interface MarqueeProps {
  items: string[];
}

export const Marquee: React.FC<MarqueeProps> = ({ items }) => (
  <div className="marquee py-12 border-y border-white/5 bg-white/[0.01]">
    <div className="marquee-content animate-marquee">
      {items.map((item, i) => (
        <span key={i} className="text-4xl md:text-6xl font-serif italic text-white/10 hover:text-silver/40 transition-colors cursor-default px-8">
          {item}
        </span>
      ))}
    </div>
    <div className="marquee-content animate-marquee" aria-hidden="true">
      {items.map((item, i) => (
        <span key={i} className="text-4xl md:text-6xl font-serif italic text-white/10 hover:text-silver/40 transition-colors cursor-default px-8">
          {item}
        </span>
      ))}
    </div>
  </div>
);
