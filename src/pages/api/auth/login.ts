import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { verifyPassword, createSession, buildSessionCookie } from "../../../lib/auth";

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const db = (env as any)?.DB;
    const sessionKv = (env as any)?.SESSION;

    if (!db || !sessionKv) {
      return context.redirect("/login?error=" + encodeURIComponent("Service unavailable: database offline."));
    }

    const formData = await context.request.formData();
    const email = formData.get("email")?.toString()?.trim()?.toLowerCase() || "";
    const password = formData.get("password")?.toString() || "";

    if (!email || !password) {
      return context.redirect("/login?error=" + encodeURIComponent("Email and password are required."));
    }

    const user = (await db
      .prepare("SELECT id, email, password_hash, salt, business_id FROM users WHERE LOWER(email) = ?")
      .bind(email)
      .first()) as { id: string; email: string; password_hash: string; salt?: string; business_id: string } | null;

    if (!user || !user.salt) {
      return context.redirect("/login?error=" + encodeURIComponent("Invalid email or password."));
    }

    const isValid = await verifyPassword(password, user.password_hash, user.salt);
    if (!isValid) {
      return context.redirect("/login?error=" + encodeURIComponent("Invalid email or password."));
    }

    // Create session using standard auth module
    const sessionId = await createSession(sessionKv, {
      userId: user.id,
      email: user.email,
      businessId: user.business_id,
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/dashboard",
        "Set-Cookie": buildSessionCookie(sessionId),
      },
    });
  } catch (err: any) {
    console.error("Login route error:", err);
    return context.redirect("/login?error=" + encodeURIComponent("Unexpected server error."));
  }
};
