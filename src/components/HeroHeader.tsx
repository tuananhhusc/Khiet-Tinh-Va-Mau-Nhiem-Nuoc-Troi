'use client';

import { motion } from 'framer-motion';

interface HeroHeaderProps {
  title?: string;
}

export default function HeroHeader({ }: HeroHeaderProps) {
  return (
    <header id="top" className="relative overflow-hidden py-16 md:py-24 lg:py-28">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236B1D2A' fill-opacity='1'%3E%3Cpath d='M29 30h2v-2h-2v2zm0-28h2V0h-2v2zm0 56h2v-2h-2v2zM1 30h2v-2H1v2zm56 0h2v-2h-2v2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-40" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <span
            className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] rounded-full border"
            style={{
              color: 'var(--color-gold-dark, #A68940)',
              borderColor: 'var(--color-gold-light, #D4B97A)',
              background: 'rgba(196, 163, 90, 0.08)',
              fontFamily: "var(--font-lora), Georgia, serif",
            }}
          >
            Báo Cáo Nghiên Cứu Chuyên Sâu
          </span>
        </motion.div>

        {/* Cross motif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            className="mx-auto"
            style={{ color: 'var(--color-gold)' }}
          >
            <path
              d="M14 0h4v14h14v4H18v14h-4V18H0v-4h14V0z"
              fill="currentColor"
              opacity="0.5"
            />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-8"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
            color: 'var(--color-burgundy)',
          }}
        >
          Khiết Tịnh và Mầu Nhiệm
          <br />
          <span className="relative inline-block mt-2">
            <span 
              style={{
                color: '#8B6A2D', // Deep Golden Bronze for high contrast
                textShadow: '0.5px 0.5px 0px rgba(107, 29, 42, 0.1)',
                display: 'inline-block',
              }}
            >
              Nước Trời
            </span>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.4, delay: 1.2 }}
              className="absolute -bottom-2 left-0 h-0.5"
              style={{ background: 'var(--color-gold)' }}
            />
          </span>
        </motion.h1>

        {/* Subtitle & Reading Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <p
            className="text-base md:text-lg leading-relaxed mb-4"
            style={{
              fontFamily: "var(--font-lora), Georgia, serif",
              color: 'var(--text-secondary)',
            }}
          >
            Khảo luận về đức khiết tịnh và mầu nhiệm Nước Trời
            trong kế hoạch cứu độ
          </p>
          
          <div 
            className="flex items-center justify-center gap-4 text-xs uppercase tracking-widest opacity-60"
            style={{ color: 'var(--color-burgundy)' }}
          >
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              35-40 phút đọc
            </span>
            <span className="w-1 h-1 rounded-full bg-current opacity-30" />
            <span>9,100 từ</span>
          </div>
        </motion.div>

        {/* Bottom decorative divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex items-center justify-center gap-4 max-w-xs mx-auto"
        >
          <div
            className="flex-1 h-px"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--border-medium))',
            }}
          />
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            style={{ color: 'var(--color-gold)' }}
          >
            <path
              d="M5 0h2v5h5v2H7v5H5V7H0V5h5V0z"
              fill="currentColor"
              opacity="0.5"
            />
          </svg>
          <div
            className="flex-1 h-px"
            style={{
              background:
                'linear-gradient(to left, transparent, var(--border-medium))',
            }}
          />
        </motion.div>
      </div>
    </header>
  );
}
