import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const GET: APIRoute = async ({ request }) => {
  if (!env?.DB) {
    return new Response(JSON.stringify({ error: 'Database binding missing' }), { status: 500 });
  }

  const url = new URL(request.url);
  const status = url.searchParams.get('status');

  try {
    let query = 'SELECT * FROM admin_contacts';
    const params: string[] = [];

    if (status && status !== 'all') {
      query += ' WHERE status = ?';
      params.push(status);
    }
    query += ' ORDER BY created_at DESC LIMIT 50';

    const { results } = await env.DB.prepare(query).bind(...params).all();
    return new Response(JSON.stringify({ success: true, data: results }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const PATCH: APIRoute = async ({ request }) => {
  if (!env?.DB) {
    return new Response(JSON.stringify({ error: 'Database binding missing' }), { status: 500 });
  }

  try {
    const body: unknown = await request.json();
    if (typeof body !== 'object' || body === null) {
      return new Response(JSON.stringify({ error: 'Missing contact ID' }), { status: 400 });
    }
    const { id, status, notes } = body as Record<string, unknown>;
    if (
      typeof id !== 'string' ||
      !id ||
      (status !== undefined && typeof status !== 'string') ||
      (notes !== undefined && typeof notes !== 'string')
    ) {
      return new Response(JSON.stringify({ error: 'Invalid contact update' }), { status: 400 });
    }

    await env.DB.prepare(
      `UPDATE admin_contacts 
       SET status = COALESCE(?, status), 
           notes = COALESCE(?, notes), 
           updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`
    ).bind(status || null, notes || null, id).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
