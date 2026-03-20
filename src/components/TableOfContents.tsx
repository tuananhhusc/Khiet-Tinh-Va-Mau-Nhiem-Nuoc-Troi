'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, BookOpen, Sun, Moon } from 'lucide-react';
import type { Section } from '@/lib/parseContent';

interface TableOfContentsProps {
  sections: Section[];
  fontSize: 'sm' | 'base' | 'lg';
  setFontSize: (size: 'sm' | 'base' | 'lg') => void;
  theme: 'light' | 'sepia';
  setTheme: (theme: 'light' | 'sepia') => void;
}

export default function TableOfContents({ 
  sections, 
  fontSize, 
  setFontSize,
  theme,
  setTheme
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track which section is visible via Intersection Observer
  useEffect(() => {
    if (!mounted) return;

    const trackedIds = ['top', ...sections.filter((s) => s.level <= 3).map((s) => s.id)];
    const headings = trackedIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    headings.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sections, mounted]);

  const handleClick = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    },
    []
  );

  // Only show level 2 and 3 headings in ToC
  const tocItems = sections.filter((s) => s.level === 2 || s.level === 3);

  if (!mounted) return null;

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 lg:hidden flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        style={{
          background: 'var(--color-burgundy)',
          color: '#FAF6F0',
        }}
        aria-label={isOpen ? 'Đóng mục lục' : 'Mở mục lục'}
      >
        {isOpen ? <X size={22} /> : <BookOpen size={22} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ToC panel */}
      <nav
        className={`
          fixed lg:sticky top-0 h-screen z-40
          w-72 lg:w-64 xl:w-72
          lg:bg-transparent
          backdrop-blur-md lg:backdrop-blur-none
          border-r border-border-light lg:border-none
          overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          pt-20 lg:pt-24 pb-8 px-4
          flex-shrink-0
        `}
        style={{
          background: isOpen ? 'var(--bg-card)' : 'transparent',
        }}
        aria-label="Mục lục"
      >
        {/* ToC Header & Font Controls */}
        <div className="mb-6 pb-4 border-b border-border-light">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                color: 'var(--color-burgundy)',
              }}
            >
              Mục Lục
            </h2>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-parchment-dark/50 p-0.5 rounded-md border border-border-light">
                {(['sm', 'base', 'lg'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`
                      w-7 h-7 flex items-center justify-center rounded text-xs font-medium transition-all
                      ${fontSize === size 
                        ? 'bg-burgundy text-parchment shadow-sm scale-110' 
                        : 'text-text-muted hover:text-burgundy hover:bg-white/50'}
                    `}
                    title={`Cỡ chữ: ${size === 'sm' ? 'Nhỏ' : size === 'base' ? 'Vừa' : 'Lớn'}`}
                  >
                    {size === 'sm' ? 'A-' : size === 'base' ? 'A' : 'A+'}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setTheme(theme === 'light' ? 'sepia' : 'light')}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-border-light bg-parchment-dark/50 text-text-muted hover:text-burgundy transition-colors"
                title={theme === 'light' ? 'Chế độ đọc đêm (Sepia)' : 'Chế độ ban ngày'}
              >
                {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* ToC Items */}
        <ul className="space-y-0.5">
          <li className="mb-2">
            <button
              onClick={() => handleClick('top')}
              className={`toc-link w-full text-left flex items-center gap-2 ${
                activeId === 'top' || activeId === '' ? 'active' : ''
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Trang Đầu
            </button>
          </li>

          {tocItems.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => handleClick(section.id)}
                className={`toc-link w-full text-left ${
                  section.level === 3 ? 'level-3' : ''
                } ${activeId === section.id ? 'active' : ''}`}
              >
                {section.heading}
              </button>
            </li>
          ))}

          {/* References link */}
          <li className="pt-2 mt-2 border-t border-border-light">
            <button
              onClick={() => handleClick('references')}
              className={`toc-link w-full text-left ${
                activeId === 'references' ? 'active' : ''
              }`}
            >
              Nguồn Trích Dẫn
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
