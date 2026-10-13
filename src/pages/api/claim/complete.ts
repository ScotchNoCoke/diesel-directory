import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { hashPassword, createSession, buildSessionCookie } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const db = (env as any)?.DB;
    const sessionKv = (env as any)?.SESSION;

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

    // 2. Check if user already exists by email
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

    // 3. Issue session in Cloudflare KV
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
