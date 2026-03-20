import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700"],
});

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Khiết Tịnh và Mầu Nhiệm Nước Trời — Khảo Luận Thần Học",
  description:
    "Khảo luận thần học chuyên sâu về đức khiết tịnh và mầu nhiệm Nước Trời trong kế hoạch cứu độ, dựa trên Kinh Thánh, Thần học về Thân xác và Giáo huấn Hội Thánh Công Giáo.",
  openGraph: {
    title: "Khiết Tịnh và Mầu Nhiệm Nước Trời",
    description:
      "Khảo luận thần học chuyên sâu về đức khiết tịnh trong kế hoạch cứu độ.",
    type: "article",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
