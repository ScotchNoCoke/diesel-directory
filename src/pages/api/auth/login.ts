import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

async function verifyPassword(password: string, storedHashHex: string, storedSaltHex?: string): Promise<boolean> {
  let saltHex = storedSaltHex;
  let expectedHashHex = storedHashHex;

  if (!saltHex && storedHashHex.includes(":")) {
    const parts = storedHashHex.split(":");
    saltHex = parts[0];
    expectedHashHex = parts[1];
  }

  if (!saltHex || !expectedHashHex) return false;

  const salt = new Uint8Array(saltHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );

  const derivedHashHex = Array.from(new Uint8Array(derivedBits))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  return derivedHashHex === expectedHashHex;
}

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
      .prepare("SELECT id, email, password_hash, salt, business_id FROM users WHERE email = ?")
      .bind(email)
      .first()) as { id: string; email: string; password_hash: string; salt?: string; business_id: string } | null;

    if (!user) {
      return context.redirect("/login?error=" + encodeURIComponent("Invalid email or password."));
    }

    const isValid = await verifyPassword(password, user.password_hash, user.salt);
    if (!isValid) {
      return context.redirect("/login?error=" + encodeURIComponent("Invalid email or password."));
    }

    const sessionId = crypto.randomUUID();
    const sessionData = {
      userId: user.id,
      email: user.email,
      businessId: user.business_id,
      createdAt: Date.now()
    };

    await sessionKv.put(`session:${sessionId}`, JSON.stringify(sessionData), {
      expirationTtl: 30 * 24 * 60 * 60
    });

    const isSecure = context.url.protocol === "https:";
    const cookieHeader = `dh_session=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}${isSecure ? "; Secure" : ""}`;

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/dashboard",
        "Set-Cookie": cookieHeader
      }
    });
  } catch (err: any) {
    console.error("Login route error:", err);
    return context.redirect("/login?error=" + encodeURIComponent("Unexpected server error."));
  }
};