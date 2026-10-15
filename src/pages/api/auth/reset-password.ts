import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { hashPassword, createSession, buildSessionCookie } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const db = (env as any)?.DB;
    const sessionKv = (env as any)?.SESSION;

    if (!db || !sessionKv) {
      return context.redirect('/login?error=' + encodeURIComponent('Service unavailable.'));
    }

    const formData = await context.request.formData();
    const token = formData.get('token')?.toString()?.trim() || '';
    const password = formData.get('password')?.toString() || '';
    const confirmPassword = formData.get('confirm_password')?.toString() || '';

    if (!token || !password) {
      return context.redirect(`/reset-password?token=${encodeURIComponent(token)}&error=` + encodeURIComponent('All fields are required.'));
    }

    if (password.length < 8) {
      return context.redirect(`/reset-password?token=${encodeURIComponent(token)}&error=` + encodeURIComponent('Password must be at least 8 characters.'));
    }

    if (password !== confirmPassword) {
      return context.redirect(`/reset-password?token=${encodeURIComponent(token)}&error=` + encodeURIComponent('Passwords do not match.'));
    }

    const now = Math.floor(Date.now() / 1000);

    const tokenRecord = (await db
      .prepare('SELECT user_id, email FROM password_reset_tokens WHERE token = ? AND used_at IS NULL AND expires_at > ?')
      .bind(token, now)
      .first()) as { user_id: string; email: string } | null;

    if (!tokenRecord) {
      return context.redirect('/forgot-password?error=' + encodeURIComponent('Password reset link is invalid or has expired.'));
    }

    const { hash, salt } = await hashPassword(password);

    // 1. Mark token as used
    await db
      .prepare('UPDATE password_reset_tokens SET used_at = ? WHERE token = ?')
      .bind(now, token)
      .run();

    // 2. Update user's password in D1
    await db
      .prepare('UPDATE users SET password_hash = ?, salt = ?, updated_at = ? WHERE id = ?')
      .bind(hash, salt, now, tokenRecord.user_id)
      .run();

    const user = (await db
      .prepare('SELECT business_id FROM users WHERE id = ?')
      .bind(tokenRecord.user_id)
      .first()) as { business_id: string } | null;

    // 3. Automatically log them in
    const sessionId = await createSession(sessionKv, {
      userId: tokenRecord.user_id,
      email: tokenRecord.email,
      businessId: user?.business_id || '',
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/dashboard?status=success&msg=' + encodeURIComponent('Password reset successful.'),
        'Set-Cookie': buildSessionCookie(sessionId),
      },
    });
  } catch (err: any) {
    console.error('Reset password error:', err);
    return context.redirect('/forgot-password?error=' + encodeURIComponent('An unexpected error occurred.'));
  }
};
