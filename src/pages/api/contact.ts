import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const POST: APIRoute = async ({ request }) => {
  try {
    const db = (env as any)?.DB;

    if (!db) {
      return new Response(JSON.stringify({ 
        error: 'Database binding "DB" not found in cloudflare:workers environment.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await request.json();
    const { name, company_name, email, phone, category, message } = data;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ 
        error: 'Name, email, and message are required fields.' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const id = `cnt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    await db.prepare(
      `INSERT INTO admin_contacts (id, name, company_name, email, phone, category, message, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'new')`
    ).bind(
      id,
      name.trim(),
      company_name ? company_name.trim() : null,
      email.trim(),
      phone ? phone.trim() : null,
      category || 'general',
      message.trim()
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ 
      error: err.message || 'Worker runtime error',
      stack: err.stack 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
