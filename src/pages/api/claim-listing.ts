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

    let payload: any = {};
    const contentType = context.request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      payload = await context.request.json();
    } else {
      const formData = await context.request.formData();
      payload = {
        businessName: formData.get('businessName')?.toString(),
        phone: formData.get('phone')?.toString(),
        email: formData.get('email')?.toString(),
        website: formData.get('website')?.toString(),
        suburb: formData.get('suburb')?.toString(),
      };
    }

    const { businessName, email, phone, website, suburb } = payload;

    if (!businessName || !email) {
      return new Response(
        JSON.stringify({ error: 'Workshop name and a valid work email are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const recipientEmail = String(email).trim().toLowerCase();
    const businessId = String(businessName)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-');

    // 1. Generate 32-byte secure hex token & timestamps (14-day expiry)
    const tokenBytes = new Uint8Array(24);
    crypto.getRandomValues(tokenBytes);
    const token = Array.from(tokenBytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + 14 * 86400; // 14 days

    // 2. Persist to D1 claim_tokens table
    await db
      .prepare(
        `INSERT INTO claim_tokens (token, business_id, recipient_email, created_at, expires_at)
         VALUES (?, ?, ?, ?, ?)`
      )
      .bind(token, businessId, recipientEmail, now, expiresAt)
      .run();

    // 3. Dispatch Claim Magic Link via Resend
    const origin = new URL(context.request.url).origin;
    const claimUrl = `${origin}/claim?token=${token}`;
    const resendApiKey = runtimeEnv.RESEND_API_KEY;

    if (resendApiKey) {
      const emailPayload = {
        from: 'Diesel Hub Verification <admin@dieselhub.com.au>',
        to: [recipientEmail],
        subject: `Claim listing: ${businessName} on Diesel Hub`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; color: #1e293b;">
            <div style="margin-bottom: 24px;">
              <span style="background-color: #fef3c7; color: #b45309; font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 4px; text-transform: uppercase;">Verified Workshop Access</span>
            </div>
            <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0;">Claim your listing on Diesel Hub</h2>
            <p>You requested verification to take ownership of <strong>${businessName}</strong>${suburb ? ` in ${suburb}` : ''}.</p>
            <p>Claiming this profile gives you access to:</p>
            <ul>
              <li>Manage 24/7 emergency dispatch callouts & quote inquiries</li>
              <li>Display verified equipment & heavy-vehicle certifications</li>
              <li>Appear with priority badge on regional arterial corridor maps</li>
            </ul>
            <div style="margin: 28px 0;">
              <a href="${claimUrl}" style="background-color: #f59e0b; color: #09090b; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block;">
                Verify & Claim Listing &rarr;
              </a>
            </div>
            <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">This link is valid for 14 days. If you did not request this, you can safely ignore this email.</p>
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

    // If submitted via standard form POST, redirect back to claim page with confirmation query
    if (!contentType.includes('application/json')) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/claim?email=${encodeURIComponent(recipientEmail)}`,
        },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Verification link generated and dispatched.',
        email: recipientEmail,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || 'Server error processing claim' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
