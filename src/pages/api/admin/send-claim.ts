import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

interface ClaimRequestBody {
  adminKey?: string;
  businessId: string;
  businessName: string;
  businessSlug?: string;
  suburb: string;
  suburbSlug?: string;
  state?: string;
  recipientEmail: string;
}

export const POST: APIRoute = async (context) => {
  try {
    const db = env?.DB;
    const adminKey = env?.ADMIN_API_KEY;
    const resendApiKey = env?.RESEND_API_KEY;

    const authHeader = context.request.headers.get('Authorization');
    const body = (await context.request.json().catch(() => ({}))) as Partial<ClaimRequestBody>;

    const providedKey = authHeader?.startsWith('Bearer ')
      ? authHeader.replace('Bearer ', '').trim()
      : body.adminKey?.trim();

    if (!adminKey || providedKey !== adminKey) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized. Provided key does not match ADMIN_API_KEY.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!db) {
      return new Response(
        JSON.stringify({ error: 'Database binding (DB) is unavailable on runtime.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const {
      businessId,
      businessName,
      businessSlug,
      suburb,
      suburbSlug,
      state,
      recipientEmail,
    } = body;

    if (!businessId || !recipientEmail || !recipientEmail.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Missing businessId or valid recipientEmail.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cleanEmail = recipientEmail.trim().toLowerCase();
    const token = crypto.randomUUID().replace(/-/g, '');
    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + 14 * 86400; // 14 days

    await db
      .prepare(
        'INSERT INTO claim_tokens (token, business_id, recipient_email, created_at, expires_at) VALUES (?, ?, ?, ?, ?)'
      )
      .bind(token, businessId, cleanEmail, now, expiresAt)
      .run();

    const stateCode = (state || 'vic').toLowerCase();
    const targetSuburb = suburbSlug || (suburb ? suburb.toLowerCase().replace(/\s+/g, '-') : '');

    const claimUrl = `https://dieselhub.com.au/claim?token=${token}`;
    const profileUrl = businessSlug
      ? `https://dieselhub.com.au/${stateCode}/${targetSuburb}#card-${businessSlug}`
      : `https://dieselhub.com.au/${stateCode}/${targetSuburb}`;

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({
          error: 'RESEND_API_KEY secret is not set in Cloudflare.',
          claimUrl,
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailPayload = {
      from: 'Diesel Hub Verification <admin@dieselhub.com.au>',
      to: [cleanEmail],
      subject: `Claim your listing on Diesel Hub: ${businessName || 'Workshop'}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 580px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a; margin-top: 0;">Claim your workshop profile</h2>
          <p>G'day ${businessName || 'Team'},</p>
          <p>We've created a public directory profile for your workshop on <strong>Diesel Hub</strong> so long-haul transport and fleet managers can connect directly with you:</p>
          <p><a href="${profileUrl}" style="color: #f59e0b; text-decoration: underline; font-weight: bold;">Preview your public profile &rarr;</a></p>
          <p>Claim this listing to verify your emergency dispatch capabilities, diagnostic tooling, and update contact hours.</p>
          <div style="margin: 28px 0;">
            <a href="${claimUrl}" style="background-color: #f59e0b; color: #09090b; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 700; display: inline-block;">
              Claim Profile
            </a>
          </div>
          <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">Link is valid for 14 days. If you prefer not to be listed, reply to this email to remove your listing.</p>
        </div>
      `,
    };

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!resendRes.ok) {
      const errorText = await resendRes.text();
      return new Response(
        JSON.stringify({ error: `Resend error: ${errorText}`, claimUrl }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ success: true, token, claimUrl, profileUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: `Server exception: ${err?.message || String(err)}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
