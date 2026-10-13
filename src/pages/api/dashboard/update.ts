import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const db = (env as any)?.DB;
    const sessionKv = (env as any)?.SESSION;

    if (!db || !sessionKv) {
      return context.redirect("/dashboard?status=error&msg=" + encodeURIComponent("Database or session store offline"));
    }

    // Verify session
    const cookieHeader = context.request.headers.get("cookie") || "";
    const sessionMatch = cookieHeader.match(/dh_session=([^;]+)/);
    const sessionId = sessionMatch ? sessionMatch[1].trim() : null;

    if (!sessionId) {
      return context.redirect("/login?error=" + encodeURIComponent("Session expired. Please sign in again."));
    }

    const sessionData = await sessionKv.get(`session:${sessionId}`, "json");
    if (!sessionData?.businessId) {
      return context.redirect("/login?error=" + encodeURIComponent("Session invalid."));
    }

    const businessId = sessionData.businessId;
    const formData = await context.request.formData();

    // General Profile
    const phone = formData.get("phone")?.toString()?.trim() || "";
    const website = formData.get("website")?.toString()?.trim() || "";
    const address = formData.get("address")?.toString()?.trim() || "";

    // Emergency & Operations
    const emergencyPhone = formData.get("emergency_phone")?.toString()?.trim() || "";
    const emergencyRadiusKm = parseInt(formData.get("emergency_radius_km")?.toString() || "50", 10);
    const isOpenNow = formData.get("is_open_now") === "on" ? 1 : 0;

    // Heavy Access Specs
    const bDoubleAccess = formData.get("b_double_access") === "on" ? 1 : 0;
    const roadTrainAccess = formData.get("road_train_access") === "on" ? 1 : 0;
    const driveThroughBays = formData.get("drive_through_bays") === "on" ? 1 : 0;
    const trailerParking = formData.get("trailer_parking") === "on" ? 1 : 0;
    const rwcLicensed = formData.get("rwc_licensed") === "on" ? 1 : 0;

    // Diagnostics (multiple checkboxes collected as JSON string)
    const diagnosticsList = formData.getAll("diagnostic_software").map(item => item.toString());
    const diagnosticSoftware = JSON.stringify(diagnosticsList);

    const now = Math.floor(Date.now() / 1000);

    await db.prepare(`
      UPDATE workshop_profiles
      SET 
        phone = ?,
        website = ?,
        address = ?,
        emergency_phone = ?,
        emergency_radius_km = ?,
        is_open_now = ?,
        b_double_access = ?,
        road_train_access = ?,
        drive_through_bays = ?,
        trailer_parking = ?,
        rwc_licensed = ?,
        diagnostic_software = ?,
        updated_at = ?
      WHERE business_id = ?
    `).bind(
      phone,
      website,
      address,
      emergencyPhone,
      emergencyRadiusKm,
      isOpenNow,
      bDoubleAccess,
      roadTrainAccess,
      driveThroughBays,
      trailerParking,
      rwcLicensed,
      diagnosticSoftware,
      now,
      businessId
    ).run();

    return context.redirect("/dashboard?status=success");
  } catch (err: any) {
    console.error("Dashboard update error:", err);
    return context.redirect("/dashboard?status=error&msg=" + encodeURIComponent(err?.message || "Failed to update profile"));
  }
};