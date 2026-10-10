import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();
    const payload = JSON.parse(body);

    // Logs directly to Cloudflare Pages Functions / dev console
    console.log(`[Event Logged] ${payload.event} at ${payload.url} |`, payload.data || {});

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid telemetry payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
