import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env;
  if (!env?.DB) {
    return new Response(JSON.stringify({ error: 'Database binding unavailable' }), { status: 500 });
  }

  try {
    const data = await request.json();
    const { name, company_name, email, phone, category, message } = data;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Name, email, and message are required' }), { status: 400 });
    }

    const id = `cnt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    await env.DB.prepare(
      `INSERT INTO admin_contacts (id, name, company_name, email, phone, category, message, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'new')`
    ).bind(
      id,
      name.trim(),
      company_name?.trim() || null,
      email.trim(),
      phone?.trim() || null,
      category || 'general',
      message.trim()
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Server error' }), { status: 500 });
  }
};
