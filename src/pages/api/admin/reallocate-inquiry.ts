import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const db = (env as any)?.DB;
    const adminApiKey = (env as any)?.ADMIN_API_KEY;

    if (!db) {
      return new Response(JSON.stringify({ error: 'Database binding unavailable.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const authHeader = request.headers.get('Authorization') || '';
    const body: any = await request.json().catch(() => ({}));
    const key = authHeader.replace(/^Bearer\s+/i, '').trim() || body.adminKey;

    if (!key || (adminApiKey && key !== adminApiKey)) {
      return new Response(JSON.stringify({ error: 'Unauthorized.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { inquiryId, targetBusinessId } = body;

    if (!inquiryId || !targetBusinessId) {
      return new Response(JSON.stringify({ error: 'inquiryId and targetBusinessId are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify inquiry exists
    const inquiry = await db
      .prepare('SELECT id, driver_name, driver_phone, breakdown_location FROM dispatch_inquiries WHERE id = ?')
      .bind(inquiryId)
      .first();

    if (!inquiry) {
      return new Response(JSON.stringify({ error: 'Inquiry not found.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Update allocation in D1
    await db
      .prepare('UPDATE dispatch_inquiries SET business_id = ? WHERE id = ?')
      .bind(targetBusinessId, inquiryId)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: `Inquiry successfully re-routed to ${targetBusinessId}.`,
        inquiryId,
        newBusinessId: targetBusinessId,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Error re-allocating inquiry:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
