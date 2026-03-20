'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 lg:bottom-10 lg:right-10 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg border transition-transform hover:scale-110 active:scale-95"
          style={{
            background: 'var(--bg-card, #FFFFFF)',
            borderColor: 'var(--border-medium)',
            color: 'var(--color-burgundy)',
          }}
          aria-label="Cuộn lên đầu trang"
        >
          <ChevronUp size={24} />
          {/* Subtle cross motif overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M9 0h2v9h9v2h-9v9H9v-9H0V9h9V0z" fill="currentColor" />
            </svg>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
