import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const db = (env as any)?.DB;
    if (!db) {
      return new Response(JSON.stringify({ error: "Database unavailable" }), { status: 500 });
    }

    const formData = await context.request.formData();
    const businessId = formData.get("business_id")?.toString()?.trim();
    const driverName = formData.get("driver_name")?.toString()?.trim();
    const driverPhone = formData.get("driver_phone")?.toString()?.trim();
    const vehicleType = formData.get("vehicle_type")?.toString()?.trim() || "Heavy Rigid / Prime Mover";
    const breakdownLocation = formData.get("breakdown_location")?.toString()?.trim() || "";
    const issueDescription = formData.get("issue_description")?.toString()?.trim();

    if (!businessId || !driverName || !driverPhone || !issueDescription) {
      return new Response(JSON.stringify({ error: "Missing required inquiry fields" }), { status: 400 });
    }

    const id = "inq_" + crypto.randomUUID();
    const now = Math.floor(Date.now() / 1000);

    await db.prepare(`
      INSERT INTO dispatch_inquiries (
        id, business_id, driver_name, driver_phone, vehicle_type, breakdown_location, issue_description, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?)
    `).bind(
      id,
      businessId,
      driverName,
      driverPhone,
      vehicleType,
      breakdownLocation,
      issueDescription,
      now
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err: any) {
    console.error("Inquiry submission error:", err);
    return new Response(JSON.stringify({ error: "Failed to submit dispatch inquiry" }), { status: 500 });
  }
};