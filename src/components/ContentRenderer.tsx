'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Section, Reference } from '@/lib/parseContent';

interface ContentRendererProps {
  sections: Section[];
  references: Reference[];
}

// Process citation markers in text
function processCitationText(
  text: string, 
  references: Reference[],
  setActiveRef: (ref: Reference | null) => void
): (string | React.JSX.Element)[] {
  const parts: (string | React.JSX.Element)[] = [];
  // Match citations like .1 .5 .11 etc. at end of phrases
  const regex = /\.(\d{1,2})(?=\s|$|[,;])/g;
  let lastIndex = 0;
  let match;
  let keyCounter = 0;

  while ((match = regex.exec(text)) !== null) {
    // Add text before this citation
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    // Add the period
    parts.push('.');
    // Add the superscript citation
    const refNum = parseInt(match[1], 10);
    const reference = references.find(r => r.number === refNum);
    
    parts.push(
      <sup 
        key={`cite-${keyCounter++}`} 
        className="citation relative inline-block group"
        onMouseEnter={() => reference && setActiveRef(reference)}
        onMouseLeave={() => setActiveRef(null)}
      >
        <a
          href={`#ref-${refNum}`}
          title={reference ? reference.text : `Xem nguồn ${refNum}`}
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById(`ref-${refNum}`);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          [{refNum}]
        </a>
      </sup>
    );
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

// Render a paragraph with citation processing
function RenderParagraph({
  text,
  isFirstIntro,
  references,
  setActiveRef,
}: {
  text: string;
  isFirstIntro: boolean;
  references: Reference[];
  setActiveRef: (ref: Reference | null) => void;
}) {
  const processed = processCitationText(text, references, setActiveRef);

  // Check if this paragraph contains a quote (starts with " or contains quoted text)
  const isQuote =
    text.includes('\"Không phải ai cũng hiểu') ||
    text.includes('\"Có những người không kết hôn') ||
    text.includes('\"trong ngày sống lại') ||
    text.includes('\"Đàn ông không có vợ') ||
    text.includes('\"tất cả những người đã chịu');

  if (isQuote) {
    return (
      <blockquote className="border-l-3 pl-5 my-6 italic" style={{
        borderLeftColor: 'var(--color-gold)',
        color: 'var(--text-secondary)',
        background: 'var(--bg-secondary)',
        padding: '1rem 1.25rem',
        borderRadius: '0 0.375rem 0.375rem 0',
      }}>
        <p className="mb-0">{processed}</p>
      </blockquote>
    );
  }

  // Check if paragraph looks like a bullet point
  if (
    text.startsWith('Khiết tịnh biểu lộ') ||
    text.startsWith('Vâng phục diễn tả') ||
    text.startsWith('Nghèo khó diễn tả') ||
    text.startsWith('Tu sĩ / Độc thân') ||
    text.startsWith('Người chưa lập gia đình') ||
    text.startsWith('Người có gia đình') ||
    text.startsWith('Đời sống Cầu nguyện') ||
    text.startsWith('Lãnh nhận Bí tích') ||
    text.startsWith('Bí tích Giao hòa') ||
    text.startsWith('Bí tích Thánh Thể:') ||
    text.startsWith('Kỷ luật Bản thân')
  ) {
    return (
      <div className="relative pl-6 mb-3" style={{ lineHeight: '1.8' }}>
        <span
          className="absolute left-0 top-1.5 text-xs"
          style={{ color: 'var(--color-gold)' }}
        >
          ✦
        </span>
        <p className="mb-0">{processed}</p>
      </div>
    );
  }

  return (
    <p className={`mb-5 ${isFirstIntro ? 'drop-cap' : ''}`} style={{
      textAlign: 'justify',
      hyphens: 'auto' as const,
    }}>
      {processed}
    </p>
  );
}

// Render the comparison table
function ComparisonTable({ data }: { data: Section['tableData'] }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="my-8 relative group">
      {/* Mobile Swipe Hint */}
      <div className="lg:hidden flex items-center justify-end gap-2 text-[10px] uppercase tracking-widest text-text-muted mb-2 px-1">
        <span>Vuốt để xem thêm</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border-light shadow-sm bg-bg-card">
        <table className="comparison-table min-w-[600px] !my-0 !shadow-none">
          <thead>
            <tr>
              <th className="w-1/4">Đặc Điểm Phân Tích</th>
              <th className="w-3/8">Quan Niệm Cựu Ước</th>
              <th className="w-3/8">Quan Niệm Tân Ước</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td className="font-semibold">{row.label}</td>
                <td>{row.oldTestament}</td>
                <td>{row.newTestament}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Cross motif divider between sections
function CrossDivider() {
  return (
    <div className="cross-divider" aria-hidden="true">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        style={{ color: 'var(--color-gold)' }}
      >
        <path
          d="M6 0h2v6h6v2H8v6H6V8H0V6h6V0z"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

export default function ContentRenderer({
  sections,
  references,
}: ContentRendererProps) {
  const [activeRef, setActiveRef] = useState<Reference | null>(null);

  return (
    <article className="prose-academic max-w-none relative">
      {/* Citation Tooltip */}
      <AnimatePresence>
        {activeRef && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 z-[100] w-80 max-w-[90vw] p-4 rounded-lg shadow-2xl border pointer-events-none"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--color-gold-light)',
              boxShadow: '0 10px 40px rgba(107, 29, 42, 0.15)',
            }}
          >
            <div className="flex items-start gap-3">
              <span className="ref-number mt-0.5">{activeRef.number}</span>
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-text-secondary italic mb-1">
                  {activeRef.text}
                </p>
                {activeRef.url && (
                  <p className="text-[10px] uppercase tracking-wider text-marian-blue font-semibold">
                    {new URL(activeRef.url).hostname}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {sections.map((section, sectionIdx) => {
        const isIntroSection = sectionIdx === 0;

        return (
          <motion.section
            key={section.id}
            id={section.id}
            className="scroll-mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Section divider (not for first section) */}
            {sectionIdx > 0 && section.level === 2 && <CrossDivider />}

            {/* Section heading */}
            {section.level === 2 ? (
              <h2>{section.heading}</h2>
            ) : section.level === 3 ? (
              <h3>{section.heading}</h3>
            ) : null}

            {/* Table section */}
            {section.isTable && section.tableData && (
              <ComparisonTable data={section.tableData} />
            )}

            {/* Paragraphs */}
            {section.paragraphs.map((para, pIdx) => {
              const isFirst = isIntroSection && pIdx === 0;

              return (
                <RenderParagraph
                  key={`${section.id}-p-${pIdx}`}
                  text={para}
                  isFirstIntro={isFirst}
                  references={references}
                  setActiveRef={setActiveRef}
                />
              );
            })}
          </motion.section>
        );
      })}

      {/* References Section */}
      <section id="references" className="scroll-mt-20 mt-16">
        <CrossDivider />
        <h2>Nguồn Trích Dẫn</h2>
        <div className="space-y-0">
          {references.map((ref) => (
            <div
              key={ref.number}
              id={`ref-${ref.number}`}
              className="reference-item flex items-start gap-2 scroll-mt-20"
            >
              <span className="ref-number">{ref.number}</span>
              <span className="flex-1">
                {ref.text}
                {ref.url && (
                  <>
                    {' — '}
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {new URL(ref.url).hostname}
                    </a>
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
