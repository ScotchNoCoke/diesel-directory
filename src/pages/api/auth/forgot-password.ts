import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const db = (env as any)?.DB;
    const resendApiKey = (env as any)?.RESEND_API_KEY;

    const formData = await context.request.formData();
    const email = formData.get('email')?.toString()?.trim()?.toLowerCase() || '';

    if (!email) {
      return context.redirect('/forgot-password?error=' + encodeURIComponent('Email is required.'));
    }

    if (!db) {
      return context.redirect('/forgot-password?error=' + encodeURIComponent('Service temporarily unavailable.'));
    }

    // Always show success message to prevent user enumeration
    const user = (await db
      .prepare('SELECT id, email, business_id FROM users WHERE LOWER(email) = ?')
      .bind(email)
      .first()) as { id: string; email: string; business_id: string } | null;

    if (user && resendApiKey) {
      const token = crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '');
      const now = Math.floor(Date.now() / 1000);
      const expiresAt = now + (60 * 60); // 1 hour expiry

      await db
        .prepare('INSERT INTO password_reset_tokens (token, user_id, email, created_at, expires_at) VALUES (?, ?, ?, ?, ?)')
        .bind(token, user.id, user.email, now, expiresAt)
        .run();

      const resetLink = `https://dieselhub.com.au/reset-password?token=${token}`;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Diesel Hub Security <admin@dieselhub.com.au>',
          to: [user.email],
          subject: 'Reset your Diesel Hub Password',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 24px; color: #1e293b; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0f172a; margin-top: 0;">Password Reset Request</h2>
              <p>We received a request to reset the password for your Diesel Hub workshop account (<strong>${user.business_id}</strong>).</p>
              <p style="margin: 24px 0;">
                <a href="${resetLink}" style="background-color: #f59e0b; color: #09090b; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Set New Password &rarr;
                </a>
              </p>
              <p style="font-size: 13px; color: #64748b;">This link expires in 1 hour. If you did not request this, you can safely ignore this email.</p>
            </div>
          `,
        }),
      });
    }

    return context.redirect('/forgot-password?status=sent');
  } catch (err: any) {
    console.error('Forgot password error:', err);
    return context.redirect('/forgot-password?error=' + encodeURIComponent('Unexpected server error.'));
  }
};
