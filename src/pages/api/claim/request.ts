import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

const FREE_EMAIL_PROVIDERS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.com.au",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "bigpond.com",
  "bigpond.net.au",
  "optusnet.com.au",
  "icloud.com",
  "mail.com",
  "proton.me",
  "protonmail.com"
]);

// Known verified dealer / fleet domains
const KNOWN_DOMAINS: Record<string, string> = {
  "cmv-truck-bus": "cmvtruckandbus.com.au",
  "cmv-truck-bus-derrimut-truganina": "cmvtruckandbus.com.au",
  "cmv-truck-bus-wodonga": "cmvtruckandbus.com.au",
  "daimler-trucks-laverton": "daimlertruckslaverton.com.au",
  "daimler-trucks-dandenong": "daimlertrucksdandenong.com.au",
  "daimler-trucks-ballarat": "daimlertrucksballarat.com.au",
  "cmi-hino-melbourne": "cmihino.com.au",
  "adtrans-truck-centre-iveco": "adtranstrucks.com.au",
  "royans-dandenong": "royans.com.au",
  "royans-bayswater-melbourne": "royans.com.au",
  "royans-wodonga": "royans.com.au",
  "truck-tech-dandenong": "trucktech.com.au"
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractDomain(urlOrDomain: string): string {
  try {
    const cleaned = urlOrDomain.replace(/^https?:\/\//i, "").replace(/^www\./i, "");
    return cleaned.split("/")[0].toLowerCase().trim();
  } catch {
    return "";
  }
}

export const POST: APIRoute = async (context) => {
  try {
    const db = (env as any)?.DB;
    const resendApiKey = (env as any)?.RESEND_API_KEY;

    const formData = await context.request.formData();
    const business = formData.get("business")?.toString()?.trim() || "";
    const suburb = formData.get("suburb")?.toString()?.trim() || "";
    const email = formData.get("email")?.toString()?.trim()?.toLowerCase() || "";

    if (!email || !business) {
      return new Response(JSON.stringify({ error: "Business name and email are required." }), { status: 400 });
    }

    const emailDomain = email.split("@")[1]?.toLowerCase() || "";
    if (!emailDomain || !emailDomain.includes(".")) {
      return new Response(JSON.stringify({ error: "Invalid email format." }), { status: 400 });
    }

    const businessId = slugify(business);

    // 1. Check known domains dictionary first
    let expectedDomain = KNOWN_DOMAINS[businessId] || "";

    // If prefix match (e.g. cmv-truck-bus in longer title)
    if (!expectedDomain) {
      for (const [key, domain] of Object.entries(KNOWN_DOMAINS)) {
        if (businessId.includes(key) || key.includes(businessId)) {
          expectedDomain = domain;
          break;
        }
      }
    }

    // 2. Query database for workshop website if not in dictionary
    if (!expectedDomain && db) {
      try {
        const profile = (await db
          .prepare("SELECT website FROM workshop_profiles WHERE business_id = ? OR name LIKE ?")
          .bind(businessId, `%${business}%`)
          .first()) as { website?: string } | null;

        if (profile?.website) {
          expectedDomain = extractDomain(profile.website);
        }
      } catch (e) {
        console.warn("Error querying website from workshop_profiles:", e);
      }
    }

    // 3. Strict Impersonation Guard: If workshop has a registered domain, email must match
    if (expectedDomain) {
      const isMatch = emailDomain === expectedDomain || emailDomain.endsWith(`.${expectedDomain}`);
      if (!isMatch) {
        return context.redirect(
          `/claim?business=${encodeURIComponent(business)}&suburb=${encodeURIComponent(suburb)}&domain_error=${encodeURIComponent(expectedDomain)}`
        );
      }
    }

    // 4. Generate token and insert into D1
    const token = crypto.randomUUID().replace(/-/g, "");
    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + 14 * 24 * 60 * 60;

    if (db) {
      await db
        .prepare(
          "INSERT INTO claim_tokens (token, business_id, recipient_email, created_at, expires_at) VALUES (?, ?, ?, ?, ?)"
        )
        .bind(token, businessId, email, now, expiresAt)
        .run();
    }

    const origin = new URL(context.request.url).origin;
    const claimUrl = `${origin}/claim?token=${token}`;

    if (resendApiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Diesel Hub <team@dieselhub.com.au>",
          to: email,
          subject: `Verify & Claim Listing: ${business}`,
          html: `<div style="font-family: sans-serif; background: #020617; color: #f8fafc; padding: 32px; border-radius: 12px;"><h2 style="color: #f59e0b; margin-top: 0;">Claim Your Workshop Listing</h2><p>You requested management access for <strong>${business}</strong>${suburb ? ` in ${suburb}` : ""} on Diesel Hub Australia.</p><p>Click the link below to verify your listing and set your dashboard credentials:</p><p style="margin: 28px 0;"><a href="${claimUrl}" style="background: #f59e0b; color: #020617; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block;">Verify Listing & Access Dashboard &rarr;</a></p><p style="color: #94a3b8; font-size: 12px;">This claim link is valid for 14 days. If you did not request this, you can ignore this email.</p></div>`,
        }),
      });
    }

    return context.redirect(`/claim?requested_for=${encodeURIComponent(email)}`);
  } catch (err: any) {
    console.error("Claim request error:", err);
    return new Response(JSON.stringify({ error: err?.message || "Server error" }), { status: 500 });
  }
};