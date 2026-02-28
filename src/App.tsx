import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Shared Components
import { Toast, CertificateModal, ParallaxBackground } from "./components/shared";

// Section Components - Named exports
import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { ResearchSection } from "./components/sections/ResearchSection";

// Section Components - Default exports
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Education from "./components/sections/Education";
import Resume from "./components/sections/Resume";
import ExperienceAwards from "./components/sections/ExperienceAwards";
import Gallery from "./components/sections/Gallery";
import Media from "./components/sections/Media";
import Footer from "./components/sections/Footer";

// Custom Components  
import CustomCursor from "./components/CustomCursor";
import FloatingSocials from "./components/FloatingSocials";

/**
 * App Component
 * Main orchestrator component that imports and renders all section components.
 * Handles modal state for certificates and PDF viewer.
 * 
 * State Management:
 * - modalContent: Controls certificate and experience modal display
 * - showToast: Controls toast notification visibility
 * - pdfModalOpen: Controls PDF viewer modal visibility
 */
export default function App() {
  // Modal state for certificates and experiences
  const [modalContent, setModalContent] = useState<{
    isOpen: boolean;
    title: string;
    image?: string;
    description?: string;
  }>({
    isOpen: false,
    title: "",
    image: undefined,
    description: undefined,
  });

  // Toast notification state
  const [showToast, setShowToast] = useState(false);

  // PDF modal state
  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  /**
   * Handle PDF resume modal opening
   */
  const handleViewResume = () => {
    setPdfModalOpen(true);
  };

  /**
   * Handle keyboard escape key for PDF modal
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && pdfModalOpen) {
        setPdfModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pdfModalOpen]);

  return (
    <div className="bg-dark min-h-screen selection:bg-white selection:text-black overflow-x-hidden relative">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-grid z-0 pointer-events-none opacity-40"></div>

      {/* Custom Cursor Component */}
      <CustomCursor />

      {/* Floating Social Media Bar */}
      <FloatingSocials />

      {/* Parallax Background */}
      <ParallaxBackground />

      {/* Header Navigation */}
      <Header />

      {/* Toast Notification */}
      <Toast message="Copied to Clipboard!" isVisible={showToast} />

      {/* Certificate/Experience Modal */}
      <CertificateModal
        isOpen={modalContent.isOpen}
        onClose={() =>
          setModalContent({ ...modalContent, isOpen: false })
        }
        title={modalContent.title}
        image={modalContent.image}
        description={modalContent.description}
      />

      {/* Animated Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-left accent glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[150px]"
        ></motion.div>
        {/* Bottom-right accent glow */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-accent/10 rounded-full blur-[150px]"
        ></motion.div>
      </div>

      {/* PDF Resume Modal */}
      <AnimatePresence>
        {pdfModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPdfModalOpen(false)}
            className="fixed inset-0 bg-black/90 z-[150] flex items-center justify-center p-4 md:p-8 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPdfModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg"
                aria-label="Close PDF viewer"
              >
                ✕
              </motion.button>

              {/* PDF Viewer Container */}
              <div className="w-full h-full bg-white/[0.03] backdrop-blur-xl border border-white/10">
                <iframe
                  src="/resume/Shanewaz-Aurnob-Resume.pdf"
                  title="Resume PDF"
                  className="w-full h-full"
                  style={{ border: "none" }}
                />
              </div>

              {/* PDF Controls Footer */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center gap-4">
                <span className="text-xs text-white/50 font-light">
                  Press ESC or click X to close
                </span>
                <div className="flex items-center gap-3">
                  <motion.a
                    href="/resume/Shanewaz-Aurnob-Resume.pdf"
                    download="Shanewaz-Aurnob-Resume.pdf"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-6 py-2 bg-accent text-dark text-xs uppercase font-bold rounded-lg hover:bg-white transition-all"
                  >
                    ⬇ Download
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setPdfModalOpen(false)}
                    className="px-6 py-2 bg-red-600 text-white text-xs uppercase font-bold rounded-lg hover:bg-red-700 transition-all"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PAGE SECTIONS - Imported Components */}
      <Hero onViewResume={handleViewResume} />
      <About />
      <Skills />
      <ResearchSection />
      <Projects
        onOpenModal={(title, desc) =>
          setModalContent({
            isOpen: true,
            title,
            description: desc,
          })
        }
      />
      <Education />
      <Resume onViewPDF={handleViewResume} />
      <ExperienceAwards
        onOpenModal={(title, image, description) =>
          setModalContent({
            isOpen: true,
            title,
            image,
            description,
          })
        }
      />
      <Gallery />
      <Media />
      <Footer />
    </div>
  );
}
