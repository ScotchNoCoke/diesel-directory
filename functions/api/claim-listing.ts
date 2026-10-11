import { isDomainEmailMatch } from '../../src/lib/verifyDomain';

export async function onRequestPost({ request }: { request: Request }) {
  try {
    const data: any = await request.json();
    const {
      businessName,
      suburb,
      contactName,
      phone,
      email,
      abn,
      website
    } = data;

    if (!businessName || !phone || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required business, phone, or email fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const listingWebsiteUrl = website || '';
    const isVerifiedDomain = isDomainEmailMatch(email, listingWebsiteUrl);

    if (isVerifiedDomain) {
      return new Response(
        JSON.stringify({
          status: 'verified',
          message: 'Official domain match confirmed. Instant verification link dispatched to your inbox.'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'pending_review',
        message: 'Claim received. Unmatched domain or personal email detected — queued for phone/ABN verification.'
      }),
      { status: 202, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || 'Internal server error processing claim.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
