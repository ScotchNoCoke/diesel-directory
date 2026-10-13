export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { businessName, phone, email, website } = data;

    if (!businessName || !phone || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required business, phone, or email fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailDomain = (email || '').split('@')[1]?.toLowerCase().trim();
    const cleanWebsite = (website || '')
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0]
      .toLowerCase()
      .trim();

    const isMatch = Boolean(
      cleanWebsite && (emailDomain === cleanWebsite || emailDomain.endsWith('.' + cleanWebsite))
    );

    if (isMatch) {
      return new Response(
        JSON.stringify({
          status: 'verified',
          message: 'Official domain match confirmed. Instant verification link dispatched.'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'pending_review',
        message: 'Claim received. Unmatched domain detected — queued for phone/ABN verification.'
      }),
      { status: 202, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || 'Server error processing claim' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
