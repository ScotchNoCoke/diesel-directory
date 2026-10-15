import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getSession } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const db = (env as any)?.DB;
    const sessionKv = (env as any)?.SESSION;

    if (!db || !sessionKv) {
      return context.redirect('/dashboard?status=error&msg=' + encodeURIComponent('Database or session service unavailable.'));
    }

    const cookieHeader = context.request.headers.get('cookie') || '';
    const sessionMatch = cookieHeader.match(/dh_session=([^;]+)/);
    const sessionId = sessionMatch ? sessionMatch[1].trim() : null;

    if (!sessionId) {
      return context.redirect('/login');
    }

    const session = await getSession(sessionKv, sessionId);
    if (!session?.businessId) {
      return context.redirect('/login');
    }

    const businessId = session.businessId;
    const formData = await context.request.formData();

    // Text & Contact fields
    const emergencyPhone = formData.get('emergency_phone')?.toString()?.trim() || null;
    const phone = formData.get('phone')?.toString()?.trim() || null;
    const website = formData.get('website')?.toString()?.trim() || null;
    const address = formData.get('address')?.toString()?.trim() || null;
    const emergencyRadiusKm = parseInt(formData.get('emergency_radius_km')?.toString() || '50', 10);

    // Booleans / Flags (HTML checkbox sends value or null)
    const is24_7 = formData.has('is_24_7') ? 1 : 0;
    const hasMobileService = formData.has('has_mobile_service') ? 1 : 0;
    const hasDpfService = formData.has('has_dpf_service') ? 1 : 0;
    const isOpenNow = formData.has('is_open_now') ? 1 : 0;
    const bDoubleAccess = formData.has('b_double_access') ? 1 : 0;
    const roadTrainAccess = formData.has('road_train_access') ? 1 : 0;
    const driveThroughBays = formData.has('drive_through_bays') ? 1 : 0;
    const trailerParking = formData.has('trailer_parking') ? 1 : 0;
    const rwcLicensed = formData.has('rwc_licensed') ? 1 : 0;

    // Diagnostics Array
    const diagnosticTools = formData.getAll('diagnostic_software').map(String);
    const diagnosticSoftwareJson = JSON.stringify(diagnosticTools);

    const now = Math.floor(Date.now() / 1000);

    // Check if profile exists
    const existing = await db
      .prepare('SELECT business_id FROM workshop_profiles WHERE business_id = ?')
      .bind(businessId)
      .first();

    if (existing) {
      await db
        .prepare(`
          UPDATE workshop_profiles SET
            phone = ?,
            after_hours_phone = ?,
            emergency_phone = ?,
            website = ?,
            address = ?,
            emergency_radius_km = ?,
            is_24_7 = ?,
            has_mobile_service = ?,
            has_dpf_service = ?,
            is_open_now = ?,
            b_double_access = ?,
            has_b_double_access = ?,
            road_train_access = ?,
            drive_through_bays = ?,
            trailer_parking = ?,
            rwc_licensed = ?,
            has_rwc = ?,
            diagnostic_software = ?,
            updated_at = ?
          WHERE business_id = ?
        `)
        .bind(
          phone,
          emergencyPhone,
          emergencyPhone,
          website,
          address,
          emergencyRadiusKm,
          is24_7,
          hasMobileService,
          hasDpfService,
          isOpenNow,
          bDoubleAccess,
          bDoubleAccess,
          roadTrainAccess,
          driveThroughBays,
          trailerParking,
          rwcLicensed,
          rwcLicensed,
          diagnosticSoftwareJson,
          now,
          businessId
        )
        .run();
    } else {
      await db
        .prepare(`
          INSERT INTO workshop_profiles (
            business_id,
            phone,
            after_hours_phone,
            emergency_phone,
            website,
            address,
            emergency_radius_km,
            is_24_7,
            has_mobile_service,
            has_dpf_service,
            is_open_now,
            b_double_access,
            has_b_double_access,
            road_train_access,
            drive_through_bays,
            trailer_parking,
            rwc_licensed,
            has_rwc,
            diagnostic_software,
            updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)
        .bind(
          businessId,
          phone,
          emergencyPhone,
          emergencyPhone,
          website,
          address,
          emergencyRadiusKm,
          is24_7,
          hasMobileService,
          hasDpfService,
          isOpenNow,
          bDoubleAccess,
          bDoubleAccess,
          roadTrainAccess,
          driveThroughBays,
          trailerParking,
          rwcLicensed,
          rwcLicensed,
          diagnosticSoftwareJson,
          now
        )
        .run();
    }

    return context.redirect('/dashboard?status=success&msg=' + encodeURIComponent('Workshop profile updated successfully.'));
  } catch (err: any) {
    console.error('Failed to update workshop profile:', err);
    return context.redirect('/dashboard?status=error&msg=' + encodeURIComponent(err?.message || 'Failed to save changes.'));
  }
};
