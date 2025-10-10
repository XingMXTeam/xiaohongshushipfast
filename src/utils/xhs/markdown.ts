import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

export type Block =
  | { type: 'title'; text: string }
  | { type: 'h1' | 'h2' | 'h3'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'code'; lang?: string; text: string }
  | { type: 'hr' };

export async function parseMarkdownToBlocks(markdown: string): Promise<Block[]> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown);

  // Rough, text-centric parser suitable for pagination estimates
  const html = String(file);
  // Basic transform via regex and minimal DOM-free parsing
  const blocks: Block[] = [];

  // Split by block-level tags; keep order
  const tokens = html
    .replace(/\n/g, '\n')
    .split(/<(h1|h2|h3|p|ul|ol|blockquote|pre|hr)\b/gi)
    .filter(Boolean);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const tag = token.toLowerCase();
    if (['h1', 'h2', 'h3', 'p', 'ul', 'ol', 'blockquote', 'pre', 'hr'].includes(tag)) {
      const content = tokens[i + 1] ?? '';
      i++;
      if (tag === 'hr') {
        blocks.push({ type: 'hr' });
        continue;
      }
      const inner = content.split(new RegExp(`</${tag}>`, 'i'))[0] ?? '';
      if (tag === 'h1' || tag === 'h2' || tag === 'h3') {
        const text = inner.replace(/<[^>]+>/g, '').trim();
        blocks.push({ type: tag as 'h1' | 'h2' | 'h3', text });
      } else if (tag === 'p') {
        const text = inner.replace(/<[^>]+>/g, '').trim();
        if (text) blocks.push({ type: 'paragraph', text });
      } else if (tag === 'blockquote') {
        const text = inner.replace(/<[^>]+>/g, '').trim();
        if (text) blocks.push({ type: 'quote', text });
      } else if (tag === 'pre') {
        // capture <code> inside
        const match = inner.match(/<code[^>]*>([\s\S]*?)<\/code>/i);
        const code = match ? match[1] : inner;
        const clean = code.replace(/<[^>]+>/g, '');
        blocks.push({ type: 'code', text: clean });
      } else if (tag === 'ul' || tag === 'ol') {
        const itemRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
        const items: string[] = [];
        let m: RegExpExecArray | null;
        while ((m = itemRegex.exec(inner))) {
          items.push(m[1].replace(/<[^>]+>/g, '').trim());
        }
        if (items.length) blocks.push({ type: 'list', ordered: tag === 'ol', items });
      }
    }
  }

  // Title detection: first h1 fallback to first non-empty paragraph
  if (blocks.length) {
    const idx = blocks.findIndex((b) => b.type === 'h1');
    if (idx >= 0) {
      const txt = (blocks[idx] as any).text;
      blocks.splice(idx, 1);
      blocks.unshift({ type: 'title', text: txt });
    } else {
      const p = blocks.find((b) => b.type === 'paragraph') as any;
      if (p?.text) {
        blocks.unshift({ type: 'title', text: p.text });
      }
    }
  }

  return blocks;
}


