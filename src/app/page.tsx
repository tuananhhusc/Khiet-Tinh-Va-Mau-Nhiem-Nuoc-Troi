import fs from 'fs';
import path from 'path';
import { parseContent } from '@/lib/parseContent';
import ClientPage from '@/app/ClientPage';

export default function Page() {
  // Read the content file at build time (Server Component)
  const filePath = path.join(process.cwd(), 'khiettinh.txt');
  const rawText = fs.readFileSync(filePath, 'utf-8');
  const content = parseContent(rawText);

  return <ClientPage content={content} />;
}
