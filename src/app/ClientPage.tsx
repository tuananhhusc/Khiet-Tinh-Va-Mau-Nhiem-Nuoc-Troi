'use client';

import React, { useState, useEffect } from 'react';
import type { ParsedContent } from '@/lib/parseContent';
import ProgressBar from '@/components/ProgressBar';
import HeroHeader from '@/components/HeroHeader';
import TableOfContents from '@/components/TableOfContents';
import ContentRenderer from '@/components/ContentRenderer';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

interface ClientPageProps {
  content: ParsedContent;
}

export default function ClientPage({ content }: ClientPageProps) {
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [theme, setTheme] = useState<'light' | 'sepia'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const fontSizes = {
    sm: '0.925rem',
    base: '1.05rem',
    lg: '1.25rem',
  };
  return (
    <div 
      className="flex flex-col min-h-screen"
      style={{ '--body-font-size': fontSizes[fontSize] } as React.CSSProperties}
    >
      <ProgressBar />

      <HeroHeader title={content.title} />

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Table of Contents — sticky sidebar on desktop */}
        <aside className="hidden lg:block flex-shrink-0">
          <TableOfContents 
            sections={content.sections} 
            fontSize={fontSize}
            setFontSize={setFontSize}
            theme={theme}
            setTheme={setTheme}
          />
        </aside>

        {/* Main content column */}
        <main className="flex-1 min-w-0 px-6 md:px-10 lg:px-16 pb-8">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <ContentRenderer
              sections={content.sections}
              references={content.references}
            />
            <Footer />
          </div>
        </main>
      </div>

      {/* Mobile ToC (floating button) */}
      <div className="lg:hidden">
        <TableOfContents 
          sections={content.sections} 
          fontSize={fontSize}
          setFontSize={setFontSize}
          theme={theme}
          setTheme={setTheme}
        />
      </div>

      <ScrollToTop />
    </div>
  );
}
