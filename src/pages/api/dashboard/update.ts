import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getSession } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const db = (env as any)?.DB;
    const sessionKv = (env as any)?.SESSION;

    if (!db || !sessionKv) {
      return new Response(JSON.stringify({ error: 'Bindings missing' }), { status: 500 });
    }

    const cookieHeader = context.request.headers.get('Cookie') || '';
    const match = cookieHeader.match(/dh_session=([^;]+)/);
    const sessionId = match ? match[1] : null;

    const session = sessionId ? await getSession(sessionKv, sessionId) : null;
    if (!session) {
      return context.redirect('/?auth=expired');
    }

    const formData = await context.request.formData();
    const name = formData.get('name')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const afterHoursPhone = formData.get('after_hours_phone')?.toString() || '';
    const address = formData.get('address')?.toString() || '';
    const is247 = formData.get('is_24_7') === '1' ? 1 : 0;
    const hasMobile = formData.get('has_mobile_service') === '1' ? 1 : 0;
    const hasBDouble = formData.get('has_b_double_access') === '1' ? 1 : 0;
    const hasRwc = formData.get('has_rwc') === '1' ? 1 : 0;
    const hasDpf = formData.get('has_dpf_service') === '1' ? 1 : 0;
    const now = Math.floor(Date.now() / 1000);

    await db
      .prepare(
        `INSERT INTO workshop_profiles (
          business_id, name, phone, after_hours_phone, address,
          is_24_7, has_mobile_service, has_b_double_access, has_rwc, has_dpf_service, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(business_id) DO UPDATE SET
          name = excluded.name,
          phone = excluded.phone,
          after_hours_phone = excluded.after_hours_phone,
          address = excluded.address,
          is_24_7 = excluded.is_24_7,
          has_mobile_service = excluded.has_mobile_service,
          has_b_double_access = excluded.has_b_double_access,
          has_rwc = excluded.has_rwc,
          has_dpf_service = excluded.has_dpf_service,
          updated_at = excluded.updated_at`
      )
      .bind(
        session.businessId,
        name,
        phone,
        afterHoursPhone,
        address,
        is247,
        hasMobile,
        hasBDouble,
        hasRwc,
        hasDpf,
        now
      )
      .run();

    return context.redirect('/dashboard?saved=1');
  } catch (err: any) {
    console.error('Update profile error:', err);
    return new Response(JSON.stringify({ error: err?.message || String(err) }), { status: 500 });
  }
};
