import type { APIRoute } from 'astro';
import suburbsData from '../../data/suburbs.json';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(suburbsData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
