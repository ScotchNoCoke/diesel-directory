import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env;
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

export const PATCH: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env;
  if (!env?.DB) {
    return new Response(JSON.stringify({ error: 'Database binding missing' }), { status: 500 });
  }

  try {
    const { id, status, notes } = await request.json();
    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing contact ID' }), { status: 400 });
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
