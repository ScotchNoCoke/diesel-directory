export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async (context) => {
  try {
    const runtimeEnv = (context.locals as any)?.runtime?.env || process.env;
    const db = runtimeEnv?.DB;

    if (!db) {
      return new Response(
        JSON.stringify({ error: 'Database binding (DB) is unavailable.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const formData = await context.request.formData();
    const email = formData.get('email')?.toString()?.trim()?.toLowerCase();
    const business = formData.get('business')?.toString()?.trim() || '';
    const suburb = formData.get('suburb')?.toString()?.trim() || '';

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'A valid email address is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const businessId = (business || 'unnamed-workshop')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');

    // Generate 32-byte secure token (14 days validity)
    const tokenBytes = new Uint8Array(24);
    crypto.getRandomValues(tokenBytes);
    const token = Array.from(tokenBytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + 14 * 86400;

    // 1. Insert into D1 claim_tokens
    await db
      .prepare(
        `INSERT INTO claim_tokens (token, business_id, recipient_email, created_at, expires_at)
         VALUES (?, ?, ?, ?, ?)`
      )
      .bind(token, businessId, email, now, expiresAt)
      .run();

    // 2. Dispatch email via Resend
    const origin = new URL(context.request.url).origin;
    const claimUrl = `${origin}/claim?token=${token}`;
    const resendApiKey = runtimeEnv.RESEND_API_KEY;

    if (resendApiKey) {
      const emailPayload = {
        from: 'Diesel Hub Verification <admin@dieselhub.com.au>',
        to: [email],
        subject: `Claim listing: ${business || 'Your Workshop'} on Diesel Hub`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; color: #1e293b;">
            <div style="margin-bottom: 20px;">
              <span style="background-color: #fef3c7; color: #b45309; font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 4px; text-transform: uppercase;">Verified Workshop Profile</span>
            </div>
            <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0;">Claim ownership on Diesel Hub</h2>
            <p>You requested verification for <strong>${business || 'your workshop'}</strong>${suburb ? ` in ${suburb}` : ''}.</p>
            <p>Claiming allows you to manage lead notifications, list specialist tooling, and show verified status on heavy vehicle corridor maps.</p>
            <div style="margin: 28px 0;">
              <a href="${claimUrl}" style="background-color: #f59e0b; color: #09090b; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block;">
                Verify & Claim Listing &rarr;
              </a>
            </div>
            <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">This link expires in 14 days. If you did not request this, you can safely ignore this email.</p>
          </div>
        `,
      };

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });
    }

    // 3. Redirect back to /claim to show "Verification Link Sent"
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/claim?email=${encodeURIComponent(email)}`,
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Failed to process claim request', details: err?.message || String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
