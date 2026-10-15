import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { hashPassword, createSession, buildSessionCookie } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const db = (env as any)?.DB;
    const sessionKv = (env as any)?.SESSION;
    const resendApiKey = (env as any)?.RESEND_API_KEY;

    if (!db || !sessionKv) {
      return new Response(
        JSON.stringify({ error: 'Bindings missing', db: Boolean(db), sessionKv: Boolean(sessionKv) }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const formData = await context.request.formData();
    const token = formData.get('token')?.toString()?.trim();
    const password = formData.get('password')?.toString();

    if (!token || !password || password.length < 8) {
      return new Response(
        JSON.stringify({ error: 'Password must be at least 8 characters and token is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const tokenRecord = (await db
      .prepare(
        "SELECT business_id, recipient_email FROM claim_tokens WHERE token = ? AND claimed_at IS NULL AND expires_at > CAST(strftime('%s', 'now') AS INTEGER)"
      )
      .bind(token)
      .first()) as { business_id: string; recipient_email: string } | null;

    if (!tokenRecord) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired claim token.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const now = Math.floor(Date.now() / 1000);
    const userId = crypto.randomUUID();
    const { hash, salt } = await hashPassword(password);

    // 1. Mark token as claimed
    await db
      .prepare('UPDATE claim_tokens SET claimed_at = ? WHERE token = ?')
      .bind(now, token)
      .run();

    // 2. Insert or update user
    const existingUser = (await db
      .prepare('SELECT id FROM users WHERE email = ?')
      .bind(tokenRecord.recipient_email)
      .first()) as { id: string } | null;

    if (existingUser) {
      await db
        .prepare(
          `UPDATE users SET
             business_id = ?,
             password_hash = ?,
             salt = ?,
             updated_at = ?
           WHERE email = ?`
        )
        .bind(tokenRecord.business_id, hash, salt, now, tokenRecord.recipient_email)
        .run();
    } else {
      await db
        .prepare(
          `INSERT INTO users (id, business_id, email, password_hash, salt, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(userId, tokenRecord.business_id, tokenRecord.recipient_email, hash, salt, now, now)
        .run();
    }

    const finalUserId = existingUser ? existingUser.id : userId;

    // 3. Dispatch alert via Resend
    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Diesel Hub Alerts <admin@dieselhub.com.au>',
            to: ['admin@dieselhub.com.au', 'scotchss777@gmail.com'],
            subject: `🎉 Listing Claimed: ${tokenRecord.business_id}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 24px; color: #1e293b; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #059669; color: #ffffff; padding: 12px 18px; border-radius: 8px 8px 0 0; font-weight: bold; font-size: 16px;">
                  ✓ Workshop Profile Claimed & Verified
                </div>
                <div style="border: 1px solid #e2e8f0; border-top: none; padding: 20px; border-radius: 0 0 8px 8px; background-color: #ffffff;">
                  <p style="margin-top: 0; font-size: 14px; color: #475569;">
                    A workshop operator has completed their account creation and claimed their business listing on Diesel Hub.
                  </p>
                  <table style="width: 100%; font-size: 13px; text-align: left; border-collapse: collapse; margin: 16px 0;">
                    <tr>
                      <th style="padding: 8px 12px; border: 1px solid #e2e8f0; background: #f8fafc; width: 35%;">Workshop</th>
                      <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: bold; color: #0f172a;">${tokenRecord.business_id}</td>
                    </tr>
                    <tr>
                      <th style="padding: 8px 12px; border: 1px solid #e2e8f0; background: #f8fafc;">Operator Email</th>
                      <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${tokenRecord.recipient_email}</td>
                    </tr>
                    <tr>
                      <th style="padding: 8px 12px; border: 1px solid #e2e8f0; background: #f8fafc;">Timestamp</th>
                      <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })}</td>
                    </tr>
                  </table>
                  <div style="margin-top: 24px;">
                    <a href="https://dieselhub.com.au/login" style="background-color: #f59e0b; color: #09090b; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 13px; display: inline-block;">
                      Workshop Sign In &rarr;
                    </a>
                  </div>
                </div>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error('Failed to dispatch claim alert email:', emailErr);
      }
    }

    // 4. Issue session in Cloudflare KV
    const sessionId = await createSession(sessionKv, {
      userId: finalUserId,
      businessId: tokenRecord.business_id,
      email: tokenRecord.recipient_email,
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/dashboard',
        'Set-Cookie': buildSessionCookie(sessionId),
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Claim complete failed', message: err?.message || String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
