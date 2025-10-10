import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response('Hello from Astro API!', {
    status: 200,
    headers: { 'content-type': 'text/plain' }
  });
};
