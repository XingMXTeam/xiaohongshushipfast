import type { APIRoute } from 'astro';
import * as JSZip from 'jszip';
import { parseMarkdownToBlocks } from '../../../utils/xhs/markdown';
import { paginateBlocks } from '../../../utils/xhs/paginate';
import { renderSlideToPng } from '../../../utils/xhs/render';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const markdown = url.searchParams.get('markdown') || '';
    const wantZip = url.searchParams.get('zip') === '1';

    console.log('GET Request URL:', request.url);
    console.log('Extracted markdown:', markdown);

    if (!markdown.trim()) {
      return new Response('Missing markdown', { status: 400 });
    }

    console.log('Parsing markdown...');
    const blocks = await parseMarkdownToBlocks(markdown);
    console.log('Blocks parsed:', blocks.length);

    console.log('Paginating...');
    const slides = paginateBlocks(blocks);
    console.log('Slides created:', slides.length);

    const images: Uint8Array[] = [];
    for (let i = 0; i < slides.length; i++) {
      console.log(`Rendering slide ${i + 1}/${slides.length}...`);
      const png = await renderSlideToPng(slides[i], i, slides.length);
      images.push(png);
    }

    if (!wantZip) {
      return new Response(images[0] as any, {
        status: 200,
        headers: { 'content-type': 'image/png' },
      });
    }

    console.log('Creating ZIP...');
    const zip = new JSZip();
    images.forEach((buf, idx) => {
      zip.file(`xhs-slide-${String(idx + 1).padStart(2, '0')}.png`, buf);
    });
    const zipBuf = await zip.generateAsync({ type: 'uint8array' });
    return new Response(zipBuf as any, {
      status: 200,
      headers: {
        'content-type': 'application/zip',
        'content-disposition': 'attachment; filename="xhs-slides.zip"',
      },
    });
  } catch (err: any) {
    console.error('Render error:', err);
    return new Response(`Render error: ${err?.message || String(err)}`, { 
      status: 500,
      headers: { 'content-type': 'text/plain' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const wantZip = url.searchParams.get('zip') === '1';

    console.log('Request URL:', request.url);

    // Clone the request to avoid body consumption issues
    const clonedRequest = request.clone();
    
    // Try to parse as JSON first (most common case)
    let markdown = '';
    try {
      const body = await clonedRequest.json();
      console.log('Parsed JSON body:', body);
      markdown = String(body.markdown || '');
    } catch (e) {
      console.log('Not JSON, trying as text...');
      try {
        const textBody = await request.text();
        console.log('Text body:', textBody);
        markdown = textBody;
      } catch (e2) {
        console.error('Failed to parse request:', e2);
        return new Response('Failed to parse request', { status: 400 });
      }
    }

    console.log('Extracted markdown:', markdown);

    if (!markdown.trim()) {
      return new Response('Missing markdown', { status: 400 });
    }

    console.log('Parsing markdown...');
    const blocks = await parseMarkdownToBlocks(markdown);
    console.log('Blocks parsed:', blocks.length);

    console.log('Paginating...');
    const slides = paginateBlocks(blocks);
    console.log('Slides created:', slides.length);

    const images: Uint8Array[] = [];
    for (let i = 0; i < slides.length; i++) {
      console.log(`Rendering slide ${i + 1}/${slides.length}...`);
      const png = await renderSlideToPng(slides[i], i, slides.length);
      images.push(png);
    }

    if (!wantZip) {
      return new Response(images[0] as any, {
        status: 200,
        headers: { 'content-type': 'image/png' },
      });
    }

    console.log('Creating ZIP...');
    const zip = new JSZip();
    images.forEach((buf, idx) => {
      zip.file(`xhs-slide-${String(idx + 1).padStart(2, '0')}.png`, buf);
    });
    const zipBuf = await zip.generateAsync({ type: 'uint8array' });
    return new Response(zipBuf as any, {
      status: 200,
      headers: {
        'content-type': 'application/zip',
        'content-disposition': 'attachment; filename="xhs-slides.zip"',
      },
    });
  } catch (err: any) {
    console.error('Render error:', err);
    return new Response(`Render error: ${err?.message || String(err)}`, { 
      status: 500,
      headers: { 'content-type': 'text/plain' }
    });
  }
};


