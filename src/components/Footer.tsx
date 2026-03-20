export default function Footer() {
  return (
    <footer className="mt-20 pb-12 pt-8 border-t" style={{
      borderColor: 'var(--border-light)',
    }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Cross motif */}
        <div className="mb-4">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="mx-auto"
            style={{ color: 'var(--color-gold)', opacity: 0.4 }}
          >
            <path
              d="M9 0h2v9h9v2h-9v9H9v-9H0V9h9V0z"
              fill="currentColor"
            />
          </svg>
        </div>

        <p
          className="text-sm"
          style={{
            color: 'var(--text-muted)',
            fontFamily: "var(--font-lora), Georgia, serif",
          }}
        >
          Ad Maiorem Dei Gloriam
        </p>

        <p
          className="text-xs mt-2"
          style={{ color: 'var(--text-muted)', opacity: 0.7 }}
        >
          2026 Báo Cáo Nghiên Cứu Chuyên Sâu - Khiết Tịnh và Mầu Nhiệm Nước Trời
        </p>
      </div>
    </footer>
  );
}
