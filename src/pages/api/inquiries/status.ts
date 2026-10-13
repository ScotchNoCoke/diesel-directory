import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const db = (env as any)?.DB;
    const sessionKv = (env as any)?.SESSION;

    if (!db || !sessionKv) {
      return context.redirect("/dashboard?status=error&msg=" + encodeURIComponent("Service unavailable"));
    }

    const cookieHeader = context.request.headers.get("cookie") || "";
    const sessionMatch = cookieHeader.match(/dh_session=([^;]+)/);
    const sessionId = sessionMatch ? sessionMatch[1].trim() : null;

    if (!sessionId) {
      return context.redirect("/login?error=" + encodeURIComponent("Session expired"));
    }

    const sessionData = await sessionKv.get(`session:${sessionId}`, "json");
    if (!sessionData?.businessId) {
      return context.redirect("/login?error=" + encodeURIComponent("Invalid session"));
    }

    const formData = await context.request.formData();
    const inquiryId = formData.get("inquiry_id")?.toString()?.trim();
    const action = formData.get("action")?.toString()?.trim();

    if (!inquiryId || !action) {
      return context.redirect("/dashboard?status=error&msg=" + encodeURIComponent("Missing parameters"));
    }

    if (action === "delete") {
      await db.prepare("DELETE FROM dispatch_inquiries WHERE id = ? AND business_id = ?")
        .bind(inquiryId, sessionData.businessId)
        .run();
    } else if (["new", "contacted", "resolved"].includes(action)) {
      await db.prepare("UPDATE dispatch_inquiries SET status = ? WHERE id = ? AND business_id = ?")
        .bind(action, inquiryId, sessionData.businessId)
        .run();
    }

    return context.redirect("/dashboard?status=success");
  } catch (err: any) {
    console.error("Error updating inquiry status:", err);
    return context.redirect("/dashboard?status=error&msg=" + encodeURIComponent(err?.message || "Failed to update status"));
  }
};