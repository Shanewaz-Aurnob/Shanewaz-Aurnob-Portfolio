import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Facebook, X, BookOpen } from 'lucide-react';

interface SocialLink {
  icon: React.ReactNode;
  href: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { icon: <Github size={20} />, href: "https://github.com/Shanewaz-Aurnob" },
  { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/shanewaz-aurnob" },
  { icon: <Facebook size={20} />, href: "https://www.facebook.com/s.aurnob" },
  { icon: <X size={20} />, href: "https://x.com/ShanewazAurnob" },
  { icon: <BookOpen size={20} />, href: "https://scholar.google.com/citations?user=umBalUIAAAAJ&hl=en" }
];

export const FloatingSocials: React.FC = () => (
  <div className="fixed left-8 bottom-0 z-40 hidden xl:flex flex-col items-center gap-8 after:w-[1px] after:h-32 after:bg-white/10">
    {SOCIAL_LINKS.map((social, i) => (
      <motion.a
        key={i}
        href={social.href}
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -5, color: "var(--color-accent)" }}
        className="text-white/20 hover:text-accent transition-all duration-300"
      >
        {social.icon}
      </motion.a>
    ))}
  </div>
);

export default FloatingSocials;
