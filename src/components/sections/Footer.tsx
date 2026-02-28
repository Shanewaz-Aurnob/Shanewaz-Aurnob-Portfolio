import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Facebook, X, User, Phone, ChevronRight } from 'lucide-react';
import { contactData, socialLinks } from '../../data/portfolioData';
import { Magnetic, VisitorCounter } from '../shared';

// Footer/Contact section component
const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative pt-12 md:pt-16 pb-8 md:pb-10 px-4 sm:px-6 md:px-12 lg:px-24 border-t border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-[0.85] tracking-tighter mb-6">
                Let's <br />
                <span className="italic text-accent">Connect.</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/40 font-light max-w-md">
                Have a project in mind or want to say hi? I'm open to discussing opportunities.
              </p>
            </motion.div>

            <div className="space-y-6">
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-dark transition-all">
                  <User size={18} />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.4em] text-accent font-bold mb-1 block">Name</span>
                  <span className="text-xl font-serif text-white/80">{contactData.name}</span>
                </div>
              </div>

              <motion.a 
                href={`mailto:${contactData.email}`}
                whileHover={{ x: 10 }}
                className="inline-flex items-center gap-5 group w-full"
              >
                <div className="w-14 h-14 rounded-2xl border border-white/20 bg-white/[0.05] flex items-center justify-center group-hover:bg-accent group-hover:text-dark transition-all">
                  <Mail size={18} className="text-white/70 group-hover:text-dark" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-accent font-bold block">Email Me</span>
                  <span className="text-lg font-serif text-white/80 group-hover:text-accent transition-colors truncate block">{contactData.email}</span>
                </div>
              </motion.a>

              <motion.a 
                href={`tel:${contactData.phone}`}
                whileHover={{ x: 10 }}
                className="inline-flex items-center gap-5 group w-full"
              >
                <div className="w-14 h-14 rounded-2xl border border-white/20 bg-white/[0.05] flex items-center justify-center group-hover:bg-accent group-hover:text-dark transition-all">
                  <Phone size={18} className="text-white/70 group-hover:text-dark" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-accent font-bold block">Call Me</span>
                  <span className="text-lg font-serif text-white/80 group-hover:text-accent transition-colors truncate block">{contactData.phone}</span>
                </div>
              </motion.a>

              <div className="flex gap-4 md:gap-6 pt-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon === 'Github' ? Github : 
                              social.icon === 'Linkedin' ? Linkedin : 
                              social.icon === 'Facebook' ? Facebook : X;
                  
                  return (
                    <motion.a 
                      key={social.label}
                      href={social.href} 
                      target="_blank" 
                      rel="noreferrer"
                      whileHover={{ y: -8 }}
                      className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center hover:bg-accent hover:text-dark hover:border-accent transition-all"
                      title={social.label}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative group"
          >
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
              <Mail className="w-48 h-48" />
            </div>
            <form 
              action="https://formsubmit.co/aurnob.csecu@gmail.com" 
              method="POST"
              className="space-y-6 relative z-10"
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://shanewaz-aurnob.github.io/Shanewaz-Aurnob-Portfolio/#contact" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-3 focus:border-accent focus:bg-white/[0.05] outline-none transition-all font-light text-sm" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-3 focus:border-accent outline-none transition-all font-light text-sm" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Message</label>
                <textarea 
                  name="message"
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-3 focus:border-accent outline-none transition-all font-light text-sm resize-none" 
                  rows={3} 
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <Magnetic>
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-accent text-dark text-xs uppercase tracking-[0.4em] font-bold rounded-xl hover:bg-white transition-all duration-500 shadow-2xl shadow-accent/20"
                >
                  Send Message
                </motion.button>
              </Magnetic>
            </form>
          </motion.div>
        </div>
        
        <div className="mt-12 md:mt-16 pt-6 border-t border-white/5 flex flex-col gap-6 md:gap-8 lg:flex-row lg:justify-between lg:items-center">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/20">© 2026 Shanewaz Aurnob</p>
            <p className="text-[9px] uppercase tracking-widest text-white/10">Built with Precision & Purpose</p>
          </div>
          
          <VisitorCounter />

          <div className="flex gap-10 flex-wrap justify-center">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(item => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-[10px] uppercase tracking-widest text-white/30 hover:text-accent transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -5 }}
            className="p-4 rounded-full border border-white/10 text-white/30 hover:text-white transition-all"
          >
            <ChevronRight size={18} className="-rotate-90" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
