import { CONTENT, SPACING, TYPO } from './theme';
import type { Block } from './markdown';

export type Slide = { blocks: Block[] };

function estimateBlockHeight(block: Block): number {
  const lineHeight =
    block.type === 'code'
      ? TYPO.code.lineHeight
      : block.type === 'small'
      ? TYPO.small.lineHeight
      : block.type === 'h1'
      ? TYPO.h1.lineHeight
      : block.type === 'h2'
      ? TYPO.h2.lineHeight
      : block.type === 'h3'
      ? TYPO.h3.lineHeight
      : TYPO.p.lineHeight;

  const content = (block as any).text ?? (block as any).items?.join('\n') ?? '';
  const charsPerLine = Math.max(20, Math.floor(CONTENT.width / (TYPO.p.fontSize * 0.6)));
  const lines = Math.max(1, Math.ceil(String(content).length / charsPerLine));
  const padding = block.type === 'code' ? SPACING.codePad * 2 : 0;
  const extra = block.type === 'list' ? SPACING.block : 0;
  return lines * lineHeight + SPACING.block + padding + extra;
}

export function paginateBlocks(blocks: Block[]): Slide[] {
  const slides: Slide[] = [];
  let current: Block[] = [];
  let used = 0;
  const max = CONTENT.height;

  for (const b of blocks) {
    const h = estimateBlockHeight(b);
    if (used + h > max && current.length) {
      slides.push({ blocks: current });
      current = [b];
      used = h;
    } else {
      current.push(b);
      used += h;
    }
  }
  if (current.length) slides.push({ blocks: current });
  return slides;
}


