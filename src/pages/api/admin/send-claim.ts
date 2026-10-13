import type { APIRoute } from 'astro';

export const prerender = false;

interface ClaimRequestBody {
  businessId: string;
  businessName: string;
  businessSlug?: string;
  suburb: string;
  suburbSlug?: string;
  state?: string;
  recipientEmail: string;
}

export const POST: APIRoute = async (context) => {
  const runtimeEnv = ((context.locals as any)?.runtime?.env || {}) as {
    DB?: any;
    ADMIN_API_KEY?: string;
    RESEND_API_KEY?: string;
  };

  const adminKey = runtimeEnv.ADMIN_API_KEY;
  const authHeader = context.request.headers.get('Authorization');

  if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const db = runtimeEnv.DB;
  if (!db) {
    return new Response(JSON.stringify({ error: 'Database binding missing' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = (await context.request.json().catch(() => ({}))) as Partial<ClaimRequestBody>;
  const {
    businessId,
    businessName,
    businessSlug,
    suburb,
    suburbSlug,
    state,
    recipientEmail,
  } = body;

  if (!businessId || !recipientEmail) {
    return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = crypto.randomUUID().replace(/-/g, '');
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + 14 * 86400;

  await db
    .prepare(
      'INSERT INTO claim_tokens (token, business_id, recipient_email, created_at, expires_at) VALUES (?, ?, ?, ?, ?)'
    )
    .bind(token, businessId, recipientEmail, now, expiresAt)
    .run();

  const stateCode = (state || 'vic').toLowerCase();
  const targetSuburb = suburbSlug || (suburb ? suburb.toLowerCase().replace(/\s+/g, '-') : '');

  const claimUrl = `https://dieselhub.com.au/claim?token=${token}`;
  const profileUrl = businessSlug
    ? `https://dieselhub.com.au/${stateCode}/${targetSuburb}#${businessSlug}`
    : `https://dieselhub.com.au/${stateCode}/${targetSuburb}`;

  const emailPayload = {
    from: 'Diesel Hub <team@dieselhub.com.au>',
    to: [recipientEmail],
    subject: `Claim your listing on Diesel Hub: ${businessName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0f172a; margin-top: 0;">Claim your workshop profile</h2>
        <p>G'day ${businessName},</p>
        <p>We've created a public directory profile for your workshop on <strong>Diesel Hub</strong> to help drivers and fleet operators in ${suburb} find your diesel services:</p>
        <p><a href="${profileUrl}" style="color: #0284c7; text-decoration: underline;">Preview your public profile &rarr;</a></p>
        <p>You can claim this listing for free to update your opening hours, list specialist diagnostic gear, and manage incoming leads.</p>
        <div style="margin: 28px 0;">
          <a href="${claimUrl}" style="background-color: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">
            Claim Profile
          </a>
        </div>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 0;">This link is valid for 14 days. If you prefer not to be listed, simply reply to this email to remove your page.</p>
      </div>
    `,
  };

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${runtimeEnv.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailPayload),
  });

  if (!resendRes.ok) {
    const errorText = await resendRes.text();
    return new Response(JSON.stringify({ error: errorText }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true, token, profileUrl }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
