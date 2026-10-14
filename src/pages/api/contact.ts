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

    const data: unknown = await request.json();
    if (typeof data !== 'object' || data === null) {
      return new Response(JSON.stringify({ error: 'Invalid request body.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { name, company_name, email, phone, category, message } = data as Record<string, unknown>;

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      (company_name !== undefined && typeof company_name !== 'string') ||
      (phone !== undefined && typeof phone !== 'string') ||
      (category !== undefined && typeof category !== 'string')
    ) {
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
