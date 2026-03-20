# Khiết Tịnh và Mầu Nhiệm Nước Trời — Khảo Luận Thần Học

Một ứng dụng web học thuật được thiết kế chuyên biệt để trình bày báo cáo nghiên cứu thần học sâu rộng: **"Khảo luận về đức khiết tịnh và mầu nhiệm Nước Trời trong kế hoạch cứu độ"**. Dự án mang đậm phong cách thẩm mỹ Công giáo cổ điển, kết hợp với các công nghệ web hiện đại để mang lại trải nghiệm đọc nội dung dài (long-read) tối ưu.

## 🌟 Trải Nghiệm & Tính Năng Nổi Bật

- **Catholic Academic Aesthetic**: Bố cục trang trọng với hệ màu đặc trưng (Burgundy, Gold) và phông chữ Serif cổ điển (Playfair Display cho phần tiêu đề, Lora cho thân văn bản). Giao diện tối ưu hóa việc đọc với vân nền giấy cổ (Parchment texture), tạo cảm giác như đang thưởng thức một tài liệu triết học/thần học đích thực.
- **Scholar Night Mode (Chế độ đọc đêm)**: Chế độ ban đêm chuyên biệt (Sepia/Dark mode) với tông nền màu Than chì ấm (Deep Charcoal/Umber) giúp làm dịu mắt. Vân giấy được đảo ngược nhẹ nhàng để hòa quyện vào nền đen.
- **Trải Nghiệm Nghiên Cứu Tương Tác**:
  - **Tooltip Chú Thích Thông Minh**: Trỏ chuột vào các số đánh dấu trích dẫn sẽ hiển thị trực tiếp một pop-up/tooltip thanh lịch chứa nội dung trích dẫn ở viền màn hình, giúp bạn khảo cứu mà không lo bị ngắt quãng luồng đọc.
  - **Theo dõi tiến độ**: Thanh tiến trình (Progress bar) mang sắc vàng - đỏ thanh thoát trên đỉnh màn hình để biết đang ở đâu của khối tài liệu lớn.
  - **Mục lục thông minh (Sticky ToC)**: Nằm bên cạnh trái (hoặc rút gọn thông minh trên thiết bị di động). Tự động theo dấu (highlight) chuyên mục đang xem nhờ kĩ thuật `Intersection Observer`.
  - **Kiểm soát không gian đọc**: Chỉnh cỡ chữ (A-, A, A+) nhanh chóng từ mọi vị trí để đôi mắt luôn thoải mái.
- **Bố cục Thích ứng (Responsive)**: Hiển thị hoàn hảo trên các màn ảnh rộng lớn tới iPad hay điện thoại. Chuyển đổi bảng cấu trúc dữ liệu ngang mượt mà, kèm các dấu hiệu hướng dẫn người dùng lướt vuốt.
- **Hiệu ứng mượt mà**: Chuyển cảnh chuẩn điện ảnh cho các tiêu đề (gradient text title), tiêu mục từ lên mây ảo với `framer-motion`.
- **Bộ mã in ấn (Print-Ready)**: Nếu người đọc muốn lưu PDF hoặc in trang thiết kế, các lệnh `@media print` đã dọn sẵn trang chữ vô cùng gọn gàng và thuần chất báo cáo chuyên ngành.

## 🛠️ Công Nghệ Sử Dụng

- **Framework**: [Next.js](https://nextjs.org/) (Sử dụng App Router hiện đại)
- **Ngôn ngữ**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Xử lý Nội dung**: Custom parser được code thủ công để tách, bắt nhóm đoạn văn, số liệu, bảng từ văn bản thô `.txt`.

## 📂 Cấu Trúc Dự Án Hệ Thống

```text
d:\khiettinh\
├── khiettinh.txt               # File dữ liệu văn bản thô (chứa toàn bộ nội dung báo cáo)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout cấu hình Font Google & Cài đặt SEO 
│   │   ├── page.tsx            # Server Component - Đọc tệp text, phân tích tại Build Time
│   │   ├── ClientPage.tsx      # Main Component, liên kết mọi Module, điều phối Theme sáng/tối
│   │   └── globals.css         # Hệ thống Design System: Color Palette, Fonts, CSS Grid, Khung In (Print)
│   ├── components/
│   │   ├── HeroHeader.tsx      # Title Khủng đầu trang (Chuyển dải gradient vàng và burgundy chuẩn mực)
│   │   ├── ContentRenderer.tsx # Render logic văn bản: Bảng so sánh (Mobile-Swipeable), Highlight trích dẫn Tooltip
│   │   ├── TableOfContents.tsx # Menu mục lục Tracking tự động (Side-bar desktop, Bottom-nav mobile)
│   │   ├── ProgressBar.tsx     # Indicator theo dõi scroll.
│   │   ├── ScrollToTop.tsx     # Nút chữ Thập đưa trang về đầu nhanh
│   │   └── Footer.tsx          # Chân trang thông tin 
│   └── lib/
│       └── parseContent.ts     # Trái tim nội dung: Engine dịch tệp chữ thành mảng dữ liệu phân cấp Headers / Paragraph.
```

## 🚀 Hướng Dẫn Cài Đặt và Biến Diễn

Dự án này sử dụng quản lý môi trường Server-Side thuần tuý bằng `fs` (File System) từ Next.js.

### Yêu Cầu Môi Trường
- Node.js (phiên bản 18+ trở lên)
- Npm hoặc Yarn, pnpm

### Các Bước Triển Khai

1. **Cài đặt các gói tài nguyên (Dependencies)**:
   Mở terminal tại thư mục gốc và chạy lệnh:
   ```bash
   npm install
   ```

2. **Khởi chạy môi trường Phát triển (Development)**:
   ```bash
   npm run dev
   ```
   Sau đó mở liên kết [http://localhost:3000](http://localhost:3000) trên trình duyệt để duyệt thử website. Turbopack có thể sẽ hỗ trợ quá trình reload nóng ngay lập tức.

3. **Xuất bản môi trường Thực Tế (Production Build)**:
   Do dự án hoạt động theo quy trình đọc văn bản từ nguồn và tạo lưới tĩnh, công việc Build và Start trở nên siêu hình thức để xuất file ổn định và cực nhẹ.
   ```bash
   npm run build
   npm start
   ```

## 🪶 Nguồn Gốc
Nội dung báo cáo trên là bản tổng hợp khảo luận bài bản với thông điệp tôn giáo, Giáo huấn từ Hội Thánh Công Giáo.

---
*Thiết kế và phát triển tỉ mỉ với niềm đam mê vĩ đại vì sự trân quý chân lý. - Ad Maiorem Dei Gloriam.*
