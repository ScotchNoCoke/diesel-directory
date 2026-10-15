import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getSession, verifyPassword, hashPassword } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const db = (env as any)?.DB;
    const sessionKv = (env as any)?.SESSION;

    if (!db || !sessionKv) {
      return context.redirect('/dashboard?status=error&msg=' + encodeURIComponent('Service unavailable.'));
    }

    const cookieHeader = context.request.headers.get('cookie') || '';
    const sessionMatch = cookieHeader.match(/dh_session=([^;]+)/);
    const sessionId = sessionMatch ? sessionMatch[1].trim() : null;

    if (!sessionId) {
      return context.redirect('/login');
    }

    const session = await getSession(sessionKv, sessionId);
    if (!session?.userId) {
      return context.redirect('/login');
    }

    const formData = await context.request.formData();
    const currentPassword = formData.get('current_password')?.toString() || '';
    const newPassword = formData.get('new_password')?.toString() || '';
    const confirmPassword = formData.get('confirm_password')?.toString() || '';

    if (!currentPassword || !newPassword) {
      return context.redirect('/dashboard?status=error&msg=' + encodeURIComponent('Please enter both your current and new password.'));
    }

    if (newPassword.length < 8) {
      return context.redirect('/dashboard?status=error&msg=' + encodeURIComponent('New password must be at least 8 characters long.'));
    }

    if (newPassword !== confirmPassword) {
      return context.redirect('/dashboard?status=error&msg=' + encodeURIComponent('New passwords do not match.'));
    }

    const user = (await db
      .prepare('SELECT id, password_hash, salt FROM users WHERE id = ?')
      .bind(session.userId)
      .first()) as { id: string; password_hash: string; salt: string } | null;

    if (!user || !user.salt) {
      return context.redirect('/dashboard?status=error&msg=' + encodeURIComponent('User account not found.'));
    }

    const isCurrentValid = await verifyPassword(currentPassword, user.password_hash, user.salt);
    if (!isCurrentValid) {
      return context.redirect('/dashboard?status=error&msg=' + encodeURIComponent('Current password is incorrect.'));
    }

    const { hash, salt } = await hashPassword(newPassword);
    const now = Math.floor(Date.now() / 1000);

    await db
      .prepare('UPDATE users SET password_hash = ?, salt = ?, updated_at = ? WHERE id = ?')
      .bind(hash, salt, now, user.id)
      .run();

    return context.redirect('/dashboard?status=success&msg=' + encodeURIComponent('Password updated successfully.'));
  } catch (err: any) {
    console.error('Password change error:', err);
    return context.redirect('/dashboard?status=error&msg=' + encodeURIComponent('Unexpected error updating password.'));
  }
};
