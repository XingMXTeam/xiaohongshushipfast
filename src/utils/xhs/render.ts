import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { THEME, paperBackgroundStyle, CONTENT, COLORS, TYPO, SPACING } from './theme';
import type { Block } from './markdown';

async function loadFonts() {
  // For MVP, return empty array to use system fonts
  // Satori will fallback to system fonts when no fonts are provided
  return [];
}

function renderBlocks(blocks: Block[]) {
  const children: any[] = [];
  for (const b of blocks) {
    if (b.type === 'title') {
      children.push({
        type: 'div',
        props: {
          style: {
            fontSize: TYPO.title.fontSize,
            lineHeight: `${TYPO.title.lineHeight}px`,
            fontWeight: 700,
            marginBottom: SPACING.block * 1.5,
          },
          children: b.text,
        },
      });
      continue;
    }
    if (b.type === 'h1' || b.type === 'h2' || b.type === 'h3') {
      const t = b.type === 'h1' ? TYPO.h1 : b.type === 'h2' ? TYPO.h2 : TYPO.h3;
      children.push({
        type: 'div',
        props: {
          style: {
            fontSize: t.fontSize,
            lineHeight: `${t.lineHeight}px`,
            fontWeight: 700,
            marginTop: SPACING.block,
            marginBottom: SPACING.block / 2,
          },
          children: (b as any).text,
        },
      });
      continue;
    }
    if (b.type === 'paragraph') {
      children.push({
        type: 'div',
        props: {
          style: {
            fontSize: TYPO.p.fontSize,
            lineHeight: `${TYPO.p.lineHeight}px`,
            color: COLORS.text,
            marginBottom: SPACING.block,
          },
          children: b.text,
        },
      });
      continue;
    }
    if (b.type === 'list') {
      const items = b.items.map((t, idx) => ({
        type: 'div',
        props: {
          style: {
            display: 'flex',
            gap: 12,
            fontSize: TYPO.p.fontSize,
            lineHeight: `${TYPO.p.lineHeight}px`,
            marginBottom: 8,
          },
          children: [
            { type: 'div', props: { children: b.ordered ? `${idx + 1}.` : '•' } },
            { type: 'div', props: { children: t } },
          ],
        },
      }));
      children.push({ type: 'div', props: { style: { marginBottom: SPACING.block }, children: items } });
      continue;
    }
    if (b.type === 'quote') {
      children.push({
        type: 'div',
        props: {
          style: {
            display: 'flex',
            gap: 16,
            marginBottom: SPACING.block,
          },
          children: [
            { type: 'div', props: { style: { width: 6, background: COLORS.quoteBar } } },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: TYPO.p.fontSize,
                  lineHeight: `${TYPO.p.lineHeight}px`,
                  color: COLORS.subtext,
                },
                children: b.text,
              },
            },
          ],
        },
      });
      continue;
    }
    if (b.type === 'code') {
      children.push({
        type: 'div',
        props: {
          style: {
            background: COLORS.codeBg,
            borderRadius: 12,
            padding: SPACING.codePad,
            fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
            fontSize: TYPO.code.fontSize,
            lineHeight: `${TYPO.code.lineHeight}px`,
            whiteSpace: 'pre-wrap',
            marginBottom: SPACING.block,
          },
          children: b.text,
        },
      });
      continue;
    }
    if (b.type === 'hr') {
      children.push({ type: 'div', props: { style: { height: 1, background: COLORS.hr, margin: `${SPACING.block}px 0` } } });
    }
  }
  return children;
}

export async function renderSlideToPng(slide: { blocks: Block[] }, pageIndex: number, pageCount: number): Promise<Uint8Array> {
  const fonts = await loadFonts();
  const tree = {
    type: 'div',
    props: {
      style: paperBackgroundStyle(),
      children: [
        {
          type: 'div',
          props: {
            style: {
              flex: 1,
              paddingTop: THEME.margins.top,
              paddingBottom: THEME.margins.bottom,
              paddingLeft: THEME.margins.left,
              paddingRight: THEME.margins.right,
              display: 'flex',
              flexDirection: 'column',
            },
            children: renderBlocks(slide.blocks),
          },
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: 24,
              left: 0,
              width: THEME.canvas.width,
              textAlign: 'center',
              color: COLORS.subtext,
              fontSize: TYPO.small.fontSize,
            },
            children: `第 ${pageIndex + 1} 页 / 共 ${pageCount} 页`,
          },
        },
      ],
    },
  } as const;

  const svg = await satori(tree as any, {
    width: THEME.canvas.width,
    height: THEME.canvas.height,
    fonts: fonts,
  });
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: THEME.canvas.width } });
  return resvg.render().asPng();
}


