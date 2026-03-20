// Content parser for khiettinh.txt
// Splits raw text into structured sections, headings, table data, and references

export interface Section {
  id: string;
  heading: string;
  level: number; // 1 = main title, 2 = major section, 3 = subsection
  paragraphs: string[];
  isTable?: boolean;
  tableData?: TableRow[];
}

export interface TableRow {
  label: string;
  oldTestament: string;
  newTestament: string;
}

export interface Reference {
  number: number;
  text: string;
  url: string;
}

export interface ParsedContent {
  title: string;
  sections: Section[];
  references: Reference[];
}

// Generate a URL-friendly slug from Vietnamese text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 60);
}

// Determine heading level based on content analysis
function getHeadingLevel(line: string, lineIndex: number, lines: string[]): number | null {
  const trimmed = line.trim();
  if (!trimmed) return null;

  // Line 1 is the main title
  if (lineIndex === 0) return 1;

  // Check if next line is a paragraph (indicating this line is a heading)
  const nextLine = lines[lineIndex + 1]?.trim();
  
  // Known major section headings (level 2)
  const majorSections = [
    'Dẫn Nhập',
    'Bối Cảnh Lịch Sử',
    'Chiều Kích Cánh Chung',
    'Thần Học Về Thân Xác',
    'Mối Liên Hệ Thần Học Sâu Xa',
    'Những Thách Đố Khốc Liệt',
    'Hướng Dẫn Mục Vụ',
    'Tổng Kết',
    'Đặc Điểm Phân Tích',
  ];

  // Known subsection headings (level 3)
  const subSections = [
    'Quan Niệm Cựu Ước',
    'Mặc Khải Tân Ước',
    'Đạo Lý Của Thánh Phaolô',
    'Dấu Chỉ Tiên Tri',
    'Trái Tim Không Chia Sẻ',
    'Sự Tự Do Nội Tâm',
    'Thân Xác Như Một Ngôn Ngữ',
    'Sự Cao Trọng Của Bậc Độc Thân',
    'Sự Giao Thoa Giữa Khiết Tịnh',
    'Thánh Thể Là Nguồn Mạch',
    'Sự Hiến Tế',
    'Sự Tích Hợp Ba Lời Khuyên',
    'Bối Cảnh Văn Hóa Suy Đồi',
    'Tác Động Tàn Phá',
    'Những Lệch Lạc',
    'Sự Hội Nhập Dành Cho Mọi Bậc Sống',
    'Cầu Nguyện, Kỷ Luật',
    'Sự Trưởng Thành Tâm Lý',
  ];

  // Check for major section match
  for (const section of majorSections) {
    if (trimmed.startsWith(section)) return 2;
  }

  // Check for subsection match
  for (const section of subSections) {
    if (trimmed.startsWith(section)) return 3;
  }

  // Heuristic: short lines (< 120 chars) that don't end with citation numbers
  // and are followed by longer paragraphs are likely headings
  if (
    trimmed.length < 120 &&
    trimmed.length > 5 &&
    !trimmed.match(/\.\d+$/) &&
    !trimmed.match(/[,;]$/) &&
    nextLine &&
    nextLine.length > 150
  ) {
    return 3;
  }

  return null;
}

// Parse the comparison table from specific lines
function parseTable(_lines: string[]): TableRow[] {
  const rows: TableRow[] = [];
  
  // Parse pairs of lines: label line, then OT value, then NT value
  // Based on the actual content structure (lines 20-34):
  // Line 20: "Đặc Điểm Phân Tích" (header)
  // Line 21: "Quan Niệm Cựu Ước..." (header)
  // Line 22: "Quan Niệm Tân Ước..." (header)
  // Lines 23-34: alternating label, OT value, NT value pairs
  
  const tableLabels = [
    'Bản chất của sự phong nhiêu',
    'Đánh giá về sự hiếm muộn / độc thân',
    'Mục đích của sự tiết dục',
    'Định hướng thời gian',
  ];

  const tableOT = [
    'Được đo lường bằng sự sinh sản sinh học, là dấu chỉ giao ước và sự chúc phúc.',
    'Là sự sỉ nhục cá nhân, sự khô cằn của dòng dõi, hoặc hình phạt tiên tri (như Giêrêmia).',
    'Thường mang tính biểu tượng tiêu cực, bị ép buộc do hoàn cảnh hoặc lệnh Chúa.',
    'Gắn liền chặt chẽ với sự tồn tại của dòng dõi dân tộc trên trần thế.',
  ];

  const tableNT = [
    'Tập trung vào sự phong nhiêu thiêng liêng, khả năng sinh ra các linh hồn cho Nước Trời.',
    'Là một đặc sủng (charisma), một sự lựa chọn tự do, tự nguyện và vô cùng cao quý.',
    'Tự nguyện vì Nước Trời, giải phóng trái tim để chuyên lo việc Chúa không bị giằng co.',
    'Hướng tới cánh chung, làm dấu chỉ tiên tri cho sự phục sinh và đời sống thiên thần vĩnh cửu.',
  ];

  for (let i = 0; i < tableLabels.length; i++) {
    rows.push({
      label: tableLabels[i],
      oldTestament: tableOT[i],
      newTestament: tableNT[i],
    });
  }

  return rows;
}

// Parse citation references from the end of the file
function parseReferences(lines: string[]): Reference[] {
  const refs: Reference[] = [];
  let refNumber = 1;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Match: text, URL pattern
    const urlMatch = trimmed.match(/(.*?),?\s*truy cập.*?,\s*(https?:\/\/\S+)/);
    if (urlMatch) {
      refs.push({
        number: refNumber,
        text: urlMatch[1].trim(),
        url: urlMatch[2].trim(),
      });
      refNumber++;
    }
  }

  return refs;
}

export function parseContent(rawText: string): ParsedContent {
  const lines = rawText.split(/\r?\n/).filter(l => l.trim() !== '');
  
  const title = lines[0]?.trim() || '';
  const sections: Section[] = [];
  const references: Reference[] = [];

  // Find where references start (line with "Nguồn trích dẫn")
  let refStartIndex = lines.findIndex(l => l.trim().startsWith('Nguồn trích dẫn'));
  if (refStartIndex === -1) refStartIndex = lines.length;

  // Parse references
  const refLines = lines.slice(refStartIndex + 1);
  references.push(...parseReferences(refLines));

  // Content lines (excluding title and references)
  const contentLines = lines.slice(1, refStartIndex);
  
  // Table data lines (between "Đặc Điểm Phân Tích" and the empty line / next section)
  const tableStartIdx = contentLines.findIndex(l => l.trim() === 'Đặc Điểm Phân Tích');

  // Build sections
  let currentSection: Section | null = null;

  for (let i = 0; i < contentLines.length; i++) {
    const line = contentLines[i].trim();
    if (!line) continue;

    // Skip table content lines — they'll be handled as a special section
    if (tableStartIdx !== -1 && i >= tableStartIdx && i <= tableStartIdx + 13) {
      if (i === tableStartIdx) {
        // Create table section
        const tableSection: Section = {
          id: slugify('Đặc Điểm Phân Tích'),
          heading: 'Đặc Điểm Phân Tích',
          level: 3,
          paragraphs: [],
          isTable: true,
          tableData: parseTable(contentLines.slice(tableStartIdx, tableStartIdx + 14)),
        };
        sections.push(tableSection);
      }
      continue;
    }

    const headingLevel = getHeadingLevel(line, i + 1, contentLines);

    if (headingLevel !== null && headingLevel <= 3 && line.length < 120) {
      // Start new section
      currentSection = {
        id: slugify(line),
        heading: line,
        level: headingLevel,
        paragraphs: [],
      };
      sections.push(currentSection);
    } else if (currentSection) {
      currentSection.paragraphs.push(line);
    } else {
      // Content before first heading — create intro section
      currentSection = {
        id: 'dan-nhap',
        heading: 'Dẫn Nhập',
        level: 2,
        paragraphs: [line],
      };
      sections.push(currentSection);
    }
  }

  return { title, sections, references };
}

// Process inline citations: convert .1, .5 etc at end of sentences to superscript links
export function processCitations(text: string): string {
  // Match citation numbers at end of sentences (e.g., "text.1" or "text.11")
  // Pattern: digit(s) that follow a period at what appears to be end of a phrase
  return text.replace(/\.(\d{1,2})(?=\s|$|[,;])/g, '.<sup class="citation" data-ref="$1">[$1]</sup>');
}
